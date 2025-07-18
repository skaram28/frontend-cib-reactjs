import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch } from "../redux/store";
import {
  fetchAuditById,
  getAuditData,
  getAuditError,
  getAuditLoading,
} from "../slices/auditSlice";

// --- Audit Interface ---
export interface Audit {
  id: number;
  timestamp: string;
  message: string;
  action: string;
  status: string;
  ipAddress: string;
  startDate: string;
  updatedDate: string;
  endDate: string;
}

const KycConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const audit = useSelector(getAuditData); // Audit[] | null
  const loading = useSelector(getAuditLoading);
  const error = useSelector(getAuditError);

  const handleConfirm = async () => {
  try {
    const result = await dispatch(fetchAuditById(1));

    if (fetchAuditById.fulfilled.match(result)) {
      navigate("/kyc-status", { state: { auditData: result.payload } });
    } else {
      alert("Failed to fetch audit data.");
    }
  } catch (err) {
    alert("Something went wrong while fetching audit data.");
  }
};


  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
      }}
    >
      <Paper elevation={4} sx={{ width: "100%", p: 4, borderRadius: 3 }}>
        <Box
          sx={{
            backgroundColor: "#0c3c60",
            color: "white",
            textAlign: "center",
            py: 1.5,
            borderRadius: 1,
            mb: 3,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
            Commercial Investment Banking
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
            Platform
          </Typography>
        </Box>

        <Typography variant="h6" fontWeight="bold" align="center" gutterBottom>
          Confirm Your KYC Details
        </Typography>

        <Divider sx={{ my: 2 }} />

        {loading && (
          <Box textAlign="center" my={2}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {state && (
          <Box mb={2}>
            <Typography variant="body1" mb={1}>
              <strong>Aadhaar Number:</strong> {state?.aadhaarNumber}
            </Typography>
            <Typography variant="body1" mb={1}>
              <strong>Aadhaar File:</strong> {state?.aadhaarFile?.name || "N/A"}
            </Typography>
            <Typography variant="body1" mb={1}>
              <strong>PAN Number:</strong> {state?.panNumber}
            </Typography>
            <Typography variant="body1" mb={1}>
              <strong>PAN File:</strong> {state?.panFile?.name || "N/A"}
            </Typography>
          </Box>
        )}

        {audit && audit.length > 0 && (
          <Box mt={3}>
            <Typography variant="subtitle2" gutterBottom>
              <strong>Fetched Audit Info</strong>
            </Typography>
            <Typography variant="body2" mb={1}>
              <strong>Action:</strong> {audit[0].action}
            </Typography>
            <Typography variant="body2" mb={1}>
              <strong>Status:</strong> {audit[0].status}
            </Typography>
            <Typography variant="body2" mb={1}>
              <strong>IP:</strong> {audit[0].ipAddress}
            </Typography>
            <Typography variant="body2" mb={1}>
              <strong>Start Date:</strong> {audit[0].startDate}
            </Typography>
          </Box>
        )}

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: "#0c3c60",
            py: 1.5,
            fontWeight: 600,
          }}
          onClick={handleConfirm}
          disabled={loading}
        >
          Confirm and Submit
        </Button>
      </Paper>
    </Container>
  );
};

export default KycConfirmation;
