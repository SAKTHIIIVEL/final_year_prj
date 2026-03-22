import React from "react";
import {
  useGetInquiriesQuery,
  useUpdateInquiryStatusMutation,
} from "../../store/api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AdminInquiries = () => {
  const { data, isLoading } = useGetInquiriesQuery({});
  const [updateStatus] = useUpdateInquiryStatusMutation();
  const inquiries = data?.data || [];

  const handleStatus = async (id, status) => {
    await updateStatus({ id, status });
  };

  const downloadExcel = () => {
    const token = localStorage.getItem("dipharma_token");
    window.open(`${API_URL}/api/v1/inquiries/export/excel?token=${token}`, "_blank");
  };

  return (
    <div>
      <div className="admin-header-row">
        <h1 className="admin-page-title">Contact Inquiries</h1>
        <button className="admin-btn admin-btn-success excel-btn" onClick={downloadExcel}>
          📥 Download Excel
        </button>
      </div>

      <div className="admin-card">
        {isLoading ? (
          <p style={{ color: "#a3a3c2", padding: "20px" }}>Loading...</p>
        ) : inquiries.length === 0 ? (
          <div className="empty-state"><p>No inquiries yet</p></div>
        ) : (
          <>
            {/* ── Desktop / Tablet Table ── */}
            <div className="admin-table-wrapper">
              <table className="admin-table admin-table--inquiries">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inq) => (
                    <tr key={inq._id}>
                      <td style={{ fontWeight: 600, color: "#fff", whiteSpace: "nowrap" }}>
                        {inq.firstName} {inq.lastName}
                      </td>
                      <td style={{ color: "#a3a3c2" }}>{inq.email}</td>
                      <td style={{ maxWidth: 140 }}>{inq.subject}</td>
                      <td style={{ maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {inq.message}
                      </td>
                      <td><span className={`admin-badge badge-${inq.status}`}>{inq.status}</span></td>
                      <td style={{ fontSize: "12px", color: "#a3a3c2", whiteSpace: "nowrap" }}>
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </td>
                      <td className="actions-cell">
                        {inq.status === "unread" && (
                          <button className="admin-btn admin-btn-primary admin-btn-sm"
                            onClick={() => handleStatus(inq._id, "read")}>Mark Read</button>
                        )}
                        {inq.status === "read" && (
                          <button className="admin-btn admin-btn-success admin-btn-sm"
                            onClick={() => handleStatus(inq._id, "resolved")}>Resolve</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── Mobile Card View ── */}
            <div className="admin-mobile-list" style={{ padding: "12px" }}>
              {inquiries.map((inq) => (
                <div className="admin-mobile-card" key={inq._id}>
                  <div className="amc-header">
                    <div>
                      <div className="amc-title">{inq.firstName} {inq.lastName}</div>
                      <div className="amc-subtitle">{inq.subject}</div>
                    </div>
                    <span className={`admin-badge badge-${inq.status}`}>{inq.status}</span>
                  </div>
                  <div className="amc-row">
                    <span className="amc-label">Email</span>
                    <span className="amc-value">{inq.email}</span>
                  </div>
                  <div className="amc-row">
                    <span className="amc-label">Message</span>
                    <span className="amc-value" style={{ WebkitLineClamp: 2, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {inq.message}
                    </span>
                  </div>
                  <div className="amc-row">
                    <span className="amc-label">Date</span>
                    <span className="amc-value">{new Date(inq.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="amc-actions">
                    {inq.status === "unread" && (
                      <button className="admin-btn admin-btn-primary admin-btn-sm"
                        onClick={() => handleStatus(inq._id, "read")}>Mark Read</button>
                    )}
                    {inq.status === "read" && (
                      <button className="admin-btn admin-btn-success admin-btn-sm"
                        onClick={() => handleStatus(inq._id, "resolved")}>✓ Resolve</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminInquiries;
