"use client";
import React, { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { styled } from "@mui/material/styles";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import useChangeProfilePic from "@/app/_hooks/EditProfile/useChangeProfilePic";
import { fetchUserData } from "@/app/lib/redux/UserDataSlice";
import useChangePassword from "@/app/_hooks/EditProfile/useChangePassword";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Navbar from "@/app/_components/Navbar/Navbar";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});
const EditProfile = () => {
  const router = useRouter();
  const { photo, isLoading, email, name } = useSelector(
    (state) => state.UserDataSlice
  );
  const dispatch = useDispatch();
  const { mutateAsync: chnageProfilePhoto, isPending } = useChangeProfilePic();
  const [showPassword, setShowPassword] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profileFile, setProfileFile] = useState(false);
  const { mutateAsync, isError, isSuccess } = useChangePassword();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChangeProfile = async (data) => {
    const response = await chnageProfilePhoto(data);
    if (response.status === 200) {
      Toast.fire({
        icon: "success",
        title: "Profile picture updated successfully!",
      });
      setProfilePhoto(null);
      dispatch(fetchUserData());
    }
  };

  const handleLogOut = () => {
    Cookies.remove("userToken");
    router.push("/Login");
    dispatch(resetToken());
  };
  const onSubmitFormik = async (val) => {
    const response = await mutateAsync(val);
    if (response.status === 200) {
      Toast.fire({
        icon: "success",
        title: "Password updated successfully!",
      });
      values.oldPassword = "";
      values.password = "";
      values.rePassword = "";
      setTimeout(() => {
        handleLogOut();
      }, 500);
    }
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Password is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{10,}$/,
        "Password must be at least 8 characters long, include at least one letter and one number"
      ),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const {
    touched,
    errors,
    handleBlur,
    handleSubmit: handleSubmitFormik,
    values,
    handleChange: handleChangeFormik,
  } = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      rePassword: "",
    },
    onSubmit: (values) => {
      onSubmitFormik(values);
    },
    validationSchema,
  });

  return (
    <>
      <Navbar />
      <div style={{ marginTop: "100px", color: "white", textAlign: "center" }}>
        <Container>
          <Box sx={{ bgcolor: "#1B2730", py: 3, borderRadius: 4 }}>
            <Box>
              <h2 style={{ padding: "10px" }}>Change Profile Picture</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor,
                mollitia?
              </p>
            </Box>
            <Box sx={{ py: 3 }}>
              <h3 style={{ marginBottom: "20px" }}>{name}</h3>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: profilePhoto ? "10px" : "",
                }}
              >
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  {!isLoading && (
                    <>
                      <Button
                        sx={{
                          position: "absolute",
                          zIndex: 3,
                          right: "0px",
                          color: "white",
                        }}
                        component="label"
                        role={undefined}
                        tabIndex={-1}
                      >
                        <AddAPhotoIcon />

                        <VisuallyHiddenInput
                          type="file"
                          accept="image/*"
                          onChange={(event) => {
                            setProfileFile(event.target.files[0]);
                            const imageSrc = URL.createObjectURL(
                              event.target.files[0]
                            );
                            setProfilePhoto(imageSrc);
                          }}
                          multiple
                        />
                      </Button>

                      <Avatar
                        sx={{
                          width: 150,
                          height: 150,
                          zIndex: 1,
                        }}
                        src={profilePhoto ? profilePhoto : photo}
                        alt={profilePhoto ? profilePhoto : photo}
                      />
                    </>
                  )}
                  {isLoading && <span class="loader"></span>}
                </div>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {profilePhoto && (
                    <>
                      <Button
                        disabled={isPending}
                        sx={{
                          color: "white",
                          border: "1px solid #1B2730",
                          textTransform: "capitalize",
                          px: 2,
                          bgcolor: "#06141D",
                          width: "150px",
                        }}
                        onClick={() => {
                          const formData = new FormData();
                          formData.append("photo", profileFile);
                          handleChangeProfile(formData);
                        }}
                      >
                        {isPending ? (
                          <i
                            className="fa fa-spinner fa-spin"
                            style={{ color: "white", padding: "5px" }}
                          ></i>
                        ) : (
                          "Submit"
                        )}
                      </Button>
                      <Button
                        onClick={() => {
                          setProfilePhoto(null);
                        }}
                        sx={{
                          color: "white",
                          border: "1px solid #1B2730",
                          textTransform: "capitalize",
                          px: 2,
                          bgcolor: "#06141D",
                        }}
                      >
                        Reset
                      </Button>
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ bgcolor: "#1B2730", py: 3, my: 5, borderRadius: 4 }}>
            <h3 style={{ marginBottom: "20px" }}>Change Password</h3>

            <Box>
              <span>Email: </span>
              <span>{email}</span>
            </Box>
            <form onSubmit={handleSubmitFormik}>
              <Box sx={{ p: 2 }}>
                <InputLabel
                  sx={{
                    pt: 4,
                  }}
                  htmlFor="standard-adornment-password"
                >
                  Old Password
                </InputLabel>
                <Input
                  name="oldPassword"
                  helperText={touched.oldPassword && errors.oldPassword}
                  error={touched.oldPassword && Boolean(errors.oldPassword)}
                  onChange={handleChangeFormik}
                  value={values.oldPassword}
                  onBlur={handleBlur}
                  sx={{ px: 3, width: { xs: "100%", sm: "40%" } }}
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <Typography sx={{ fontSize: "12px", color: "red", pt: 1 }}>
                  {touched.oldPassword && errors.oldPassword}
                </Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                <InputLabel htmlFor="standard-adornment-password">
                  New Password
                </InputLabel>
                <Input
                  helperText={touched.password && errors.password}
                  error={touched.password && Boolean(errors.password)}
                  name="password"
                  onChange={handleChangeFormik}
                  value={values.password}
                  onBlur={handleBlur}
                  sx={{ px: 3, width: { xs: "100%", sm: "40%" } }}
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                />
                <Typography sx={{ fontSize: "12px", color: "red", pt: 1 }}>
                  {touched.password && errors.password}
                </Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                <InputLabel htmlFor="standard-adornment-password">
                  Confirm Password
                </InputLabel>
                <Input
                  helperText={touched.rePassword && errors.rePassword}
                  error={touched.rePassword && Boolean(errors.rePassword)}
                  name="rePassword"
                  onChange={handleChangeFormik}
                  value={values.rePassword}
                  onBlur={handleBlur}
                  sx={{ px: 3, width: { xs: "100%", sm: "40%" } }}
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                />
                <Typography sx={{ fontSize: "12px", color: "red", pt: 1 }}>
                  {touched.rePassword && errors.rePassword}
                </Typography>
              </Box>

              <Button
                type="submit"
                sx={{
                  color: "white",
                  border: "1px solid #1B2730",
                  textTransform: "capitalize",
                  px: 2,
                  bgcolor: "#06141D",
                }}
              >
                Change Password
              </Button>
              {isError && (
                <p style={{ color: "red", paddingTop: "15px" }}>
                  Wrong Password
                </p>
              )}
            </form>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default EditProfile;
