
import React, { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button"

interface SignupFormData {
  firstName: string;
  middleName: string;
  surname: string;
  mobileNumber: string;
  emailId: string;
  password: string;
  confirmPassword: string;
  
  // Education Details
  education: {
    class10: {
      board: string;
      school: string;
      percentage: number | '';
      yearOfPassing: number | '';
    };
    class12: {
      board: string;
      school: string;
      stream: string;
      percentage: number | '';
      yearOfPassing: number | '';
    };
    currentEducation: {
      degree: string;
      specialization: string;
      college: string;
      university: string;
      currentSemester: number | '';
      cgpa: number | '';
      percentage: number | '';
      expectedGraduation: string;
    };
  };
  
  // Skills
  skills: {
    technicalSkill1: string;
    technicalSkill2: string;
    technicalSkill3: string;
    technicalSkill4: string;
    technicalSkill5: string;
    softSkill1: string;
    softSkill2: string;
    softSkill3: string;
    softSkill4: string;
    softSkill5: string;
  };
  
  // Resume
  resume?: File | null;
}

const StudentSignup: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: '',
    middleName: '',
    surname: '',
    mobileNumber: '',
    emailId: '',
    password: '',
    confirmPassword: '',
    education: {
      class10: {
        board: '',
        school: '',
        percentage: '',
        yearOfPassing: ''
      },
      class12: {
        board: '',
        school: '',
        stream: '',
        percentage: '',
        yearOfPassing: ''
      },
      currentEducation: {
        degree: '',
        specialization: '',
        college: '',
        university: '',
        currentSemester: '',
        cgpa: '',
        percentage: '',
        expectedGraduation: ''
      }
    },
    skills: {
      technicalSkill1: '',
      technicalSkill2: '',
      technicalSkill3: '',
      technicalSkill4: '',
      technicalSkill5: '',
      softSkill1: '',
      softSkill2: '',
      softSkill3: '',
      softSkill4: '',
      softSkill5: ''
    },
    resume: null
  });
  
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle nested education fields
    if (name.startsWith('education.')) {
      const [, section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        education: {
          ...prev.education,
          [section]: {
            ...prev.education[section as keyof typeof prev.education],
            [field]: value === '' ? '' : (isNaN(Number(value)) ? value : Number(value))
          }
        }
      }));
    } 
    // Handle skills fields
    else if (name.startsWith('skills.')) {
      const [section, skillField] = name.split('.');
      setFormData(prev => ({
        ...prev,
        skills: {
          ...prev.skills,
          [skillField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      resume: file
    }));
  };



  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Reset messages
    setError('');
    setSuccess('');
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Create FormData for file upload
      const submitData = new FormData();
      
      // Add basic info
      submitData.append('firstName', formData.firstName);
      submitData.append('middleName', formData.middleName);
      submitData.append('surname', formData.surname);
      submitData.append('mobileNumber', formData.mobileNumber);
      submitData.append('emailId', formData.emailId);
      submitData.append('password', formData.password);
      
      // Add education data
      submitData.append('education', JSON.stringify(formData.education));
      
      // Add skills data
      submitData.append('skills', JSON.stringify(formData.skills));
      
      // Add resume file if present
      if (formData.resume) {
        submitData.append('resume', formData.resume);
      }

      const response = await fetch('/signup', {
        method: 'POST',
        body: submitData
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess('Account created successfully! Redirecting to login...');
        // Clear form
        setFormData({
          firstName: '',
          middleName: '',
          surname: '',
          mobileNumber: '',
          emailId: '',
          password: '',
          confirmPassword: '',
          education: {
            class10: {
              board: '',
              school: '',
              percentage: '',
              yearOfPassing: ''
            },
            class12: {
              board: '',
              school: '',
              stream: '',
              percentage: '',
              yearOfPassing: ''
            },
            currentEducation: {
              degree: '',
              specialization: '',
              college: '',
              university: '',
              currentSemester: '',
              cgpa: '',
              percentage: '',
              expectedGraduation: ''
            }
          },
          skills: {
            technicalSkill1: '',
            technicalSkill2: '',
            technicalSkill3: '',
            technicalSkill4: '',
            technicalSkill5: '',
            softSkill1: '',
            softSkill2: '',
            softSkill3: '',
            softSkill4: '',
            softSkill5: ''
          },
          resume: null
        });
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setError(data.error || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Student Management System</h1>
        <p>Create your student account</p>
      </header>
      
      <main>
        <div className="card">
          <h2>Student Signup</h2>
          
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <h3>Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="form-control"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="middleName">Middle Name</label>
                <input
                  type="text"
                  id="middleName"
                  name="middleName"
                  className="form-control"
                  value={formData.middleName}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="surname">Surname</label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  className="form-control"
                  value={formData.surname}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="mobileNumber">Mobile Number</label>
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
                  className="form-control"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  pattern="[6-9][0-9]{9}"
                  placeholder="Enter 10-digit mobile number"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="emailId">Email Address *</label>
                <input
                  type="email"
                  id="emailId"
                  name="emailId"
                  className="form-control"
                  value={formData.emailId}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  minLength={6}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-control"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Education Details */}
            <h3>Education Details</h3>
            
            {/* Class 10th */}
            <h4>Class 10th Details</h4>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="education.class10.board">Board *</label>
                <input
                  type="text"
                  id="education.class10.board"
                  name="education.class10.board"
                  className="form-control"
                  value={formData.education.class10.board}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="education.class10.school">School</label>
                <input
                  type="text"
                  id="education.class10.school"
                  name="education.class10.school"
                  className="form-control"
                  value={formData.education.class10.school}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="education.class10.percentage">Percentage *</label>
                <input
                  type="number"
                  id="education.class10.percentage"
                  name="education.class10.percentage"
                  className="form-control"
                  value={formData.education.class10.percentage}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  step="0.01"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="education.class10.yearOfPassing">Year of Passing</label>
                <input
                  type="number"
                  id="education.class10.yearOfPassing"
                  name="education.class10.yearOfPassing"
                  className="form-control"
                  value={formData.education.class10.yearOfPassing}
                  onChange={handleChange}
                  min="1990"
                  max="2030"
                />
              </div>
            </div>

            {/* Class 12th */}
            <h4>Class 12th Details</h4>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="education.class12.board">Board *</label>
                <input
                  type="text"
                  id="education.class12.board"
                  name="education.class12.board"
                  className="form-control"
                  value={formData.education.class12.board}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="education.class12.school">School</label>
                <input
                  type="text"
                  id="education.class12.school"
                  name="education.class12.school"
                  className="form-control"
                  value={formData.education.class12.school}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="education.class12.stream">Stream</label>
                <select
                  id="education.class12.stream"
                  name="education.class12.stream"
                  className="form-control"
                  value={formData.education.class12.stream}
                  onChange={handleChange}
                >
                  <option value="">Select Stream</option>
                  <option value="Science">Science</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Arts">Arts</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="education.class12.percentage">Percentage *</label>
                <input
                  type="number"
                  id="education.class12.percentage"
                  name="education.class12.percentage"
                  className="form-control"
                  value={formData.education.class12.percentage}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  step="0.01"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="education.class12.yearOfPassing">Year of Passing</label>
                <input
                  type="number"
                  id="education.class12.yearOfPassing"
                  name="education.class12.yearOfPassing"
                  className="form-control"
                  value={formData.education.class12.yearOfPassing}
                  onChange={handleChange}
                  min="1990"
                  max="2030"
                />
              </div>
            </div>

            {/* Current Education */}
            <h4>Current Education</h4>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="education.currentEducation.degree">Degree</label>
                <select
                  id="education.currentEducation.degree"
                  name="education.currentEducation.degree"
                  className="form-control"
                  value={formData.education.currentEducation.degree}
                  onChange={handleChange}
                >
                  <option value="">Select Degree</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="B.E">B.E</option>
                  <option value="BCA">BCA</option>
                  <option value="B.Sc">B.Sc</option>
                  <option value="B.Com">B.Com</option>
                  <option value="BA">BA</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="M.E">M.E</option>
                  <option value="MCA">MCA</option>
                  <option value="M.Sc">M.Sc</option>
                  <option value="MBA">MBA</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="education.currentEducation.specialization">Specialization</label>
                <input
                  type="text"
                  id="education.currentEducation.specialization"
                  name="education.currentEducation.specialization"
                  className="form-control"
                  value={formData.education.currentEducation.specialization}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="education.currentEducation.college">College</label>
                <input
                  type="text"
                  id="education.currentEducation.college"
                  name="education.currentEducation.college"
                  className="form-control"
                  value={formData.education.currentEducation.college}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="education.currentEducation.university">University</label>
                <input
                  type="text"
                  id="education.currentEducation.university"
                  name="education.currentEducation.university"
                  className="form-control"
                  value={formData.education.currentEducation.university}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="education.currentEducation.currentSemester">Current Semester</label>
                <input
                  type="number"
                  id="education.currentEducation.currentSemester"
                  name="education.currentEducation.currentSemester"
                  className="form-control"
                  value={formData.education.currentEducation.currentSemester}
                  onChange={handleChange}
                  min="1"
                  max="10"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="education.currentEducation.cgpa">CGPA *</label>
                <input
                  type="number"
                  id="education.currentEducation.cgpa"
                  name="education.currentEducation.cgpa"
                  className="form-control"
                  value={formData.education.currentEducation.cgpa}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  step="0.01"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="education.currentEducation.percentage">Percentage</label>
                <input
                  type="number"
                  id="education.currentEducation.percentage"
                  name="education.currentEducation.percentage"
                  className="form-control"
                  value={formData.education.currentEducation.percentage}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="education.currentEducation.expectedGraduation">Expected Graduation Date</label>
              <input
                type="date"
                id="education.currentEducation.expectedGraduation"
                name="education.currentEducation.expectedGraduation"
                className="form-control"
                value={formData.education.currentEducation.expectedGraduation}
                onChange={handleChange}
              />
            </div>


            {/* Skills Section */}
            <h3>Skills</h3>
            
            {/* Technical Skills */}
            <div className="skills-section">
              <h4>Technical Skills</h4>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="skills.technicalSkill1">Technical Skill 1</label>
                  <input
                    type="text"
                    id="skills.technicalSkill1"
                    name="skills.technicalSkill1"
                    className="form-control"
                    value={formData.skills.technicalSkill1}
                    onChange={handleChange}
                    placeholder="e.g., JavaScript, Python, React"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="skills.technicalSkill2">Technical Skill 2</label>
                  <input
                    type="text"
                    id="skills.technicalSkill2"
                    name="skills.technicalSkill2"
                    className="form-control"
                    value={formData.skills.technicalSkill2}
                    onChange={handleChange}
                    placeholder="e.g., Node.js, SQL, MongoDB"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="skills.technicalSkill3">Technical Skill 3</label>
                  <input
                    type="text"
                    id="skills.technicalSkill3"
                    name="skills.technicalSkill3"
                    className="form-control"
                    value={formData.skills.technicalSkill3}
                    onChange={handleChange}
                    placeholder="e.g., Docker, AWS, Git"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="skills.technicalSkill4">Technical Skill 4</label>
                  <input
                    type="text"
                    id="skills.technicalSkill4"
                    name="skills.technicalSkill4"
                    className="form-control"
                    value={formData.skills.technicalSkill4}
                    onChange={handleChange}
                    placeholder="e.g., Machine Learning, Data Analysis"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="skills.technicalSkill5">Technical Skill 5</label>
                <input
                  type="text"
                  id="skills.technicalSkill5"
                  name="skills.technicalSkill5"
                  className="form-control"
                  value={formData.skills.technicalSkill5}
                  onChange={handleChange}
                  placeholder="e.g., DevOps, Testing, UI/UX"
                />
              </div>
            </div>

            {/* Soft Skills */}
            <div className="skills-section">
              <h4>Soft Skills</h4>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="skills.softSkill1">Soft Skill 1</label>
                  <input
                    type="text"
                    id="skills.softSkill1"
                    name="skills.softSkill1"
                    className="form-control"
                    value={formData.skills.softSkill1}
                    onChange={handleChange}
                    placeholder="e.g., Communication, Leadership"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="skills.softSkill2">Soft Skill 2</label>
                  <input
                    type="text"
                    id="skills.softSkill2"
                    name="skills.softSkill2"
                    className="form-control"
                    value={formData.skills.softSkill2}
                    onChange={handleChange}
                    placeholder="e.g., Problem Solving, Teamwork"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="skills.softSkill3">Soft Skill 3</label>
                  <input
                    type="text"
                    id="skills.softSkill3"
                    name="skills.softSkill3"
                    className="form-control"
                    value={formData.skills.softSkill3}
                    onChange={handleChange}
                    placeholder="e.g., Time Management, Adaptability"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="skills.softSkill4">Soft Skill 4</label>
                  <input
                    type="text"
                    id="skills.softSkill4"
                    name="skills.softSkill4"
                    className="form-control"
                    value={formData.skills.softSkill4}
                    onChange={handleChange}
                    placeholder="e.g., Critical Thinking, Creativity"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="skills.softSkill5">Soft Skill 5</label>
                <input
                  type="text"
                  id="skills.softSkill5"
                  name="skills.softSkill5"
                  className="form-control"
                  value={formData.skills.softSkill5}
                  onChange={handleChange}
                  placeholder="e.g., Public Speaking, Negotiation"
                />
              </div>
            </div>

            {/* Resume Upload */}
            <h3>Resume Upload</h3>
            <div className="form-group">
              <label htmlFor="resume">Upload Resume (PDF only) *</label>
              <input
                type="file"
                id="resume"
                name="resume"
                className="form-control"
                accept=".pdf"
                onChange={handleFileChange}
                required
              />
              {formData.resume && (
                <p className="file-info">Selected: {formData.resume.name}</p>
              )}
            </div>
            
            <div className="buttons">
              <Button 
                type="submit" 
                variant="default" 
                disabled={isLoading}
              >
                {isLoading ? 'Signing Up...' : 'Sign Up'}
              </Button>
              <a href="/login" className="btn outline">
                Already have an account? Login
              </a>
            </div>
          </form>
        </div>
      </main>
      
      <footer>
        <p>&copy; {new Date().getFullYear()} Student Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default StudentSignup;
