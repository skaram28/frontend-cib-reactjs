import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ForgetPassword from "../auth/ForgetPassword";
import Home from "../layout/Home";
import Dashboard from "../pages/Dashboard";
import FundSelection from "../pages/FundSelection";
import Portfolio from "../pages/Portfolio";
import KycSubmission from "../pages/KycSubmission"; // ✅ updated casing to match file
import KycConfirmation from "../pages/KycConfirmation";
import KycStatus from "../pages/KycStatus";
import AdminDashboard from "../pages/AdminDashboard";
import Logout from "../auth/Logout";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      {/* KYC flow routes */}
      <Route path="/kyc-submission" element={<KycSubmission />} />{" "}
      {/* ✅ updated */}
      <Route path="/kyc-confirmation" element={<KycConfirmation />} />
      <Route path="/kyc-status" element={<KycStatus />} />
      {/* User protected routes under Home layout */}
      <Route path="/" element={<Home />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="fund-selection" element={<FundSelection />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="logout" element={<Home />} />
      </Route>
      {/* Admin dashboard route */}
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
