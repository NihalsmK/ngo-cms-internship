import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
// Role-based components (create empty ones first)
import DonorDonate from './components/donor/DonorDonate';
import DonorHistory from './components/donor/DonorHistory';
import AdminUsers from './components/admin/AdminUsers';
import AdminDonations from './components/admin/AdminDonations';
import VolunteerTasks from './components/volunteer/VolunteerTasks';
import VolunteerMyTasks from './components/volunteer/VolunteerMyTasks';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Role-based routes */}
        <Route path="/donor/donate" element={<DonorDonate />} />
        <Route path="/donor/history" element={<DonorHistory />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/donations" element={<AdminDonations />} />
        <Route path="/volunteer/tasks" element={<VolunteerTasks />} />
        <Route path="/volunteer/my-tasks" element={<VolunteerMyTasks />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
