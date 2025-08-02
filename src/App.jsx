import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import ScrollToTop from './components/ScrollToTop';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Templates from './components/Templates';
import { checkAuth } from './redux/userSlice';
import ResumeEditor from './components/editors/ResumeEditor';
import BasicPreview from './components/previews/BasicPreview';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/templates" element={<Templates />} /> */}
        {/* <Route path="/resumeEditor" element={<ResumeEditor />} /> */}
        <Route path="/basicPreview" element={<BasicPreview />} />
        {/* Catch-all route redirects any unknown path to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;