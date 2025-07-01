import { Box, Grid, Paper, Typography, Divider, Button } from "@mui/material";
import { useEffect, useState } from "react";
import dashboardData from "../data/dashboard.json"; // Adjust path accordingly

const Dashboard = () => {
  const [userName, setUserName] = useState<string>("");
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Fetch user from localStorage
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      const userData = JSON.parse(user);
      setUserName(userData.username);
    }

    // Fetch dashboard data from JSON
    setData(dashboardData);
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

      {/* Summary Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="subtitle2">Total Investment</Typography>
            <Typography variant="h6" fontWeight="bold">
              ${data.totalInvestment}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="subtitle2">Returns (This Year)</Typography>
            <Typography variant="h6" fontWeight="bold" color="green">
              +{data.returnsThisYear}%
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="subtitle2">Active Funds</Typography>
            <Typography variant="h6" fontWeight="bold">
              {data.activeFunds}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="subtitle2">Risk Profile</Typography>
            <Typography variant="h6" fontWeight="bold" color="orange">
              {data.riskProfile}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Placeholder for Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
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
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Recent Transactions
            </Typography>
            <Box>
              {data.recentTransactions.map((txn: string, idx: number) => (
                <Typography key={idx} variant="body2">
                  - {txn}
                </Typography>
              ))}
            </Box>
            <Button variant="contained" sx={{ mt: 2 }}>
              View All Transactions
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
