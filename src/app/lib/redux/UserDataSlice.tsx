import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import Cookies from "js-cookie";
export const fetchUserData = createAsyncThunk(
  "userData/fetchUserData",
  async () => {
    try {
      const req = axios.get(
        "https://linked-posts.routemisr.com/users/profile-data",
        {
          headers: {
            token: Cookies.get("userToken"),
          },
        }
      );
      return req;
    } catch (err) {
      console.log(err);
    }
  }
);

const UserDataSlice = createSlice({
  name: "userData",
  initialState: {
    id: localStorage.getItem("userId") ?? null,
    name: localStorage.getItem("userName") ?? null,
    email: localStorage.getItem("userEmail") ?? null,
    dateOfBirth: localStorage.getItem("userBirth") ?? null,
    gender: localStorage.getItem("userGender") ?? null,
    photo: localStorage.getItem("userPhoto") ?? null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.id = action.payload?.data?.user._id;
      localStorage.setItem("userId", state.id);
      state.name = action.payload?.data?.user.name;
      localStorage.setItem("userName", state.name);
      state.email = action.payload?.data?.user.email;
      localStorage.setItem("userEmail", state.email);
      state.dateOfBirth = action.payload?.data?.user.dateOfBirth;
      localStorage.setItem("userBirth", state.dateOfBirth);
      state.gender = action.payload?.data?.user.gender;
      localStorage.setItem("userGender", state.gender);
      state.photo = action.payload?.data?.user.photo;
      localStorage.setItem("userPhoto", state.photo);
      state.isLoading = false;
    });
    builder.addCase(fetchUserData.pending, (state, action) => {
      console.log("Loading....");
      state.isLoading = true;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      console.log("Error");
      state.isLoading = false;
    });
  },
});

export default UserDataSlice.reducer;
