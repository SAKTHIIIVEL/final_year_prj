import { createSlice } from "@reduxjs/toolkit";

const getStoredAuth = () => {
  try {
    const token = localStorage.getItem("dipharma_token");
    const admin = JSON.parse(localStorage.getItem("dipharma_admin") || "null");
    const role = localStorage.getItem("dipharma_role");
    if (token && admin) return { admin, token, role, isAuthenticated: true };
  } catch {}
  return { admin: null, token: null, role: null, isAuthenticated: false };
};

const stored = getStoredAuth();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    admin: stored.admin,
    token: stored.token,
    role: stored.role,
    isAuthenticated: stored.isAuthenticated,
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state) => { state.loading = true; state.error = null; },
    setCredentials: (state, action) => {
      const { admin, token, refreshToken } = action.payload;
      state.admin = admin;
      state.token = token;
      state.role = admin.role;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      localStorage.setItem("dipharma_token", token);
      localStorage.setItem("dipharma_admin", JSON.stringify(admin));
      localStorage.setItem("dipharma_role", admin.role);
      if (refreshToken) localStorage.setItem("dipharma_refresh_token", refreshToken);
    },
    setError: (state, action) => { state.loading = false; state.error = action.payload; },
    logout: (state) => {
      state.admin = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("dipharma_token");
      localStorage.removeItem("dipharma_admin");
      localStorage.removeItem("dipharma_role");
      localStorage.removeItem("dipharma_refresh_token");
    },
  },
});

export const { setLoading, setCredentials, setError, logout } = authSlice.actions;
export default authSlice.reducer;
