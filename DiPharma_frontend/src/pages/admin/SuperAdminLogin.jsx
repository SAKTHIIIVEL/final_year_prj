import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSuperAdminLoginMutation } from "../../store/api";
import {
  setCredentials,
  setLoading,
  setError,
} from "../../store/slices/authSlice";
import "./AdminLogin.css";

const SuperAdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [superAdminLogin] = useSuperAdminLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading());
    try {
      const result = await superAdminLogin({ email, password }).unwrap();
      dispatch(setCredentials(result.data));
      navigate("/admin/dashboard");
    } catch (err) {
      dispatch(setError(err?.data?.error?.message || "Login failed"));
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-logo">DiPharma</h1>
            <p className="login-subtitle">Super Admin Portal</p>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-role-badge sa-badge">🔒 Super Admin</div>
            {error && <div className="login-error">{error}</div>}
            <div className="login-field">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter super admin email"
                required
              />
            </div>
            <div className="login-field">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter super admin password"
                required
              />
            </div>
            <button type="submit" className="login-submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLogin;
