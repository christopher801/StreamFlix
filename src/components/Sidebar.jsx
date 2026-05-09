// components/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaTv, 
  FaFilm, 
  FaHeart, 
  FaCog, 
  FaFire, 
  FaNewspaper, 
  FaMusic, 
  FaGamepad,
  FaTimes,
  FaHistory,
  FaClock,
  FaUserCircle,
  FaSignOutAlt,
  FaUser
} from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import '../styles/sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { continueWatching, favorites } = useApp();
  const { user, signOut } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  useEffect(() => {
    // Listen for sidebar toggle events
    const handleSidebarToggle = () => {
      setIsMobileOpen(prev => !prev);
    };
    
    window.addEventListener('sidebarToggle', handleSidebarToggle);
    
    // Close sidebar on route change on mobile
    const handleRouteChange = () => {
      if (window.innerWidth <= 992) {
        setIsMobileOpen(false);
      }
    };
    
    handleRouteChange();
    window.addEventListener('resize', handleRouteChange);
    return () => {
      window.removeEventListener('sidebarToggle', handleSidebarToggle);
      window.removeEventListener('resize', handleRouteChange);
    };
  }, [location]);
  
  const menuItems = [
    { path: '/', icon: <FaHome />, label: 'Home', active: location.pathname === '/' },
    { path: '/livetv', icon: <FaTv />, label: 'Live TV', active: location.pathname === '/livetv' },
    { path: '/movies', icon: <FaFilm />, label: 'Movies', active: location.pathname === '/movies' },
    { path: '/favorites', icon: <FaHeart />, label: 'Favorites', active: location.pathname === '/favorites', badge: favorites.length },
    { path: '/history', icon: <FaHistory />, label: 'Watch History', active: location.pathname === '/history' },
    { path: '/settings', icon: <FaCog />, label: 'Settings', active: location.pathname === '/settings' }
  ];
  
  const quickCategories = [
    { icon: <FaFire />, label: 'Trending', color: '#e50914' },
    { icon: <FaNewspaper />, label: 'News', color: '#00b4d8' },
    { icon: <FaMusic />, label: 'Music', color: '#9b5de5' },
    { icon: <FaGamepad />, label: 'Gaming', color: '#06d6a0' }
  ];
  
  const navigateTo = (path) => {
    navigate(path);
    if (window.innerWidth <= 992) {
      setIsMobileOpen(false);
    }
  };
  
  const closeSidebar = () => {
    setIsMobileOpen(false);
  };
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    closeSidebar();
  };
  
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`sidebar-overlay ${isMobileOpen ? 'active' : ''}`} 
        onClick={closeSidebar}
      />
      
      <div className={`sidebar ${isMobileOpen ? 'open' : ''}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo" onClick={() => navigateTo('/')}>
            <FaTv className="logo-icon" />
            <span>StreamFlix</span>
          </div>
          <button className="sidebar-close-btn d-lg-none" onClick={closeSidebar}>
            <FaTimes />
          </button>
        </div>
        
        {/* User Section - Mobile */}
        {user && (
          <div className="sidebar-user-section">
            <div className="sidebar-avatar" onClick={() => navigateTo('/profile')}>
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName} />
              ) : (
                <FaUserCircle size={40} />
              )}
            </div>
            <div className="sidebar-user-info" onClick={() => navigateTo('/profile')}>
              <h6>{user.displayName || 'User'}</h6>
              <span>{user.email}</span>
            </div>
          </div>
        )}
        
        {/* User Section - Guest */}
        {!user && (
          <div className="sidebar-user-section guest" onClick={() => navigateTo('/')}>
            <div className="sidebar-avatar">
              <FaUserCircle size={40} />
            </div>
            <div className="sidebar-user-info">
              <h6>Guest User</h6>
              <span>Sign in for more features</span>
            </div>
          </div>
        )}
        
        {/* Main Navigation */}
        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item, index) => (
              <li
                key={item.path}
                className={`sidebar-item ${item.active ? 'active' : ''}`}
                onClick={() => navigateTo(item.path)}
                style={{ '--item-index': index }}
              >
                <span className="sidebar-item-icon">{item.icon}</span>
                <span className="sidebar-item-label">{item.label}</span>
                {item.badge > 0 && (
                  <span className="sidebar-badge">{item.badge}</span>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Continue Watching Section */}
        {continueWatching && (
          <div className="sidebar-section">
            <h6 className="sidebar-section-title">
              <FaClock className="me-2" />
              Continue Watching
            </h6>
            <div 
              className="continue-watching-item"
              onClick={() => {
                navigateTo('/');
                // Logic to set current channel would go here
              }}
            >
              <img src={continueWatching.logo} alt={continueWatching.name} />
              <div className="continue-info">
                <p>{continueWatching.name}</p>
                <span>Now Playing</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Divider */}
        <div className="sidebar-divider" />
        
        {/* Quick Categories */}
        <div className="sidebar-quick-cats">
          <h6 className="sidebar-section-title">Quick Categories</h6>
          <div className="quick-cats-grid">
            {quickCategories.map((cat, idx) => (
              <button 
                key={idx} 
                className="quick-cat-btn" 
                style={{ '--cat-color': cat.color }}
                onClick={() => {
                  navigateTo('/');
                  // Filter logic would go here
                }}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Sign Out Button for Mobile */}
        {user && (
          <>
            <div className="sidebar-divider" />
            <div className="sidebar-signout">
              <button className="signout-btn" onClick={handleSignOut}>
                <FaSignOutAlt />
                <span>Sign Out</span>
              </button>
            </div>
          </>
        )}
        
        {/* Footer */}
        <div className="sidebar-footer">
          <div className="sidebar-version">
            <small>StreamFlix v1.0.0</small>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;