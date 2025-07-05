import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create resume
export const createResume = createAsyncThunk('resume/create', async (resumeData) => {
  const response = await axios.post(`${API_URL}/resume`, resumeData);
  return response.data;
});

// Get user resumes
export const getUserResumes = createAsyncThunk('resume/getUserResumes', async () => {
  const response = await axios.get(`${API_URL}/resume`);
  return response.data;
});

// Download resume
export const downloadResume = createAsyncThunk('resume/download', async ({ resumeId, templateId }) => {
  const response = await axios.get(`${API_URL}/resume/${resumeId}/download/${templateId}`, {
    responseType: 'blob',
  });
  return response.data;
});

const resumeSlice = createSlice({
  name: 'resume',
  initialState: {
    resumes: [],
    currentResume: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setCurrentResume: (state, action) => {
      state.currentResume = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createResume.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createResume.fulfilled, (state, action) => {
        state.currentResume = action.payload;
        state.isLoading = false;
      })
      .addCase(createResume.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(getUserResumes.fulfilled, (state, action) => {
        state.resumes = action.payload;
      })
      .addCase(downloadResume.fulfilled, (state, action) => {
        // Handle download
        const url = window.URL.createObjectURL(action.payload);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'resume.pdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
  },
});

export const { setCurrentResume, clearError } = resumeSlice.actions;
export default resumeSlice.reducer;