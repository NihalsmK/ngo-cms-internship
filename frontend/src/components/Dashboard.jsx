import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      navigate("/login");
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      setUser(parsed);
    } catch {
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const displayRole =
    user?.role === "donor"
      ? "Donor"
      : user?.role === "volunteer"
      ? "Volunteer"
      : user?.role === "admin"
      ? "Admin"
      : user?.role || "—";

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header d-flex justify-content-between">
          <h3>Welcome, {user?.full_name || "User"}</h3>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="card-body">
          <p>
            <strong>Email:</strong> {user?.email || "—"}
          </p>
          <p>
            <strong>Role:</strong> {displayRole}
          </p>
          <hr />
          <h5>NGO Portal</h5>
          <p>Access to all features based on your role.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
