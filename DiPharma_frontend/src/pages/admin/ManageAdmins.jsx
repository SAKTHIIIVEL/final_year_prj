import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useCreateAdminMutation } from "../../store/api";
import Swal from "sweetalert2";
import "./ManageAdmins.css";

const ManageAdmins = () => {
  const { admin } = useSelector((state) => state.auth);
  const [createAdmin, { isLoading }] = useCreateAdminMutation();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

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
      Swal.fire({
        icon: "success",
        title: "Admin Created!",
        text: `${form.name} (${form.email}) can now login at /admin/login`,
        confirmButtonColor: "#4846FF",
        background: "#0d0f36",
        color: "#fff",
      });
      setForm({ name: "", email: "", password: "" });
      setErrors({});
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err?.data?.error?.message || "Could not create admin",
        confirmButtonColor: "#d33",
        background: "#0d0f36",
        color: "#fff",
      });
    }
  };

  return (
    <div className="ma-page">
      <h1 className="ma-title">Manage Admins</h1>
      <p className="ma-subtitle">
        Create new admin accounts that can access the admin panel at{" "}
        <code>/admin/login</code>
      </p>

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
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Minimum 6 characters"
            />
            {errors.password && (
              <span className="ma-error">{errors.password}</span>
            )}
          </div>
          <button type="submit" className="ma-submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Admin Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageAdmins;
