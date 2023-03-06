import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import loggedInReducer from "./isLoggedIn.store";

export const store = configureStore({
  reducer: {
    loggedInReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<
  void,
  RootState,
  undefined,
  Action<string>
>;