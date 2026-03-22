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

  const resumeUrl = (a) =>
    a.resumePath
      ? a.resumePath.startsWith("http")
        ? a.resumePath
        : `${API_URL}/${a.resumePath}`
      : null;

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
          <p style={{ color: "#a3a3c2", padding: "20px" }}>Loading...</p>
        ) : applications.length === 0 ? (
          <div className="empty-state">
            <p>No applications yet</p>
          </div>
        ) : (
          <>
            {/* ── Desktop / Tablet Table ── */}
            <div className="admin-table-wrapper">
              <table className="admin-table admin-table--applications">
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
                      <td style={{ fontWeight: 600, color: "#fff" }}>
                        {a.name}
                      </td>
                      <td style={{ color: "#a3a3c2" }}>{a.email}</td>
                      <td style={{ whiteSpace: "nowrap" }}>
                        {a.countryCode} {a.phone}
                      </td>
                      <td style={{ maxWidth: 160 }}>{a.role}</td>
                      <td>
                        {resumeUrl(a) ? (
                          <a
                            href={resumeUrl(a)}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: "#4846FF", fontWeight: 500 }}
                          >
                            View
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td>
                        <span className={`admin-badge badge-${a.status}`}>
                          {a.status}
                        </span>
                      </td>
                      <td
                        style={{
                          fontSize: "12px",
                          color: "#a3a3c2",
                          whiteSpace: "nowrap",
                        }}
                      >
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
                        {a.status === "shortlisted" && (
                          <button
                            onClick={() => {
                              window.open(
                                `https://mail.google.com/mail/?view=cm&fs=1&to=${a.email}&su=${encodeURIComponent(
                                  `Regarding Your Application – ${a.role}`,
                                )}&body=${encodeURIComponent(
                                  `Hi ${a.name},

                                    We would like to get in touch with you regarding your application for the ${a.role} position.

                                    Please let us know your availability.

                                    Best regards,
                                    HR Team – DiPharma`,
                                )}`,
                                "_blank",
                              );
                            }}
                            className="admin-btn admin-btn-sm"
                            style={{
                              background: "rgba(72,70,255,0.12)",
                              color: "#a8a6ff",
                              border: "1px solid rgba(72,70,255,0.25)",
                              cursor: "pointer",
                            }}
                          >
                            ✉ Email
                          </button>
                        )}
                        {a.status === "rejected" && (
                          <a
                            className="admin-btn admin-btn-sm"
                            style={{
                              background: "rgba(72,70,255,0.12)",
                              color: "#a8a6ff",
                              border: "1px solid rgba(72,70,255,0.25)",
                              textDecoration: "none",
                            }}
                          >
                            Rejected
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── Mobile Card View ── */}
            <div className="admin-mobile-list" style={{ padding: "12px" }}>
              {applications.map((a) => (
                <div className="admin-mobile-card" key={a._id}>
                  <div className="amc-header">
                    <div>
                      <div className="amc-title">{a.name}</div>
                      <div className="amc-subtitle">{a.role}</div>
                    </div>
                    <span className={`admin-badge badge-${a.status}`}>
                      {a.status}
                    </span>
                  </div>
                  <div className="amc-row">
                    <span className="amc-label">Email</span>
                    <span className="amc-value">{a.email}</span>
                  </div>
                  <div className="amc-row">
                    <span className="amc-label">Phone</span>
                    <span className="amc-value">
                      {a.countryCode} {a.phone}
                    </span>
                  </div>
                  <div className="amc-row">
                    <span className="amc-label">Resume</span>
                    <span className="amc-value">
                      {resumeUrl(a) ? (
                        <a
                          href={resumeUrl(a)}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: "#4846FF" }}
                        >
                          View Resume
                        </a>
                      ) : (
                        "—"
                      )}
                    </span>
                  </div>
                  <div className="amc-row">
                    <span className="amc-label">Date</span>
                    <span className="amc-value">
                      {new Date(a.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="amc-actions">
                    {a.status === "pending" && (
                      <button
                        className="admin-btn admin-btn-primary admin-btn-sm"
                        onClick={() => handleStatus(a._id, "reviewed")}
                      >
                        ✓ Review
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
                    {a.status === "shortlisted" && (
                      <a
                        href={`mailto:${a.email}?subject=Regarding Your Application – ${encodeURIComponent(a.role)}&body=Hi ${encodeURIComponent(a.name)},%0D%0A%0D%0APlease let us know your availability for the next steps.%0D%0A%0D%0AHR Team – DiPharma`}
                        className="admin-btn admin-btn-sm"
                        style={{
                          background: "rgba(72,70,255,0.12)",
                          color: "#a8a6ff",
                          border: "1px solid rgba(72,70,255,0.25)",
                          textDecoration: "none",
                        }}
                      >
                        ✉ Email
                      </a>
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

export default AdminApplications;
