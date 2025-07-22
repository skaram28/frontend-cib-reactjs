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
import { fetchPortfolios, getPortfolioData } from "../slices/portfolioSlice";
import { fetchTransactions, getTransactionData } from "../slices/transactionSlice";

// Transaction Type
export interface Transaction {
  id: number | null,
  referenceId: string,
  portfolio: {
    id: number | null,
    portfolioNumber: string,
    portfolioType: string,
    status: string,
    startdate: string,
    updateddate: string,
    enddate: string
  },
  transactionType: string,
  transactionDate: string | null,
  status: string | null,
  comments: string,
  startDate: string | null,
  updateDate: string,
  endDate: string | null
}

// Portfolio Type
export interface Portfolio {
  id: number | string;
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

  //  Redux dispatch
  const dispatch = useAppDispatch();

  // Redux state  portfolio selector
  const portfolio = useAppSelector(getPortfolioData);

  // Redux state  transactions selector
  const transactions = useAppSelector(getTransactionData);

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchPortfolios());

  }, [dispatch]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  console.log(transactions, "Transaction");

  return (
    <Box 
      p={2}
      sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #4f7cff 0%, #8b5fbf 100%)'
      }}
    >
      <Typography 
        variant="h5" 
        mb={1} 
        sx={{ 
          color: "#263238",
          fontWeight: 600,
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: 2,
          borderRadius: 2,
          mb: 3
        }}
      >
        Transactions and Portfolio View
      </Typography>

      <Paper 
        sx={{ 
          p: 2, 
          borderRadius: 2,
          background: 'rgba(255, 255, 255, 0.95)'
        }}
      >
        <Tabs 
          value={tab} 
          onChange={handleChange}
          sx={{
            '& .MuiTab-root': {
              fontWeight: 600,
              color: '#666',
              '&.Mui-selected': {
                color: '#4f7cff'
              }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#4f7cff',
              height: 3
            }
          }}
        >
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
                sx={{ 
                  border: "1px solid #4f7cff",
                  borderRadius: 2,
                  backgroundColor: '#f8f9fa',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#4f7cff',
                    },
                    '&:hover fieldset': {
                      borderColor: '#8b5fbf',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4f7cff',
                    }
                  }
                }}
                value={search}
                onChange={(e: any) => setSearch(e.target.value)}
              />
            </Box>

            <Paper sx={{ mt: 2, borderRadius: 2, overflow: 'hidden' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ 
                    background: 'linear-gradient(135deg, #4f7cff 0%, #8b5fbf 100%)'
                  }}>
                    <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                      <b>Fund ID</b>
                    </TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                      <b>Date</b>
                    </TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                      <b>Status</b>
                    </TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                      <b>Comments</b>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {transactions.length > 0 ? (
                    transactions.map((row, index) => (
                      <TableRow 
                        key={index}
                        sx={{ 
                          '&:nth-of-type(odd)': { 
                            backgroundColor: '#f8f9fa' 
                          },
                          '&:hover': { 
                            backgroundColor: '#e3f2fd'
                          }
                        }}
                      >
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
          <Paper 
            elevation={2} 
            sx={{ 
              mt: 2, 
              borderRadius: 2, 
              overflow: 'hidden' 
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ 
                  background: 'linear-gradient(135deg, #4f7cff 0%, #8b5fbf 100%)'
                }}>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                    <b>ID</b>
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                    <b>Portfolio Number</b>
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                    <b>Portfolio Type</b>
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                    <b>Status</b>
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                    <b>Start Date</b>
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                    <b>Updated Date</b>
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                    <b>End Date</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {portfolio?.length > 0 && portfolio.map((item: any, index: number) => (
                  <TableRow 
                    key={index}
                    sx={{ 
                      '&:nth-of-type(odd)': { 
                        backgroundColor: '#f8f9fa' 
                      },
                      '&:hover': { 
                        backgroundColor: '#e3f2fd'
                      }
                    }}
                  >
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.portfolioNumber}</TableCell>
                    <TableCell>{item.portfolioType}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.startdate}</TableCell>
                    <TableCell>{item.updateddate ?? "—"}</TableCell>
                    <TableCell>{item.enddate ?? "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Paper>
    </Box>
  );
};

export default TransactionPage;