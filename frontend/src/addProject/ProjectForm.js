import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./ProjectForm.css";

const ProjectForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        studentName: "",
        email: "",
        projectTitle: "",
        frontendLang: "",
        backendLang: "",
        databaseLang: "",
        githubLink: "",
        guideName: ""
    });

    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        document.body.classList.add('project-form-page');
        return () => {
            document.body.classList.remove('project-form-page');
        };
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        console.log("Project Details Submitted:", formData);
    
        try {
            const response = await axios.post('http://localhost:5000/api/submissions', formData);
            console.log('Submission successful:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleBack = () => {
        navigate("/view-projects");
    };

    return (
        <div className="form-container">
            <button onClick={handleBack} className="back-button">⬅ Back</button>

            {submitted ? (
                <div className="submission-message">
                    <h2>Project Submitted Successfully!</h2>
                    <p><strong>Student Name:</strong> {formData.studentName}</p>
                    <p><strong>Email ID:</strong> {formData.email}</p>
                    <p><strong>Guide Name:</strong> {formData.guideName}</p>
                    <p><strong>GitHub Link:</strong> <a href={formData.githubLink} target="_blank" rel="noopener noreferrer">{formData.githubLink}</a></p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h2>Project Submission Form</h2>
                    <div className="form-group">
                        <label>Student Name:</label>
                        <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Email ID:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Project Title:</label>
                        <input type="text" name="projectTitle" value={formData.projectTitle} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Frontend Language:</label>
                        <input type="text" name="frontendLang" value={formData.frontendLang} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Backend Language:</label>
                        <input type="text" name="backendLang" value={formData.backendLang} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Database Language:</label>
                        <input type="text" name="databaseLang" value={formData.databaseLang} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>GitHub Link:</label>
                        <input type="url" name="githubLink" value={formData.githubLink} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Guide Name:</label>
                        <input type="text" name="guideName" value={formData.guideName} onChange={handleChange} required />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
};

export default ProjectForm;