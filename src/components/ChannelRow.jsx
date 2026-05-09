// components/ChannelRow.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import '../styles/cards.css';

const ChannelRow = ({ title, channels, showCategory = false }) => {
  const { addToFavorites, removeFromFavorites, isFavorite, setCurrentChannel } = useApp();
  
  const handleFavorite = (e, channel) => {
    e.stopPropagation();
    if (isFavorite(channel.url)) {
      removeFromFavorites(channel.url);
    } else {
      addToFavorites(channel);
    }
  };
  
  if (!channels || channels.length === 0) return null;
  
  return (
    <div className="channel-row mb-5">
      <h2 className="section-title mb-3">{title}</h2>
      <div className="row-scroll-container">
        <div className="row-scroll d-flex gap-3 overflow-x-auto pb-3">
          {channels.map((channel, idx) => (
            <motion.div
              key={channel.id || idx}
              className="channel-row-card"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setCurrentChannel(channel)}
              style={{
                minWidth: '200px',
                maxWidth: '200px',
                cursor: 'pointer'
              }}
            >
              <div className="channel-row-card-inner">
                <button 
                  className="row-favorite-btn"
                  onClick={(e) => handleFavorite(e, channel)}
                >
                  {isFavorite(channel.url) ? (
                    <FaHeart className="favorite-icon active" />
                  ) : (
                    <FaRegHeart className="favorite-icon" />
                  )}
                </button>
                <div className="row-card-image">
                  <img 
                    src={channel.logo} 
                    alt={channel.name}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/200x200?text=TV';
                    }}
                  />
                  <div className="row-card-overlay">
                    <FaPlay className="play-icon" />
                  </div>
                </div>
                <div className="row-card-body">
                  <h6 className="row-channel-name">{channel.name}</h6>
                  {showCategory && (
                    <small className="row-channel-category">{channel.category}</small>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChannelRow;