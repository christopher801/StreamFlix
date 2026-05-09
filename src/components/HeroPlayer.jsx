// components/HeroPlayer.jsx
import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { FaPlay, FaExpand, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import '../styles/player.css';

const HeroPlayer = ({ channel }) => {
  const videoRef = useRef(null);
  const { addToFavorites, removeFromFavorites, isFavorite, autoplay } = useApp();
  
  useEffect(() => {
    if (!channel || !videoRef.current) return;
    
    const video = videoRef.current;
    const streamUrl = channel.url;
    
    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (autoplay) video.play();
      });
      
      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = streamUrl;
      if (autoplay) video.play();
    }
  }, [channel, autoplay]);
  
  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };
  
  const handleFavorite = () => {
    if (isFavorite(channel.url)) {
      removeFromFavorites(channel.url);
    } else {
      addToFavorites(channel);
    }
  };
  
  if (!channel) return null;
  
  return (
    <div className="hero-player">
      <video
        ref={videoRef}
        className="video-element"
        controls
        autoPlay={autoplay}
      />
      <div className="player-overlay">
        <div className="channel-info">
          <h2>{channel.name}</h2>
          <span className="category">{channel.category}</span>
        </div>
        <div className="player-controls">
          <button className="control-btn" onClick={handleFavorite}>
            {isFavorite(channel.url) ? <FaHeart /> : <FaRegHeart />}
            <span>{isFavorite(channel.url) ? 'Remove from Favorites' : 'Add to Favorites'}</span>
          </button>
          <button className="control-btn" onClick={handleFullscreen}>
            <FaExpand />
            <span>Fullscreen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroPlayer;