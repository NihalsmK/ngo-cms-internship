import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'https://ngo-cms-internship-production.up.railway.app';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/api/auth/login/`, {
        email,
        password,
      });

      setSuccess('Login successful! Redirecting...');
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      const msg = err.response?.data?.error || 'Login failed';
      setError(msg);
      console.error('Login error:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="login-link">
          Don&apos;t have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
