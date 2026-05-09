// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
        manifest: {
          name: 'StreamFlix - IPTV Streaming Platform',
          short_name: 'StreamFlix',
          description: 'Modern IPTV streaming platform with Netflix-style interface',
          theme_color: '#0f0f0f',
          background_color: '#0f0f0f',
          display: 'standalone',
          orientation: 'portrait',
          scope: '/',
          start_url: '/',
          icons: [
            {
              src: '/icons/icon-72x72.png',
              sizes: '72x72',
              type: 'image/png',
              purpose: 'any maskable'
            },
            {
              src: '/icons/icon-96x96.png',
              sizes: '96x96',
              type: 'image/png',
              purpose: 'any maskable'
            },
            {
              src: '/icons/icon-128x128.png',
              sizes: '128x128',
              type: 'image/png',
              purpose: 'any maskable'
            },
            {
              src: '/icons/icon-144x144.png',
              sizes: '144x144',
              type: 'image/png',
              purpose: 'any maskable'
            },
            {
              src: '/icons/icon-152x152.png',
              sizes: '152x152',
              type: 'image/png',
              purpose: 'any maskable'
            },
            {
              src: '/icons/icon-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any maskable'
            },
            {
              src: '/icons/icon-256x256.png',
              sizes: '256x256',
              type: 'image/png',
              purpose: 'any maskable'
            },
            {
              src: '/icons/icon-384x384.png',
              sizes: '384x384',
              type: 'image/png',
              purpose: 'any maskable'
            },
            {
              src: '/icons/icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ],
          shortcuts: [
            {
              name: 'Live TV',
              short_name: 'Live',
              description: 'Watch live TV channels',
              url: '/livetv',
              icons: [{ src: '/icons/icon-96x96.png', sizes: '96x96' }]
            },
            {
              name: 'Favorites',
              short_name: 'Favs',
              description: 'Your favorite channels',
              url: '/favorites',
              icons: [{ src: '/icons/icon-96x96.png', sizes: '96x96' }]
            }
          ],
          categories: ['entertainment', 'video', 'media', 'tv'],
          screenshots: [
            {
              src: '/screenshots/desktop.png',
              sizes: '1280x720',
              type: 'image/png',
              platform: 'wide',
              label: 'StreamFlix Desktop View'
            },
            {
              src: '/screenshots/mobile.png',
              sizes: '720x1280',
              type: 'image/png',
              platform: 'narrow',
              label: 'StreamFlix Mobile View'
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/.*\.m3u8$/,
              handler: 'NetworkOnly',
              options: {
                backgroundSync: {
                  name: 'streamflix-queue'
                }
              }
            },
            {
              urlPattern: /^https:\/\/iptv-org\.github\.io\/.*\.m3u$/,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'playlists-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 // 24 hours
                }
              }
            },
            {
              urlPattern: /^https:\/\/.*\.(png|jpg|jpeg|svg|gif)$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'images-cache',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
                }
              }
            }
          ]
        },
        devOptions: {
          enabled: true,
          type: 'module'
        }
      })
    ],
    server: {
      port: 3000,
      open: true,
      https: false
    },
    define: {
      'import.meta.env.VITE_DEFAULT_M3U_URL': JSON.stringify(env.VITE_DEFAULT_M3U_URL),
      'import.meta.env.VITE_APP_NAME': JSON.stringify(env.VITE_APP_NAME),
      'import.meta.env.VITE_APP_VERSION': JSON.stringify(env.VITE_APP_VERSION),
    }
  }
})