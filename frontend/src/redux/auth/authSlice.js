import { createSlice } from "@reduxjs/toolkit";
import { login, logout, refreshUser, signup } from "./operations.js";

const initialState = {
  user: {
    email: null,
    subscription: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, handlePending)
      .addCase(signup.rejected, (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
        state.error = payload?.message || "Something went wrong";
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        const { data } = payload;
        state.user = data.user;
        state.isLoading = false;
        // state.isLoggedIn = true;
        state.error = null;
        // state.token = payload.token;
      })
      .addCase(login.pending, handlePending)
      .addCase(login.rejected, (state, { payload }) => {
        // Siempre revisar la respuesta del backend
        console.log(payload);
        state.isLoading = false;
        state.error = payload?.message || "Something went wrong";
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        // recordar payload: {code, status, message, data:{...}}
        const { data } = payload;
        state.user = data.user;
        state.isLoading = false;
        state.isLoggedIn = true;
        state.error = null;
        state.token = data.token;
      })
      .addCase(logout.pending, handlePending)
      .addCase(logout.rejected, (state, { payload }) => {
        // Siempre revisar la respuesta del backend
        console.log(payload);
        state.isLoading = false;
        state.error = payload?.message || "Something went wrong";
      })
      .addCase(logout.fulfilled, () => {
        return initialState;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        const { data } = payload;

        state.user = data.user; // Guardamos email y subscription
        state.isLoggedIn = true; // Confirmamos que el usuario es válido
        state.isRefreshing = false; // Ya terminó el proceso de refresh
        state.isLoading = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
        state.isLoading = false;
        // Si falla es porque el token no sirve, así que no hacemos nada más
      });
  },
});

// Action creators are generated for each case reducer function
export const { clearError } = authSlice.actions;

export const authReducer = authSlice.reducer;
