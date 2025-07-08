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
import fundsData from "../data/funds.json";

interface Fund {
  id: number;
  name: string;
  sector: string;
  risk: string;
  return: string;
  performance: string;
}

const FundSelection: React.FC = () => {
  const [sector, setSector] = useState("");
  const [risk, setRisk] = useState("");
  const [performance, setPerformance] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFunds, setFilteredFunds] = useState<Fund[]>(fundsData);
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState("");

  const handleSearch = () => {
    const results = fundsData.filter((fund) => {
      const sectorMatch = sector ? fund.sector === sector : true;
      const riskMatch = risk ? fund.risk === risk : true;
      const performanceMatch = performance
        ? fund.performance === performance
        : true;
      const searchMatch = searchQuery
        ? fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          fund.sector.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      return sectorMatch && riskMatch && performanceMatch && searchMatch;
    });

    setFilteredFunds(results);
  };

  const handleFundClick = (fund: Fund) => {
    setSelectedFund(fund);
  };

  const handleInvest = () => {
    if (!investmentAmount) {
      alert("Please enter an amount.");
      return;
    }
    alert(
      `Invested ₹${investmentAmount} in ${selectedFund?.name} (${selectedFund?.sector})`
    );
    setInvestmentAmount("");
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

      {/* Main Content with Investment Box Fixed */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* Funds Grid */}
        <Grid container spacing={3} sx={{ flex: 1 }}>
          {filteredFunds.map((fund) => {
            const isPositive = fund.return.startsWith("+");
            return (
              <Grid item xs={12} sm={6} md={4} key={fund.id}>
                <Paper
                  sx={{ p: 2, cursor: "pointer" }}
                  onClick={() => handleFundClick(fund)}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {fund.name}
                  </Typography>
                  <Typography variant="body2">Sector: {fund.sector}</Typography>
                  <Typography variant="body2">Risk: {fund.risk}</Typography>
                  <Typography variant="body2">
                    Performance: {fund.performance}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        color: isPositive ? "green" : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {fund.return}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>

        {/* Investment Box - Fixed on Right */}
        <Box
          sx={{
            width: { xs: "100%", md: 300 },
            position: { md: "sticky" },
            top: { md: 100 },
            alignSelf: "flex-start",
          }}
        >
          {selectedFund && (
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Investment - {selectedFund.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Sector: {selectedFund.sector}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Fund ID: {selectedFund.id}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Risk: {selectedFund.risk}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: selectedFund.return.startsWith("+") ? "green" : "red",
                  fontWeight: "bold",
                  mb: 2,
                }}
              >
                {selectedFund.return}
              </Typography>
              <TextField
                label="Amount"
                fullWidth
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Typography variant="body2" gutterBottom>
                Fee: ₹10.00
              </Typography>
              <Button
                variant="contained"
                fullWidth
                sx={{ backgroundColor: "#0c3c60" }}
                onClick={handleInvest}
              >
                Invest
              </Button>
            </Paper>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default FundSelection;
