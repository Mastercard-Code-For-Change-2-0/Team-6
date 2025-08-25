// server.js
const express = require('express');
const { connectDB } = require('./db');  // DB connection
require('dotenv').config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Import routes
const sampleRoutes = require('./routes/sampleRoutes');
app.use('/sample', sampleRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Server is running ✅');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});
