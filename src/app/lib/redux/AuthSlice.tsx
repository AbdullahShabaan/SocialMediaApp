import LoginInitialValues from "@/app/_interfaces/LoginInitialValues";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";

export const loginFetch = createAsyncThunk(
  "loginFetch/Auth",
  async (data: LoginInitialValues, thunkApi) => {
    try {
      const req = await axios.post(
        "https://linked-posts.routemisr.com/users/signin",
        {
          email: data.email,
          password: data.password,
        }
      );
      return req;
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

interface LoginRequest {
  userToken: string;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}
const AuthSlice = createSlice({
  initialState: {
    userToken: Cookies.get("userToken") ?? "",
    isLoading: false,
    isError: false,
    errorMessage: "",
  },
  name: "Auth",
  reducers: {
    resetToken: (state) => {
      state.userToken = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loginFetch.fulfilled,
      (state: LoginRequest, action: any) => {
        state.userToken = action.payload.data.token;
        state.isLoading = false;
        state.isError = false;
      }
    );
    builder.addCase(loginFetch.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.errorMessage = "Wrong email or password";
    });
    builder.addCase(loginFetch.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
  },
});

export default AuthSlice.reducer;
export const resetUserToken = AuthSlice.actions;
