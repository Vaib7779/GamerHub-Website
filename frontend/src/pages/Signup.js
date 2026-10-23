import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/signup.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/api/auth/signup`, {
        username,
        email,
        password
      });

      if (res.status === 200) {
        setMessage("✅ Signup successful!");
        setTimeout(() => navigate("/login"), 1000);
      }
    } catch (err) {
      console.error("Signup error:", err);
      if (err.response && err.response.data) {
        setMessage(err.response.data);
      } else {
        setMessage("❌ Error signing up");
      }
    }
  };

  return (
    <div
      className="signup-container"
      style={{
        backgroundImage: "url('/signup-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
      }}
    >
      <div className="signup-box">
        <h2>Gamers Hub</h2>
        <h2>Create Account</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <p>{message}</p>
        <button className="signup-button" onClick={() => navigate('/login')}>
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default Signup;