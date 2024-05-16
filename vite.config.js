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
        name:"Prueba",
        short_name:"prueba",
        description:"Ejemplo de pwa",
        theme_color :"#006f76",
        background_color:"#006f76",
        icons: [
          {
            src: 'favicon-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'favicon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
            purpose:"any"
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
