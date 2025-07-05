import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import resumeReducer from './resumeSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    resume: resumeReducer,
  },
});