import React, { useState, FormEvent } from 'react';
import Button from './button';

interface SignupFormData {
  fullname: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  studentId: string;
}

const StudentSignup: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    fullname: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    studentId: '',
  });
  
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullname: formData.fullname,
          email: formData.email,
          username: formData.username,
          password: formData.password,
          studentId: formData.studentId,
          role: 'student'
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess('Account created successfully! Redirecting to login...');
        // Clear form
        setFormData({
          fullname: '',
          email: '',
          username: '',
          password: '',
          confirmPassword: '',
          studentId: '',
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
    // <div className="container">
    //   <header>
    //     <h1>Student Management System</h1>
    //     <p>Create your student account</p>
    //   </header>
      
    //   <main>
    //     <div className="card">
    //       <h2>Student Signup</h2>
          
    //       {error && <div className="error-message">{error}</div>}
    //       {success && <div className="success-message">{success}</div>}
          
    //       <form onSubmit={handleSubmit}>
    //         <div className="form-group">
    //           <label htmlFor="fullname">Full Name</label>
    //           <input
    //             type="text"
    //             id="fullname"
    //             name="fullname"
    //             className="form-control"
    //             value={formData.fullname}
    //             onChange={handleChange}
    //             required
    //           />
    //         </div>
            
    //         <div className="form-group">
    //           <label htmlFor="email">Email Address</label>
    //           <input
    //             type="email"
    //             id="email"
    //             name="email"
    //             className="form-control"
    //             value={formData.email}
    //             onChange={handleChange}
    //             required
    //           />
    //         </div>
            
    //         <div className="form-group">
    //           <label htmlFor="username">Username</label>
    //           <input
    //             type="text"
    //             id="username"
    //             name="username"
    //             className="form-control"
    //             value={formData.username}
    //             onChange={handleChange}
    //             required
    //           />
    //         </div>
            
    //         <div className="form-group">
    //           <label htmlFor="password">Password</label>
    //           <input
    //             type="password"
    //             id="password"
    //             name="password"
    //             className="form-control"
    //             value={formData.password}
    //             onChange={handleChange}
    //             required
    //           />
    //         </div>
            
    //         <div className="form-group">
    //           <label htmlFor="confirmPassword">Confirm Password</label>
    //           <input
    //             type="password"
    //             id="confirmPassword"
    //             name="confirmPassword"
    //             className="form-control"
    //             value={formData.confirmPassword}
    //             onChange={handleChange}
    //             required
    //           />
    //         </div>
            
    //         <div className="form-group">
    //           <label htmlFor="studentId">Student ID (if available)</label>
    //           <input
    //             type="text"
    //             id="studentId"
    //             name="studentId"
    //             className="form-control"
    //             value={formData.studentId}
    //             onChange={handleChange}
    //           />
    //         </div>
            
    //         <div className="buttons">
    //           <Button 
    //             type="submit" 
    //             variant="primary" 
    //             disabled={isLoading}
    //           >
    //             {isLoading ? 'Signing Up...' : 'Sign Up'}
    //           </Button>
    //           <a href="/login" className="btn outline">
    //             Already have an account? Login
    //           </a>
    //         </div>
    //       </form>
    //     </div>
    //   </main>
      
    //   <footer>
    //     <p>&copy; {new Date().getFullYear()} Student Management System. All rights reserved.</p>
    //   </footer>
    // </div>
  );
};

export default StudentSignup;