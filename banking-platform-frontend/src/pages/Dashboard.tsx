import { Box, Paper, Typography, Divider, Button } from "@mui/material";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      const userData = JSON.parse(user);
      setUserName(userData.username);
    }
    setData(dashboardData as DashboardData);
  }, []);

  if (!data) return null;

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Welcome, {userName}
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        Here is your portfolio overview.
      </Typography>

      {/* Summary Cards without Grid */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {[
          {
            label: "Total Investment",
            value: `$${data.totalInvestment}`,
          },
          {
            label: "Returns (This Year)",
            value: `+${data.returnsThisYear}%`,
            color: "green",
          },
          {
            label: "Active Funds",
            value: data.activeFunds,
          },
          {
            label: "Risk Profile",
            value: data.riskProfile,
            color: "orange",
          },
        ].map((item, idx) => (
          <Paper
            key={idx}
            elevation={3}
            sx={{
              p: 2,
              flex: "1 1 calc(25% - 16px)",
              minWidth: "200px",
            }}
          >
            <Typography variant="subtitle2">{item.label}</Typography>
            <Typography
              variant="h6"
              fontWeight="bold"
              color={item.color || "initial"}
            >
              {item.value}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Performance and Transactions without Grid */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 2,
            flex: "1 1 400px",
            minWidth: "300px",
          }}
        >
          <Typography variant="subtitle1" gutterBottom>
            Portfolio Performance
          </Typography>
          <Box
            sx={{
              height: 200,
              backgroundColor: "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Chart Placeholder
          </Box>
        </Paper>

        <Paper
          elevation={3}
          sx={{
            p: 2,
            flex: "1 1 400px",
            minWidth: "300px",
          }}
        >
          <Typography variant="subtitle1" gutterBottom>
            Recent Transactions
          </Typography>
          <Box>
            {data.recentTransactions.map((txn, idx) => (
              <Typography key={idx} variant="body2">
                - {txn}
              </Typography>
            ))}
          </Box>
          <Button variant="contained" sx={{ mt: 2 }}>
            View All Transactions
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
