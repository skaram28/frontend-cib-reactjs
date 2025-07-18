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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "../redux/store"; // ✅ Adjust path to your store file
import { submitKyc } from "../slices/kycSlice" // ✅ Adjust path to your slice

const KYCSubmission = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>(); // ✅ Proper typed dispatch for async thunk

  // const loading = useSelector(getKycLoading);
  // const error = useSelector(getKycError);

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

const handleSubmit = (values: typeof initialValues) => {
  console.log("Form values:", values);

  const currentDate = new Date().toISOString().split("T")[0]; // e.g. "2025-07-17"

  const kycPayload = {
    user: { id: 1 }, // Replace with actual user ID if available from auth

    // Dynamically binding values from Formik
    identityType: "Aadhaar + PAN",
    identityNumber: `${values.aadhaarNumber} | ${values.panNumber}`,
    documentUrl: "", // You can upload the file and get a URL here
    documentType: values.aadhaarFile?.type || "PDF",

    // Static or system-generated metadata
    status: "PENDING",
    submissionDate: currentDate,
    verifiedDate: "", // empty until verification
    verifiedBy: "",   // empty until verification
    remarks: "KYC documents submitted by user.",
    startDate: currentDate,
    endDate: "2026-07-17",
    updatedDate: new Date().toISOString(),
  };

  dispatch(submitKyc(kycPayload)).then((res) => {
    if (submitKyc.fulfilled.match(res)) {
      navigate("/kyc-confirmation", { state: values });
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

              <Box mt={2}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Upload Aadhaar File
                </Typography>
                <input
                  name="aadhaarFile"
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) =>
                    setFieldValue("aadhaarFile", e.currentTarget.files?.[0])
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

              <Box mt={2}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Upload PAN File
                </Typography>
                <input
                  name="panFile"
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) =>
                    setFieldValue("panFile", e.currentTarget.files?.[0])
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
