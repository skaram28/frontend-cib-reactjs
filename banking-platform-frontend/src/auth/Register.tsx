import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Divider,
  InputAdornment,
} from "@mui/material";
import {
  AccountCircle,
  Lock,
  Email,
  Home,
  Phone,
  Business,
  Numbers,
} from "@mui/icons-material";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface RegisterValues {
  username: string;
  password: string;
  email: string;
  fullName: string;
  phone: string;
  address: string;
  companyName: string;
  registrationNumber: string;
  kycDocument: File | null;
}

const Register = () => {
  const [userType, setUserType] = useState<"Individual" | "Company">(
    "Individual"
  );
  const navigate = useNavigate();

  const initialValues: RegisterValues = {
    username: "",
    password: "",
    email: "",
    fullName: "",
    phone: "",
    address: "",
    companyName: "",
    registrationNumber: "",
    kycDocument: null,
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    fullName: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    ...(userType === "Company" && {
      companyName: Yup.string().required("Required"),
      registrationNumber: Yup.string().required("Required"),
      kycDocument: Yup.mixed().required("KYC Document is required"),
    }),
  });

  const handleSubmit = (values: RegisterValues) => {
    const dataToSend = {
      ...values,
      userType,
    };
    //console.log("Submitted:", dataToSend);

    Swal.fire({
      icon: "success",
      title: "Registration completed successfully",
      text:
        userType === "Individual"
          ? "Please complete your KYC to proceed."
          : "Please Login",
      confirmButtonColor: "#0c3c60",
      confirmButtonText:
        userType === "Individual" ? "Go to KYC" : "Go to Login",
    }).then((result) => {
      if (result.isConfirmed) {
        if (userType === "Individual") {
          navigate("/kyc-submission"); // ✅ Navigate to KYC page
        } else {
          navigate("/"); // ✅ Navigate to Login page
        }
      }
    });
  };

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Box
          component="img"
          src="https://png.pngtree.com/thumb_back/fw800/background/20230715/pngtree-d-render-golden-globe-and-a-tower-of-gold-coins-symbolizing-image_3875015.jpg"
          alt="Finance"
          sx={{
            width: "100vw",
            height: "50vh",
            objectFit: "cover",
            display: "block",
            borderRadius: 5,
          }}
        />
      </Box>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper sx={{ padding: 4 }}>
          <Box
            sx={{
              backgroundColor: "#000",
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

          <Typography
            variant="h6"
            fontWeight="bold"
            align="center"
            gutterBottom
          >
            Register as{" "}
            {userType === "Individual" ? "an Individual" : "a Company"}
          </Typography>

          <ToggleButtonGroup
            fullWidth
            exclusive
            value={userType}
            onChange={(_, newValue) => newValue && setUserType(newValue)}
            sx={{
              mb: 3,
              "& .MuiToggleButton-root": {
                flex: 1,
                fontWeight: 600,
                border: "1px solid #c4c4c4",
                color: "#0c3c60",
                "&.Mui-selected": {
                  backgroundColor: "#0c3c60",
                  color: "#fff",
                },
              },
            }}
          >
            <ToggleButton value="Individual">Individual</ToggleButton>
            <ToggleButton value="Company">Company</ToggleButton>
          </ToggleButtonGroup>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, setFieldValue, errors, touched, values }) => (
              <Form>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Username"
                  name="username"
                  onChange={handleChange}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  label="Password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  label="Full Name"
                  name="fullName"
                  onChange={handleChange}
                  error={touched.fullName && Boolean(errors.fullName)}
                  helperText={touched.fullName && errors.fullName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  label="Phone"
                  name="phone"
                  onChange={handleChange}
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  label="Address"
                  name="address"
                  onChange={handleChange}
                  error={touched.address && Boolean(errors.address)}
                  helperText={touched.address && errors.address}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Home />
                      </InputAdornment>
                    ),
                  }}
                />

                {userType === "Company" && (
                  <>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Company Details
                    </Typography>

                    <TextField
                      fullWidth
                      margin="normal"
                      label="Company Name"
                      name="companyName"
                      onChange={handleChange}
                      error={touched.companyName && Boolean(errors.companyName)}
                      helperText={touched.companyName && errors.companyName}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Business />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      fullWidth
                      margin="normal"
                      label="Registration Number"
                      name="registrationNumber"
                      onChange={handleChange}
                      error={
                        touched.registrationNumber &&
                        Boolean(errors.registrationNumber)
                      }
                      helperText={
                        touched.registrationNumber && errors.registrationNumber
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Numbers />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Box mt={2}>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Upload KYC Document
                      </Typography>
                      <input
                        name="kycDocument"
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={(event) =>
                          setFieldValue(
                            "kycDocument",
                            event.currentTarget.files?.[0] || null
                          )
                        }
                      />
                      {values.kycDocument && (
                        <Typography variant="caption" display="block" mt={1}>
                          Selected File: {values.kycDocument.name}
                        </Typography>
                      )}
                      {touched.kycDocument && errors.kycDocument && (
                        <Typography color="error" variant="body2">
                          {errors.kycDocument as string}
                        </Typography>
                      )}
                    </Box>
                  </>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 4,
                    backgroundColor: "#0c3c60",
                    py: 1.5,
                    fontWeight: 600,
                  }}
                >
                  Register
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    </>
  );
};

export default Register;
