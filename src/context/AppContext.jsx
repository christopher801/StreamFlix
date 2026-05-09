// context/AppContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [channels, setChannels] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentChannel, setCurrentChannel] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [autoplay, setAutoplay] = useState(true);
  const [continueWatching, setContinueWatching] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load from localStorage
    const savedFavorites = localStorage.getItem('streamflix_favorites');
    const savedAutoplay = localStorage.getItem('streamflix_autoplay');
    const savedContinue = localStorage.getItem('streamflix_continue');
    
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedAutoplay) setAutoplay(JSON.parse(savedAutoplay));
    if (savedContinue) setContinueWatching(JSON.parse(savedContinue));
  }, []);

  useEffect(() => {
    localStorage.setItem('streamflix_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('streamflix_autoplay', JSON.stringify(autoplay));
  }, [autoplay]);

  const addToFavorites = (channel) => {
    if (!favorites.find(fav => fav.url === channel.url)) {
      setFavorites([...favorites, channel]);
    }
  };

  const removeFromFavorites = (channelUrl) => {
    setFavorites(favorites.filter(channel => channel.url !== channelUrl));
  };

  const isFavorite = (channelUrl) => {
    return favorites.some(channel => channel.url === channelUrl);
  };

  const setCurrentAndSave = (channel) => {
    setCurrentChannel(channel);
    setContinueWatching(channel);
    localStorage.setItem('streamflix_continue', JSON.stringify(channel));
  };

  const clearHistory = () => {
    setContinueWatching(null);
    localStorage.removeItem('streamflix_continue');
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <AppContext.Provider value={{
      channels,
      setChannels,
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      currentChannel,
      setCurrentChannel: setCurrentAndSave,
      searchTerm,
      setSearchTerm,
      selectedCategory,
      setSelectedCategory,
      autoplay,
      setAutoplay,
      continueWatching,
      loading,
      setLoading,
      clearHistory,
      clearFavorites
    }}>
      {children}
    </AppContext.Provider>
  );
};