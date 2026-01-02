import React, { useEffect, useState } from 'react';
import { me } from '../api';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMsg('Please log in to view the dashboard.');
      return;
    }
    const load = async () => {
      try {
        const res = await me(token);
        setUser(res.data);
      } catch {
        setMsg('Session expired. Please log in again.');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
      }
    };
    load();
  }, []);

  if (msg) return <p>{msg}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>User Dashboard</h2>
      <p>Name: {user.full_name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = '/';
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
