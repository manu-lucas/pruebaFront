import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    VitePWA({
      manifest: {
        display:"standalone",
        display_override:[ "window-controls-overlay"],
        lang: "es-Es",
        short_name:"ejemplo",
        description:"Ejemplo de pwa",
        theme_color :"#19223c",
        background_color:"#d4d4d4",
        icons: [
          {
            src: 'favicon-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'favicon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose:"any"
          },
          {
            src: 'favicon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose:"maskable"

          },
        ]

      }
    })


  ],
})
