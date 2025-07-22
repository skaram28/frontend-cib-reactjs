import {
  Box,
  InputAdornment,
  OutlinedInput,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FilterListIcon from "@mui/icons-material/FilterList";
import GetAppIcon from "@mui/icons-material/GetApp";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchPortfolios, getPortfolioData } from "../slices/portfolioSlice";
import { fetchTransactions, getTransactionData } from "../slices/transactionSlice";

// Transaction Type
export interface Transaction {
  id: number | null;
  referenceId: string;
  amount: string; // <-- Added
  portfolio: {
    id: number | null;
    portfolioNumber: string;
    portfolioType: string;
    status: string;
    startdate: string;
    updateddate: string;
    enddate: string;
  };
  transactionType: string;
  transactionDate: string | null;
  status: string | null;
  comments: string;
  startDate: string | null;
  updateDate: string;
  endDate: string | null;
}

export interface Portfolio {
  id: number | string;
  portfolioNumber: string | null;  // <-- must allow null
  portfolioType: string;
  status: string;
  startDate: string;
  updateddate: string | null;
  enddate: string | null;
}

const TransactionPage: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");

  const dispatch = useAppDispatch();
  const portfolio = useAppSelector(getPortfolioData);
  const transactions = useAppSelector(getTransactionData);

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchPortfolios());
  }, [dispatch]);

  const handleBackNavigation = () => {
    window.history.back(); // Use navigate(-1) if you're using react-router
  };

  const totalAmount = transactions.reduce((sum, transaction) => {
    const value = parseFloat(transaction.amount?.replace("$", "") || "0");
    return sum + (isNaN(value) ? 0 : value);
  }, 0);

  const completedTransactions = transactions.filter(
    (t) => t.status?.toLowerCase() === "completed"
  ).length;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        p: 3,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            onClick={handleBackNavigation}
            sx={{
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "white",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h4"
            sx={{
              color: "white",
              fontWeight: "bold",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
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
              "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
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
              "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
            }}
          >
            Export
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Card
          sx={{
            flex: 1,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          }}
        >
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

        <Card
          sx={{
            flex: 1,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          }}
        >
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
      </Box>

      {/* Search + Transactions Table */}
      <Box mt={2}>
        <OutlinedInput
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          placeholder="Search"
          fullWidth
          size="small"
          sx={{ border: "1px solid black" }}
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
      </Box>

      {/* Transactions Table */}
      <Paper sx={{ mt: 2 }}>
        <Table sx={{ border: "1px solid black" }}>
          <TableHead>
            <TableRow>
              <TableCell><b>Fund ID</b></TableCell>
              <TableCell><b>Date</b></TableCell>
              <TableCell><b>Type</b></TableCell>
              <TableCell><b>Comments</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.referenceId}</TableCell>
                  <TableCell>{row.updateDate}</TableCell>
                  <TableCell>{row.transactionType}</TableCell>
                  <TableCell>{row.comments}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* Portfolios Table */}
      <Paper elevation={2} sx={{ mt: 4 }}>
        <Table sx={{ border: "1px solid black" }}>
          <TableHead>
            <TableRow>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Portfolio Number</b></TableCell>
              <TableCell><b>Portfolio Type</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Start Date</b></TableCell>
              <TableCell><b>Updated Date</b></TableCell>
              <TableCell><b>End Date</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {portfolio?.length > 0 &&
              portfolio.map((item: Portfolio, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.portfolioNumber}</TableCell>
                  <TableCell>{item.portfolioType}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.startDate}</TableCell>
                  <TableCell>{item.updateddate ?? "—"}</TableCell>
                  <TableCell>{item.enddate ?? "—"}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default TransactionPage;
