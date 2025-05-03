import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectForm from './ProjectForm';
import ViewProjects from './ViewProjects';
import './App.css';

function AddProject() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ViewProjects />} />
                <Route path="/view-projects" element={<ViewProjects />} />
                <Route path="/add-project" element={<ProjectForm />} />
                <Route path="*" element={
                    <div style={{ padding: '40px', textAlign: 'center' }}>
                        <h2>404: Page Not Found</h2>
                        <p>The page you're looking for doesn't exist.</p>
                    </div>
                } />
            </Routes>
        </Router>
    );
}

export default AddProject;