import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  Link,
} from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import users from "../data/users.json"; // ✅ Import JSON file

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values: any) => {
    const matchedUser = users.find(
      (user) =>
        user.username === values.username && user.password === values.password
    );

    if (matchedUser) {
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome ${matchedUser.username}!`,
        confirmButtonColor: "#0c3c60",
      }).then(() => {
        navigate("/dashboard");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Credentials",
        text: "Please check your username and password",
        confirmButtonColor: "#d33",
      });
    }
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
      <Paper elevation={4} sx={{ width: "100%", padding: 4, borderRadius: 3 }}>
        {/* Header */}
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

        <Typography variant="h6" align="center" fontWeight="bold" gutterBottom>
          Login
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

              <Box sx={{ textAlign: "right", mt: 1 }}>
                <Link
                  underline="hover"
                  variant="body2"
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot password?
                </Link>
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
                Login
              </Button>

              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Typography variant="body2">
                  Don’t have an account?{" "}
                  <Link
                    onClick={() => navigate("/register")}
                    underline="hover"
                    sx={{ cursor: "pointer", color: "#0c3c60" }}
                  >
                    Register
                  </Link>
                </Typography>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default Login;
