// App.jsx (Updated with Auth)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import LiveTV from './pages/LiveTV';
import Movies from './pages/Movies';
import Favorites from './pages/Favorites';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import WatchHistory from './pages/WatchHistory';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import './styles/responsive.css';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <div className="main-layout">
              <Sidebar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/livetv" element={<LiveTV />} />
                  <Route path="/movies" element={<Movies />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/history" element={<WatchHistory />} />
                </Routes>
              </main>
            </div>
            <Footer />
          </div>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;