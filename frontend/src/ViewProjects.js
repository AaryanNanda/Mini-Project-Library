import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ViewProjects.css";

const ViewProjects = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/submissions");
                setProjects(response.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
        fetchProjects();
    }, []);

    const handleAddProject = () => {
        navigate("/add-project");
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="view-projects-container">
            <button onClick={handleBack} className="back-button">⬅ Back</button>
            <button onClick={handleAddProject} className="add-project-button">Add Project</button>

            <div className="page-description">
                <h2>Project Repository</h2>
                <p>
                    Welcome to our project repository. This page displays all the student projects submitted through our system. 
                    Each project contains details about the student, technologies used, and GitHub repository. 
                    You can hover over any project card to see more details. Use the "Add Project" button to submit a new project 
                    or the "Back" button to return to the previous page.
                </p>
            </div>

            <div className="projects-grid">
                {projects.map((project) => (
                    <div className="project-card" key={project._id}>
                        <div className="project-card-inner">
                            <div className="project-card-front">
                                <h3>{project.projectTitle}</h3>
                                <p><strong>Student:</strong> {project.studentName}</p>
                                <p><strong>Guide:</strong> {project.guideName}</p>
                            </div>
                            <div className="project-card-back">
                                <p><strong>Email:</strong> {project.email}</p>
                                <p><strong>Frontend:</strong> {project.frontendLang}</p>
                                <p><strong>Backend:</strong> {project.backendLang}</p>
                                <p><strong>Database:</strong> {project.databaseLang}</p>
                                <p>
                                    <strong>GitHub:</strong>{" "}
                                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                        View Repository
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewProjects;