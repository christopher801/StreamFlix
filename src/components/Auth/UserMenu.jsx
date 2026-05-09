// components/Auth/UserMenu.jsx
import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaUserCircle, FaHeart, FaHistory, FaCog, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import LoginModal from './LoginModal';
import './Auth.css';

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  if (!user) {
    return (
      <>
        <button className="auth-login-btn" onClick={() => setShowLoginModal(true)}>
          <FaUserCircle size={24} />
          <span>Sign In</span>
        </button>
        <LoginModal show={showLoginModal} onClose={() => setShowLoginModal(false)} />
      </>
    );
  }
  
  return (
    <>
      <Dropdown align="end">
        <Dropdown.Toggle as="div" className="user-menu-toggle">
          {user.photoURL ? (
            <img src={user.photoURL} alt={user.displayName} className="user-avatar" />
          ) : (
            <div className="user-avatar-placeholder">
              {user.displayName?.charAt(0) || user.email?.charAt(0)}
            </div>
          )}
        </Dropdown.Toggle>
        
        <Dropdown.Menu className="user-menu-dropdown">
          <div className="user-menu-header">
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.displayName} className="dropdown-avatar" />
            ) : (
              <div className="dropdown-avatar-placeholder">
                {user.displayName?.charAt(0) || user.email?.charAt(0)}
              </div>
            )}
            <div className="user-menu-info">
              <h6>{user.displayName || 'User'}</h6>
              <small>{user.email}</small>
            </div>
          </div>
          
          <Dropdown.Divider />
          
          <Dropdown.Item href="#/profile">
            <FaUser /> My Profile
          </Dropdown.Item>
          <Dropdown.Item href="#/favorites">
            <FaHeart /> My Favorites
          </Dropdown.Item>
          <Dropdown.Item href="#/history">
            <FaHistory /> Watch History
          </Dropdown.Item>
          <Dropdown.Item href="#/settings">
            <FaCog /> Settings
          </Dropdown.Item>
          
          <Dropdown.Divider />
          
          <Dropdown.Item onClick={signOut} className="text-danger">
            <FaSignOutAlt /> Sign Out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      
      <LoginModal show={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
};

export default UserMenu;