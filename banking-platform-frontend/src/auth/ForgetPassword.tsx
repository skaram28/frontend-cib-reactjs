import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

interface ForgotPasswordValues {
  email: string;
}

const ForgotPassword = () => {
  const navigate = useNavigate();

  const initialValues: ForgotPasswordValues = { email: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const handleSubmit = (values: ForgotPasswordValues) => {
    console.log("Forgot Password Request:", values);
    // API call here
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f7fa",
      }}
    >
      <Paper elevation={4} sx={{ padding: 4, borderRadius: 3, width: "100%" }}>
        {/* Header */}
        <Box
          sx={{
            backgroundColor: "#000",
            color: "#fff",
            textAlign: "center",
            py: 1.5,
            borderRadius: 1,
            mb: 3,
          }}
        >
          <Typography variant="subtitle2" fontWeight={500}>
            Commercial Investment Banking
          </Typography>
          <Typography variant="subtitle2" fontWeight={500}>
            Platform
          </Typography>
        </Box>

        <Typography variant="h6" align="center" fontWeight="bold" gutterBottom>
          Forgot Password
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, errors, touched }) => (
            <Form>
              <TextField
                fullWidth
                label="Registered Email"
                name="email"
                margin="normal"
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, backgroundColor: "#0c3c60", py: 1.5 }}
              >
                Send Reset Link
              </Button>

              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => navigate("/")}
              >
                Back to Login
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
