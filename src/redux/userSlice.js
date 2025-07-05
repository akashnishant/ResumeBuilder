import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Check if user is authenticated
export const checkAuth = createAsyncThunk('user/checkAuth', async () => {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.get(`${API_URL}/auth/me`);
    return response.data;
  }
  throw new Error('No token found');
});

// Register user
export const registerUser = createAsyncThunk('user/register', async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  localStorage.setItem('token', response.data.token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
  return response.data;
});

// Login user
export const loginUser = createAsyncThunk('user/login', async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  localStorage.setItem('token', response.data.token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    isLoading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;