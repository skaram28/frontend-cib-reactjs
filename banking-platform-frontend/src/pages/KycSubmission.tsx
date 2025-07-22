import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  Chip,
  LinearProgress,
  Alert,
  styled,
  alpha,
  Fade,
  Slide,
  Zoom,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { Formik, Form } from "formik";
import type { FormikProps } from "formik";
import * as Yup from "yup";
import {
  Numbers,
  CloudUpload,
  CheckCircle,
  Description,
  Security,
  VerifiedUser,
  Delete,
  Info,
  FileUpload,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { submitKyc } from "../slices/kycSlice";

// --- Types ---
interface FormValues {
  aadhaarNumber: string;
  aadhaarFile: File | null;
  panNumber: string;
  panFile: File | null;
}

// --- Styled Components ---
const MainContainer = styled(Container)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  padding: "40px 24px",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)",
    pointerEvents: "none",
  },
}));

const AnimatedPaper = styled(Paper)(() => ({
  width: "100%",
  maxWidth: "1000px",
  padding: "48px 60px",
  borderRadius: "24px",
  background: "rgba(255,255,255,0.95)",
  backdropFilter: "blur(20px)",
  boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
  border: "1px solid rgba(255,255,255,0.2)",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: "linear-gradient(90deg, #667eea, #764ba2, #f093fb)",
    backgroundSize: "200% 100%",
    animation: "shimmer 3s ease-in-out infinite",
  },
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 35px 70px rgba(0,0,0,0.2)",
  },
  "@keyframes shimmer": {
    "0%": { backgroundPosition: "-200% 0" },
    "100%": { backgroundPosition: "200% 0" },
  },
}));

const SectionContainer = styled(Box)(() => ({
  display: "flex",
  gap: "40px",
  marginBottom: "32px",
  "@media (max-width:900px)": {
    flexDirection: "column",
    gap: "24px",
  },
}));

const SectionBox = styled(Box)(() => ({
  flex: 1,
  minWidth: 0,
}));

const GradientTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px",
    backgroundColor: "rgba(255,255,255,0.8)",
    border: "2px solid transparent",
    transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: "-100%",
      width: "100%",
      height: "100%",
      background:
        "linear-gradient(90deg, transparent, rgba(102,126,234,0.1), transparent)",
      transition: "left 0.6s ease",
    },
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.9)",
      borderColor: "#667eea",
      transform: "translateY(-2px)",
      boxShadow: "0 8px 25px rgba(102,126,234,0.2)",
      "&::before": {
        left: "100%",
      },
    },
    "&.Mui-focused": {
      backgroundColor: "rgba(255,255,255,1)",
      borderColor: "#667eea",
      boxShadow: "0 0 0 4px rgba(102,126,234,0.1)",
      transform: "translateY(-2px)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#4a5568",
    fontWeight: 600,
    "&.Mui-focused": {
      color: "#667eea",
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: "18px 16px",
    fontSize: "1.1rem",
    fontWeight: 500,
  },
}));

const FileUploadArea = styled(Box)<{ hasFile: boolean; isDragging?: boolean }>(
  ({ hasFile, isDragging }) => ({
    border: hasFile ? "3px solid #10b981" : "3px dashed #cbd5e1",
    borderColor: isDragging ? "#667eea" : hasFile ? "#10b981" : "#cbd5e1",
    borderRadius: "20px",
    padding: "32px 24px",
    textAlign: "center",
    cursor: "pointer",
    position: "relative",
    backgroundColor: hasFile
      ? "rgba(16,185,129,0.05)"
      : isDragging
      ? "rgba(102,126,234,0.05)"
      : "rgba(248,250,252,0.8)",
    transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
    overflow: "hidden",
    minHeight: "200px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: hasFile
        ? "linear-gradient(135deg,rgba(16,185,129,0.1),rgba(5,150,105,0.1))"
        : "linear-gradient(135deg,rgba(102,126,234,0.08),rgba(118,75,162,0.08))",
      opacity: 0,
      transition: "opacity 0.3s ease",
    },
    "&:hover": {
      borderColor: hasFile ? "#059669" : "#667eea",
      backgroundColor: hasFile ? "rgba(16,185,129,0.08)" : "rgba(102,126,234,0.08)",
      transform: "translateY(-4px) scale(1.02)",
      boxShadow: hasFile
        ? "0 20px 40px rgba(16,185,129,0.2)"
        : "0 20px 40px rgba(102,126,234,0.2)",
      "&::before": {
        opacity: 1,
      },
    },
    "& input": {
      display: "none",
    },
  })
);

