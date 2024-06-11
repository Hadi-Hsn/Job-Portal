import { Avatar, Box, MenuItem, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import LockClockOutlined from "@mui/icons-material/LockClockOutlined";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { userSignUpAction } from "../redux/actions/userAction";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { ROLES } from "../constants/roles";

const validationSchema = yup.object({
  firstName: yup
    .string("Enter your First Name")
    .min(3, "First Name should be of minimum 3 characters length")
    .required("First Name is required"),
  lastName: yup
    .string("Enter your Last Name")
    .min(3, "Last Name should be of minimum 3 characters length")
    .required("Last Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  role: yup.number("Select your role").required("Role is required"),
  description: yup.string("Enter your description").when("role", {
    is: (value) => value === ROLES.EMPLOYEE,
    then: () => yup.string().required("Description is required for employees"),
    otherwise: () => yup.string().notRequired(),
  }),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { palette } = useTheme();
  const { isAuthenticated, userInfo } = useSelector((state) => state.signIn);
  useEffect(() => {
    if (isAuthenticated) {
      switch (userInfo.role) {
        case 0:
          navigate("/employee/dashboard");
          break;
        case 1:
          navigate("/employer/dashboard");
          break;
        case 2:
          navigate("/admin/dashboard");
          break;
        default:
          navigate("/");
      }
    }
  }, [isAuthenticated]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      description: null,
      role: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      dispatch(userSignUpAction(values));
      actions.resetForm();
    },
  });

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "calc(100vh - 140px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "primary.white",
        }}
      >
        <Box
          onSubmit={formik.handleSubmit}
          component="form"
          className="form_style border-style"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main", mb: 3 }}>
              <LockClockOutlined sx={{ color: "white" }} />
            </Avatar>
            <TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: "text.secondary",
                },
                fieldset: { borderColor: "rgb(231, 235, 240)" },
              }}
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: "text.secondary",
                },
                fieldset: { borderColor: "rgb(231, 235, 240)" },
              }}
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />

            <TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: "text.secondary",
                },
                fieldset: { borderColor: "rgb(231, 235, 240)" },
              }}
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="E-mail"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: "text.secondary",
                },
                fieldset: { borderColor: "rgb(231, 235, 240)" },
              }}
              fullWidth
              id="role"
              name="role"
              label="Role"
              placeholder="Role"
              select
              InputLabelProps={{
                shrink: true,
              }}
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.role && Boolean(formik.errors.role)}
              helperText={formik.touched.role && formik.errors.role}
            >
              <MenuItem value={0}>Employee</MenuItem>
              <MenuItem value={1}>Employer</MenuItem>
            </TextField>

            {formik.values.role === ROLES.EMPLOYEE && (
              <TextField
                sx={{
                  mb: 3,
                  "& .MuiInputBase-root": {
                    color: "text.secondary",
                  },
                  fieldset: { borderColor: "rgb(231, 235, 240)" },
                }}
                fullWidth
                id="description"
                label="Description"
                name="description"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            )}
            <TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: "text.secondary",
                },
                fieldset: { borderColor: "rgb(231, 235, 240)" },
              }}
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <Typography sx={{ margin: "-10px 0 10px 0" }}>
              <Link
                style={{
                  textDecoration: "none",
                  color: palette.primary.main,
                }}
                to="/login"
              >
                Already have an account? Login
              </Link>
            </Typography>

            <Button fullWidth variant="contained" type="submit">
              Sign Up
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default SignUp;
