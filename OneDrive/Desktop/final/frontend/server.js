const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const multer = require('multer');
const fs = require('fs');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Set up middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Set up database
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

// Create tables if they don't exist
db.serialize(() => {
  // Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    active INTEGER DEFAULT 1
  )`);

  // Documents table
  db.run(`CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    filename TEXT NOT NULL,
    filepath TEXT NOT NULL,
    type TEXT NOT NULL,
    upload_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )`);

  // Consent table
  db.run(`CREATE TABLE IF NOT EXISTS consent (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    privacy_accepted INTEGER DEFAULT 0,
    terms_accepted INTEGER DEFAULT 0,
    consent_date DATETIME,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )`);
});

// Create upload directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.session.userId;
    const userDir = path.join(uploadDir, userId.toString());
    
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }
    
    cb(null, userDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Authentication middleware
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next();
  }
  res.redirect('/login');
}

function checkRole(role) {
  return (req, res, next) => {
    if (req.session.userRole === role) {
      return next();
    }
    res.status(403).send('Access denied');
  };
}

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  db.get('SELECT * FROM users WHERE username = ? AND active = 1', [username], (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }
    
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid username or password' });
      }
      
      req.session.userId = user.id;
      req.session.userRole = user.role;
      
      // Redirect based on role
      switch (user.role) {
        case 'admin':
          res.json({ redirect: '/admin-dashboard' });
          break;
        case 'student':
          res.json({ redirect: '/student-dashboard' });
          break;
        case 'clerical':
          res.json({ redirect: '/clerical-dashboard' });
          break;
        default:
          res.json({ redirect: '/' });
      }
    });
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// Dashboard routes
app.get('/admin-dashboard', isAuthenticated, checkRole('admin'), (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin-dashboard.html'));
});

app.get('/student-dashboard', isAuthenticated, checkRole('student'), (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'student-dashboard.html'));
});

app.get('/clerical-dashboard', isAuthenticated, checkRole('clerical'), (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'clerical-dashboard.html'));
});

// Student profile routes
app.get('/api/profile', isAuthenticated, (req, res) => {
  db.get('SELECT id, username, email, name, role FROM users WHERE id = ?', [req.session.userId], (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(user);
  });
});

app.put('/api/profile', isAuthenticated, (req, res) => {
  const { name, email } = req.body;
  
  db.run('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, req.session.userId], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Profile updated successfully' });
  });
});

app.put('/api/change-password', isAuthenticated, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  db.get('SELECT password FROM users WHERE id = ?', [req.session.userId], (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    bcrypt.compare(currentPassword, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      if (!isMatch) {
        return res.status(400).json({ error: 'Current password is incorrect' });
      }
      
      bcrypt.hash(newPassword, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        
        db.run('UPDATE users SET password = ? WHERE id = ?', [hash, req.session.userId], function(err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.json({ message: 'Password changed successfully' });
        });
      });
    });
  });
});

app.put('/api/deactivate-account', isAuthenticated, (req, res) => {
  db.run('UPDATE users SET active = 0 WHERE id = ?', [req.session.userId], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    req.session.destroy();
    res.json({ message: 'Account deactivated successfully' });
  });
});

// Document upload routes
app.post('/api/upload-document', isAuthenticated, upload.single('document'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  const { type } = req.body;
  const userId = req.session.userId;
  
  db.run(
    'INSERT INTO documents (user_id, filename, filepath, type) VALUES (?, ?, ?, ?)',
    [userId, req.file.originalname, req.file.path, type],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ 
        message: 'Document uploaded successfully',
        document: {
          id: this.lastID,
          filename: req.file.originalname,
          type: type
        }
      });
    }
  );
});

app.get('/api/documents', isAuthenticated, (req, res) => {
  db.all('SELECT * FROM documents WHERE user_id = ?', [req.session.userId], (err, documents) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(documents);
  });
});

// Consent routes
app.get('/api/consent', isAuthenticated, (req, res) => {
  db.get('SELECT * FROM consent WHERE user_id = ?', [req.session.userId], (err, consent) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (!consent) {
      db.run('INSERT INTO consent (user_id) VALUES (?)', [req.session.userId], function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ 
          id: this.lastID,
          user_id: req.session.userId,
          privacy_accepted: 0,
          terms_accepted: 0,
          consent_date: null
        });
      });
    } else {
      res.json(consent);
    }
  });
});

app.put('/api/consent', isAuthenticated, (req, res) => {
  const { privacy_accepted, terms_accepted } = req.body;
  const consent_date = privacy_accepted && terms_accepted ? new Date().toISOString() : null;
  
  db.run(
    'UPDATE consent SET privacy_accepted = ?, terms_accepted = ?, consent_date = ? WHERE user_id = ?',
    [privacy_accepted ? 1 : 0, terms_accepted ? 1 : 0, consent_date, req.session.userId],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Consent updated successfully' });
    }
  );
});

// Create a default admin user if none exists
db.get('SELECT COUNT(*) as count FROM users WHERE role = "admin"', [], (err, result) => {
  if (err) {
    console.error(err.message);
    return;
  }
  
  if (result.count === 0) {
    bcrypt.hash('admin123', 10, (err, hash) => {
      if (err) {
        console.error(err.message);
        return;
      }
      
      db.run(
        'INSERT INTO users (username, password, role, email, name) VALUES (?, ?, ?, ?, ?)',
        ['admin', hash, 'admin', 'admin@example.com', 'Administrator'],
        function(err) {
          if (err) {
            console.error(err.message);
            return;
          }
          console.log('Default admin user created');
        }
      );
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});