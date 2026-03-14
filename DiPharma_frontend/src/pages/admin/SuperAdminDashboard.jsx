import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetSuperAdminDashboardStatsQuery } from "../../store/api";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import "./SuperAdminDashboard.css";

const COLORS = ["#a78bfa", "#34d399", "#38bdf8", "#fb923c", "#f472b6", "#facc15", "#4ade80", "#c084fc"];

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return `${d.getDate()}/${d.getMonth() + 1}`;
};

const formatFullDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "rgba(13, 15, 54, 0.95)", border: "1px solid rgba(167, 139, 250, 0.3)",
      borderRadius: "10px", padding: "10px 14px", color: "#e4e4f8", fontSize: "0.82rem",
    }}>
      <p style={{ margin: 0, fontWeight: 600, marginBottom: 4 }}>{formatFullDate(label)}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ margin: 0, color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
};

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetSuperAdminDashboardStatsQuery(undefined, {
    pollingInterval: 60000,
  });
  const stats = data?.data;

  if (isLoading) {
    return (
      <div className="sa-loading">
        <div className="sa-loading-spinner" />
        Loading analytics...
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="sa-loading">
        <p>No analytics data available.</p>
      </div>
    );
  }

  const { overview, inquiryAnalytics, applicationAnalytics, chatbotAnalytics, recentActivity } = stats;

  const overviewCards = [
    { label: "Total Inquiries", value: overview.totalInquiries, icon: "📬", link: "/super-admin/inquiries" },
    { label: "Total Applications", value: overview.totalApplications, icon: "📝", link: "/super-admin/applications" },
    { label: "Chatbot Messages", value: overview.totalChatbotMessages, icon: "🤖", link: null },
    { label: "Active Admins", value: overview.totalAdmins, icon: "🛡️", link: "/super-admin/manage-admins" },
    { label: "Active Jobs", value: overview.activeJobs, icon: "💼", link: "/super-admin/jobs" },
    { label: "Products", value: overview.totalProducts, icon: "📦", link: "/super-admin/products" },
    { label: "Services", value: overview.totalServices, icon: "🏥", link: "/super-admin/services" },
    { label: "FAQs", value: overview.totalFaqs, icon: "❓", link: "/super-admin/faqs" },
  ];

  // Prepare pie chart data for application status
  const appStatusData = Object.entries(applicationAnalytics.statusBreakdown || {}).map(
    ([name, value]) => ({ name, value })
  );

  // Inquiry status breakdown
  const inqStatusData = Object.entries(inquiryAnalytics.statusBreakdown || {}).map(
    ([name, value]) => ({ name, value })
  );

  return (
    <div className="sa-dashboard">
      <h1 className="sa-dashboard-title">Super Admin Analytics</h1>
      <p className="sa-dashboard-subtitle">
        Real-time insights into user interactions, applications, and chatbot engagement
      </p>

      {/* ── Overview Cards ── */}
      <div className="sa-overview-grid">
        {overviewCards.map((card) => (
          <div
            className={`sa-overview-card ${card.link ? "clickable" : ""}`}
            key={card.label}
            onClick={() => card.link && navigate(card.link)}
          >
            <div className="sa-card-icon">{card.icon}</div>
            <div className="sa-card-value">{card.value}</div>
            <div className="sa-card-label">{card.label}</div>
            {card.link && <span className="sa-card-arrow">→</span>}
          </div>
        ))}
      </div>

      {/* ── Inquiry Trend + Application Trend ── */}
      <div className="sa-charts-row">
        <div className="sa-chart-card">
          <div className="sa-chart-title">
            <span className="sa-chart-title-icon">📬</span>
            Contact Inquiries (Last 30 Days)
          </div>
          {inquiryAnalytics.dailyTrend?.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={inquiryAnalytics.dailyTrend}>
                <defs>
                  <linearGradient id="inquiryGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" tickFormatter={formatDate} tick={{ fill: "#6868a0", fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fill: "#6868a0", fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="count" name="Inquiries" stroke="#a78bfa" fill="url(#inquiryGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="sa-empty-chart">No data yet</div>
          )}
        </div>

        <div className="sa-chart-card">
          <div className="sa-chart-title">
            <span className="sa-chart-title-icon">📝</span>
            Job Applications (Last 30 Days)
          </div>
          {applicationAnalytics.dailyTrend?.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={applicationAnalytics.dailyTrend}>
                <defs>
                  <linearGradient id="appGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" tickFormatter={formatDate} tick={{ fill: "#6868a0", fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fill: "#6868a0", fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="count" name="Applications" stroke="#34d399" fill="url(#appGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="sa-empty-chart">No data yet</div>
          )}
        </div>
      </div>

      {/* ── Status Breakdowns (Pie Charts) + Chatbot Trend ── */}
      <div className="sa-charts-row">
        <div className="sa-chart-card">
          <div className="sa-chart-title">
            <span className="sa-chart-title-icon">📊</span>
            Application Status Pipeline
          </div>
          {appStatusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={appStatusData} dataKey="value" nameKey="name"
                  cx="50%" cy="50%" outerRadius={90} innerRadius={45}
                  paddingAngle={3} label={({ name, value }) => `${name}: ${value}`}
                >
                  {appStatusData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ color: "#a3a3c2", fontSize: "0.8rem" }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="sa-empty-chart">No applications yet</div>
          )}
        </div>

        <div className="sa-chart-card">
          <div className="sa-chart-title">
            <span className="sa-chart-title-icon">🤖</span>
            Chatbot Interactions (Last 30 Days)
          </div>
          {chatbotAnalytics.dailyTrend?.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={chatbotAnalytics.dailyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" tickFormatter={formatDate} tick={{ fill: "#6868a0", fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fill: "#6868a0", fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="count" name="Messages" stroke="#38bdf8" strokeWidth={2} dot={{ fill: "#38bdf8", r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="sa-empty-chart">No chatbot data yet</div>
          )}
        </div>
      </div>

      {/* ── Applications by Role + Inquiry Status ── */}
      <div className="sa-breakdown-grid">
        <div className="sa-chart-card">
          <div className="sa-chart-title">
            <span className="sa-chart-title-icon">💼</span>
            Applications by Role
          </div>
          {applicationAnalytics.roleBreakdown?.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={applicationAnalytics.roleBreakdown} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" allowDecimals={false} tick={{ fill: "#6868a0", fontSize: 11 }} />
                <YAxis
                  type="category" dataKey="role" width={120}
                  tick={{ fill: "#a3a3c2", fontSize: 11 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Applications" radius={[0, 6, 6, 0]}>
                  {applicationAnalytics.roleBreakdown.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="sa-empty-chart">No roles data</div>
          )}
        </div>

        <div className="sa-chart-card">
          <div className="sa-chart-title">
            <span className="sa-chart-title-icon">📬</span>
            Inquiry Status Breakdown
          </div>
          {inqStatusData.length > 0 ? (
            <>
              {inqStatusData.map((item) => (
                <div className="sa-breakdown-item" key={item.name}>
                  <span className="sa-breakdown-label">{item.name}</span>
                  <span className="sa-breakdown-value">{item.value}</span>
                </div>
              ))}
              <div style={{ marginTop: 16 }}>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie
                      data={inqStatusData} dataKey="value" nameKey="name"
                      cx="50%" cy="50%" outerRadius={60} innerRadius={30}
                      paddingAngle={3}
                    >
                      {inqStatusData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <div className="sa-empty-chart">No inquiry data</div>
          )}
        </div>
      </div>

      {/* ── Recent Activity Feed ── */}
      <div className="sa-recent-row">
        <div className="sa-recent-card">
          <div className="sa-recent-title">
            <span>📬</span> Latest Inquiries
          </div>
          {recentActivity.inquiries?.length > 0 ? (
            <ul className="sa-recent-list">
              {recentActivity.inquiries.map((inq) => (
                <li className="sa-recent-item" key={inq._id}>
                  <div className="sa-recent-info">
                    <span className="sa-recent-name">
                      {inq.firstName} {inq.lastName}
                    </span>
                    <span className="sa-recent-meta">{inq.subject}</span>
                  </div>
                  <div className="sa-recent-right">
                    <span className={`sa-badge sa-badge-${inq.status}`}>
                      {inq.status}
                    </span>
                    <span className="sa-recent-date">
                      {formatFullDate(inq.createdAt)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="sa-empty-chart">No inquiries yet</div>
          )}
        </div>

        <div className="sa-recent-card">
          <div className="sa-recent-title">
            <span>📝</span> Latest Applications
          </div>
          {recentActivity.applications?.length > 0 ? (
            <ul className="sa-recent-list">
              {recentActivity.applications.map((app) => (
                <li className="sa-recent-item" key={app._id}>
                  <div className="sa-recent-info">
                    <span className="sa-recent-name">{app.name}</span>
                    <span className="sa-recent-meta">{app.role}</span>
                  </div>
                  <div className="sa-recent-right">
                    <span className={`sa-badge sa-badge-${app.status}`}>
                      {app.status}
                    </span>
                    <span className="sa-recent-date">
                      {formatFullDate(app.createdAt)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="sa-empty-chart">No applications yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
