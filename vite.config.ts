import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Plan & Vote",
        short_name: "PlanVote",
        description: "Plan your travel",
        theme_color: "#ffffff",
        icons: [
          {
            src: "logo_192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "logo_512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  define: {
    global: "window",
  },
});
