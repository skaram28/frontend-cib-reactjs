import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Avatar, 
  Chip,
  LinearProgress,
  IconButton,
  Tooltip,
  Divider
} from "@mui/material";
import { useEffect, useState } from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SecurityIcon from "@mui/icons-material/Security";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import TimelineIcon from "@mui/icons-material/Timeline";
import dashboardData from "../data/dashboard.json";

interface DashboardData {
  totalInvestment: number;
  returnsThisYear: number;
  activeFunds: number;
  riskProfile: string;
  recentTransactions: string[];
}

const Dashboard = () => {
  const [userName, setUserName] = useState<string>("");
  const [data, setData] = useState<DashboardData | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      const userData = JSON.parse(user);
      setUserName(userData.username);
    }
    setData(dashboardData as DashboardData);
    
    // Update time every minute
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleViewTransactions = () => {
    // Navigate to transactions page
    console.log("Navigating to transactions page");
  };

  const getRiskProfileColor = (profile: string) => {
    switch (profile.toLowerCase()) {
      case 'low': return '#4caf50';
      case 'medium': return '#ff9800';
      case 'high': return '#f44336';
      default: return '#2196f3';
    }
  };

  const getRiskProfileIcon = (profile: string) => {
    switch (profile.toLowerCase()) {
      case 'low': return '🛡️';
      case 'medium': return '⚖️';
      case 'high': return '⚡';
      default: return '📊';
    }
  };

  if (!data) return null;

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      p: 3
    }}>
      {/* Header Section */}
      <Box sx={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
        mb: 4 
      }}>
        <Box>
          <Typography 
            variant="h3" 
            sx={{ 
              color: "white", 
              fontWeight: "bold",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              mb: 1
            }}
          >
            Welcome back, {userName}! 👋
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: "rgba(255,255,255,0.9)",
              fontWeight: "300"
            }}
          >
            Here's your portfolio overview • {currentTime}
          </Typography>
        </Box>
        
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Refresh Data">
            <IconButton 
              sx={{ 
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "white",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" }
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton 
              sx={{ 
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "white",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" }
              }}
            >
              <NotificationsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
            <IconButton 
              sx={{ 
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "white",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" }
              }}
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ 
        display: "flex", 
        flexWrap: "wrap", 
        gap: 3, 
        mb: 4,
        justifyContent: "space-between"
      }}>
        {/* Total Investment Card */}
        <Card sx={{ 
          flex: "1 1 280px",
          minWidth: "280px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          position: "relative",
          overflow: "hidden"
        }}>
          <CardContent sx={{ position: "relative", zIndex: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
              <Avatar sx={{ backgroundColor: "rgba(255,255,255,0.2)", width: 56, height: 56 }}>
                <AccountBalanceWalletIcon sx={{ fontSize: 28 }} />
              </Avatar>
              <Chip 
                label="Total Portfolio" 
                size="small" 
                sx={{ 
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.3)"
                }}
              />
            </Box>
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
              ${data.totalInvestment.toLocaleString()}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Your total investment value
            </Typography>
          </CardContent>
          <Box sx={{ 
            position: "absolute", 
            top: -20, 
            right: -20, 
            width: 100, 
            height: 100, 
            borderRadius: "50%", 
            backgroundColor: "rgba(255,255,255,0.1)" 
          }} />
        </Card>

        {/* Returns Card */}
        <Card sx={{ 
          flex: "1 1 280px",
          minWidth: "280px",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
        }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
              <Avatar sx={{ backgroundColor: "#4caf50", width: 56, height: 56 }}>
                <TrendingUpIcon sx={{ fontSize: 28 }} />
              </Avatar>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <ArrowUpwardIcon sx={{ color: "#4caf50", fontSize: 16 }} />
                <Typography variant="caption" sx={{ color: "#4caf50", fontWeight: "bold" }}>
                  This Year
                </Typography>
              </Box>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: "bold", color: "#4caf50", mb: 1 }}>
              +{data.returnsThisYear}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Portfolio returns this year
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={data.returnsThisYear * 10} 
              sx={{ 
                mt: 2, 
                height: 6, 
                borderRadius: 3,
                backgroundColor: "rgba(76, 175, 80, 0.1)",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#4caf50",
                  borderRadius: 3
                }
              }} 
            />
          </CardContent>
        </Card>

        {/* Active Funds Card */}
        <Card sx={{ 
          flex: "1 1 280px",
          minWidth: "280px",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
        }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
              <Avatar sx={{ backgroundColor: "#2196f3", width: 56, height: 56 }}>
                <AssessmentIcon sx={{ fontSize: 28 }} />
              </Avatar>
              <Chip 
                label="Active" 
                size="small" 
                color="primary" 
                sx={{ fontWeight: "bold" }}
              />
            </Box>
            <Typography variant="h3" sx={{ fontWeight: "bold", color: "#2196f3", mb: 1 }}>
              {data.activeFunds}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Active investment funds
            </Typography>
            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
              {[...Array(data.activeFunds)].map((_, i) => (
                <Box 
                  key={i} 
                  sx={{ 
                    width: 12, 
                    height: 12, 
                    borderRadius: "50%", 
                    backgroundColor: "#2196f3",
                    opacity: 0.7 + (i * 0.1)
                  }} 
                />
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Risk Profile Card */}
        <Card sx={{ 
          flex: "1 1 280px",
          minWidth: "280px",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
        }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
              <Avatar sx={{ backgroundColor: getRiskProfileColor(data.riskProfile), width: 56, height: 56 }}>
                <SecurityIcon sx={{ fontSize: 28 }} />
              </Avatar>
              <Typography variant="h4">
                {getRiskProfileIcon(data.riskProfile)}
              </Typography>
            </Box>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: "bold", 
                color: getRiskProfileColor(data.riskProfile),
                mb: 1 
              }}
            >
              {data.riskProfile}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your risk tolerance level
            </Typography>
            <Chip 
              label={`${data.riskProfile} Risk Investor`}
              size="small"
              sx={{ 
                mt: 2,
                backgroundColor: `${getRiskProfileColor(data.riskProfile)}20`,
                color: getRiskProfileColor(data.riskProfile),
                fontWeight: "bold"
              }}
            />
          </CardContent>
        </Card>
      </Box>

      {/* Main Content Cards */}
      <Box sx={{ 
        display: "flex", 
        flexWrap: "wrap", 
        gap: 3,
        alignItems: "stretch"
      }}>
        {/* Portfolio Performance Card */}
        <Card sx={{ 
          flex: "1 1 500px",
          minWidth: "500px",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
        }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ backgroundColor: "#9c27b0", width: 48, height: 48 }}>
                  <TimelineIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Portfolio Performance
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Track your investment growth
                  </Typography>
                </Box>
              </Box>
              <Button 
                variant="outlined" 
                size="small"
                startIcon={<VisibilityIcon />}
                sx={{ 
                  borderColor: "#9c27b0",
                  color: "#9c27b0",
                  "&:hover": { 
                    borderColor: "#9c27b0",
                    backgroundColor: "#9c27b020" 
                  }
                }}
              >
                View Details
              </Button>
            </Box>
            
            <Box
              sx={{
                height: 280,
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "2px dashed #9c27b0",
                position: "relative",
                overflow: "hidden"
              }}
            >
              <TimelineIcon sx={{ fontSize: 64, color: "#9c27b0", mb: 2, opacity: 0.7 }} />
              <Typography variant="h6" sx={{ color: "#9c27b0", fontWeight: "bold", mb: 1 }}>
                Interactive Chart Coming Soon
              </Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                Your portfolio performance visualization will appear here
              </Typography>
              
              {/* Decorative elements */}
              <Box sx={{ 
                position: "absolute", 
                top: 20, 
                right: 20, 
                width: 40, 
                height: 40, 
                borderRadius: "50%", 
                backgroundColor: "rgba(156, 39, 176, 0.1)" 
              }} />
              <Box sx={{ 
                position: "absolute", 
                bottom: 20, 
                left: 20, 
                width: 30, 
                height: 30, 
                borderRadius: "50%", 
                backgroundColor: "rgba(156, 39, 176, 0.1)" 
              }} />
            </Box>
          </CardContent>
        </Card>

        {/* Recent Transactions Card */}
        <Card sx={{ 
          flex: "1 1 400px",
          minWidth: "400px",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
        }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ backgroundColor: "#ff5722", width: 48, height: 48 }}>
                  <AccountBalanceWalletIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Recent Transactions
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Your latest activity
                  </Typography>
                </Box>
              </Box>
              <Chip 
                label={`${data.recentTransactions.length} Recent`}
                size="small"
                sx={{ 
                  backgroundColor: "#ff572220",
                  color: "#ff5722",
                  fontWeight: "bold"
                }}
              />
            </Box>
            
            <Box sx={{ mb: 3 }}>
              {data.recentTransactions.map((txn, idx) => (
                <Box key={idx} sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                    <Box sx={{ 
                      width: 8, 
                      height: 8, 
                      borderRadius: "50%", 
                      backgroundColor: idx === 0 ? "#4caf50" : idx === 1 ? "#f44336" : "#2196f3"
                    }} />
                    <Typography variant="body2" sx={{ fontWeight: "500" }}>
                      {txn}
                    </Typography>
                  </Box>
                  {idx < data.recentTransactions.length - 1 && (
                    <Divider sx={{ ml: 2, opacity: 0.3 }} />
                  )}
                </Box>
              ))}
            </Box>
            
            <Button 
              variant="contained" 
              fullWidth
              onClick={handleViewTransactions}
              sx={{ 
                py: 1.5,
                background: "linear-gradient(135deg, #ff5722 0%, #ff7043 100%)",
                boxShadow: "0 4px 20px rgba(255, 87, 34, 0.3)",
                fontWeight: "bold",
                "&:hover": {
                  background: "linear-gradient(135deg, #e64a19 0%, #ff5722 100%)",
                  boxShadow: "0 6px 25px rgba(255, 87, 34, 0.4)"
                }
              }}
            >
              VIEW ALL TRANSACTIONS
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
