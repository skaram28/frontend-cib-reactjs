import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ForgotPassword from "../auth/ForgetPassword";
import Home from "../layout/Home";
import Dashboard from "../pages/Dashboard";
import FundSelection from "../pages/FundSelection";
import Portfolio from "../pages/Portfolio";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected routes under Home layout */}
      <Route path="/" element={<Home />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="fund-selection" element={<FundSelection />} />
        <Route path="portfolio" element={<Portfolio />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
