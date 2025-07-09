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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";

// ✅ Import dummy data
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
    // ✅ Load mock data
    setTransactions(portfolioData.transactions);
    setPortfolio(portfolioData.portfolio);
  }, []);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const filteredTransactions = transactions.filter((row) =>
    Object.values(row).some((val) =>
      val.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <Box p={2}>
      <Typography variant="h5" mb={1} sx={{ color: "#263238" }}>
        Transactions and Portfolio View
      </Typography>

      <Tabs value={tab} onChange={handleChange}>
        <Tab label="Transactions" />
        <Tab label="Portfolio" />
      </Tabs>

      {tab === 0 && (
        <>
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
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>

          <Paper sx={{ mt: 2 }}>
            <Table sx={{ border: "1px solid black" }}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Fund ID</b>
                  </TableCell>
                  <TableCell>
                    <b>Date</b>
                  </TableCell>
                  <TableCell>
                    <b>Status</b>
                  </TableCell>
                  <TableCell>
                    <b>Amount</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.fundsId}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>{row.amount}</TableCell>
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
        </>
      )}

      {tab === 1 && (
        <Paper elevation={2} sx={{ mt: 2 }}>
          <Table sx={{ border: "1px solid black" }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>ID</b>
                </TableCell>
                <TableCell>
                  <b>Portfolio Number</b>
                </TableCell>
                <TableCell>
                  <b>Portfolio Type</b>
                </TableCell>
                <TableCell>
                  <b>Status</b>
                </TableCell>
                <TableCell>
                  <b>Start Date</b>
                </TableCell>
                <TableCell>
                  <b>Updated Date</b>
                </TableCell>
                <TableCell>
                  <b>End Date</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {portfolio.map((item, index) => (
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
      )}
    </Box>
  );
};

export default TransactionPage;
