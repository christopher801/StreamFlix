// components/Auth/LoginModal.jsx
import React, { useState } from 'react';
import { Modal, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { FaGoogle, FaEnvelope, FaLock, FaUser, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const LoginModal = ({ show, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    const success = await signInWithGoogle();
    if (success) {
      onClose();
    } else {
      setError('Failed to sign in with Google');
    }
    setLoading(false);
  };
  
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    let success;
    if (isLogin) {
      success = await signInWithEmail(email, password);
    } else {
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }
      success = await signUpWithEmail(email, password, displayName);
    }
    
    if (success) {
      onClose();
    } else {
      setError(isLogin ? 'Invalid email or password' : 'Failed to create account');
    }
    setLoading(false);
  };
  
  return (
    <Modal show={show} onHide={onClose} centered className="auth-modal">
      <Modal.Header className="auth-modal-header">
        <Modal.Title>{isLogin ? 'Welcome Back' : 'Create Account'}</Modal.Title>
        <button className="auth-close-btn" onClick={onClose}>
          <FaTimes />
        </button>
      </Modal.Header>
      <Modal.Body className="auth-modal-body">
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Button 
          variant="danger" 
          className="auth-google-btn"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <FaGoogle />
          <span>Continue with Google</span>
        </Button>
        
        <div className="auth-divider">
          <span>OR</span>
        </div>
        
        <Form onSubmit={handleEmailSubmit}>
          {!isLogin && (
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <div className="auth-input-wrapper">
                <FaUser className="auth-input-icon" />
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
              </div>
            </Form.Group>
          )}
          
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <div className="auth-input-wrapper">
              <FaEnvelope className="auth-input-icon" />
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <div className="auth-input-wrapper">
              <FaLock className="auth-input-icon" />
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </Form.Group>
          
          <Button 
            type="submit" 
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading ? <Spinner size="sm" /> : (isLogin ? 'Sign In' : 'Sign Up')}
          </Button>
        </Form>
        
        <div className="auth-footer">
          <button 
            className="auth-switch-btn"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;