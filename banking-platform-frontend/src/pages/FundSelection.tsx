import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  MenuItem,
  Paper,
  Button,
  Card,
  CardContent,
  Chip,
  InputAdornment,
  Rating,
  Divider,
  Avatar,
  CircularProgress,
} from "@mui/material";
import {
  Search as SearchIcon,
  TrendingUp,
  TrendingDown,
  FilterList,
  BusinessCenter,
  LocalHospital,
  Computer,
  Home,
  Assessment,
  CheckCircle,
  Security,
  Timeline,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../redux/store"; // 🔁 adjust path based on your project
import {
  fetchFunds,
  getFundsData,
  getFundsLoading,
  getFundsError,
  type Fund,
  investInFund,
} from "../slices/fundSlice";
import {
  fetchFundById,
  getSingleFundData,
} from "../slices/fetchFundByIdSlice";

const FundSelection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const funds = useSelector(getFundsData);
  const loading = useSelector(getFundsLoading);
  const error = useSelector(getFundsError);

  const singleFundData = useSelector(getSingleFundData);

  const [sector, setSector] = useState("");
  const [risk, setRisk] = useState("");
  const [performance, setPerformance] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFunds, setFilteredFunds] = useState<Fund[]>([]);
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Fetch funds on mount
  useEffect(() => {
    dispatch(fetchFunds());
  }, [dispatch]);

  // Update filtered funds when data changes
  useEffect(() => {
    setFilteredFunds(funds);
  }, [funds]);
  useEffect(() => {
    if (singleFundData) {
      // console.log("Fetched single fund data:", singleFundData);
      // You can do more here if needed
    }
  }, [singleFundData]);
  
  const handleSearch = () => {
    const results = funds.filter((fund) => {
      const sectorMatch = sector ? fund.sector === sector : true;
      const riskMatch = risk ? fund.riskProfile === risk : true;
      const performanceMatch = performance ? fund.performance === performance : true;
      const searchMatch = searchQuery
        ? fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          fund.sector.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      return sectorMatch && riskMatch && performanceMatch && searchMatch;
    });

    setFilteredFunds(results);
  };

  // When user clicks a fund card
  const handleFundClick = (fund: Fund) => {
    setSelectedFund(fund);
    dispatch(fetchFundById(fund.id));
  };

  

  const handleInvest = () => {
    if (!investmentAmount || !selectedFund) {
      alert("Please enter an amount and select a fund.");
      return;
    }
  
    const payload = {
      fundId: selectedFund.id,
      amount: parseFloat(investmentAmount),
      userId: 109, // Replace with actual user logic if needed
    };
  
    dispatch(investInFund(payload))
      .unwrap()
      .then(() => {
        alert(`Successfully invested ₹${investmentAmount} in ${selectedFund.name}`);
        setInvestmentAmount("");
      })
      .catch((err) => {
        alert(`Investment failed: ${err}`);
      });
  };
  

  const getSectorIcon = (sector: string) => {
    switch (sector) {
      case "Technology":
        return <Computer sx={{ color: "#1976d2" }} />;
      case "Healthcare":
        return <LocalHospital sx={{ color: "#388e3c" }} />;
      case "Energy":
        return <Assessment sx={{ color: "#f57c00" }} />;
      case "Real Estate":
        return <Home sx={{ color: "#7b1fa2" }} />;
      default:
        return <BusinessCenter sx={{ color: "#424242" }} />;
    }
  };

  const getRiskColor = (risk: string): "success" | "warning" | "error" | "default" => {
    switch (risk) {
      case "Low":
        return "success";
      case "Medium":
        return "warning";
      case "High":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 50%, #9c27b0 100%)",
          color: "white",
          py: 8,
          mb: 3,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center" }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: "rgba(255,255,255,0.2)",
                mx: "auto",
                mb: 3,
              }}
            >
              <TrendingUp sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
              Fund Selection Hub
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, color: "rgba(255,255,255,0.9)" }}>
              Discover and invest in top-performing funds with intelligent
              <br />
              analytics and real-time insights
            </Typography>
