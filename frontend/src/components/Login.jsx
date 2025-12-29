import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/api/auth/login/", {
        email,
        password,
      });

      const data = res.data;

      // Normalize what we store, so Dashboard can rely on these keys
      const user = {
        full_name: data.full_name || data.fullname || "",
        email: data.email || email,
        role: data.role || "", // "donor", "volunteer", "admin"
        token: data.token || data.access || "",
      };

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", user.token);

      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);

      let msg = "Login failed";
      const d = err.response?.data;

      if (d && typeof d === "object") {
        msg = d.detail || d.error || msg;
      }

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="john@example.com"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Your password"
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="register-link">
          Don’t have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
