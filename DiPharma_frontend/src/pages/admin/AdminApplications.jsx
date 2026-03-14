import React from "react";
import {
  useGetApplicationsQuery,
  useUpdateApplicationStatusMutation,
} from "../../store/api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AdminApplications = () => {
  const { data, isLoading } = useGetApplicationsQuery({});
  const [updateStatus] = useUpdateApplicationStatusMutation();
  const applications = data?.data || [];

  const handleStatus = async (id, status) => {
    await updateStatus({ id, status });
  };

  const downloadExcel = () => {
    const token = localStorage.getItem("dipharma_token");
    window.open(
      `${API_URL}/api/v1/applications/export/excel?token=${token}`,
      "_blank",
    );
  };

  return (
    <div>
      <div className="admin-header-row">
        <h1 className="admin-page-title">Applications</h1>
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
        ) : applications.length === 0 ? (
          <div className="empty-state">
            <p>No applications yet</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Position</th>
                <th>Resume</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((a) => (
                <tr key={a._id}>
                  <td>{a.name}</td>
                  <td>{a.email}</td>
                  <td>
                    {a.countryCode} {a.phone}
                  </td>
                  <td>{a.role}</td>
                  <td>
                    {a.resumePath ? (
                      <a
                        href={
                          a.resumePath.startsWith("http")
                            ? a.resumePath
                            : `${API_URL}/${a.resumePath}`
                        }
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "#4846FF" }}
                      >
                        View
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>
                    <span className={`admin-badge badge-${a.status}`}>
                      {a.status}
                    </span>
                  </td>
                  <td style={{ fontSize: "12px", color: "#a3a3c2" }}>
                    {new Date(a.createdAt).toLocaleDateString()}
                  </td>
                  <td className="actions-cell">
                    {a.status === "pending" && (
                      <button
                        className="admin-btn admin-btn-primary admin-btn-sm"
                        onClick={() => handleStatus(a._id, "reviewed")}
                      >
                        Review
                      </button>
                    )}
                    {a.status === "reviewed" && (
                      <>
                        <button
                          className="admin-btn admin-btn-success admin-btn-sm"
                          onClick={() => handleStatus(a._id, "shortlisted")}
                        >
                          Shortlist
                        </button>
                        <button
                          className="admin-btn admin-btn-danger admin-btn-sm"
                          onClick={() => handleStatus(a._id, "rejected")}
                        >
                          Reject
                        </button>
                      </>
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

export default AdminApplications;
