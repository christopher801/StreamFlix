// config/firebase.js
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  arrayUnion, 
  arrayRemove,
  collection,
  query,
  getDocs,
  where
} from 'firebase/firestore';

// Firebase konfigirasyon - Mete pwòp konfigirasyon w la
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Inisyalize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Services Firebase
export const firebaseService = {
  // Auth methods
  signInWithGoogle: async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Save user to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date().toISOString(),
        favorites: [],
        watchHistory: [],
        settings: {
          autoplay: true,
          theme: 'dark'
        }
      }, { merge: true });
      
      return { success: true, user };
    } catch (error) {
      console.error('Google sign in error:', error);
      return { success: false, error: error.message };
    }
  },
  
  signUpWithEmail: async (email, password, displayName) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName });
      
      // Save user to Firestore
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        email: email,
        displayName: displayName,
        photoURL: null,
        createdAt: new Date().toISOString(),
        favorites: [],
        watchHistory: [],
        settings: {
          autoplay: true,
          theme: 'dark'
        }
      });
      
      return { success: true, user: result.user };
    } catch (error) {
      console.error('Email sign up error:', error);
      return { success: false, error: error.message };
    }
  },
  
  signInWithEmail: async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: result.user };
    } catch (error) {
      console.error('Email sign in error:', error);
      return { success: false, error: error.message };
    }
  },
  
  signOut: async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, error: error.message };
    }
  },
  
  resetPassword: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, error: error.message };
    }
  },
  
  // Favorites methods
  addToFavorites: async (userId, channel) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        favorites: arrayUnion({
          id: channel.id,
          name: channel.name,
          logo: channel.logo,
          category: channel.category,
          url: channel.url,
          addedAt: new Date().toISOString()
        })
      });
      return { success: true };
    } catch (error) {
      console.error('Add to favorites error:', error);
      return { success: false, error: error.message };
    }
  },
  
  removeFromFavorites: async (userId, channelId) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      const favorites = userDoc.data()?.favorites || [];
      const channelToRemove = favorites.find(fav => fav.id === channelId);
      
      if (channelToRemove) {
        await updateDoc(userRef, {
          favorites: arrayRemove(channelToRemove)
        });
      }
      return { success: true };
    } catch (error) {
      console.error('Remove from favorites error:', error);
      return { success: false, error: error.message };
    }
  },
  
  getFavorites: async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      return { success: true, favorites: userDoc.data()?.favorites || [] };
    } catch (error) {
      console.error('Get favorites error:', error);
      return { success: false, error: error.message, favorites: [] };
    }
  },
  
  // Watch history
  addToWatchHistory: async (userId, channel) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        watchHistory: arrayUnion({
          id: channel.id,
          name: channel.name,
          logo: channel.logo,
          url: channel.url,
          watchedAt: new Date().toISOString()
        })
      });
      return { success: true };
    } catch (error) {
      console.error('Add to watch history error:', error);
      return { success: false, error: error.message };
    }
  },
  
  getWatchHistory: async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      const history = userDoc.data()?.watchHistory || [];
      // Sort by most recent
      history.sort((a, b) => new Date(b.watchedAt) - new Date(a.watchedAt));
      return { success: true, history };
    } catch (error) {
      console.error('Get watch history error:', error);
      return { success: false, error: error.message, history: [] };
    }
  },
  
  clearWatchHistory: async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        watchHistory: []
      });
      return { success: true };
    } catch (error) {
      console.error('Clear watch history error:', error);
      return { success: false, error: error.message };
    }
  },
  
  // User settings
  updateUserSettings: async (userId, settings) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        settings: settings
      });
      return { success: true };
    } catch (error) {
      console.error('Update settings error:', error);
      return { success: false, error: error.message };
    }
  },
  
  getUserSettings: async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      return { success: true, settings: userDoc.data()?.settings || { autoplay: true, theme: 'dark' } };
    } catch (error) {
      console.error('Get settings error:', error);
      return { success: false, error: error.message, settings: { autoplay: true, theme: 'dark' } };
    }
  },
  
  // Auth state listener
  onAuthStateChange: (callback) => {
    return onAuthStateChanged(auth, callback);
  },
  
  getCurrentUser: () => {
    return auth.currentUser;
  }
};

export { auth, db };