import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactPage from "./pages/ContactPage";
import CareerPage from "./pages/CareerPage";
import "./App.css";
import NoPageAvailable from "./pages/NoPageAvailable";
import ServicePage from "./pages/ServicePage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import ProductsPage from "./pages/ProductsPage";
import AboutPage from "./pages/AboutPage";
import FlightTimeline from "./components/FlightTimeline";
import HomePage from "./pages/HomePage";
import GlobeSvg from "./components/GlobeSvg";
import ScrollToTop from "./components/ScrollToTop";

// Layouts
import PublicLayout from "./components/layouts/PublicLayout";
import AdminLayout from "./components/layouts/AdminLayout";
import SuperAdminLayout from "./components/layouts/SuperAdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import SuperAdminLogin from "./pages/admin/SuperAdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import SuperAdminDashboard from "./pages/admin/SuperAdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminServices from "./pages/admin/AdminServices";
import AdminJobs from "./pages/admin/AdminJobs";
import AdminApplications from "./pages/admin/AdminApplications";
import AdminInquiries from "./pages/admin/AdminInquiries";
import AdminFAQs from "./pages/admin/AdminFAQs";
import ManageAdmins from "./pages/admin/ManageAdmins";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* PUBLIC ROUTES — Header + Footer + ChatbotIcon via PublicLayout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/flight" element={<FlightTimeline />} />
          <Route path="/globe" element={<GlobeSvg />} />
          <Route path="*" element={<NoPageAvailable />} />
        </Route>

        {/* LOGIN PAGES — No layout wrapper */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/super-admin/login" element={<SuperAdminLogin />} />

        {/* ADMIN ROUTES — Protected + AdminLayout (regular admins) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/services" element={<AdminServices />} />
            <Route path="/admin/jobs" element={<AdminJobs />} />
            <Route path="/admin/applications" element={<AdminApplications />} />
            <Route path="/admin/inquiries" element={<AdminInquiries />} />
            <Route path="/admin/faqs" element={<AdminFAQs />} />
          </Route>
        </Route>

        {/* SUPER ADMIN ROUTES — Protected + SuperAdminLayout */}
        <Route element={<ProtectedRoute requiredRole="SUPER_ADMIN" />}>
          <Route element={<SuperAdminLayout />}>
            <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
            <Route path="/super-admin/manage-admins" element={<ManageAdmins />} />
            <Route path="/super-admin/products" element={<AdminProducts />} />
            <Route path="/super-admin/services" element={<AdminServices />} />
            <Route path="/super-admin/jobs" element={<AdminJobs />} />
            <Route path="/super-admin/applications" element={<AdminApplications />} />
            <Route path="/super-admin/inquiries" element={<AdminInquiries />} />
            <Route path="/super-admin/faqs" element={<AdminFAQs />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
