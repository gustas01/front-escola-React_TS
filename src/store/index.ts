import { configureStore } from "@reduxjs/toolkit";
import loggedInReducer from "./isLoggedIn.store";

export const store = configureStore({
  reducer: {
    loggedInReducer
  }
})