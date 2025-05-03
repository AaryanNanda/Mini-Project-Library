import React, { useState } from "react";
import './signup.css';

const Signup = ({ setPage }) => {
  const [formData, setFormData] = useState({
    name: "",
    rollno: "",
    usn: "",
    phone: "",
    email: "",
    password: "",
    repassword: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    
    const newValue = name === "name" || name === "rollno" || name === "usn" 
      ? value.toUpperCase() 
      : value;

    setFormData({ ...formData, [name]: newValue });

    if (name === "password") {
      setShowPasswordStrength(newValue.length > 0);
      validatePassword(newValue);
    }
  };

  const validatePassword = (password) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setPasswordStrength(strongPasswordRegex.test(password) ? "strong" : "weak");
  };

  const validateForm = () => {
    let newErrors = {};

    if (!/^[A-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Only alphabets and spaces allowed";
    }

    if (!/^\d{2}[A-Z]{2}\d{4}$/.test(formData.rollno)) {
      newErrors.rollno = "Format: 12AB1234";
    }

    if (!/^[A-Z]{2}\d{2}[A-Z]{4}\d[A-Z]{3}\d{3}$/.test(formData.usn)) {
      newErrors.usn = "Format: AB12ABCD1ABC123";
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Must be 10 digits";
    }

    if (!/^.{24}$/.test(formData.email) || !/\..*\..*@dypatil\.edu$/.test(formData.email)) {
      newErrors.email = "Invalid college email format";
    }

    if (passwordStrength !== "strong") {
      newErrors.password = "Weak password: Use uppercase, lowercase, number, special char.";
    }

    if (formData.password !== formData.repassword) {
      newErrors.repassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
        const response = await fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert("Sign-up successful!");
            setPage("addProject");// change back to login
        } else {
            const errorData = await response.text();
            alert('Error signing up user: ' + errorData);
        }
    }
};

  return (
    <div className="card">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>

        <div className="input-container">
          <label>Roll No.</label>
          <input type="text" name="rollno" value={formData.rollno} onChange={handleChange} required />
          {errors.rollno && <div className="error">{errors.rollno}</div>}
        </div>

        <div className="input-container">
          <label>USN No</label>
          <input type="text" name="usn" value={formData.usn} onChange={handleChange} required />
          {errors.usn && <div className="error">{errors.usn}</div>}
        </div>

        <div className="input-container">
          <label>Phone Number</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
          {errors.phone && <div className="error">{errors.phone}</div>}
        </div>

        <div className="input-container">
          <label>College Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        <div className="input-container">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          {errors.password && <div className="error">{errors.password}</div>}
          {showPasswordStrength && (
            <div className={passwordStrength === "strong" ? "strong" : "weak"}>
              {passwordStrength} password
            </div>
          )}
        </div>

        <div className="input-container">
          <label>Re-enter Password</label>
          <input type="password" name="repassword" value={formData.repassword} onChange={handleChange} required />
          {errors.repassword && <div className="error">{errors.repassword}</div>}
        </div>

        <button type="submit">Sign Up</button>
      </form>

      <p>Already signed up? <button className="link-btn" onClick={() => setPage("login")}>Login here</button></p>
    </div>
  );
};

export default Signup;