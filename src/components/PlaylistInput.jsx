// components/PlaylistInput.jsx (Korije - pa gen URL hardcode)
import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { parseM3U } from '../services/parseM3U';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { FaLink, FaDownload, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const PlaylistInput = () => {
  const [m3uUrl, setM3uUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoadingDefault, setIsLoadingDefault] = useState(false);
  const { setChannels, setLoading, loading } = useApp();
  
  // Li URL default la soti nan .env - PA GEN HARDCODE
  const defaultM3UUrl = import.meta.env.VITE_DEFAULT_M3U_URL;
  
  useEffect(() => {
    // Verify env variable exists
    if (!defaultM3UUrl) {
      console.warn('VITE_DEFAULT_M3U_URL is not defined in .env file');
      setError('Default playlist URL not configured. Please check .env file.');
      return;
    }
    
    // Load saved playlist or default
    const savedPlaylist = localStorage.getItem('streamflix_last_playlist');
    if (savedPlaylist) {
      setM3uUrl(savedPlaylist);
      loadPlaylist(savedPlaylist, false);
    } else if (defaultM3UUrl) {
      loadDefaultPlaylist();
    }
  }, []);
  
  const loadPlaylist = async (url, showSuccess = true) => {
    if (!url) {
      setError('Please enter a valid M3U URL');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const channels = await parseM3U(url);
      setChannels(channels);
      localStorage.setItem('streamflix_last_playlist', url);
      if (showSuccess) {
        setSuccess(`Successfully loaded ${channels.length} channels!`);
        setTimeout(() => setSuccess(''), 3000);
      }
      setError('');
    } catch (err) {
      setError('Failed to load playlist. Please check the URL and try again.');
      console.error(err);
    } finally {
      setLoading(false);
      setIsLoadingDefault(false);
    }
  };
  
  const loadDefaultPlaylist = async () => {
    if (!defaultM3UUrl) {
      setError('Default playlist URL is not configured in .env file');
      return;
    }
    
    setIsLoadingDefault(true);
    setM3uUrl(defaultM3UUrl);
    await loadPlaylist(defaultM3UUrl, true);
  };
  
  const handleLoadPlaylist = () => {
    if (!m3uUrl) {
      setError('Please enter a playlist URL');
      return;
    }
    loadPlaylist(m3uUrl, true);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLoadPlaylist();
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4 p-4"
      style={{ 
        background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
        borderRadius: '16px',
        border: '1px solid rgba(229, 9, 20, 0.2)'
      }}
    >
      <div className="d-flex align-items-center mb-3">
        <FaLink className="me-2" style={{ color: '#e50914' }} />
        <h3 className="mb-0" style={{ fontSize: '1.5rem' }}>IPTV Playlist Loader</h3>
      </div>
      
      <Form>
        <Form.Group className="mb-3">
          <Form.Label className="text-secondary">M3U Playlist URL</Form.Label>
          <div className="d-flex gap-2">
            <Form.Control
              type="text"
              placeholder="http://example.com/playlist.m3u"
              value={m3uUrl}
              onChange={(e) => setM3uUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{ 
                background: '#0f0f0f', 
                border: '1px solid #333', 
                color: 'white',
                borderRadius: '8px'
              }}
            />
            <Button
              variant="danger"
              onClick={handleLoadPlaylist}
              disabled={loading}
              style={{ 
                background: '#e50914', 
                border: 'none',
                borderRadius: '8px',
                minWidth: '100px'
              }}
            >
              {loading ? <Spinner size="sm" /> : 'Load'}
            </Button>
          </div>
          <Form.Text className="text-secondary">
            Enter any M3U playlist URL or click the button below to load default playlist
          </Form.Text>
        </Form.Group>
        
        {defaultM3UUrl && (
          <div className="d-flex gap-2">
            <Button
              variant="outline-secondary"
              onClick={loadDefaultPlaylist}
              disabled={loading || isLoadingDefault}
              style={{ borderRadius: '8px' }}
            >
              {isLoadingDefault ? <Spinner size="sm" /> : <FaDownload className="me-2" />}
              Load Default Playlist
            </Button>
          </div>
        )}
        
        {!defaultM3UUrl && (
          <Alert variant="warning" className="mt-3" style={{ borderRadius: '8px' }}>
            <FaExclamationTriangle className="me-2" />
            Default playlist not configured. Please add VITE_DEFAULT_M3U_URL to your .env file
          </Alert>
        )}
        
        {error && (
          <Alert variant="danger" className="mt-3" style={{ borderRadius: '8px' }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert variant="success" className="mt-3" style={{ borderRadius: '8px' }}>
            <FaCheckCircle className="me-2" />
            {success}
          </Alert>
        )}
      </Form>
      
    </motion.div>
  );
};

export default PlaylistInput;