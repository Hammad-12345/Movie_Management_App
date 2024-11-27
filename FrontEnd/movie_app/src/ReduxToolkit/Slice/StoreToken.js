import { createSlice } from "@reduxjs/toolkit";
export const Protect_Routes = createSlice({
  name: "Protect_Routes",
  initialState: {
    AuthRoutes: JSON.parse(localStorage.getItem("auth"),)
  },
  reducers: {
    LoggedIn: (state, action) => {
      state.AuthRoutes = action.payload;
    },
    LoggedOut: (state) => {
      state.AuthRoutes = false;
    },
  },
});

export const { LoggedIn, LoggedOut } = Protect_Routes.actions;
export default Protect_Routes.reducer;
