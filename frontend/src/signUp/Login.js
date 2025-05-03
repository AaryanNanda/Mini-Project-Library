import React, { useState } from "react";
import './login.css';

const Login = ({ setPage, setUser }) => {
  const [usn, setUsn] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.usn === usn && storedUser.password === password) {
      setUser(storedUser);
      setPage("home");
    } else {
      setError("Invalid Credentials");
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-container">
          <label>USN No</label>
          <input 
            type="text" 
            value={usn} 
            onChange={(e) => setUsn(e.target.value.toUpperCase())} 
            required 
          />
        </div>

        <div className="input-container">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        {error && <div className="error">{error}</div>}

        <button type="submit">Login</button>
      </form>

      <p>Don't have an account? <button className="link-btn" onClick={() => setPage("signup")}>Create here</button></p>
    </div>
  );
};

export default Login;