const AnimatedButton = styled(Button)(() => ({
  borderRadius: "16px",
  padding: "16px 32px",
  fontSize: "1.1rem",
  fontWeight: 700,
  textTransform: "none",
  background: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
  boxShadow: "0 12px 24px rgba(102,126,234,0.3)",
  position: "relative",
  overflow: "hidden",
  maxWidth: "300px",
  margin: "0 auto",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)",
    transition: "left 0.6s ease",
  },
  "&:hover": {
    background: "linear-gradient(135deg,#5a67d8 0%,#6b46c1 100%)",
    boxShadow: "0 20px 40px rgba(102,126,234,0.4)",
    transform: "translateY(-2px)",
    "&::before": {
      left: "100%",
    },
  },
  "&:active": {
    transform: "translateY(0px)",
  },
  transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
}));

const SectionHeader = styled(Typography)(() => ({
  fontSize: "1.2rem",
  fontWeight: 800,
  color: "#374151",
  marginBottom: "20px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  position: "relative",
  "&::before": {
    content: '""',
    width: "4px",
    height: "24px",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    borderRadius: "2px",
    animation: "pulse 2s ease-in-out infinite",
  },
  "@keyframes pulse": {
    "0%": { transform: "scaleY(1)" },
    "50%": { transform: "scaleY(1.3)" },
    "100%": { transform: "scaleY(1)" },
  },
}));

const FileChip = styled(Chip)(() => ({
  backgroundColor: "rgba(16,185,129,0.1)",
  color: "#059669",
  fontWeight: 600,
  borderRadius: "12px",
  padding: "8px 4px",
  marginTop: "8px",
  maxWidth: "100%",
  "& .MuiChip-label": {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: "250px",
  },
  "& .MuiChip-deleteIcon": { color: "#dc2626", "&:hover": { color: "#b91c1c" } },
}));