<Box sx={{ display: "flex", justifyContent: "center", gap: 4, flexWrap: "wrap" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CheckCircle sx={{ color: "#4caf50", fontSize: 20 }} />
                <Typography variant="body2">Verified Funds</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Security sx={{ color: "#2196f3", fontSize: 20 }} />
                <Typography variant="body2">Secure Investments</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Timeline sx={{ color: "#9c27b0", fontSize: 20 }} />
                <Typography variant="body2">Real-time Analytics</Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Search Section */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              placeholder="Search funds by name, sector, or description..."
              value={searchQuery}
              onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
sx={{ mb: 2 }}
            />

<Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              startIcon={<FilterList />}
              onClick={() => setShowFilters(!showFilters)}
              variant="text"
              sx={{ color: "#1976d2" }}
            >
              Advanced Filters
            </Button>
</Box>

            {showFilters && (
              <Box>
                <Divider sx={{ mb: 2 }} />
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    select
                    label="Sector"
                    value={sector}
                    onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSector(e.target.value)}
                    sx={{ minWidth: 150 }}
                  >
                    <MenuItem value="">All Sectors</MenuItem>
                    <MenuItem value="Technology">Technology</MenuItem>
                    <MenuItem value="Healthcare">Healthcare</MenuItem>
                    <MenuItem value="Energy">Energy</MenuItem>
                    <MenuItem value="Real Estate">Real Estate</MenuItem>
                  </TextField>

                  <TextField
                    select
                    label="Risk"
                    value={risk}
                    onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setRisk(e.target.value)}
                    sx={{ minWidth: 150 }}
                  >
                    <MenuItem value="">All Risk Levels</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </TextField>

                  <TextField
                    select
                    label="Performance"
                    value={performance}
                    onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPerformance(e.target.value)}
                    sx={{ minWidth: 150 }}
                  >
                    <MenuItem value="">All Performance</MenuItem>
                    <MenuItem value="last1year">Last 1 Year</MenuItem>
                    <MenuItem value="last30days">Last 30 Days</MenuItem>
                  </TextField>

                  <Button
                    variant="contained"
                    onClick={handleSearch}
                    sx={{ backgroundColor: "#1976d2", minWidth: 100 }}
                  >
                    Search
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Paper>

        {/* Loading / Error */}
        {loading ? (
          <Box textAlign="center" py={5}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" textAlign="center">
            Error: {error}
          </Typography>
        ) : (
          <>
            {/* Results Header */}
            <Paper sx={{ p: 2, mb: 3, bgcolor: "#1976d2", color: "white" }}>
              <Typography variant="h6">
                Showing {filteredFunds.length} premium funds
              </Typography>
            </Paper>

            {/* Main Content */}
            <Box sx={{ display: "flex", gap: 3 }}>
{/* Funds Cards */}
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    "& > *": {
                  width: { xs: "100%", sm: "calc(50% - 8px)" },
                },
                  }}
                >
                  {filteredFunds.map((fund) => {
                    const isSelected = selectedFund?.id === fund.id;
                    const isPositive = fund.returnRate.startsWith("+");

                    return (
                      <Card
                        key={fund.id}
                        onClick={() => handleFundClick(fund)}
                        sx={{
                          cursor: "pointer",
transition: "all 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 4,
                      },
                          border: isSelected ? "2px solid #1976d2" : "1px solid #e0e0e0",
                          position: "relative",
                                                  }}
                      >
                        {isSelected && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: 8,
                              right: 8,
                              width: 12,
                              height: 12,
                              borderRadius: "50%",
                              bgcolor: "#1976d2",
                            }}
                          />
                        )}
                        <CardContent>
{/* Header */}
                          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                              <Avatar sx={{ bgcolor: "#f5f5f5" }}>
                                {getSectorIcon(fund.sector)}
                              </Avatar>
                              <Box>
                                <Typography variant="subtitle1" fontWeight="bold">
                                  {fund.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                              Fund ID: {fund.id}
                            </Typography>
                              </Box>
                            </Box>
                            <Rating value={4} size="small" readOnly />
                          </Box>

                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {fund.sector} sector fund with professional management
                          </Typography>

{/* Tags */}
                          <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
                            <Chip
                          label={fund.sector}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                            <Chip
                          label={fund.riskProfile}
                          size="small"
                          color={getRiskColor(fund.riskProfile)}
                          variant="outlined"
                        />
                          </Box>

{/* Details */}
                      <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                            Sector:
                          </Typography>
                            <Typography variant="body2" fontWeight="medium">
                              {fund.sector}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                            Risk Level:
                          </Typography>
                            <Typography variant="body2" fontWeight="medium">
                              {fund.riskProfile}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body2" color="text.secondary">
                            Performance:
                          </Typography>
                            <Typography variant="body2" fontWeight="medium">
                              {fund.performance === "last1year" ? "1 Year" : "30 Days"}
                            </Typography>
</Box>
                          </Box>

                          {/* Return */}
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography variant="body2" color="text.secondary">
                          Return
                        </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              {isPositive ? (
                                <TrendingUp sx={{ color: "#4caf50", fontSize: 20 }} />
                              ) : (
                                <TrendingDown sx={{ color: "#f44336", fontSize: 20 }} />
                              )}
                              <Typography
                                variant="h5"
                                fontWeight="bold"
                                sx={{ color: isPositive ? "#4caf50" : "#f44336" }}
                              >
                                {fund.returnRate}
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    );
                  })}
                </Box>
              </Box>

              {/* Investment Panel */}
              {selectedFund && (
                <Box sx={{ width: 320, flexShrink: 0 }}>
                  <Paper
                sx={{
                  p: 3,
                  position: "sticky",
                  top: 24,
                }}
              >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Investment - {selectedFund.name}
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                      Sector:
                    </Typography>
                        <Typography variant="body2" fontWeight="medium">
                      {selectedFund.sector}
                    </Typography>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                      Fund ID:
                    </Typography>
                        <Typography variant="body2" fontWeight="medium">
                      {selectedFund.id}
                    </Typography>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                      Risk:
                    </Typography>
                        <Typography variant="body2" fontWeight="medium">
                      {selectedFund.riskProfile}
                    </Typography>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body2" color="text.secondary">
                      Performance:
                    </Typography>
                        <Typography variant="body2" fontWeight="medium">
                          {selectedFund.performance === "last1year" ? "1 Year" : "30 Days"}
                        </Typography>
                      </Box>
                    </Box>

                    <Paper
                      sx={{
                        p: 2,
                        textAlign: "center",
mb: 3,
                        bgcolor: selectedFund.returnRate.startsWith("+") ? "#e8f5e8" : "#ffeaea",
                      }}
                    >
                      <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{
                          color: selectedFund.returnRate.startsWith("+") ? "#4caf50" : "#f44336",
                        }}
                      >
                        {selectedFund.returnRate}
                      </Typography>
                    </Paper>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Investment Amount
                      </Typography>
                      <TextField
                        fullWidth
                        type="number"
                        value={investmentAmount}
                        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setInvestmentAmount(e.target.value)}
                        placeholder="Enter amount"
                        sx={{ mb: 2 }}
                      />
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                      Fee:
                    </Typography>
                        <Typography variant="body2">₹10.00</Typography>
                      </Box>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={handleInvest}
                        sx={{ backgroundColor: "#1976d2", py: 1.5 }}
                      >
                        Invest
                      </Button>
                    </Box>
                  </Paper>
                </Box>
              )}
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default FundSelection;
