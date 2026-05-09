// routes.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import LiveTV from './pages/LiveTV';
import Movies from './pages/Movies';
import Favorites from './pages/Favorites';
import Settings from './pages/Settings';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "livetv",
        element: <LiveTV />
      },
      {
        path: "movies",
        element: <Movies />
      },
      {
        path: "favorites",
        element: <Favorites />
      },
      {
        path: "settings",
        element: <Settings />
      }
    ]
  }
]);

export default router;