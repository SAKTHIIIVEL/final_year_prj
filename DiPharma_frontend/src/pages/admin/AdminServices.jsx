import React, { useState, useRef } from "react";
import {
  useGetAdminServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useUploadImageMutation,
} from "../../store/api";

const emptyForm = {
  title: "",
  slug: "",
  shortDescription: "",
  fullDescription: "",
  heroImage: "",
  overviewImage: "",
  featureImage: "",
  benefitImage1: "",
  benefitImage2: "",
  features: [{ title: "", description: "" }],
  benefits: [{ title: "", description: "" }],
  isActive: true,
};

const AdminServices = () => {
  const { data, isLoading } = useGetAdminServicesQuery();
  const [createService] = useCreateServiceMutation();
  const [updateService] = useUpdateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();
  const [uploadImage] = useUploadImageMutation();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState({});
  const refs = {
    heroImage: useRef(null),
    overviewImage: useRef(null),
    featureImage: useRef(null),
    benefitImage1: useRef(null),
    benefitImage2: useRef(null),
  };
  const services = data?.data || [];

  const openCreate = () => {
    setForm({
      ...emptyForm,
      features: [{ title: "", description: "" }],
      benefits: [{ title: "", description: "" }],
    });
    setModal("create");
  };
  const openEdit = (s) => {
    setForm({
      ...s,
      heroImage: s.heroImage || "",
      overviewImage: s.overviewImage || "",
      featureImage: s.featureImage || "",
      benefitImage1: s.benefitImage1 || "",
      benefitImage2: s.benefitImage2 || "",
      features: s.features?.length
        ? s.features
        : [{ title: "", description: "" }],
      benefits: s.benefits?.length
        ? s.benefits
        : [{ title: "", description: "" }],
    });
    setModal("edit");
  };

  const updateList = (field, index, key, value) => {
    const list = [...form[field]];
    list[index] = { ...list[index], [key]: value };
    setForm({ ...form, [field]: list });
  };
  const addListItem = (field) =>
    setForm({
      ...form,
      [field]: [...form[field], { title: "", description: "" }],
    });
  const removeListItem = (field, index) => {
    const list = form[field].filter((_, i) => i !== index);
    setForm({
      ...form,
      [field]: list.length ? list : [{ title: "", description: "" }],
    });
  };

  const handleImport = async (field) => {
    const ref = refs[field];
    const file = ref.current?.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("image", file);
    setUploading((p) => ({ ...p, [field]: true }));
    try {
      const result = await uploadImage(fd).unwrap();
      setForm((f) => ({ ...f, [field]: result.data.url }));
    } catch (err) {
      alert("Upload failed: " + (err?.data?.error?.message || "Unknown error"));
    } finally {
      setUploading((p) => ({ ...p, [field]: false }));
      if (ref.current) ref.current.value = "";
    }
  };

  const handleSubmit = async () => {
    const payload = {
      ...form,
      features: form.features.filter((f) => f.title),
      benefits: form.benefits.filter((b) => b.title),
    };
    if (modal === "create") await createService(payload);
    else await updateService({ id: form._id, ...payload });
    setModal(null);
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this service?")) await deleteService(id);
  };

  const ImageField = ({ label, field }) => (
    <div className="admin-form-group">
      <label>{label}</label>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          className="admin-input"
          style={{ flex: 1 }}
          value={form[field] || ""}
          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          placeholder="Image URL (or use Import)"
        />
        <input
          type="file"
          ref={refs[field]}
          accept="image/*"
          style={{ display: "none" }}
          onChange={() => handleImport(field)}
        />
        <button
          type="button"
          className="admin-btn admin-btn-primary"
          style={{ whiteSpace: "nowrap" }}
          onClick={() => refs[field].current?.click()}
          disabled={uploading[field]}
        >
          {uploading[field] ? "Uploading..." : "📁 Import"}
        </button>
      </div>
      {form[field] && (
        <img
          src={form[field]}
          alt="Preview"
          style={{
            marginTop: 10,
            width: 160,
            height: 80,
            objectFit: "cover",
            borderRadius: 10,
            border: "1px solid rgba(72,70,255,0.2)",
          }}
        />
      )}
    </div>
  );

  return (
    <div>
      <div className="admin-header-row">
        <h1 className="admin-page-title">Services</h1>
        <button className="admin-btn admin-btn-primary" onClick={openCreate}>
          + Add Service
        </button>
      </div>
      <div className="admin-card">
        {isLoading ? (
          <p style={{ color: "#a3a3c2", padding: "20px" }}>Loading...</p>
        ) : services.length === 0 ? (
          <div className="empty-state"><p>No services yet</p></div>
        ) : (
          <>
            {/* ── Desktop / Tablet Table ── */}
            <div className="admin-table-wrapper">
              <table className="admin-table admin-table--services">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Slug</th>
                    <th>Features</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((s) => (
                    <tr key={s._id}>
                      <td style={{ fontWeight: 600, color: "#fff" }}>{s.title}</td>
                      <td style={{ fontFamily: "monospace", fontSize: "12px", color: "#a3a3c2" }}>{s.slug}</td>
                      <td>{s.features?.length || 0}</td>
                      <td><span className={`admin-badge ${s.isActive ? "badge-active" : "badge-inactive"}`}>
                        {s.isActive ? "Active" : "Inactive"}
                      </span></td>
                      <td className="actions-cell">
                        <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => openEdit(s)}>Edit</button>
                        <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(s._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── Mobile Card View ── */}
            <div className="admin-mobile-list" style={{ padding: "12px" }}>
              {services.map((s) => (
                <div className="admin-mobile-card" key={s._id}>
                  <div className="amc-header">
                    <div>
                      <div className="amc-title">{s.title}</div>
                      <div className="amc-subtitle" style={{ fontFamily: "monospace", fontSize: "0.72rem" }}>{s.slug}</div>
                    </div>
                    <span className={`admin-badge ${s.isActive ? "badge-active" : "badge-inactive"}`}>
                      {s.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="amc-row">
                    <span className="amc-label">Features</span>
                    <span className="amc-value">{s.features?.length || 0} items</span>
                  </div>
                  <div className="amc-actions">
                    <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => openEdit(s)}>✏️ Edit</button>
                    <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(s._id)}>🗑 Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {modal && (
        <div className="admin-modal-overlay" onClick={() => setModal(null)}>
          <div
            className="admin-modal"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "640px" }}
          >
            <h3>{modal === "create" ? "Add Service" : "Edit Service"}</h3>
            <div className="admin-form-group">
              <label>Title</label>
              <input
                className="admin-input"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="admin-form-group">
              <label>Slug (URL path)</label>
              <input
                className="admin-input"
                value={form.slug}
                onChange={(e) =>
                  setForm({
                    ...form,
                    slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                  })
                }
                placeholder="e.g. di-laboratory"
              />
            </div>
            <div className="admin-form-group">
              <label>Short Description</label>
              <textarea
                className="admin-textarea"
                value={form.shortDescription}
                onChange={(e) =>
                  setForm({ ...form, shortDescription: e.target.value })
                }
              />
            </div>
            <div className="admin-form-group">
              <label>Full Description</label>
              <textarea
                className="admin-textarea"
                style={{ minHeight: "120px" }}
                value={form.fullDescription}
                onChange={(e) =>
                  setForm({ ...form, fullDescription: e.target.value })
                }
              />
            </div>

            <ImageField label="Hero Image (top banner)" field="heroImage" />
            <ImageField
              label="Overview Image (description section)"
              field="overviewImage"
            />
            <ImageField
              label="Feature Image (beside features)"
              field="featureImage"
            />
            <ImageField
              label="Benefit Image 1 (left side)"
              field="benefitImage1"
            />
            <ImageField
              label="Benefit Image 2 (right side)"
              field="benefitImage2"
            />

            <div className="admin-form-group">
              <label>Features</label>
              {form.features.map((f, i) => (
                <div
                  key={i}
                  style={{ display: "flex", gap: "8px", marginBottom: "8px" }}
                >
                  <input
                    className="admin-input"
                    placeholder="Feature title"
                    value={f.title}
                    onChange={(e) =>
                      updateList("features", i, "title", e.target.value)
                    }
                    style={{ flex: 1 }}
                  />
                  <input
                    className="admin-input"
                    placeholder="Description"
                    value={f.description}
                    onChange={(e) =>
                      updateList("features", i, "description", e.target.value)
                    }
                    style={{ flex: 2 }}
                  />
                  <button
                    className="admin-btn admin-btn-danger admin-btn-sm"
                    onClick={() => removeListItem("features", i)}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                className="admin-btn admin-btn-sm"
                style={{ color: "#4846FF" }}
                onClick={() => addListItem("features")}
              >
                + Add Feature
              </button>
            </div>

            <div className="admin-form-group">
              <label>Benefits</label>
              {form.benefits.map((b, i) => (
                <div
                  key={i}
                  style={{ display: "flex", gap: "8px", marginBottom: "8px" }}
                >
                  <input
                    className="admin-input"
                    placeholder="Benefit title"
                    value={b.title}
                    onChange={(e) =>
                      updateList("benefits", i, "title", e.target.value)
                    }
                    style={{ flex: 1 }}
                  />
                  <input
                    className="admin-input"
                    placeholder="Description"
                    value={b.description}
                    onChange={(e) =>
                      updateList("benefits", i, "description", e.target.value)
                    }
                    style={{ flex: 2 }}
                  />
                  <button
                    className="admin-btn admin-btn-danger admin-btn-sm"
                    onClick={() => removeListItem("benefits", i)}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                className="admin-btn admin-btn-sm"
                style={{ color: "#4846FF" }}
                onClick={() => addListItem("benefits")}
              >
                + Add Benefit
              </button>
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

export default AdminServices;
