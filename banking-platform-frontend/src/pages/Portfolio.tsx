/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useAppDispatch, useAppSelector } from "../redux/hooks";
// import { fetchPortfolios, getPortfolioData } from "../slices/portfolioSlice";
import { fetchTransactions, getTransactionData } from "../slices/transactionSlice";

const TransactionPage: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");

  //  Redux dispatch
  const dispatch = useAppDispatch();

  // Redux state  portfolio selector
  // const portfolio = useAppSelector(getPortfolioData);

  // Redux state  transactions selector
  const transactions = useAppSelector(getTransactionData);

  useEffect(() => {
    dispatch(fetchTransactions());
    // dispatch(fetchPortfolios());

  }, [dispatch]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
console.log(transactions,"Transaction");
  //  const filteredTransactions = transactions.filter((row) =>
  //   // Object.values(row).some((val) =>
  //     // val.toString().toLowerCase().includes(search.toLowerCase())
  //   // )
  //   return transactions;
  //  );




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
                    <b>Comments</b>
                  </TableCell>
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
              {/* {portfolio?.length > 0 && portfolio.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.portfolioNumber}</TableCell>
                  <TableCell>{item.portfolioType}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.startdate}</TableCell>
                  <TableCell>{item.updateddate ?? "—"}</TableCell>
                  <TableCell>{item.enddate ?? "—"}</TableCell>
                </TableRow>
              ))} */}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

export default TransactionPage;