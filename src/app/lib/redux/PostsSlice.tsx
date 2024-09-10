import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  try {
    const req = await axios.get(
      "https://linked-posts.routemisr.com/posts?limit=50&page=22",
      {
        headers: {
          token: Cookies.get("userToken"),
        },
      }
    );

    return req.data;
  } catch (e) {
    console.log(e);
  }
});
const PostsSlice = createSlice({
  initialState: { posts: [], isLoading: false, isError: false },
  name: "posts",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload.posts;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.posts = [];
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(getPosts.pending, (state, action) => {
      state.posts = [];
      state.isLoading = true;
      state.isError = false;
    });
  },
});

export default PostsSlice.reducer;
