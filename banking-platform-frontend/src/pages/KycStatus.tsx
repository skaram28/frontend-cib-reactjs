import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Stack,
  Avatar,
  Fade,
  Grow,
  LinearProgress,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import SecurityIcon from "@mui/icons-material/Security";
import { useNavigate } from "react-router-dom";

const KycStatus = () => {
  const [status, setStatus] = useState("Pending");
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate progress
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    const timer = setTimeout(() => {
      setStatus("Approved");
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
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
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255,255,255,0.05) 0%, transparent 50%)
          `,
          animation: "float 6s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": {
              transform: "translateY(0px)",
            },
            "50%": {
              transform: "translateY(-20px)",
            },
          },
        }}
      />

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Grow in={true} timeout={800}>
          <Paper
            elevation={24}
            sx={{
              borderRadius: 6,
              overflow: "hidden",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
            }}
          >
            {/* Header */}
            <Box
              sx={{
                background: "linear-gradient(135deg, #0c3c60 0%, #1e5a8a 100%)",
                color: "white",
                py: 4,
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"50\" cy=\"50\" r=\"1\" fill=\"%23ffffff\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg>')",
                  opacity: 0.1,
                }}
              />
              <Stack alignItems="center" spacing={2} sx={{ position: "relative" }}>
                <SecurityIcon sx={{ fontSize: 40, opacity: 0.9 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Commercial Investment Banking
                  </Typography>
                  <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                    Platform
                  </Typography>
                </Box>
              </Stack>
            </Box>

            {/* Content */}
            <Box sx={{ p: 6, textAlign: "center" }}>
              <Typography
                variant="h4"
                fontWeight="700"
                color="text.primary"
                sx={{ mb: 4 }}
              >
                KYC Status
              </Typography>

              {/* Status Icon */}
              <Box sx={{ mb: 4 }}>
                <Fade in={true} timeout={1000}>
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      margin: "0 auto",
                      backgroundColor: status === "Approved" ? "#e8f5e8" : "#fff3e0",
                      border: `4px solid ${status === "Approved" ? "#4caf50" : "#ff9800"}`,
                      boxShadow: `0 10px 30px ${
                        status === "Approved"
                          ? "rgba(76, 175, 80, 0.3)"
                          : "rgba(255, 152, 0, 0.3)"
                      }`,
                      transition: "all 0.5s ease",
                    }}
                  >
                    {status === "Approved" ? (
                      <CheckCircleOutlineIcon
                        sx={{
                          fontSize: 60,
                          color: "#4caf50",
                          animation: "checkmark 0.6s ease-in-out",
                          "@keyframes checkmark": {
                            "0%": {
                              transform: "scale(0)",
                              opacity: 0,
                            },
                            "50%": {
                              transform: "scale(1.2)",
                              opacity: 1,
                            },
                            "100%": {
                              transform: "scale(1)",
                              opacity: 1,
                            },
                          },
                        }}
                      />
                    ) : (
                      <HourglassBottomIcon
                        sx={{
                          fontSize: 60,
                          color: "#ff9800",
                          animation: "rotate 2s linear infinite",
                          "@keyframes rotate": {
                            "0%": {
                              transform: "rotate(0deg)",
                            },
                            "100%": {
                              transform: "rotate(360deg)",
                            },
                          },
                        }}
                      />
                    )}
                  </Avatar>
                </Fade>
              </Box>

              {/* Status Text */}
              <Typography
                variant="h5"
                fontWeight="600"
                color={status === "Approved" ? "#4caf50" : "#ff9800"}
                sx={{ mb: 3 }}
              >
                {status}
              </Typography>

              {/* Progress Section */}
              {status === "Pending" && (
                <Fade in={true} timeout={1200}>
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      Your KYC is under review...
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "#e0e0e0",
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 4,
                          background: "linear-gradient(90deg, #ff9800, #ffc107)",
                        },
                      }}
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      {progress}% Complete
                    </Typography>
                  </Box>
                </Fade>
              )}

              {/* Approved Section */}
              {status === "Approved" && (
                <Fade in={true} timeout={1500}>
                  <Box>
                    <Typography
                      variant="h6"
                      color="#4caf50"
                      fontWeight="600"
                      sx={{ mb: 2 }}
                    >
                      Verification Complete!
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                      Your KYC has been successfully verified.
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                      <CircularProgress size={20} sx={{ color: "#666" }} />
                      <Typography variant="body2" color="text.secondary">
                        Redirecting to dashboard...
                      </Typography>
                    </Box>
                  </Box>
                </Fade>
              )}

              {/* Loading indicator for pending */}
              {status === "Pending" && (
                <Box sx={{ mt: 2 }}>
                  <CircularProgress
                    size={40}
                    sx={{
                      color: "#ff9800",
                      animation: "pulse 2s infinite",
                      "@keyframes pulse": {
                        "0%": {
                          opacity: 1,
                          transform: "scale(1)",
                        },
                        "50%": {
                          opacity: 0.7,
                          transform: "scale(1.1)",
                        },
                        "100%": {
                          opacity: 1,
                          transform: "scale(1)",
                        },
                      },
                    }}
                  />
                </Box>
              )}
            </Box>
          </Paper>
        </Grow>
      </Container>
    </Box>
  );
};

export default KycStatus;