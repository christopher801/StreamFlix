// components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Container, FormControl } from 'react-bootstrap';
import { FaSearch, FaBell, FaBars, FaTimes, FaTv } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import UserMenu from './Auth/UserMenu';
import '../styles/navbar.css';

const Navbar = () => {
  const { searchTerm, setSearchTerm } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.toggle('open');
    }
  };
  
  return (
    <>
      <nav className={`navbar-custom ${scrolled ? 'scrolled' : ''}`}>
        <Container fluid className="px-3 px-md-4">
          {/* Left Section */}
          <div className="navbar-left">
            {/* Mobile Menu Button */}
            <button className="mobile-menu-btn d-lg-none" onClick={toggleSidebar}>
              <FaBars />
            </button>
            
            {/* Logo */}
            <div className="navbar-brand" onClick={() => navigate('/')}>
              <FaTv className="brand-icon d-lg-none" />
              <span className="brand-text">
                Stream<span className="brand-accent">Flix</span>
              </span>
            </div>
          </div>
          
          {/* Center Section - Desktop Search */}
          <div className="search-wrapper d-none d-lg-flex">
            <FaSearch className="search-icon" />
            <FormControl
              type="text"
              placeholder="Search channels..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Right Section */}
          <div className="navbar-right">
            {/* Mobile Icons */}
            <div className="mobile-icons d-flex d-lg-none gap-2">
              <button 
                className="mobile-icon-btn"
                onClick={() => setShowMobileSearch(!showMobileSearch)}
              >
                <FaSearch />
              </button>
              <div className="nav-icon-wrapper">
                <FaBell className="nav-icon" />
                <span className="notification-badge">3</span>
              </div>
              <UserMenu />
            </div>
            
            {/* Desktop Icons */}
            <div className="desktop-icons d-none d-lg-flex gap-3">
              <div className="nav-icon-wrapper">
                <FaBell className="nav-icon" />
                <span className="notification-badge">3</span>
              </div>
              <UserMenu />
            </div>
          </div>
        </Container>
        
        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <div className="mobile-search-container">
            <FormControl
              type="text"
              placeholder="Search channels..."
              className="mobile-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            <button 
              className="mobile-search-close"
              onClick={() => setShowMobileSearch(false)}
            >
              <FaTimes />
            </button>
          </div>
        )}
      </nav>
      
      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="mobile-search-overlay" onClick={() => setShowMobileSearch(false)} />
      )}
    </>
  );
};

export default Navbar;