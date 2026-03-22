import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import "./SuperAdminLayout.css";
import logo from "../../assets/brands/logo.png";
import ChatbotIcon from "../ChatbotIcon";

const SuperAdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 900);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin } = useSelector((state) => state.auth);
  const isMobile = () => window.innerWidth <= 900;

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
    navigate("/super-admin/login");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleNavClick = () => {
    if (isMobile()) setSidebarOpen(false);
  };

  const navItems = [
    { path: "/super-admin/dashboard", label: "Analytics Dashboard", icon: "📊" },
    { path: "/super-admin/manage-admins", label: "Manage Admins", icon: "🛡️" },
    { path: "/super-admin/products", label: "Products", icon: "📦" },
    { path: "/super-admin/services", label: "Services", icon: "🏥" },
    { path: "/super-admin/jobs", label: "Jobs", icon: "💼" },
    { path: "/super-admin/applications", label: "Applications", icon: "📝" },
    { path: "/super-admin/inquiries", label: "Inquiries", icon: "📬" },
    { path: "/super-admin/faqs", label: "FAQs", icon: "❓" },
    { path: "/super-admin/company-info", label: "Company Info", icon: "🤖" },
  ];

  return (
    <div className="sa-layout">
      {/* Mobile backdrop */}
      {sidebarOpen && isMobile() && (
        <div
          className="sa-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sa-sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
        <div className="sa-sidebar-header" onClick={handleLogoClick}>
          <img src={logo} alt="DiPharma" className="sa-sidebar-logo-img" />
          <h2 className="sa-sidebar-logo-text">DiPharma</h2>
          <span className="sa-sidebar-badge">Super Admin</span>
        </div>
        <nav className="sa-sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sa-sidebar-link ${isActive ? "active" : ""}`
              }
              onClick={handleNavClick}
            >
              <span className="sa-sidebar-icon">{item.icon}</span>
              <span className="sa-sidebar-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sa-sidebar-footer">
          <div className="sa-admin-info">
            <span className="sa-admin-avatar">
              {admin?.name?.charAt(0) || "S"}
            </span>
            <div className="sa-admin-details">
              <span className="sa-admin-name">{admin?.name || "Super Admin"}</span>
              <span className="sa-admin-role">Super Admin</span>
            </div>
          </div>
          <button className="sa-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>
      <main className="sa-main">
        <header className="sa-topbar">
          <button
            className="sa-menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <div className="sa-topbar-right">
            <span className="sa-welcome-text">
              Welcome, <strong>{admin?.name || "Super Admin"}</strong>
            </span>
          </div>
        </header>
        <div className="sa-content">
          <Outlet />
        </div>
      </main>
      <ChatbotIcon />
    </div>
  );
};

export default SuperAdminLayout;
