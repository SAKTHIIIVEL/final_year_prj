import React from "react";
import { useGetDashboardStatsQuery } from "../../store/api";

const Dashboard = () => {
  const { data, isLoading } = useGetDashboardStatsQuery();
  const stats = data?.data || {};

  const cards = [
    {
      label: "Total Applications",
      value: stats.totalApplications || 0,
      icon: "📝",
      color: "#4846FF",
    },
    {
      label: "Pending Applications",
      value: stats.pendingApplications || 0,
      icon: "⏳",
      color: "#ff9f0a",
    },
    {
      label: "Total Inquiries",
      value: stats.totalInquiries || 0,
      icon: "📬",
      color: "#0a84ff",
    },
    {
      label: "Unread Inquiries",
      value: stats.unreadInquiries || 0,
      icon: "🔔",
      color: "#ff3b30",
    },
    {
      label: "Active Jobs",
      value: stats.activeJobs || 0,
      icon: "💼",
      color: "#30d158",
    },
    {
      label: "Products",
      value: stats.totalProducts || 0,
      icon: "📦",
      color: "#bf5af2",
    },
    {
      label: "Services",
      value: stats.totalServices || 0,
      icon: "🏥",
      color: "#64d2ff",
    },
    {
      label: "FAQs",
      value: stats.totalFaqs || 0,
      icon: "❓",
      color: "#ff9f0a",
    },
  ];

  return (
    <div>
      <h1 className="admin-page-title">Dashboard</h1>
      {isLoading ? (
        <p style={{ color: "#a3a3c2" }}>Loading stats...</p>
      ) : (
        <div className="stats-grid">
          {cards.map((card) => (
            <div className="stat-card" key={card.label}>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>
                {card.icon}
              </div>
              <div className="stat-number" style={{ color: card.color }}>
                {card.value}
              </div>
              <div className="stat-label">{card.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
