import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header d-flex justify-content-between">
          <h3>Welcome, {user?.full_name}</h3>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
        <div className="card-body">
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {user?.role}</p>
          <hr />
          <h5>NGO Portal</h5>
          <p>Access to all features based on your role.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
