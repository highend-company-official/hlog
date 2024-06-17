import * as path from "path";
import { defineConfig } from "vite";
import Pages from "vite-plugin-pages";
import generateSitemap from "vite-plugin-pages-sitemap";
import react from "@vitejs/plugin-react";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    Pages({
      onRoutesGenerated: (routes) => generateSitemap({ routes }),
    }),
  ],
  base: "/",
  define: {
    global: "window",
  },
  server: {
    hmr: { overlay: false },
  },
});
