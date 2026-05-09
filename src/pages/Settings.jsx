// pages/Settings.jsx (Sekirite - pa montre URL default nan UI si ou vle)
import React, { useState } from 'react';
import { Container, Card, Button, Form, Badge, Alert } from 'react-bootstrap';
import { useApp } from '../context/AppContext';
import { FaTrash, FaHeart, FaPlay, FaInfoCircle, FaDatabase, FaShieldAlt } from 'react-icons/fa';

const Settings = () => {
  const { autoplay, setAutoplay, clearHistory, clearFavorites, channels } = useApp();
  const [showDebug, setShowDebug] = useState(false);
  
  const appName = import.meta.env.VITE_APP_NAME || 'StreamFlix';
  const appVersion = import.meta.env.VITE_APP_VERSION || '1.0.0';
  const hasDefaultUrl = !!import.meta.env.VITE_DEFAULT_M3U_URL;
  
  return (
    <Container>
      <h2 className="section-title mb-4">Settings</h2>
      
      <Card style={{ background: '#1a1a1a', border: 'none', marginBottom: '20px', borderRadius: '12px' }}>
        <Card.Body>
          <Card.Title className="mb-3">
            <FaShieldAlt className="me-2" style={{ color: '#e50914' }} />
            Security & Privacy
          </Card.Title>
          <Alert variant="info" style={{ background: '#0f0f0f', border: '1px solid #e50914', borderRadius: '8px' }}>
            <small>
              Your playlist URLs are stored locally in your browser only.
              No data is sent to any external servers.
            </small>
          </Alert>
        </Card.Body>
      </Card>
      
      <Card style={{ background: '#1a1a1a', border: 'none', marginBottom: '20px', borderRadius: '12px' }}>
        <Card.Body>
          <Card.Title className="mb-3">
            <FaPlay className="me-2" style={{ color: '#e50914' }} />
            Playback Settings
          </Card.Title>
          <Form.Group className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <span>Autoplay videos</span>
              <small className="d-block text-secondary">Automatically play when selecting a channel</small>
            </div>
            <Form.Check
              type="switch"
              checked={autoplay}
              onChange={(e) => setAutoplay(e.target.checked)}
              style={{ transform: 'scale(1.2)' }}
            />
          </Form.Group>
        </Card.Body>
      </Card>
      
      <Card style={{ background: '#1a1a1a', border: 'none', marginBottom: '20px', borderRadius: '12px' }}>
        <Card.Body>
          <Card.Title className="mb-3">
            <FaDatabase className="me-2" style={{ color: '#e50914' }} />
            Data Management
          </Card.Title>
          <div className="mb-3">
            <small className="text-secondary d-block mb-2">
              Current channels loaded: <Badge bg="danger">{channels.length}</Badge>
            </small>
          </div>
          <Button
            variant="outline-danger"
            className="mb-2 w-100"
            onClick={clearFavorites}
            style={{ borderRadius: '8px' }}
          >
            <FaHeart className="me-2" />
            Clear All Favorites
          </Button>
          <Button
            variant="outline-warning"
            className="w-100"
            onClick={clearHistory}
            style={{ borderRadius: '8px' }}
          >
            <FaTrash className="me-2" />
            Clear Watch History
          </Button>
        </Card.Body>
      </Card>
      
      <Card style={{ background: '#1a1a1a', border: 'none', marginBottom: '20px', borderRadius: '12px' }}>
        <Card.Body>
          <Card.Title className="mb-3">
            <FaInfoCircle className="me-2" style={{ color: '#e50914' }} />
            About
          </Card.Title>
          <div className="mb-2">
            <strong>{appName}</strong>
            <span className="text-secondary ms-2">Version {appVersion}</span>
          </div>
          <p className="text-secondary small mb-2">
            A modern IPTV streaming platform
          </p>
          <hr style={{ background: '#333' }} />
          <div className="small">
            <div className="text-secondary">
              <strong>Default Playlist:</strong> {hasDefaultUrl ? '✓ Configured in .env' : '✗ Not configured'}
            </div>
            <div className="text-secondary mt-2">
              <strong>Features:</strong>
              <ul className="mt-1">
                <li>HLS Streaming Support</li>
                <li>Favorites System</li>
                <li>Continue Watching</li>
                <li>Search & Filter</li>
                <li>Responsive Design</li>
                <li>Local Storage Only</li>
              </ul>
            </div>
          </div>
          
          {/* Debug info - hidden by default for security */}
          {showDebug && (
            <div className="mt-3 p-2" style={{ background: '#0f0f0f', borderRadius: '8px' }}>
              <small className="text-muted">
                <strong>Debug Info:</strong><br />
                Default URL configured: {hasDefaultUrl ? 'Yes' : 'No'}<br />
                Environment: {import.meta.env.MODE}<br />
                <em className="text-warning">URL not shown for security reasons</em>
              </small>
            </div>
          )}
          
          <Button
            variant="link"
            size="sm"
            onClick={() => setShowDebug(!showDebug)}
            className="mt-2 p-0 text-secondary"
            style={{ textDecoration: 'none' }}
          >
            {showDebug ? 'Hide' : 'Show'} debug info
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Settings;