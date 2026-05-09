// components/PWA/PWAInstallPrompt.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaTimes, FaTv } from 'react-icons/fa';
import './PWA.css';

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  
  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }
    
    // Check if user dismissed prompt
    const dismissed = localStorage.getItem('pwa-prompt-dismissed');
    if (dismissed && Date.now() - parseInt(dismissed) < 7 * 24 * 60 * 60 * 1000) {
      return;
    }
    
    // Listen for install prompt
    const handleInstallReady = (e) => {
      setDeferredPrompt(e.detail.deferredPrompt);
      setShowPrompt(true);
    };
    
    window.addEventListener('pwa-install-ready', handleInstallReady);
    
    // Also handle app installed
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowPrompt(false);
    });
    
    return () => {
      window.removeEventListener('pwa-install-ready', handleInstallReady);
    };
  }, []);
  
  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      setIsInstalled(true);
    }
    
    setDeferredPrompt(null);
    setShowPrompt(false);
  };
  
  const handleDismiss = () => {
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString());
    setShowPrompt(false);
  };
  
  if (isInstalled || !showPrompt) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        className="pwa-install-prompt"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
      >
        <div className="pwa-prompt-content">
          <div className="pwa-prompt-icon">
            <FaTv />
          </div>
          <div className="pwa-prompt-text">
            <h4>Install StreamFlix App</h4>
            <p>Get faster access and offline support</p>
          </div>
          <div className="pwa-prompt-buttons">
            <button className="pwa-install-btn" onClick={handleInstall}>
              <FaDownload />
              Install
            </button>
            <button className="pwa-dismiss-btn" onClick={handleDismiss}>
              <FaTimes />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PWAInstallPrompt;