// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  isAuthenticated: boolean;
  user: null | { name: string; email: string };
  error: null | string;
}

const decodeToken = (token: string) => {
  try {
    const [email, timestamp] = atob(token).split("-");
    return { email, timestamp: parseInt(timestamp) };
  } catch (e) {
    return null;
  }
};

const isTokenValid = (token: string) => {
  const decoded = decodeToken(token);

  if (!decoded) return false;

  const tokenAge = Date.now() - decoded.timestamp;
  const maxAge = 24 * 60 * 60 * 1000; // Token is valid for 1 day

  return tokenAge < maxAge;
};

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
} as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    signOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    validateAuth: (state) => {
      const token = Cookies.get("token");
      if (token && isTokenValid(token)) {
        const decoded = decodeToken(token);
        state.isAuthenticated = true;
        state.user = { name: "", email: decoded!.email };
        state.error = null;
      } else {
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      }
    },
  },
});

export const { signInSuccess, signOut, validateAuth } = authSlice.actions;
export default authSlice.reducer;
