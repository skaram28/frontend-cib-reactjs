import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  LinearProgress,
  Chip,
  Alert,
  Fade,
  Card,
  CardContent,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { 
  Numbers, 
  CloudUpload, 
  CheckCircle, 
  Person, 
  CreditCard,
  Security,
  Upload
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const KYCSubmission = () => {
  const navigate = useNavigate();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    aadhaarNumber: "",
    aadhaarFile: null as File | null,
    panNumber: "",
    panFile: null as File | null,
  };

  const validationSchema = Yup.object().shape({
    aadhaarNumber: Yup.string()
      .matches(/^\d{12}$/, "Aadhaar number must be 12 digits")
      .required("Aadhaar Number is required"),
    aadhaarFile: Yup.mixed().required("Aadhaar File is required"),
    panNumber: Yup.string()
      .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format")
      .required("PAN Number is required"),
    panFile: Yup.mixed().required("PAN File is required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    setIsSubmitting(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            navigate("/dashboard", { state: values });
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

interface FileUploadBoxProps {
  label: string;
  name: string;
  file: File | null;
  // only files ever come through here, so narrow from `any` to `File | null`
  setFieldValue: (field: string, value: File | null) => void;
  error?: string;
  touched?: boolean;
  icon: React.ReactNode;
}

  const FileUploadBox = ({ 
    label, 
    name, 
    file, 
    setFieldValue, 
    error, 
    touched, 
    icon 
  }: FileUploadBoxProps) => (
    <Card 
      sx={{ 
        mt: 2, 
        border: error && touched ? '2px solid #f44336' : '2px dashed #e0e0e0',
        borderRadius: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: '#2196f3',
          backgroundColor: '#fafafa'
        }
      }}
    >
      <CardContent sx={{ textAlign: 'center', py: 3 }}>
        <Box sx={{ mb: 2 }}>
          {icon}
        </Box>
        <Typography variant="body2" sx={{ mb: 2, fontWeight: 500 }}>
          {label}
        </Typography>
        
        <input
          id={name}
          name={name}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={e => setFieldValue(name, e.currentTarget.files?.[0] ?? null)}
          style={{ display: 'none' }}
        />
        
        <label htmlFor={name}>
          <Button
            variant="outlined"
            component="span"
            startIcon={<CloudUpload />}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
              px: 3
            }}
          >
            Choose File
          </Button>
        </label>
        
        {file && (
          <Fade in={true}>
            <Box sx={{ mt: 2 }}>
              <Chip
                icon={<CheckCircle />}
                label={file.name}
                color="success"
                variant="outlined"
                sx={{ fontWeight: 500 }}
              />
            </Box>
          </Fade>
        )}
        
        {error && touched && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Security sx={{ fontSize: 48, color: 'white', mb: 2 }} />
          <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
            KYC Verification
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            Secure your account with document verification
          </Typography>
        </Box>

        <Paper 
          elevation={20} 
          sx={{ 
            p: 5, 
            borderRadius: 4,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
            maxWidth: 600,
            mx: 'auto'
          }}
        >
          <Alert 
            severity="info" 
            sx={{ 
              mb: 3, 
              borderRadius: 2,
              '& .MuiAlert-message': { fontWeight: 500 }
            }}
          >
            Please upload clear, readable documents in PDF, PNG, or JPG format
          </Alert>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, setFieldValue, errors, touched, values }) => (
              <Form>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <Person sx={{ mr: 1, color: '#2196f3' }} />
                    Aadhaar Details
                  </Typography>
                  
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Aadhaar Number"
                    name="aadhaarNumber"
                    onChange={handleChange}
                    value={values.aadhaarNumber}
                    error={touched.aadhaarNumber && Boolean(errors.aadhaarNumber)}
                    helperText={touched.aadhaarNumber && errors.aadhaarNumber}
                    placeholder="Enter 12-digit Aadhaar number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Numbers sx={{ color: '#2196f3' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#2196f3',
                          },
                        },
                      },
                    }}
                  />

                  <FileUploadBox
                    label="Upload Aadhaar Document"
                    name="aadhaarFile"
                    file={values.aadhaarFile}
                    setFieldValue={setFieldValue}
                    error={errors.aadhaarFile}
                    touched={touched.aadhaarFile}
                    icon={<Upload sx={{ fontSize: 40, color: '#2196f3' }} />}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <CreditCard sx={{ mr: 1, color: '#ff9800' }} />
                    PAN Details
                  </Typography>
                  
                  <TextField
                    fullWidth
                    margin="normal"
                    label="PAN Number"
                    name="panNumber"
                    onChange={handleChange}
                    value={values.panNumber.toUpperCase()}
                    error={touched.panNumber && Boolean(errors.panNumber)}
                    helperText={touched.panNumber && errors.panNumber}
                    placeholder="Enter PAN number (e.g., ABCDE1234F)"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Numbers sx={{ color: '#ff9800' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#ff9800',
                          },
                        },
                      },
                    }}
                  />

                  <FileUploadBox
                    label="Upload PAN Document"
                    name="panFile"
                    file={values.panFile}
                    setFieldValue={setFieldValue}
                    error={errors.panFile}
                    touched={touched.panFile}
                    icon={<Upload sx={{ fontSize: 40, color: '#ff9800' }} />}
                  />
                </Box>

                {isSubmitting && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Uploading documents... {uploadProgress}%
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={uploadProgress} 
                      sx={{ borderRadius: 1, height: 8 }}
                    />
                  </Box>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    mt: 4,
                    py: 2,
                    borderRadius: 3,
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    background: 'linear-gradient(45deg, #2196f3, #21cbf3)',
                    boxShadow: '0 8px 32px rgba(33, 150, 243, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1976d2, #0288d1)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 40px rgba(33, 150, 243, 0.4)',
                    },
                    '&:disabled': {
                      background: '#ccc',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {isSubmitting ? 'Processing...' : 'Submit KYC Documents'}
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    </Box>
  );
};

export default KYCSubmission;