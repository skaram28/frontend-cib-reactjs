import { Box, CssBaseline } from "@mui/material";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
//  import { Logout } from "@mui/icons-material";

const Home = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#f5f7fa",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Home;
