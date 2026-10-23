import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/api/auth/login`, {
        username,
        password,
      });

      if (res.data.success) {
        setMessage("✅ Login successful!");

        // ✅ Save user info for Profile.js
        localStorage.setItem('userInfo', JSON.stringify({
          username: res.data.username,
          email: res.data.email,
        }));

        // ✅ Save logged-in user for Cart.js
        localStorage.setItem('loggedInUser', res.data.username);

        // ✅ Redirect once
        navigate('/home');
      } else {
        setMessage('❌ Invalid credentials');
      }
    } catch (err) {
      setMessage('❌ Error logging in');
    }
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: "url('/gaming-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
      }}
    >
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>{message}</p>
        <button className="signup-button" onClick={() => navigate('/signup')}>
          Create Account
        </button>
      </div>
    </div>
  );
}

export default Login;