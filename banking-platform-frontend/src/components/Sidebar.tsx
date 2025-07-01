import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Fund Selection", path: "/fund-selection" }, // ✅ updated path and label spacing
    { label: "Portfolio/Transactions", path: "/portfolio" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{ width: 220, [`& .MuiDrawer-paper`]: { width: 220 } }}
    >
      <Toolbar />
      <List>
        {navItems.map((item) => (
          <ListItemButton key={item.label} onClick={() => navigate(item.path)}>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
