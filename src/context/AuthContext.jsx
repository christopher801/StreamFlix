// context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { firebaseService } from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = firebaseService.onAuthStateChange(async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        // Load user data from Firestore
        const favorites = await firebaseService.getFavorites(firebaseUser.uid);
        const settings = await firebaseService.getUserSettings(firebaseUser.uid);
        const history = await firebaseService.getWatchHistory(firebaseUser.uid);
        
        setUserData({
          favorites: favorites.favorites,
          settings: settings.settings,
          history: history.history
        });
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const result = await firebaseService.signInWithGoogle();
    if (result.success) {
      setUser(result.user);
      return true;
    }
    return false;
  };

  const signUpWithEmail = async (email, password, displayName) => {
    const result = await firebaseService.signUpWithEmail(email, password, displayName);
    if (result.success) {
      setUser(result.user);
      return true;
    }
    return false;
  };

  const signInWithEmail = async (email, password) => {
    const result = await firebaseService.signInWithEmail(email, password);
    if (result.success) {
      setUser(result.user);
      return true;
    }
    return false;
  };

  const signOut = async () => {
    const result = await firebaseService.signOut();
    if (result.success) {
      setUser(null);
      setUserData(null);
      return true;
    }
    return false;
  };

  const resetPassword = async (email) => {
    return await firebaseService.resetPassword(email);
  };

  const addToFavorites = async (channel) => {
    if (user) {
      const result = await firebaseService.addToFavorites(user.uid, channel);
      if (result.success) {
        setUserData(prev => ({
          ...prev,
          favorites: [...(prev?.favorites || []), channel]
        }));
      }
      return result;
    }
    return { success: false, error: 'User not logged in' };
  };

  const removeFromFavorites = async (channelId) => {
    if (user) {
      const result = await firebaseService.removeFromFavorites(user.uid, channelId);
      if (result.success) {
        setUserData(prev => ({
          ...prev,
          favorites: prev?.favorites?.filter(fav => fav.id !== channelId) || []
        }));
      }
      return result;
    }
    return { success: false, error: 'User not logged in' };
  };

  const addToWatchHistory = async (channel) => {
    if (user) {
      await firebaseService.addToWatchHistory(user.uid, channel);
      const history = await firebaseService.getWatchHistory(user.uid);
      setUserData(prev => ({
        ...prev,
        history: history.history
      }));
    }
  };

  const updateUserSettings = async (settings) => {
    if (user) {
      const result = await firebaseService.updateUserSettings(user.uid, settings);
      if (result.success) {
        setUserData(prev => ({
          ...prev,
          settings: settings
        }));
      }
      return result;
    }
    return { success: false, error: 'User not logged in' };
  };

  const value = {
    user,
    userData,
    loading,
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
    signOut,
    resetPassword,
    addToFavorites,
    removeFromFavorites,
    addToWatchHistory,
    updateUserSettings,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};