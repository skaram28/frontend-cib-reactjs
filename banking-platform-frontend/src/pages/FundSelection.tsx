import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import fundsData from "../data/funds.json"; // ✅ Import dummy JSON data

const FundSelection = () => {
  const [sector, setSector] = useState("");
  const [risk, setRisk] = useState("");
  const [performance, setPerformance] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFunds, setFilteredFunds] = useState(fundsData); // Show all by default

  // 🔎 Handle Search button click
  const handleSearch = () => {
    const results = fundsData.filter((fund) => {
      const sectorMatch = sector ? fund.sector === sector : true;
      const riskMatch = risk ? fund.risk === risk : true;
      const performanceMatch = performance
        ? fund.performance === performance
        : true;
      const searchMatch = searchQuery
        ? fund.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          fund.sector.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      return sectorMatch && riskMatch && performanceMatch && searchMatch;
    });

    setFilteredFunds(results);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Fund Selection
      </Typography>

      {/* Filters */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
        <TextField
          select
          label="Sector"
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Energy">Energy</MenuItem>
          <MenuItem value="Healthcare">Healthcare</MenuItem>
          <MenuItem value="Technology">Technology</MenuItem>
          <MenuItem value="Real Estate">Real Estate</MenuItem>
        </TextField>

        <TextField
          select
          label="Risk"
          value={risk}
          onChange={(e) => setRisk(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </TextField>

        <TextField
          select
          label="Performance"
          value={performance}
          onChange={(e) => setPerformance(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="last1year">Last 1 Year</MenuItem>
          <MenuItem value="last30days">Last 30 Days</MenuItem>
        </TextField>

        <TextField
          label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ minWidth: 200 }}
        />

        <Button
          variant="contained"
          sx={{ backgroundColor: "#0c3c60" }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>

      {/* Funds Grid */}
      <Grid container spacing={3}>
        {filteredFunds.map((fund) => (
          <Grid item xs={12} sm={6} md={3} key={fund.id}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {fund.company}
              </Typography>
              <Typography variant="body2">Sector: {fund.sector}</Typography>
              <Typography variant="body2">Risk Profile: {fund.risk}</Typography>
              <Typography variant="body2">
                Performance: {fund.performance}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <Typography variant="h6">{fund.return}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}

        {/* Investment Box */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Investment
            </Typography>
            <TextField label="Amount" fullWidth sx={{ mb: 2 }} />
            <Typography variant="body2" gutterBottom>
              Fee: $10.00
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "#0c3c60" }}
            >
              Invest
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FundSelection;
