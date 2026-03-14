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
    window.open(
      `${API_URL}/api/v1/inquiries/export/excel?token=${token}`,
      "_blank",
    );
  };

  return (
    <div>
      <div className="admin-header-row">
        <h1 className="admin-page-title">Contact Inquiries</h1>
        <button
          className="admin-btn admin-btn-success excel-btn"
          onClick={downloadExcel}
        >
          📥 Download Excel
        </button>
      </div>
      <div className="admin-card">
        {isLoading ? (
          <p style={{ color: "#a3a3c2" }}>Loading...</p>
        ) : inquiries.length === 0 ? (
          <div className="empty-state">
            <p>No inquiries yet</p>
          </div>
        ) : (
          <table className="admin-table">
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
                  <td>
                    {inq.firstName} {inq.lastName}
                  </td>
                  <td>{inq.email}</td>
                  <td>{inq.subject}</td>
                  <td
                    style={{
                      maxWidth: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {inq.message}
                  </td>
                  <td>
                    <span className={`admin-badge badge-${inq.status}`}>
                      {inq.status}
                    </span>
                  </td>
                  <td style={{ fontSize: "12px", color: "#a3a3c2" }}>
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </td>
                  <td className="actions-cell">
                    {inq.status === "unread" && (
                      <button
                        className="admin-btn admin-btn-primary admin-btn-sm"
                        onClick={() => handleStatus(inq._id, "read")}
                      >
                        Mark Read
                      </button>
                    )}
                    {inq.status === "read" && (
                      <button
                        className="admin-btn admin-btn-success admin-btn-sm"
                        onClick={() => handleStatus(inq._id, "resolved")}
                      >
                        Resolve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminInquiries;
