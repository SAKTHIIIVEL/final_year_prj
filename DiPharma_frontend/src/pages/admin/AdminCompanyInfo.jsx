import React, { useState } from "react";
import {
  useGetCompanyInfoQuery,
  useCreateCompanyInfoMutation,
  useUpdateCompanyInfoMutation,
  useDeleteCompanyInfoMutation,
} from "../../store/api";

const CATEGORIES = ["General", "Contact", "About", "Operations", "Products & Services", "Certifications", "Other"];

const emptyForm = {
  category: "General",
  question: "",
  keywords: "",
  answer: "",
  isActive: true,
  order: 0,
};

const AdminCompanyInfo = () => {
  const { data, isLoading, refetch } = useGetCompanyInfoQuery();
  const [createEntry] = useCreateCompanyInfoMutation();
  const [updateEntry] = useUpdateCompanyInfoMutation();
  const [deleteEntry] = useDeleteCompanyInfoMutation();

  const [modal, setModal] = useState(null); // "create" | "edit"
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [filterCat, setFilterCat] = useState("All");

  const entries = data?.data || [];
  const filtered = filterCat === "All" ? entries : entries.filter((e) => e.category === filterCat);

  const openCreate = () => {
    setForm({ ...emptyForm, order: entries.length + 1 });
    setModal("create");
  };
  const openEdit = (entry) => {
    setForm({ ...entry, keywords: Array.isArray(entry.keywords) ? entry.keywords.join(", ") : entry.keywords || "" });
    setModal("edit");
  };

  const handleSubmit = async () => {
    if (!form.question.trim() || !form.answer.trim()) { alert("Question and Answer are required."); return; }
    setSaving(true);
    try {
      if (modal === "create") await createEntry(form).unwrap();
      else await updateEntry({ id: form._id, ...form }).unwrap();
      setModal(null);
      refetch();
    } catch (err) {
      alert("Error saving: " + (err?.data?.error || err.message));
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this company info entry? The chatbot will no longer use it.")) return;
    await deleteEntry(id);
    refetch();
  };

  const uniqueCategories = ["All", ...new Set(entries.map((e) => e.category))];

  return (
    <div>
      {/* ── Header ── */}
      <div className="admin-header-row">
        <div>
          <h1 className="admin-page-title">🤖 Company Info (Chatbot Data)</h1>
          <p style={{ color: "#a3a3c2", fontSize: "0.82rem", margin: "4px 0 0" }}>
            These entries are used <strong style={{ color: "#c9c9f8" }}>exclusively by the chatbot</strong> to answer user questions. They do <em>not</em> appear on the public FAQ section.
          </p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openCreate}>+ Add Entry</button>
      </div>

      {/* ── Category Filter ── */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "14px" }}>
        {uniqueCategories.map((cat) => (
          <button key={cat} onClick={() => setFilterCat(cat)}
            style={{ padding: "5px 14px", borderRadius: "20px", cursor: "pointer", fontSize: "0.8rem", transition: "all 0.2s",
              border: `1px solid ${filterCat === cat ? "#4846ff" : "rgba(255,255,255,0.1)"}`,
              background: filterCat === cat ? "rgba(72,70,255,0.2)" : "transparent",
              color: filterCat === cat ? "#a8a6ff" : "#a3a3c2" }}>
            {cat}
          </button>
        ))}
      </div>

      {/* ── Info Box ── */}
      <div style={{ background: "rgba(72,70,255,0.07)", border: "1px solid rgba(72,70,255,0.25)",
        borderRadius: "10px", padding: "12px 16px", marginBottom: "14px", fontSize: "0.82rem",
        color: "#a3a3c2", lineHeight: "1.6" }}>
        <strong style={{ color: "#c9c9f8" }}>💡 How keywords work:</strong> Enter comma-separated trigger words.
        When a user types any of these words in the chat, this entry's answer is returned instantly.
        <br />
        <strong>Example:</strong> <code style={{ color: "#a8a6ff" }}>address, location, where are you, head office</code>
      </div>

      {/* ── Card ── */}
      <div className="admin-card">
        {isLoading ? (
          <p style={{ color: "#a3a3c2", padding: "20px" }}>Loading...</p>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <p>No entries yet. Click <strong>+ Add Entry</strong> to start feeding company data to the chatbot.</p>
          </div>
        ) : (
          <>
            {/* ── Desktop / Tablet Table ── */}
            <div className="admin-table-wrapper">
              <table className="admin-table admin-table--company">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Question / Topic</th>
                    <th>Keywords</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((entry) => (
                    <tr key={entry._id}>
                      <td>
                        <span style={{ background: "rgba(72,70,255,0.15)", color: "#a8a6ff",
                          padding: "3px 10px", borderRadius: "12px", fontSize: "0.78rem", whiteSpace: "nowrap" }}>
                          {entry.category}
                        </span>
                      </td>
                      <td style={{ maxWidth: 280 }}>
                        <div style={{ fontWeight: 500, color: "#e4e4f8", marginBottom: 3 }}>{entry.question}</div>
                        <div style={{ color: "#7c7ca8", fontSize: "0.78rem", overflow: "hidden",
                          textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 260 }}>{entry.answer}</div>
                      </td>
                      <td style={{ maxWidth: 220 }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                          {(entry.keywords || []).slice(0, 4).map((kw) => (
                            <span key={kw} style={{ background: "rgba(48,209,88,0.12)", color: "#30d158",
                              padding: "2px 8px", borderRadius: "10px", fontSize: "0.74rem" }}>{kw}</span>
                          ))}
                          {(entry.keywords || []).length > 4 && (
                            <span style={{ color: "#7c7ca8", fontSize: "0.74rem" }}>+{entry.keywords.length - 4} more</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className={`admin-badge ${entry.isActive ? "badge-active" : "badge-inactive"}`}>
                          {entry.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="actions-cell">
                        <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => openEdit(entry)}>Edit</button>
                        <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(entry._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── Mobile Card View ── */}
            <div className="admin-mobile-list" style={{ padding: "12px" }}>
              {filtered.map((entry) => (
                <div className="admin-mobile-card" key={entry._id}>
                  <div className="amc-header">
                    <div>
                      <div className="amc-title" style={{ fontSize: "0.9rem" }}>{entry.question}</div>
                      <div className="amc-subtitle">{entry.category}</div>
                    </div>
                    <span className={`admin-badge ${entry.isActive ? "badge-active" : "badge-inactive"}`}>
                      {entry.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="amc-row">
                    <span className="amc-label">Answer</span>
                    <span className="amc-value" style={{ WebkitLineClamp: 2, display: "-webkit-box",
                      WebkitBoxOrient: "vertical", overflow: "hidden" }}>{entry.answer}</span>
                  </div>
                  <div className="amc-row">
                    <span className="amc-label">Keywords</span>
                    <span className="amc-value">
                      {(entry.keywords || []).slice(0, 3).join(", ")}
                      {(entry.keywords || []).length > 3 && " ..."}
                    </span>
                  </div>
                  <div className="amc-actions">
                    <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => openEdit(entry)}>✏️ Edit</button>
                    <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(entry._id)}>🗑 Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Modal ── */}
      {modal && (
        <div className="admin-modal-overlay" onClick={() => setModal(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "560px", width: "100%" }}>
            <h3>{modal === "create" ? "➕ Add Company Info" : "✏️ Edit Company Info"}</h3>

            <div className="admin-form-group">
              <label>Category</label>
              <select className="admin-input" value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="admin-form-group">
              <label>Question / Topic <span style={{ color: "#ff6b6b" }}>*</span></label>
              <input className="admin-input" placeholder="e.g. Where is DiPharma located?"
                value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} />
            </div>

            <div className="admin-form-group">
              <label>Keywords <span style={{ color: "#a3a3c2", fontWeight: 400, fontSize: "0.78rem" }}>
                (comma-separated trigger words)</span></label>
              <input className="admin-input" placeholder="e.g. address, location, where are you, head office"
                value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })} />
            </div>

            <div className="admin-form-group">
              <label>Answer <span style={{ color: "#ff6b6b" }}>*</span></label>
              <textarea className="admin-textarea" style={{ minHeight: "110px" }}
                placeholder="e.g. Our headquarters is at 123 Pharma Street, Chennai, Tamil Nadu - 600001."
                value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} />
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <div className="admin-form-group" style={{ flex: 1 }}>
                <label>Order</label>
                <input className="admin-input" type="number" value={form.order}
                  onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
              </div>
              <div className="admin-form-group" style={{ flex: 1 }}>
                <label>Status</label>
                <select className="admin-input" value={form.isActive ? "true" : "false"}
                  onChange={(e) => setForm({ ...form, isActive: e.target.value === "true" })}>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>

            <div className="admin-modal-actions">
              <button className="admin-btn" style={{ color: "#a3a3c2" }} onClick={() => setModal(null)}>Cancel</button>
              <button className="admin-btn admin-btn-primary" onClick={handleSubmit} disabled={saving}>
                {saving ? "Saving..." : "Save Entry"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCompanyInfo;
