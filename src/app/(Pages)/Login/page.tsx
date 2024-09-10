"use client";
import TextField from "@mui/material/TextField";
import { Container, Typography, Box } from "@mui/material";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import LoginInitialValues from "@/app/_interfaces/LoginInitialValues";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { loginFetch } from "@/app/lib/redux/AuthSlice";
import { dispatchType, storeType } from "@/app/lib/redux/store";

const Login = () => {
  const router = useRouter();

  const {
    AuthSlice: { isLoading, isError, errorMessage },
  } = useSelector((state: storeType) => state);

  const dispatch = useDispatch<dispatchType>();

  const initialValues: LoginInitialValues = {
    email: "aaa@yahoo.com",
    password: "Bahnsy@123",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const onSubmitFormik = async (values: LoginInitialValues) => {
    const dataToSend = {
      email: values.email,
      password: values.password,
    };
    const req = await dispatch<any>(loginFetch(dataToSend));
    if (req.payload.data.message == "success") {
      Cookies.set("userToken", req.payload.data.token);
      router.push("./Home");
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
            Login
          </Typography>

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
            sx={{
              mt: 2,
              "& .MuiInputBase-input": {
                color: "white", // Color of the input text
              },
              "& .MuiFormLabel-root": {
                color: "white", // Color of the label
              },
              "& .MuiFormHelperText-root": {
                color: "red", // Color of the helper text
              },
              "& .MuiFormControl-root.Mui-error": {
                "& .MuiFormHelperText-root": {
                  color: "red", // Color of the error text
                },
              },
            }}
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
            sx={{
              mt: 2,
              "& .MuiInputBase-input": {
                color: "white", // Color of the input text
              },
              "& .MuiFormLabel-root": {
                color: "white", // Color of the label
              },
              "& .MuiFormHelperText-root": {
                color: "red", // Color of the helper text
              },
              "& .MuiFormControl-root.Mui-error": {
                "& .MuiFormHelperText-root": {
                  color: "red", // Color of the error text
                },
              },
            }}
          />
          <Typography variant="p" sx={{ color: "white", fontSize: "12px" }}>
            don't have account?{" "}
            <Typography
              variant="span"
              sx={{ cursor: "pointer", pt: 2, display: "inline-block" }}
              onClick={() => {
                router.push("/Register");
              }}
            >
              SignUp
            </Typography>
          </Typography>

          <Button
            disabled={isLoading}
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
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
          </Button>
          {isError && (
            <Box sx={{ color: "red", textAlign: "center", py: 1 }}>
              {errorMessage}
            </Box>
          )}
        </Box>
      </form>
    </Container>
  );
};

export default Login;
