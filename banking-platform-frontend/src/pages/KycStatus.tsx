import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import { useNavigate } from "react-router-dom";

const KycStatus = () => {
  const [status, setStatus] = useState("Pending");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus("Approved");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status === "Approved") {
      const redirectTimer = setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
      return () => clearTimeout(redirectTimer);
    }
  }, [status, navigate]);

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
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          p: 4,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#0c3c60",
            color: "white",
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

        <Typography variant="h5" fontWeight="bold" mb={3}>
          KYC Status
        </Typography>

        <Box display="flex" justifyContent="center" mb={2}>
          {status === "Approved" ? (
            <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "green" }} />
          ) : (
            <HourglassBottomIcon sx={{ fontSize: 60, color: "orange" }} />
          )}
        </Box>

        <Typography
          variant="h6"
          color={status === "Approved" ? "green" : "orange"}
          fontWeight="bold"
        >
          {status}
        </Typography>

        {status === "Pending" && (
          <Box mt={3}>
            <CircularProgress color="warning" />
            <Typography variant="body2" mt={1}>
              Your KYC is under review...
            </Typography>
          </Box>
        )}

        {status === "Approved" && (
          <Typography sx={{ mt: 3, color: "gray" }}>
            Redirecting to dashboard...
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default KycStatus;
