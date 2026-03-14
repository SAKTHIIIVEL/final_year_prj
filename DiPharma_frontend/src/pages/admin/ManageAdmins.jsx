import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useCreateAdminMutation, useGetAdminsQuery, useDeleteAdminMutation } from "../../store/api";
import "./ManageAdmins.css";

const ManageAdmins = () => {
  const { admin } = useSelector((state) => state.auth);
  const [createAdmin, { isLoading }] = useCreateAdminMutation();
  const { data: adminsData, isLoading: adminsLoading } = useGetAdminsQuery();
  const [deleteAdmin] = useDeleteAdminMutation();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState({});
  const [showFormPassword, setShowFormPassword] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  if (admin?.role !== "SUPER_ADMIN") {
    return (
      <div className="ma-page">
        <div className="ma-denied">
          <h2>🔒 Access Denied</h2>
          <p>Only Super Admins can manage admin accounts.</p>
        </div>
      </div>
    );
  }

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 3)
      e.name = "Name must be at least 3 characters";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (form.password.length < 6)
      e.password = "Password must be at least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await createAdmin(form).unwrap();
      showSuccess(`✅ Admin "${form.name}" created! Welcome email sent to ${form.email}`);
      setForm({ name: "", email: "", password: "" });
      setErrors({});
    } catch (err) {
      setErrors({ submit: err?.data?.error?.message || "Could not create admin" });
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteAdmin(deleteTarget._id).unwrap();
      setDeleteTarget(null);
      showSuccess(`🗑️ Admin "${deleteTarget.name}" deleted successfully`);
    } catch (err) {
      setDeleteTarget(null);
      setErrors({ submit: err?.data?.error?.message || "Could not delete admin" });
    }
  };

  const togglePassword = (id) => {
    setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const admins = adminsData?.data || [];

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="ma-page">
      <h1 className="ma-title">Manage Admins</h1>
      <p className="ma-subtitle">
        Create new admin accounts and manage existing ones
      </p>

      {successMsg && <div className="ma-success">{successMsg}</div>}
      {errors.submit && <div className="ma-submit-error">{errors.submit}</div>}

      {/* ── Create Admin Form ── */}
      <div className="ma-form-card">
        <h2 className="ma-form-heading">Create New Admin</h2>
        <form onSubmit={handleSubmit} className="ma-form">
          <div className="ma-field">
            <label>Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. John Doe"
            />
            {errors.name && <span className="ma-error">{errors.name}</span>}
          </div>
          <div className="ma-field">
            <label>Email Address</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="e.g. admin@dipharma.com"
            />
            {errors.email && <span className="ma-error">{errors.email}</span>}
          </div>
          <div className="ma-field">
            <label>Password</label>
            <div className="ma-password-wrapper">
              <input
                type={showFormPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Minimum 6 characters"
              />
              <button
                type="button"
                className="ma-eye-btn"
                onClick={() => setShowFormPassword(!showFormPassword)}
              >
                {showFormPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && (
              <span className="ma-error">{errors.password}</span>
            )}
          </div>
          <button type="submit" className="ma-submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Admin Account"}
          </button>
        </form>
      </div>

      {/* ── Admin List ── */}
      <div className="ma-list-card">
        <h2 className="ma-form-heading">Admin Accounts</h2>
        {adminsLoading ? (
          <p className="ma-loading">Loading admins...</p>
        ) : admins.length === 0 ? (
          <p className="ma-loading">No admin accounts created yet.</p>
        ) : (
          <div className="ma-table-wrapper">
            <table className="ma-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((a) => (
                  <tr key={a._id}>
                    <td>
                      <div className="ma-admin-name">
                        <span className="ma-admin-avatar">
                          {a.name?.charAt(0) || "A"}
                        </span>
                        {a.name}
                      </div>
                    </td>
                    <td>{a.email}</td>
                    <td>
                      <div className="ma-password-cell">
                        <span className="ma-password-text">
                          {showPasswords[a._id]
                            ? a.displayPassword || "N/A"
                            : "••••••"}
                        </span>
                        <button
                          className="ma-eye-btn-small"
                          onClick={() => togglePassword(a._id)}
                          title={
                            showPasswords[a._id]
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showPasswords[a._id] ? "🙈" : "👁️"}
                        </button>
                      </div>
                    </td>
                    <td>{formatDate(a.createdAt)}</td>
                    <td>
                      <button
                        className="ma-delete-btn"
                        onClick={() => setDeleteTarget(a)}
                        title="Delete admin"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Themed Delete Confirmation Dialog ── */}
      {deleteTarget && (
        <div className="ma-dialog-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="ma-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="ma-dialog-icon">🗑️</div>
            <h3 className="ma-dialog-title">Delete Admin</h3>
            <p className="ma-dialog-text">
              Are you sure you want to delete <strong>{deleteTarget.name}</strong> ({deleteTarget.email})?
              This action cannot be undone.
            </p>
            <div className="ma-dialog-actions">
              <button
                className="ma-dialog-cancel"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>
              <button
                className="ma-dialog-confirm"
                onClick={handleDelete}
              >
                Delete Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAdmins;
