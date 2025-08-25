// adminClerkController.js
// Controller for admin and clerk functionalities

const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const nodemailer = require('nodemailer');

// Middleware to check admin role
function isAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden: Admins only' });
    }
}

// Middleware to check clerk role
function isClerk(req, res, next) {
    if (req.user && req.user.role === 'clerk') {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden: Clerks only' });
    }
}

// Admin CRUD for students
router.post('/students', isAdmin, async (req, res) => {
    try {
        const student = new Student({ ...req.body, role: 'student' });
        await student.save();
        res.status(201).json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/students/:id', isAdmin, async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        res.json(student);
    } catch (err) {
        res.status(404).json({ error: 'Student not found' });
    }
});

router.put('/students/:id', isAdmin, async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/students/:id', isAdmin, async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: 'Student deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Clerk can only view data
router.get('/clerk/students', isClerk, async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CSV upload for bulk account creation
const upload = multer({ dest: 'uploads/' });

router.post('/admin/upload-csv', isAdmin, upload.single('csvfile'), async (req, res) => {
    const results = [];
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            let created = [];
            for (const row of results) {
                try {
                    const user = new Student({
                        emailId: row.email,
                        password: row.password || 'default123',
                        role: row.role || 'student',
                        firstName: row.firstName || '',
                        surname: row.surname || '',
                        mobileNumber: row.mobileNumber || '',
                        isActive: true
                    });
                    await user.save();
                    // Send email
                    await sendMail(row.email, row.password || 'default123');
                    created.push(row.email);
                } catch (err) {
                    // skip errors
                }
            }
            res.json({ created });
        });
});

// Email sending function
async function sendMail(email, password) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });
    await transporter.sendMail({
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Account Created',
        text: `Your account has been created. Email: ${email}, Password: ${password}`
    });
}

module.exports = router;