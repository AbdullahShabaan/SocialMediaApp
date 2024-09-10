import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import PostsSlice from "./PostsSlice";
import UserDataSlice from "./UserDataSlice";

const store = configureStore({
  reducer: { AuthSlice, PostsSlice, UserDataSlice },
});

export type dispatchType = typeof store.dispatch;
export type storeType = ReturnType<typeof store.getState>;
export default store;
