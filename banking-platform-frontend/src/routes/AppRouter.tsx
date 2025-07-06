import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ForgetPassword from "../auth/ForgetPassword"; // ✅ as per your file name
import Home from "../layout/Home";
import Dashboard from "../pages/Dashboard";
import FundSelection from "../pages/FundSelection";
import Portfolio from "../pages/Portfolio";
import KYCSubmission from "../pages/KYCSubmission";
import AdminDashboard from "../pages/AdminDashboard"; // ✅ Admin dashboard

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {/*  Public routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route path="/kyc-submission" element={<KYCSubmission />} />

      {/*  User protected routes under Home layout */}
      <Route path="/" element={<Home />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="fund-selection" element={<FundSelection />} />
        <Route path="portfolio" element={<Portfolio />} />
      </Route>

      {/*  Admin dashboard route */}
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
