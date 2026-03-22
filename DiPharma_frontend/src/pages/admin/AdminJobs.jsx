import React, { useState } from "react";
import {
  useGetJobsQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} from "../../store/api";

const AdminJobs = () => {
  const { data, isLoading } = useGetJobsQuery();
  const [createJob] = useCreateJobMutation();
  const [updateJob] = useUpdateJobMutation();
  const [deleteJob] = useDeleteJobMutation();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({
    title: "",
    roleFocus: "",
    location: "",
    type: "Full Time",
    isActive: true,
  });
  const jobs = data?.data || [];

  const openCreate = () => {
    setForm({
      title: "",
      roleFocus: "",
      location: "",
      type: "Full Time",
      isActive: true,
    });
    setModal("create");
  };
  const openEdit = (j) => {
    setForm({ ...j });
    setModal("edit");
  };

  const handleSubmit = async () => {
    if (modal === "create") await createJob(form);
    else await updateJob({ id: form._id, ...form });
    setModal(null);
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this job?")) await deleteJob(id);
  };
  const toggleActive = async (j) => {
    await updateJob({ id: j._id, isActive: !j.isActive });
  };

  return (
    <div>
      <div className="admin-header-row">
        <h1 className="admin-page-title">Jobs</h1>
        <button className="admin-btn admin-btn-primary" onClick={openCreate}>
          + Add Job
        </button>
      </div>
      <div className="admin-card">
        {isLoading ? (
          <p style={{ color: "#a3a3c2", padding: "20px" }}>Loading...</p>
        ) : jobs.length === 0 ? (
          <div className="empty-state"><p>No jobs yet</p></div>
        ) : (
          <>
            {/* ── Desktop / Tablet Table ── */}
            <div className="admin-table-wrapper">
              <table className="admin-table admin-table--jobs">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((j) => (
                    <tr key={j._id}>
                      <td style={{ fontWeight: 600, color: "#fff" }}>{j.title}</td>
                      <td style={{ color: "#a3a3c2" }}>{j.location}</td>
                      <td>{j.type}</td>
                      <td><span className={`admin-badge ${j.isActive ? "badge-active" : "badge-inactive"}`}>
                        {j.isActive ? "Active" : "Inactive"}
                      </span></td>
                      <td className="actions-cell">
                        <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => openEdit(j)}>Edit</button>
                        <button className={`admin-btn admin-btn-sm ${j.isActive ? "admin-btn-danger" : "admin-btn-success"}`}
                          onClick={() => toggleActive(j)}>{j.isActive ? "Deactivate" : "Activate"}</button>
                        <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(j._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── Mobile Card View ── */}
            <div className="admin-mobile-list" style={{ padding: "12px" }}>
              {jobs.map((j) => (
                <div className="admin-mobile-card" key={j._id}>
                  <div className="amc-header">
                    <div>
                      <div className="amc-title">{j.title}</div>
                      <div className="amc-subtitle">{j.location} · {j.type}</div>
                    </div>
                    <span className={`admin-badge ${j.isActive ? "badge-active" : "badge-inactive"}`}>
                      {j.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="amc-actions">
                    <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => openEdit(j)}>✏️ Edit</button>
                    <button className={`admin-btn admin-btn-sm ${j.isActive ? "admin-btn-danger" : "admin-btn-success"}`}
                      onClick={() => toggleActive(j)}>{j.isActive ? "Deactivate" : "Activate"}</button>
                    <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(j._id)}>🗑 Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {modal && (
        <div className="admin-modal-overlay" onClick={() => setModal(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{modal === "create" ? "Add Job" : "Edit Job"}</h3>
            <div className="admin-form-group">
              <label>Title</label>
              <input
                className="admin-input"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="admin-form-group">
              <label>Role Focus</label>
              <textarea
                className="admin-textarea"
                value={form.roleFocus}
                onChange={(e) =>
                  setForm({ ...form, roleFocus: e.target.value })
                }
              />
            </div>
            <div className="admin-form-group">
              <label>Location</label>
              <input
                className="admin-input"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>
            <div className="admin-form-group">
              <label>Type</label>
              <select
                className="admin-select"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>
            <div className="admin-modal-actions">
              <button
                className="admin-btn"
                style={{ color: "#a3a3c2" }}
                onClick={() => setModal(null)}
              >
                Cancel
              </button>
              <button
                className="admin-btn admin-btn-primary"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminJobs;
