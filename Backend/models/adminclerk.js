const mongoose = require('mongoose');
const adminClerkSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        required: true
    }
});

const AdminClerk = mongoose.model('AdminClerk', adminClerkSchema);
module.exports = AdminClerk;
