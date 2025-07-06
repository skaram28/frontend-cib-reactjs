import React from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Numbers } from "@mui/icons-material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const KYCSubmission = () => {
  const navigate = useNavigate();

  const initialValues = {
    aadhaarNumber: "",
    aadhaarFile: null as File | null,
    panNumber: "",
    panFile: null as File | null,
  };

  const validationSchema = Yup.object().shape({
    aadhaarNumber: Yup.string().required("Aadhaar Number is required"),
    aadhaarFile: Yup.mixed().required("Aadhaar File is required"),
    panNumber: Yup.string().required("PAN Number is required"),
    panFile: Yup.mixed().required("PAN File is required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    console.log("Mock Submission Data:", values);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    Swal.fire({
      icon: "success",
      title: "KYC Submitted Successfully",
      text: "After verification you will proceed.",
      confirmButtonColor: "#0c3c60",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/"); // Redirect to login page
      }
    });
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
        <Typography variant="h6" fontWeight="bold" align="center" gutterBottom>
          KYC Submission
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, setFieldValue, errors, touched, values }) => (
            <Form>
              {/* Aadhaar Number */}
              <TextField
                fullWidth
                margin="normal"
                label="Aadhaar Number"
                name="aadhaarNumber"
                onChange={handleChange}
                value={values.aadhaarNumber}
                error={touched.aadhaarNumber && Boolean(errors.aadhaarNumber)}
                helperText={touched.aadhaarNumber && errors.aadhaarNumber}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Numbers />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Aadhaar File */}
              <Box mt={2}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Upload Aadhaar File
                </Typography>
                <input
                  name="aadhaarFile"
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(event) =>
                    setFieldValue("aadhaarFile", event.currentTarget.files?.[0])
                  }
                />
                {values.aadhaarFile && (
                  <Typography variant="caption" display="block" mt={1}>
                    Selected File: {values.aadhaarFile.name}
                  </Typography>
                )}
                {touched.aadhaarFile && errors.aadhaarFile && (
                  <Typography color="error" variant="body2">
                    {errors.aadhaarFile as string}
                  </Typography>
                )}
              </Box>

              {/* PAN Number */}
              <TextField
                fullWidth
                margin="normal"
                label="PAN Number"
                name="panNumber"
                onChange={handleChange}
                value={values.panNumber}
                error={touched.panNumber && Boolean(errors.panNumber)}
                helperText={touched.panNumber && errors.panNumber}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Numbers />
                    </InputAdornment>
                  ),
                }}
              />

              {/* PAN File */}
              <Box mt={2}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Upload PAN File
                </Typography>
                <input
                  name="panFile"
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(event) =>
                    setFieldValue("panFile", event.currentTarget.files?.[0])
                  }
                />
                {values.panFile && (
                  <Typography variant="caption" display="block" mt={1}>
                    Selected File: {values.panFile.name}
                  </Typography>
                )}
                {touched.panFile && errors.panFile && (
                  <Typography color="error" variant="body2">
                    {errors.panFile as string}
                  </Typography>
                )}
              </Box>

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
                Submit KYC
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default KYCSubmission;
