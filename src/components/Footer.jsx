// components/Footer.jsx
import React from 'react';
import { Container } from 'react-bootstrap';
import { FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{
      background: '#0a0a0a',
      padding: '30px 0',
      marginTop: 'auto',
      borderTop: '1px solid rgba(229, 9, 20, 0.1)'
    }}>
      <Container className="text-center">
        <p className="text-secondary mb-0">&copy; 2026 StreamFlix. All rights reserved.</p>
        <small className="text-secondary">Version 1.0.0</small>
      </Container>
    </footer>
  );
};

export default Footer;