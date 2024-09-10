"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import { Container, Typography, Box } from "@mui/material";
import { toast } from "react-toastify";
import { InputLabel, MenuItem, Button } from "@mui/material";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import useSignUp from "@/app/_hooks/Auth/useSignUp";
import { useFormik } from "formik";
import { Dayjs } from "dayjs";
import * as Yup from "yup";
import IIinitialValues from "../../_interfaces/IIinitialValues";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const { mutateAsync, isPending, failureReason } = useSignUp();

  const initialValues: IIinitialValues = {
    name: "aaa",
    email: "aaa@yahoo.com",
    password: "Bahnsy@123",
    rePassword: "Bahnsy@123",
    dateOfBirth: null,
    gender: "male",
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("First Name is required")
      .min(3, "First Name must be at least 3 characters"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{10,}$/,
        "Password must be at least 8 characters long, include at least one letter and one number"
      ),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    gender: Yup.string().required("Gender is required"),
    dateOfBirth: Yup.string().required("Date of Birth is required"),
  });
  const onSubmitFormik = async (values: IIinitialValues) => {
    const dataToSend = {
      name: values.name,
      email: values.email,
      password: values.password,
      rePassword: values.rePassword,
      dateOfBirth: values.dateOfBirth
        ? `${values.dateOfBirth.$M + 1}-${values.dateOfBirth.$D}-${
            values.dateOfBirth.$y
          }`
        : "",
      gender: values.gender,
    };
    console.log(dataToSend);
    const req = await mutateAsync(dataToSend);
    if (req.status == 201) {
      toast.success("Your account has been created successfully");
      console.log(req);
      console.log("Created successfully");
      router.push("/Login");
    } else {
      console.log(req);
    }
  };

  const {
    touched,
    errors,
    handleBlur,
    handleSubmit: handleSubmitFormik,
    values,
    handleChange: handleChangeFormik,
    validateOnBlur,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      onSubmitFormik(values);
    },
  });

  return (
    <Container maxWidth="sm">
      <form>
        <Box sx={{ py: 10 }}>
          <Typography variant="h4" sx={{ textAlign: "center", color: "white" }}>
            Registeration
          </Typography>
          <TextField
            onChange={handleChangeFormik}
            value={values.name}
            onBlur={handleBlur}
            id="outlined-basic"
            label="Name"
            variant="filled"
            type="text"
            name="name"
            fullWidth
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
            sx={{ mt: 2 }}
          />
          <TextField
            onChange={handleChangeFormik}
            value={values.email}
            onBlur={handleBlur}
            name="email"
            id="outlined-basic"
            label="Email"
            variant="filled"
            type="email"
            fullWidth
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            sx={{ mt: 2 }}
          />
          <TextField
            onChange={handleChangeFormik}
            value={values.password}
            onBlur={handleBlur}
            name="password"
            id="outlined-basic"
            label="Passowrd"
            variant="filled"
            type="password"
            fullWidth
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            sx={{ mt: 2 }}
          />
          <TextField
            onChange={handleChangeFormik}
            value={values.rePassword}
            onBlur={handleBlur}
            name="rePassword"
            id="outlined-basic"
            label="RePassword"
            variant="filled"
            type="password"
            fullWidth
            error={touched.rePassword && Boolean(errors.rePassword)}
            helperText={touched.rePassword && errors.rePassword}
            sx={{ mt: 2 }}
          />
          <InputLabel sx={{ mt: 2 }} id="demo-simple-select-label">
            Gender
          </InputLabel>
          <Select
            value={values.gender}
            onBlur={handleBlur}
            name="gender"
            fullWidth
            placeholder="Gender"
            variant="filled"
            label="Gender"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            error={touched.gender && Boolean(errors.gender)}
            onChange={(e) => {
              handleChangeFormik(e);
            }}
          >
            <MenuItem selected value="male">
              Male
            </MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
          <Box sx={{ mt: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date Of Birth"
                value={values.dateOfBirth}
                onChange={(date: Dayjs | null) =>
                  setFieldValue("dateOfBirth", date)
                }
                sx={{ width: "100%" }}
              />
              <Box sx={{ color: "red", py: 1 }}>
                {touched.dateOfBirth &&
                  touched.dateOfBirth &&
                  errors.dateOfBirth}
              </Box>
            </LocalizationProvider>
          </Box>
          <Button
            disabled={isPending}
            onClick={() => {
              handleSubmitFormik();
            }}
            sx={{
              mt: 2,
              height: 40,
              bgcolor: "transparent",
              borderRadius: 4,
              border: "1px solid #28343E",
              color: "white",
            }}
            fullWidth
            disableElevation
          >
            {isPending ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Register"
            )}
          </Button>
          <Box sx={{ color: "red", textAlign: "center", py: 1 }}>
            {failureReason?.response?.data?.error}
          </Box>
        </Box>
      </form>
    </Container>
  );
};

export default Register;
