import React, { useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  Link,
  CircularProgress,
} from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Redux imports
import {
  loginUser,
  getLoginLoading,
  getLoginError,
  getCurrentUser,
} from "../slices/loginSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

interface LoginValues {
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loading = useAppSelector(getLoginLoading);
  const error = useAppSelector(getLoginError);
  const user = useAppSelector(getCurrentUser);

  const initialValues: LoginValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values: LoginValues) => {
    if (!loading) {
      dispatch(loginUser(values));
    }
  };

  useEffect(() => {
    if (user) {
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome ${user.username}!`,
        confirmButtonColor: "#0c3c60",
      }).then(() => {
        navigate(user.role === "Admin" ? "/admin-dashboard" : "/dashboard");
      });
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Invalid Credentials",
        text: error,
        confirmButtonColor: "#d33",
      });
    }
  }, [error]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          maxWidth: "900px",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src="https://simplystakeholders.com/wp-content/uploads/2023/05/illustration-report-graphs.png"
          alt="Login"
          sx={{
            width: { xs: "100%", md: "50%" },
            height: { xs: "200px", md: "100%" },
            objectFit: "cover",
          }}
        />
        <Box sx={{ flex: 1, p: { xs: 3, md: 4 } }}>
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
            {(formik: { values: { username: any; password: any; }; handleChange: any; handleBlur: any; touched: { username: any; password: any; }; errors: { username: any; password: any; }; }) => (
              <Form>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Username"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
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
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
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
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
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
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
