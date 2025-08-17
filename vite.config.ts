import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  resolve: {
    alias: {
      "@": "/src",
      "@pages": "/src/pages",
      "@features": "/src/features",
      "@shared": "/src/shared",
      "@store": "/src/store",
      "@assets": "/src/assets",
      "@types": "/src/types",
      "@data": "/src/data",
    },
  },
});
