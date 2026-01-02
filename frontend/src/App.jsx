import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { loginUser, registerUser, me } from './api';
import './App.css';

const Home = () => (
  <div className="card">
    <h1 className="title">NGO CMS</h1>
    <p className="subtitle">
      Manage donors, volunteers and projects in one simple dashboard.
    </p>
    <ul className="feature-list">
      <li>Secure user registration and login.</li>
      <li>Role based dashboard view.</li>
      <li>Easy extension for donations and campaigns.</li>
    </ul>
  </div>
);

const Register = () => {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    password: '',
    role: 'donor',
  });
  const [msg, setMsg] = useState('');

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      await registerUser(form);
      setMsg('Registration successful. You can now login.');
    } catch (err) {
      setMsg('Registration failed. Try a different email.');
    }
  };

  return (
    <div className="card auth-card">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Full Name
          <input
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Role
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="donor">Donor</option>
            <option value="volunteer">Volunteer</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <button type="submit" className="btn primary">
          Create Account
        </button>
      </form>
      {msg && <p className="message">{msg}</p>}
    </div>
  );
};

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await loginUser(form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role || 'donor');
      setMsg('Logged in successfully. Go to Dashboard.');
    } catch {
      setMsg('Invalid email or password.');
    }
  };

  return (
    <div className="card auth-card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className="btn primary">
          Login
        </button>
      </form>
      {msg && <p className="message">{msg}</p>}
    </div>
  );
};

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMsg('Please login to view your dashboard.');
      return;
    }
    const load = async () => {
      try {
        const res = await me(token);
        setUser(res.data);
      } catch {
        setMsg('Session expired. Please login again.');
      }
    };
    load();
  }, []);

  if (msg) {
    return (
      <div className="card">
        <p className="message">{msg}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="card">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="card dashboard-card">
      <div className="dashboard-header">
        <h2>Welcome, {user.full_name}</h2>
        <span className={`badge role-${user.role}`}>{user.role}</span>
      </div>
      <p className="subtitle">{user.email}</p>
      <div className="dashboard-grid">
        <div className="dash-item">
          <h3>Profile</h3>
          <p>Manage your details and preferences.</p>
        </div>
        <div className="dash-item">
          <h3>Activities</h3>
          <p>View donations, volunteering or admin tasks.</p>
        </div>
        <div className="dash-item">
          <h3>Next Steps</h3>
          <p>Explore upcoming projects and campaigns.</p>
        </div>
      </div>
      <button
        className="btn secondary"
        onClick={() => {
          localStorage.clear();
          window.location.href = '/login';
        }}
      >
        Logout
      </button>
    </div>
  );
};

const App = () => (
  <Router>
    <div className="layout">
      <header className="header">
        <div className="logo">NGO CMS</div>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
      </header>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <footer className="footer">
        <span>© {new Date().getFullYear()} NGO CMS. All rights reserved.</span>
      </footer>
    </div>
  </Router>
);

export default App;