// --- Main Component ---
const KYCSubmission: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragStates, setDragStates] = useState({ aadhaar: false, pan: false });

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    const kb = size / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    type: "aadhaar" | "pan"
  ) => {
    e.preventDefault();
    setDragStates((prev) => ({ ...prev, [type]: true }));
  };

  const handleDragLeave = (
    e: React.DragEvent<HTMLDivElement>,
    type: "aadhaar" | "pan"
  ) => {
    e.preventDefault();
    setDragStates((prev) => ({ ...prev, [type]: false }));
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    type: "aadhaar" | "pan",
    setFieldValue: (field: string, value: any) => void
  ) => {
    e.preventDefault();
    setDragStates((prev) => ({ ...prev, [type]: false }));
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFieldValue(type === "aadhaar" ? "aadhaarFile" : "panFile", file);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "aadhaarFile" | "panFile",
    setFieldValue: (field: string, value: any) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) setFieldValue(field, file);
  };

  const removeFile = (
    field: "aadhaarFile" | "panFile",
    setFieldValue: (field: string, value: any) => void
  ) => {
    setFieldValue(field, null);
  };

  const initialValues: FormValues = {
    aadhaarNumber: "",
    aadhaarFile: null,
    panNumber: "",
    panFile: null,
  };

  const validationSchema = Yup.object().shape({
    aadhaarNumber: Yup.string()
      .matches(/^\d{12}$/, "Must be exactly 12 digits")
      .required("Required"),
    aadhaarFile: Yup.mixed<File>().required("Required"),
    panNumber: Yup.string()
      .matches(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Format ABCDE1234F")
      .required("Required"),
    panFile: Yup.mixed<File>().required("Required"),
  });

  const handleSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    const currentDate = new Date().toISOString().split("T")[0];

    const payload = {
      user: { id: 1 },
      identityType: "Aadhaar + PAN",
      identityNumber: `${values.aadhaarNumber} | ${values.panNumber}`,
      documentUrl: "",
      documentType: values.aadhaarFile?.type || "PDF",
      status: "PENDING",
      submissionDate: currentDate,
      verifiedDate: "",
      verifiedBy: "",
      remarks: "KYC documents submitted",
      startDate: currentDate,
      endDate: currentDate,
      updatedDate: new Date().toISOString(),
    };

    dispatch(submitKyc(payload)).then((res) => {
      setIsSubmitting(false);
      if (submitKyc.fulfilled.match(res)) {
        navigate("/kyc-confirmation", { state: values });
      }
    });
  };

  return (
    <MainContainer maxWidth="lg">
      <Fade in timeout={1000}>
        <AnimatedPaper elevation={0}>
          <Slide direction="down" in timeout={1200}>
            <Box textAlign="center" mb={4}>
              <Zoom in timeout={1500}>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#667eea,#764ba2)",
                    mb: 3,
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: -3,
                      left: -3,
                      right: -3,
                      bottom: -3,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg,#667eea,#764ba2)",
                      opacity: 0.3,
                      animation: "rotate 4s linear infinite",
                    },
                    "@keyframes rotate": {
                      "0%": { transform: "rotate(0deg)" },
                      "100%": { transform: "rotate(360deg)" },
                    },
                  }}
                >
                  <Security sx={{ fontSize: 40, color: "white", zIndex: 1 }} />
                </Box>
              </Zoom>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  background: "linear-gradient(135deg,#667eea,#764ba2)",
                  backgroundClip: "text",
                  color: "transparent",
                  mb: 1,
                }}
              >
                KYC Submission
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#6b7280", fontWeight: 500, maxWidth: 500, mx: "auto" }}
              >
                Please upload your Aadhaar and PAN documents
              </Typography>
            </Box>
          </Slide>

          <Slide direction="up" in timeout={1400}>
            <Box mb={4}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Chip
                  label="Document Upload"
                  size="medium"
                  sx={{ backgroundColor: alpha("#667eea", 0.1), color: "#667eea", fontWeight: 600 }}
                />
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  Step 1 of 2
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={50}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: alpha("#667eea", 0.1),
                  "& .MuiLinearProgress-bar": {
                    background: "linear-gradient(90deg,#667eea,#764ba2)",
                  },
                }}
              />
            </Box>
          </Slide>

          <Fade in timeout={1600}>
            <Alert icon={<Info />} severity="info" sx={{ mb: 4 }}>
              Upload clear, readable documents in PDF, PNG, JPG, JPEG (Max 5MB each)
            </Alert>
          </Fade>

          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ handleChange, setFieldValue, errors, touched, values }: FormikProps<FormValues>) => (
              <Form noValidate>
                <SectionContainer>
                  <Fade in timeout={1800}>
                    <SectionBox>
                      <SectionHeader>
                        <VerifiedUser sx={{ color: "#667eea" }} /> Aadhaar
                      </SectionHeader>
                      <GradientTextField
                        fullWidth
                        label="Aadhaar Number"
                        name="aadhaarNumber"
                        placeholder="12-digit number"
                        value={values.aadhaarNumber}
                        onChange={handleChange}
                        error={touched.aadhaarNumber && Boolean(errors.aadhaarNumber)}
                        helperText={touched.aadhaarNumber && errors.aadhaarNumber}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Numbers sx={{ color: "#667eea" }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mb: 3 }}
                      />
                      <FileUploadArea
                        hasFile={!!values.aadhaarFile}
                        isDragging={dragStates.aadhaar}
                        onDragOver={(e) => handleDragOver(e, "aadhaar")}
                        onDragLeave={(e) => handleDragLeave(e, "aadhaar")}
                        onDrop={(e) => handleDrop(e, "aadhaar", setFieldValue)}
                        onClick={() => document.getElementById("aadhaar-file")?.click()}
                      >
                        <input
                          id="aadhaar-file"
                          type="file"
                          accept=".pdf,.png,.jpg,.jpeg"
                          onChange={(e) => handleFileChange(e, "aadhaarFile", setFieldValue)}
                        />
                        {values.aadhaarFile ? (
                          <Zoom in>
                            <Box>
                              <CheckCircle sx={{ fontSize: 48, color: "#10b981", mb: 1 }} />
                              <Typography variant="h6" color="#059669">
                                File Selected
                              </Typography>
                              <FileChip
                                label={`${values.aadhaarFile.name} (${formatFileSize(
                                  values.aadhaarFile.size
                                )})`}
                                onDelete={() => removeFile("aadhaarFile", setFieldValue)}
                                deleteIcon={<Delete />}
                              />
                            </Box>
                          </Zoom>
                        ) : (
                          <Box>
                            <CloudUpload sx={{ fontSize: 48, color: "#9ca3af", mb: 1 }} />
                            <Typography>Upload Aadhaar Document</Typography>
                          </Box>
                        )}
                      </FileUploadArea>
                      {touched.aadhaarFile && errors.aadhaarFile && (
                        <Typography color="error">{errors.aadhaarFile as string}</Typography>
                      )}
                    </SectionBox>
                  </Fade>

                  <Fade in timeout={2000}>
                    <SectionBox>
                      <SectionHeader>
                        <Description sx={{ color: "#667eea" }} /> PAN
                      </SectionHeader>
                      <GradientTextField
                        fullWidth
                        label="PAN Number"
                        name="panNumber"
                        placeholder="e.g. ABCDE1234F"
                        value={values.panNumber}
                        onChange={handleChange}
                        error={touched.panNumber && Boolean(errors.panNumber)}
                        helperText={touched.panNumber && errors.panNumber}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Numbers sx={{ color: "#667eea" }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mb: 3 }}
                      />
                      <FileUploadArea
                        hasFile={!!values.panFile}
                        isDragging={dragStates.pan}
                        onDragOver={(e) => handleDragOver(e, "pan")}
                        onDragLeave={(e) => handleDragLeave(e, "pan")}
                        onDrop={(e) => handleDrop(e, "pan", setFieldValue)}
                        onClick={() => document.getElementById("pan-file")?.click()}
                      >
                        <input
                          id="pan-file"
                          type="file"
                          accept=".pdf,.png,.jpg,.jpeg"
                          onChange={(e) => handleFileChange(e, "panFile", setFieldValue)}
                        />
                        {values.panFile ? (
                          <Zoom in>
                            <Box>
                              <CheckCircle sx={{ fontSize: 48, color: "#10b981", mb: 1 }} />
                              <Typography variant="h6" color="#059669">
                                File Selected
                              </Typography>
                              <FileChip
                                label={`${values.panFile.name} (${formatFileSize(values.panFile.size)})`}
                                onDelete={() => removeFile("panFile", setFieldValue)}
                                deleteIcon={<Delete />}
                              />
                            </Box>
                          </Zoom>
                        ) : (
                          <Box>
                            <CloudUpload sx={{ fontSize: 48, color: "#9ca3af", mb: 1 }} />
                            <Typography>Upload PAN Document</Typography>
                          </Box>
                        )}
                      </FileUploadArea>
                      {touched.panFile && errors.panFile && (
                        <Typography color="error">{errors.panFile as string}</Typography>
                      )}
                    </SectionBox>
                  </Fade>
                </SectionContainer>

                <Fade in timeout={2200}>
                  <Box textAlign="center">
                    <AnimatedButton
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={isSubmitting}
                      startIcon={
                        isSubmitting ? <CircularProgress size={20} color="inherit" /> : <FileUpload />
                      }
                      sx={{ mt: 2, py: 2, opacity: isSubmitting ? 0.8 : 1 }}
                    >
                      {isSubmitting ? "Processing..." : "Submit KYC"}
                    </AnimatedButton>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                      🔒 Your documents are secure and encrypted
                    </Typography>
                  </Box>
                </Fade>
              </Form>
            )}
          </Formik>
        </AnimatedPaper>
      </Fade>

      <Backdrop open={isSubmitting} sx={{ color: "#fff", background: "rgba(102,126,234,0.1)" }}>
        <Box textAlign="center">
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Processing Your Documents...
          </Typography>
        </Box>
      </Backdrop>
    </MainContainer>
  );
};

export default KYCSubmission;
