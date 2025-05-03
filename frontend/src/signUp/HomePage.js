import React from "react";
import "./HomePage.css"; 

const HomePage = ({ user }) => {
  return (
    <div className="card">
      <h1>Welcome, {user.name}!</h1>
      <p>You are successfully logged in.</p>
    </div>
  );
};

export default HomePage;