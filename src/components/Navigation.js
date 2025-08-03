import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';

const Navigation = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          {/* <i className="fas fa-file-alt"></i> */}
          ResuMate Pro
        </Link>
        
        <div className="nav-menu">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/templates" className="nav-link">Templates</Link>
              <Link to="/resumeEditor" className="nav-link">Resume Editor</Link>
              <span className="nav-user">Welcome, {user?.name}</span>
              <button onClick={handleLogout} className="nav-button">Logout</button>
            </>
          ) : (
            <>
              {/* <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-button">Get Started</Link> */}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;