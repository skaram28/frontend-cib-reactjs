import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const KycConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleConfirm = () => {
    // Save data to backend if needed, then redirect
    navigate("/kyc-status");
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
        >
          Confirm and Submit
        </Button>
      </Paper>
    </Container>
  );
};

export default KycConfirmation;
