import {
  Box,
  Button,
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
import { getCurrentToken, loginUser } from "../slices/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../redux/store";

interface LoginValues {
  username: string;
  password: string;
}
const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const initialValues: LoginValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values: LoginValues) => {
   dispatch(loginUser(values)) .then((result) => {
      if (loginUser.fulfilled.match(result)) {
       const responseData = result.payload;
        console.log("Login successful", responseData);
        localStorage.setItem('token', responseData?.accessToken || '');
        localStorage.setItem('userId', responseData?.userId || '');
       const roles = responseData?.roles || [];
        console.log("User roles:", roles);
          Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome ${values.username}!`,
        confirmButtonColor: "#0c3c60",
      })
      // Redirect to dashboard or home page
       if (roles.includes("ROLE_USER")) {
           navigate("/dashboard");
       } else if (roles.includes("ROLE_ADMIN")) {
           navigate("/admin-dashboard");
       }
      //}
       //});
             }else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: result.payload as string,
          confirmButtonColor: "#0c3c60",
        });
      }
    });
  };

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

          <Typography
            variant="h6"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
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
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
