// components/ChannelCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import '../styles/cards.css';

const ChannelCard = ({ channel, onClick }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useApp();
  
  const handleFavorite = (e) => {
    e.stopPropagation();
    if (isFavorite(channel.url)) {
      removeFromFavorites(channel.url);
    } else {
      addToFavorites(channel);
    }
  };
  
  return (
    <motion.div
      className="channel-card"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick(channel)}
    >
      <button className="favorite-btn" onClick={handleFavorite}>
        {isFavorite(channel.url) ? (
          <FaHeart className="favorite-icon active" />
        ) : (
          <FaRegHeart className="favorite-icon" />
        )}
      </button>
      <div className="card-logo-container">
        <img src={channel.logo} alt={channel.name} className="channel-logo" />
        <div className="card-overlay">
          <FaPlay className="play-icon" />
        </div>
      </div>
      <div className="card-body">
        <h6 className="channel-name">{channel.name}</h6>
        <small className="channel-category">{channel.category}</small>
      </div>
    </motion.div>
  );
};

export default ChannelCard;