import React, { useState } from "react";
import {
  useGetFAQsQuery,
  useCreateFAQMutation,
  useUpdateFAQMutation,
  useDeleteFAQMutation,
} from "../../store/api";

const AdminFAQs = () => {
  const { data, isLoading } = useGetFAQsQuery();
  const [createFAQ] = useCreateFAQMutation();
  const [updateFAQ] = useUpdateFAQMutation();
  const [deleteFAQ] = useDeleteFAQMutation();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ question: "", answer: "", order: 0, isActive: true });
  const faqs = data?.data || [];

  const openCreate = () => {
    setForm({ question: "", answer: "", order: faqs.length + 1, isActive: true });
    setModal("create");
  };
  const openEdit = (f) => { setForm({ ...f }); setModal("edit"); };
  const handleSubmit = async () => {
    if (modal === "create") await createFAQ(form);
    else await updateFAQ({ id: form._id, ...form });
    setModal(null);
  };
  const handleDelete = async (id) => {
    if (confirm("Delete this FAQ?")) await deleteFAQ(id);
  };

  return (
    <div>
      <div className="admin-header-row">
        <h1 className="admin-page-title">FAQs</h1>
        <button className="admin-btn admin-btn-primary" onClick={openCreate}>+ Add FAQ</button>
      </div>

      <div className="admin-card">
        {isLoading ? (
          <p style={{ color: "#a3a3c2", padding: "20px" }}>Loading...</p>
        ) : faqs.length === 0 ? (
          <div className="empty-state"><p>No FAQs yet</p></div>
        ) : (
          <>
            {/* ── Desktop / Tablet Table ── */}
            <div className="admin-table-wrapper">
              <table className="admin-table admin-table--faqs">
                <thead>
                  <tr>
                    <th>Question</th>
                    <th>Order</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {faqs.map((f) => (
                    <tr key={f._id}>
                      <td style={{ maxWidth: 420, fontWeight: 500, color: "#fff" }}>{f.question}</td>
                      <td>{f.order}</td>
                      <td>
                        <span className={`admin-badge ${f.isActive ? "badge-active" : "badge-inactive"}`}>
                          {f.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="actions-cell">
                        <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => openEdit(f)}>Edit</button>
                        <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(f._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── Mobile Card View ── */}
            <div className="admin-mobile-list" style={{ padding: "12px" }}>
              {faqs.map((f) => (
                <div className="admin-mobile-card" key={f._id}>
                  <div className="amc-header">
                    <div className="amc-title" style={{ fontSize: "0.88rem" }}>{f.question}</div>
                    <span className={`admin-badge ${f.isActive ? "badge-active" : "badge-inactive"}`}>
                      {f.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="amc-row">
                    <span className="amc-label">Display Order</span>
                    <span className="amc-value">{f.order}</span>
                  </div>
                  <div className="amc-actions">
                    <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => openEdit(f)}>✏️ Edit</button>
                    <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(f._id)}>🗑 Delete</button>
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
            <h3>{modal === "create" ? "Add FAQ" : "Edit FAQ"}</h3>
            <div className="admin-form-group">
              <label>Question</label>
              <input className="admin-input" value={form.question}
                onChange={(e) => setForm({ ...form, question: e.target.value })} />
            </div>
            <div className="admin-form-group">
              <label>Answer</label>
              <textarea className="admin-textarea" value={form.answer}
                onChange={(e) => setForm({ ...form, answer: e.target.value })} />
            </div>
            <div className="admin-form-group">
              <label>Order</label>
              <input className="admin-input" type="number" value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
            </div>
            <div className="admin-form-group">
              <label>Status</label>
              <select className="admin-select" value={form.isActive ? "true" : "false"}
                onChange={(e) => setForm({ ...form, isActive: e.target.value === "true" })}>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
            <div className="admin-modal-actions">
              <button className="admin-btn" style={{ color: "#a3a3c2" }} onClick={() => setModal(null)}>Cancel</button>
              <button className="admin-btn admin-btn-primary" onClick={handleSubmit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFAQs;
