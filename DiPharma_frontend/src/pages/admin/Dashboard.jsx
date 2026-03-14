import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetDashboardStatsQuery } from "../../store/api";
import {
  PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const COLORS = ["#4846ff", "#ff9f0a", "#30d158", "#ff3b30", "#0a84ff", "#bf5af2"];

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return `${d.getDate()}/${d.getMonth() + 1}`;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "rgba(13, 15, 54, 0.95)", border: "1px solid rgba(72, 70, 255, 0.3)",
      borderRadius: "10px", padding: "10px 14px", color: "#e4e4f8", fontSize: "0.82rem",
    }}>
      <p style={{ margin: 0, fontWeight: 600, marginBottom: 4 }}>{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ margin: 0, color: entry.color }}>{entry.name}: {entry.value}</p>
      ))}
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetDashboardStatsQuery();
  const stats = data?.data || {};

  const cards = [
    { label: "Total Applications", value: stats.totalApplications || 0, icon: "📝", color: "#4846FF", link: "/admin/applications" },
    { label: "Pending Applications", value: stats.pendingApplications || 0, icon: "⏳", color: "#ff9f0a", link: "/admin/applications" },
    { label: "Total Inquiries", value: stats.totalInquiries || 0, icon: "📬", color: "#0a84ff", link: "/admin/inquiries" },
    { label: "Unread Inquiries", value: stats.unreadInquiries || 0, icon: "🔔", color: "#ff3b30", link: "/admin/inquiries" },
    { label: "Active Jobs", value: stats.activeJobs || 0, icon: "💼", color: "#30d158", link: "/admin/jobs" },
    { label: "Products", value: stats.totalProducts || 0, icon: "📦", color: "#bf5af2", link: "/admin/products" },
    { label: "Services", value: stats.totalServices || 0, icon: "🏥", color: "#64d2ff", link: "/admin/services" },
    { label: "FAQs", value: stats.totalFaqs || 0, icon: "❓", color: "#ff9f0a", link: "/admin/faqs" },
  ];

  // Pie chart data
  const inqStatusData = Object.entries(stats.inquiryStatusBreakdown || {}).map(([name, value]) => ({ name, value }));
  const appStatusData = Object.entries(stats.applicationStatusBreakdown || {}).map(([name, value]) => ({ name, value }));

  return (
    <div>
      <h1 className="admin-page-title">Dashboard</h1>
      {isLoading ? (
        <p style={{ color: "#a3a3c2" }}>Loading stats...</p>
      ) : (
        <>
          {/* ── Stat Cards ── */}
          <div className="stats-grid">
            {cards.map((card) => (
              <div
                className="stat-card stat-card-clickable"
                key={card.label}
                onClick={() => navigate(card.link)}
              >
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>{card.icon}</div>
                <div className="stat-number" style={{ color: card.color }}>{card.value}</div>
                <div className="stat-label">{card.label}</div>
                <span className="stat-card-arrow">→</span>
              </div>
            ))}
          </div>

          {/* ── Charts Row ── */}
          <div className="admin-charts-row">
            {/* Inquiry Status Pie */}
            <div className="admin-chart-card">
              <h3 className="admin-chart-title">📬 Inquiry Status</h3>
              {inqStatusData.length > 0 ? (
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie data={inqStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={40} paddingAngle={3} label={({ name, value }) => `${name}: ${value}`}>
                      {inqStatusData.map((_, i) => (<Cell key={i} fill={COLORS[i % COLORS.length]} />))}
                    </Pie>
                    <Tooltip />
                    <Legend wrapperStyle={{ color: "#a3a3c2", fontSize: "0.8rem" }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="admin-chart-empty">No inquiry data yet</div>
              )}
            </div>

            {/* Application Status Pie */}
            <div className="admin-chart-card">
              <h3 className="admin-chart-title">📝 Application Status</h3>
              {appStatusData.length > 0 ? (
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie data={appStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={40} paddingAngle={3} label={({ name, value }) => `${name}: ${value}`}>
                      {appStatusData.map((_, i) => (<Cell key={i} fill={COLORS[i % COLORS.length]} />))}
                    </Pie>
                    <Tooltip />
                    <Legend wrapperStyle={{ color: "#a3a3c2", fontSize: "0.8rem" }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="admin-chart-empty">No application data yet</div>
              )}
            </div>
          </div>

          {/* ── Trend Charts ── */}
          <div className="admin-charts-row">
            <div className="admin-chart-card">
              <h3 className="admin-chart-title">📬 Inquiries (Last 30 Days)</h3>
              {stats.dailyInquiries?.length > 0 ? (
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={stats.dailyInquiries}>
                    <defs>
                      <linearGradient id="inqGradAdmin" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0a84ff" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#0a84ff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="date" tickFormatter={formatDate} tick={{ fill: "#6868a0", fontSize: 11 }} />
                    <YAxis allowDecimals={false} tick={{ fill: "#6868a0", fontSize: 11 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="count" name="Inquiries" stroke="#0a84ff" fill="url(#inqGradAdmin)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="admin-chart-empty">No data yet</div>
              )}
            </div>

            <div className="admin-chart-card">
              <h3 className="admin-chart-title">📝 Applications (Last 30 Days)</h3>
              {stats.dailyApplications?.length > 0 ? (
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={stats.dailyApplications}>
                    <defs>
                      <linearGradient id="appGradAdmin" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#30d158" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#30d158" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="date" tickFormatter={formatDate} tick={{ fill: "#6868a0", fontSize: 11 }} />
                    <YAxis allowDecimals={false} tick={{ fill: "#6868a0", fontSize: 11 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="count" name="Applications" stroke="#30d158" fill="url(#appGradAdmin)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="admin-chart-empty">No data yet</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
