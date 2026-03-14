import React, { useState, useRef } from "react";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUploadImageMutation,
} from "../../store/api";

const AdminProducts = () => {
  const { data, isLoading } = useGetProductsQuery();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [uploadImage] = useUploadImageMutation();
  const [modal, setModal] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    cardType: "dark",
    order: 0,
    isActive: true,
  });
  const products = data?.data || [];

  const openCreate = () => {
    setForm({
      title: "",
      description: "",
      image: "",
      cardType: "dark",
      order: products.length + 1,
      isActive: true,
    });
    setModal("create");
  };
  const openEdit = (p) => {
    setForm({ ...p });
    setModal("edit");
  };

  const handleSubmit = async () => {
    if (modal === "create") await createProduct(form);
    else await updateProduct({ id: form._id, ...form });
    setModal(null);
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this product?")) await deleteProduct(id);
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("image", file);
    setUploading(true);
    try {
      const result = await uploadImage(fd).unwrap();
      setForm({ ...form, image: result.data.url });
    } catch (err) {
      alert("Upload failed: " + (err?.data?.error?.message || "Unknown error"));
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <div className="admin-header-row">
        <h1 className="admin-page-title">Products</h1>
        <button className="admin-btn admin-btn-primary" onClick={openCreate}>
          + Add Product
        </button>
      </div>
      <div className="admin-card">
        {isLoading ? (
          <p style={{ color: "#a3a3c2" }}>Loading...</p>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <p>No products yet</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Type</th>
                <th>Order</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.title}
                        style={{
                          width: 50,
                          height: 35,
                          objectFit: "cover",
                          borderRadius: 6,
                        }}
                      />
                    ) : (
                      <span style={{ color: "#555", fontSize: 12 }}>
                        No image
                      </span>
                    )}
                  </td>
                  <td>{p.title}</td>
                  <td>
                    <span
                      className="admin-badge"
                      style={{
                        background:
                          p.cardType === "dark"
                            ? "rgba(72,70,255,0.15)"
                            : "rgba(217,217,217,0.15)",
                        color: p.cardType === "dark" ? "#4846FF" : "#D9D9D9",
                      }}
                    >
                      {p.cardType}
                    </span>
                  </td>
                  <td>{p.order}</td>
                  <td>
                    <span
                      className={`admin-badge ${p.isActive ? "badge-active" : "badge-inactive"}`}
                    >
                      {p.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button
                      className="admin-btn admin-btn-primary admin-btn-sm"
                      onClick={() => openEdit(p)}
                    >
                      Edit
                    </button>
                    <button
                      className="admin-btn admin-btn-danger admin-btn-sm"
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modal && (
        <div className="admin-modal-overlay" onClick={() => setModal(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{modal === "create" ? "Add Product" : "Edit Product"}</h3>
            <div className="admin-form-group">
              <label>Title</label>
              <input
                className="admin-input"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="admin-form-group">
              <label>Description</label>
              <textarea
                className="admin-textarea"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
            <div className="admin-form-group">
              <label>Product Image</label>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  className="admin-input"
                  style={{ flex: 1 }}
                  value={form.image || ""}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="Image URL (or use Import)"
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImport}
                  style={{ display: "none" }}
                />
                <button
                  type="button"
                  className="admin-btn admin-btn-primary"
                  style={{ whiteSpace: "nowrap" }}
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "📁 Import"}
                </button>
              </div>
              {form.image && (
                <img
                  src={form.image}
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
            <div className="admin-form-group">
              <label>Card Type</label>
              <select
                className="admin-select"
                value={form.cardType}
                onChange={(e) => setForm({ ...form, cardType: e.target.value })}
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>
            <div className="admin-form-group">
              <label>Order</label>
              <input
                className="admin-input"
                type="number"
                value={form.order}
                onChange={(e) =>
                  setForm({ ...form, order: Number(e.target.value) })
                }
              />
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

export default AdminProducts;
