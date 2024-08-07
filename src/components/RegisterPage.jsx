import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  Container,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { saveUser } from "../utils/storage";
import { useNavigate } from "react-router-dom";

const countriesWithCities = {
  Egypt: ["Cairo", "Alexandria", "Giza", "Ismailia"],
  Saudi: ["Al Damam", "AL Ryad", "Geda"],
};

const RegisterPage = () => {
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      gender: "",
      country: "",
      city: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Firstname is required"),
      lastname: Yup.string().required("Lastname is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .matches(/[!@#$%^&*]/, "Must include a special character")
        .required("Password is required"),
      gender: Yup.string().required("Gender is required"),
      country: Yup.string().required("Country is required"),
      city: Yup.string().required("City is required"),
    }),
    onSubmit: (values) => {
      saveUser(values);
      console.log("Form submitted successfully", values);
      navigate("/login", { replace: true });
    },
  });

  useEffect(() => {
    if (formik.values.country) {
      setCities(countriesWithCities[formik.values.country]);
    } else {
      setCities([]);
    }
  }, [formik.values.country]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Box mb={3}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Register
          </Typography>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Firstname"
            name="firstname"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            error={formik.touched.firstname && !!formik.errors.firstname}
            helperText={formik.touched.firstname && formik.errors.firstname}
          />
          <TextField
            label="Lastname"
            name="lastname"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            error={formik.touched.lastname && !!formik.errors.lastname}
            helperText={formik.touched.lastname && formik.errors.lastname}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            error={formik.touched.password && !!formik.errors.password}
            helperText={
              formik.touched.password &&
              (formik.errors.password ||
                "Must include at least 6 characters and a special character")
            }
          />
          <FormControl
            component="fieldset"
            fullWidth
            error={formik.touched.gender && !!formik.errors.gender}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              row>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
            {formik.touched.gender && formik.errors.gender && (
              <Typography color="error">{formik.errors.gender}</Typography>
            )}
          </FormControl>
          <FormControl
            fullWidth
            error={formik.touched.country && !!formik.errors.country}>
            <InputLabel>Country</InputLabel>
            <Select
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}>
              {Object.keys(countriesWithCities).map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.country && formik.errors.country && (
              <Typography color="error">{formik.errors.country}</Typography>
            )}
          </FormControl>
          <FormControl
            fullWidth
            error={formik.touched.city && !!formik.errors.city}
            disabled={!formik.values.country}>
            <InputLabel>City</InputLabel>
            <Select
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={!formik.values.country}>
              {cities.map((city, index) => (
                <MenuItem key={index} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.city && formik.errors.city && (
              <Typography color="error">{formik.errors.city}</Typography>
            )}
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
