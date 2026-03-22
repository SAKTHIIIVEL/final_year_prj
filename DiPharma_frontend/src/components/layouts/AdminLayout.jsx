import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import "./AdminLayout.css";
import logo from "../../assets/brands/logo.png";
import ChatbotIcon from "../ChatbotIcon";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 900);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin } = useSelector((state) => state.auth);
  const isMobile = () => window.innerWidth <= 900;

  // Close sidebar on resize to tablet/mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) setSidebarOpen(true);
      else setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/login");
  };
  const handlelogoclick = () => {
    navigate("/");
  };

  // Close sidebar on nav click (mobile)
  const handleNavClick = () => {
    if (isMobile()) setSidebarOpen(false);
  };

  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/admin/products", label: "Products", icon: "📦" },
    { path: "/admin/services", label: "Services", icon: "🏥" },
    { path: "/admin/jobs", label: "Jobs", icon: "💼" },
    { path: "/admin/applications", label: "Applications", icon: "📝" },
    { path: "/admin/inquiries", label: "Inquiries", icon: "📬" },
    { path: "/admin/faqs", label: "FAQs", icon: "❓" },
    { path: "/admin/company-info", label: "Company Info", icon: "🤖" },
  ];

  return (
    <div className="admin-layout">
      {/* Mobile backdrop */}
      {sidebarOpen && isMobile() && (
        <div
          className="admin-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`admin-sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
        <div className="sidebar-header" onClick={handlelogoclick}>
          <img src={logo} alt="DiPharma" className="sidebar-logo-img" />
          <h2 className="sidebar-logo">DiPharma</h2>
          <span className="sidebar-badge">
            {admin?.role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
          </span>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
              onClick={handleNavClick}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="admin-info">
            <span className="admin-avatar">
              {admin?.name?.charAt(0) || "A"}
            </span>
            <div className="admin-details">
              <span className="admin-name">{admin?.name || "Admin"}</span>
              <span className="admin-role">
                {admin?.role?.replace("_", " ") || "Admin"}
              </span>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <header className="admin-topbar">
          <button
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <div className="topbar-right">
            <span className="welcome-text">
              Welcome, {admin?.name || "Admin"}
            </span>
          </div>
        </header>
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
      <ChatbotIcon />
    </div>
  );
};

export default AdminLayout;
