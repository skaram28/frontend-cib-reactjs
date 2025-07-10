import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Divider,
  Card,
  CardContent,
  Stack,
  Chip,
  Avatar,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import type { Location } from "react-router-dom";
import {
  AccountBalanceWallet,
  CreditCard,
  Description,
  CheckCircle,
  Security,
} from "@mui/icons-material";

interface KycState {
  aadhaarNumber?: string;
  aadhaarFile?: File;
  panNumber?: string;
  panFile?: File;
}

interface DetailCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle?: string;
}

const DetailCard: React.FC<DetailCardProps> = ({
  icon,
  title,
  value,
  subtitle,
}) => (
  <Card
    sx={{
      borderRadius: 2,
      border: "1px solid #e0e0e0",
      transition: "all 0.3s ease",
      "&:hover": {
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        transform: "translateY(-2px)",
      },
    }}
  >
    <CardContent sx={{ p: 3 }}>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Avatar
          sx={{
            backgroundColor: "#e3f2fd",
            color: "#1976d2",
            width: 48,
            height: 48,
          }}
        >
          {icon}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle1"
            fontWeight="600"
            color="text.primary"
            gutterBottom
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ wordBreak: "break-word", mb: 1 }}
          >
            {value}
          </Typography>
          {subtitle && (
            <Chip
              label={subtitle}
              size="small"
              variant="outlined"
              sx={{
                backgroundColor: "#f0f7ff",
                color: "#1976d2",
                border: "1px solid #bbdefb",
                fontSize: "0.75rem",
              }}
            />
          )}
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

const KycConfirmation: React.FC = () => {
  // cast location.state to our KycState interface
  const location = useLocation() as Location & { state: KycState };
  const { aadhaarNumber, aadhaarFile, panNumber, panFile } = location.state || {};
  const navigate = useNavigate();

  const handleConfirm = () => {
    // TODO: save to backend…
    navigate("/kyc-status");
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: "100%",
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #0c3c60 0%, #1e5a8a 100%)",
            color: "white",
            textAlign: "center",
            py: 4,
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
              background:
                "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"50\" cy=\"50\" r=\"1\" fill=\"%23ffffff\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg>')",
              opacity: 0.1,
            }}
          />
          <Stack alignItems="center" spacing={2} sx={{ position: "relative" }}>
            <Security sx={{ fontSize: 40, opacity: 0.9 }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                Commercial Investment Banking
              </Typography>
              <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                Platform
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Content */}
        <Box sx={{ p: 4 }}>
          <Stack alignItems="center" spacing={1} sx={{ mb: 4 }}>
            <CheckCircle sx={{ fontSize: 32, color: "#4caf50" }} />
            <Typography
              variant="h4"
              fontWeight="700"
              color="text.primary"
              textAlign="center"
            >
              Confirm Your KYC Details
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
              sx={{ maxWidth: 400 }}
            >
              Please review your submitted information before final confirmation
            </Typography>
          </Stack>

          <Divider sx={{ mb: 4 }} />

          <Stack spacing={3} sx={{ mb: 4 }}>
            <DetailCard
              icon={<CreditCard />}
              title="Aadhaar Number"
              value={aadhaarNumber || "Not provided"}
              subtitle="Identity Document"
            />

            <DetailCard
              icon={<Description />}
              title="Aadhaar File"
              value={aadhaarFile?.name || "No file uploaded"}
              subtitle="Document Attachment"
            />

            <DetailCard
              icon={<AccountBalanceWallet />}
              title="PAN Number"
              value={panNumber || "Not provided"}
              subtitle="Tax Document"
            />

            <DetailCard
              icon={<Description />}
              title="PAN File"
              value={panFile?.name || "No file uploaded"}
              subtitle="Document Attachment"
            />
          </Stack>

          <Box
            sx={{
              backgroundColor: "#f8f9fa",
              borderRadius: 2,
              p: 3,
              mb: 4,
              border: "1px solid #e9ecef",
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              sx={{ mb: 2 }}
            >
              By confirming, you agree that the information provided is accurate
              and complete. This will initiate the KYC verification process.
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleConfirm}
            sx={{
              background: "linear-gradient(135deg, #0c3c60 0%, #1e5a8a 100%)",
              py: 2,
              fontWeight: 600,
              fontSize: "1.1rem",
              borderRadius: 2,
              boxShadow: "0 6px 20px rgba(12, 60, 96, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(12, 60, 96, 0.4)",
                background: "linear-gradient(135deg, #1e5a8a 0%, #0c3c60 100%)",
              },
            }}
          >
            Confirm and Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default KycConfirmation;
