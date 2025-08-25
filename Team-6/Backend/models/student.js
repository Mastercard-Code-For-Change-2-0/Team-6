const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    // Personal Information
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    middleName: {
        type: String,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[6-9]\d{9}$/.test(v);
            },
            message: 'Please enter a valid 10-digit mobile number'
        }
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: 'Please enter a valid email address'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    
    // Resume
    resumeUploaded: {
        fileName: {
            type: String
        },
        filePath: {
            type: String
        },
        uploadedAt: {
            type: Date,
            default: Date.now
        },
        fileSize: {
            type: Number
        }
    },
    
    // Education Details
    education: {
        // Class 10th Details
        class10: {
            board: {
                type: String,
                required: true
            },
            school: {
                type: String,
                required: true
            },
            percentage: {
                type: Number,
                required: true,
                min: 0,
                max: 100
            },
            yearOfPassing: {
                type: Number,
                required: true
            }
        },
        
        // Class 12th Details
        class12: {
            board: {
                type: String,
                required: true
            },
            school: {
                type: String,
                required: true
            },
            stream: {
                type: String,
                required: true,
                enum: ['Science', 'Commerce', 'Arts', 'Other']
            },
            percentage: {
                type: Number,
                required: true,
                min: 0,
                max: 100
            },
            yearOfPassing: {
                type: Number,
                required: true
            }
        },
        
        // Current Education
        currentEducation: {
            degree: {
                type: String,
                required: true,
                enum: ['B.Tech', 'B.E', 'BCA', 'B.Sc', 'B.Com', 'BA', 'M.Tech', 'M.E', 'MCA', 'M.Sc', 'MBA', 'Other']
            },
            specialization: {
                type: String,
                required: true
            },
            college: {
                type: String,
                required: true
            },
            university: {
                type: String,
                required: true
            },
            currentSemester: {
                type: Number,
                required: true,
                min: 1,
                max: 10
            },
            cgpa: {
                type: Number,
                min: 0,
                max: 10
            },
            percentage: {
                type: Number,
                min: 0,
                max: 100
            },
            expectedGraduation: {
                type: Date,
                required: true
            }
        }
    },
    
    // Skills
    skills: {
        technicalSkills: [{
            skillName: {
                type: String,
                required: true
            },
            proficiencyLevel: {
                type: String,
                enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
                required: true
            }
        }],
        programmingLanguages: [{
            language: {
                type: String,
                required: true
            },
            proficiencyLevel: {
                type: String,
                enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
                required: true
            }
        }],
        softSkills: [{
            type: String
        }],
        certifications: [{
            certificationName: {
                type: String,
                required: true
            },
            issuingOrganization: {
                type: String,
                required: true
            },
            issueDate: {
                type: Date,
                required: true
            },
            expiryDate: {
                type: Date
            },
            credentialId: {
                type: String
            }
        }]
    },
    
    // Achievements
    achievements: [{
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            enum: ['Academic', 'Sports', 'Cultural', 'Technical', 'Leadership', 'Other'],
            required: true
        },
        dateAchieved: {
            type: Date,
            required: true
        },
        organization: {
            type: String
        },
        certificateUrl: {
            type: String
        }
    }],
    
    // Metadata
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Indexes for better query performance
studentSchema.index({ emailId: 1 });
studentSchema.index({ mobileNumber: 1 });
studentSchema.index({ 'education.currentEducation.degree': 1 });
studentSchema.index({ 'skills.technicalSkills.skillName': 1 });

// Virtual for full name
studentSchema.virtual('fullName').get(function() {
    if (this.middleName) {
        return `${this.firstName} ${this.middleName} ${this.surname}`;
    }
    return `${this.firstName} ${this.surname}`;
});

// Pre-save middleware to update the updatedAt field
studentSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;