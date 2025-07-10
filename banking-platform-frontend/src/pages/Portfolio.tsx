import {
  Box,
  InputAdornment,
  OutlinedInput,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Typography,
  Chip,
  Button,
  Card,
  CardContent,
  IconButton,
  Avatar,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FilterListIcon from "@mui/icons-material/FilterList";
import GetAppIcon from "@mui/icons-material/GetApp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";

// Import dummy data
import portfolioData from "../data/portfolioData.json";

interface Transaction {
  fundsId: string;
  date: string;
  status: string;
  amount: string;
}

interface Portfolio {
  id: string;
  portfolioNumber: string;
  portfolioType: string;
  status: string;
  startDate: string;
  updateddate: string | null;
  enddate: string | null;
}

const TransactionPage: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);

  useEffect(() => {
    // Load mock data
    setTransactions(portfolioData.transactions);
    setPortfolio(portfolioData.portfolio);
  }, []);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleBackNavigation = () => {
    // Navigate back to Fund Selection Hub
    console.log("Navigating back to Fund Selection Hub");
  };

  type ChipColor = "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
  
  const getStatusColor = (status: string): ChipColor => {
    switch (status.toLowerCase()) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "inactive":
        return "error";
      case "active":
        return "success";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "✓";
      case "pending":
        return "⏳";
      case "inactive":
        return "⏸";
      case "active":
        return "▶";
      default:
        return "•";
    }
  };

  const filteredTransactions = transactions.filter((row) =>
    Object.values(row).some((val) =>
      val.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalAmount = transactions.reduce((sum, transaction) => {
    return sum + parseFloat(transaction.amount.replace('$', ''));
  }, 0);

  const completedTransactions = transactions.filter(t => t.status.toLowerCase() === 'completed').length;

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
        mb: 3 
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton 
            onClick={handleBackNavigation}
            sx={{ 
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "white",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography 
            variant="h4" 
            sx={{ 
              color: "white", 
              fontWeight: "bold",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)"
            }}
          >
            Investment Dashboard
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<FilterListIcon />}
            sx={{ 
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "white",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" }
            }}
          >
            Filter
          </Button>
          <Button
            variant="contained"
            startIcon={<GetAppIcon />}
            sx={{ 
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "white",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" }
            }}
          >
            Export
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Card sx={{ 
          flex: 1, 
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
        }}>
          <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ backgroundColor: "#4caf50", width: 48, height: 48 }}>
              <AccountBalanceWalletIcon />
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "bold", color: "#2e7d32" }}>
                ${totalAmount.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Portfolio Value
              </Typography>
            </Box>
          </CardContent>
        </Card>
        
        <Card sx={{ 
          flex: 1, 
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
        }}>
          <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ backgroundColor: "#2196f3", width: 48, height: 48 }}>
              <TrendingUpIcon />
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                {completedTransactions}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Completed Transactions
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ 
          flex: 1, 
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
        }}>
          <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ backgroundColor: "#ff9800", width: 48, height: 48 }}>
              <VisibilityIcon />
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "bold", color: "#f57c00" }}>
                {portfolio.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Portfolios
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Main Content Card */}
      <Card sx={{ 
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        borderRadius: 3
      }}>
        <CardContent sx={{ p: 0 }}>
          {/* Tab Navigation */}
          <Box sx={{ borderBottom: 1, borderColor: "divider", px: 3, pt: 2 }}>
            <Tabs 
              value={tab} 
              onChange={handleChange}
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  minHeight: 48
                },
                "& .Mui-selected": {
                  color: "#667eea !important"
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#667eea",
                  height: 3
                }
              }}
            >
              <Tab 
                label={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <AccountBalanceWalletIcon />
                    <span>Transactions</span>
                  </Stack>
                } 
              />
              <Tab 
                label={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <TrendingUpIcon />
                    <span>Portfolio</span>
                  </Stack>
                } 
              />
            </Tabs>
          </Box>

          {/* Tab Content */}
          <Box sx={{ p: 3 }}>
            {tab === 0 && (
              <>
                {/* Search Bar */}
                <Box sx={{ mb: 3 }}>
                  <OutlinedInput
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "#667eea" }} />
                      </InputAdornment>
                    }
                    placeholder="Search transactions by fund ID, date, or amount..."
                    fullWidth
                    size="small"
                    sx={{ 
                      borderRadius: 2,
                      backgroundColor: "#f8f9fa",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#e0e0e0"
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#667eea"
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#667eea"
                      }
                    }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Box>

                {/* Transaction Results Header */}
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 2, 
                    color: "#333",
                    fontWeight: "600" 
                  }}
                >
                  {search ? `Found ${filteredTransactions.length} transaction(s)` : "All Transactions"}
                </Typography>

                {/* Transactions Table */}
                <Paper sx={{ 
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
                }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
                        <TableCell sx={{ fontWeight: "bold", color: "#555" }}>Fund ID</TableCell>
                        <TableCell sx={{ fontWeight: "bold", color: "#555" }}>Date</TableCell>
                        <TableCell sx={{ fontWeight: "bold", color: "#555" }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: "bold", color: "#555" }}>Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredTransactions.length > 0 ? (
                        filteredTransactions.map((row, index) => (
                          <TableRow 
                            key={index}
                            sx={{ 
                              "&:hover": { backgroundColor: "#f5f5f5" },
                              transition: "background-color 0.2s"
                            }}
                          >
                            <TableCell>
                              <Typography variant="body2" sx={{ fontWeight: "600", color: "#667eea" }}>
                                {row.fundsId}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" color="text.secondary">
                                {row.date}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={`${getStatusIcon(row.status)} ${row.status}`}
                                color={getStatusColor(row.status) as ChipColor}
                                size="small"
                                sx={{ 
                                  fontWeight: "500",
                                  minWidth: 100
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  fontWeight: "bold",
                                  color: "#2e7d32"
                                }}
                              >
                                {row.amount}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                            <Typography variant="body1" color="text.secondary">
                              {search ? "No transactions found matching your search" : "No transactions available"}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </Paper>
              </>
            )}

            {tab === 1 && (
              <>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 3, 
                    color: "#333",
                    fontWeight: "600" 
                  }}
                >
                  Portfolio Overview
                </Typography>

                <Paper sx={{ 
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
                }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
                        <TableCell sx={{ fontWeight: "bold", color: "#555" }}>ID</TableCell>
                        <TableCell sx={{ fontWeight: "bold", color: "#555" }}>Portfolio Number</TableCell>
                        <TableCell sx={{ fontWeight: "bold", color: "#555" }}>Type</TableCell>
                        <TableCell sx={{ fontWeight: "bold", color: "#555" }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: "bold", color: "#555" }}>Start Date</TableCell>
                        <TableCell sx={{ fontWeight: "bold", color: "#555" }}>Updated Date</TableCell>
                        <TableCell sx={{ fontWeight: "bold", color: "#555" }}>End Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {portfolio.map((item, index) => (
                        <TableRow 
                          key={index}
                          sx={{ 
                            "&:hover": { backgroundColor: "#f5f5f5" },
                            transition: "background-color 0.2s"
                          }}
                        >
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: "600", color: "#667eea" }}>
                              {item.id}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: "500" }}>
                              {item.portfolioNumber}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={item.portfolioType}
                              variant="outlined"
                              size="small"
                              sx={{ 
                                borderColor: "#667eea",
                                color: "#667eea",
                                fontWeight: "500"
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={`${getStatusIcon(item.status)} ${item.status}`}
                              color={getStatusColor(item.status)}
                              size="small"
                              sx={{ 
                                fontWeight: "500",
                                minWidth: 100
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {item.startDate}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {item.updateddate || "—"}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {item.enddate || "—"}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TransactionPage;