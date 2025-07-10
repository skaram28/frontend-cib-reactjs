import React from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Box,
  Typography,
  Divider,
  Avatar,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  TrendingUp as FundIcon,
  AccountBalance as PortfolioIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  drawerWidth?: number;
}

const Sidebar: React.FC<SidebarProps> = ({ drawerWidth = 260 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const navItems: NavItem[] = [
    { 
      label: "Dashboard", 
      path: "/dashboard", 
      icon: <DashboardIcon /> 
    },
    { 
      label: "Fund Selection", 
      path: "/fund-selection", 
      icon: <FundIcon /> 
    },
    { 
      label: "Portfolio/Transactions", 
      path: "/portfolio", 
      icon: <PortfolioIcon /> 
    },
  ];

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: `linear-gradient(180deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          color: theme.palette.primary.contrastText,
          borderRight: 'none',
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <Toolbar />
      
      {/* User Profile Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
          pb: 2,
        }}
      >
        <Avatar
          sx={{
            width: 60,
            height: 60,
            mb: 2,
            bgcolor: alpha(theme.palette.common.white, 0.2),
            border: `2px solid ${alpha(theme.palette.common.white, 0.3)}`,
          }}
        >
          <PersonIcon sx={{ fontSize: 30 }} />
        </Avatar>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            textAlign: 'center',
            color: theme.palette.common.white,
          }}
        >
          Welcome Back
        </Typography>
        <Typography
          variant="body2"
          sx={{
            opacity: 0.8,
            textAlign: 'center',
            color: theme.palette.common.white,
          }}
        >
          Investment Portfolio
        </Typography>
      </Box>

      <Divider 
        sx={{ 
          mx: 2, 
          mb: 2,
          bgcolor: alpha(theme.palette.common.white, 0.2),
        }} 
      />

      {/* Navigation Items */}
      <List sx={{ px: 2 }}>
        {navItems.map((item: NavItem) => (
          <ListItemButton
            key={item.label}
            onClick={() => navigate(item.path)}
            sx={{
              mb: 1,
              borderRadius: 3,
              minHeight: 48,
              backgroundColor: isActive(item.path) 
                ? alpha(theme.palette.common.white, 0.15)
                : 'transparent',
              color: theme.palette.common.white,
              '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.1),
                transform: 'translateX(4px)',
                transition: 'all 0.2s ease-in-out',
              },
              '&.Mui-selected': {
                backgroundColor: alpha(theme.palette.common.white, 0.2),
              },
              transition: 'all 0.2s ease-in-out',
            }}
            selected={isActive(item.path)}
          >
            <ListItemIcon
              sx={{
                color: 'inherit',
                minWidth: 40,
                '& .MuiSvgIcon-root': {
                  fontSize: 22,
                },
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              sx={{
                '& .MuiListItemText-primary': {
                  fontWeight: isActive(item.path) ? 600 : 400,
                  fontSize: '0.95rem',
                },
              }}
            />
          </ListItemButton>
        ))}
      </List>

      {/* Footer Section */}
      <Box
        sx={{
          mt: 'auto',
          p: 2,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            opacity: 0.6,
            color: theme.palette.common.white,
          }}
        >
          © 2025 Investment Dashboard
        </Typography>
      </Box>
    </Drawer>
  );
};

export default Sidebar;