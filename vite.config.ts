// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isDev = command === "serve" || mode === "development";

  return {
    plugins: [react(), vanillaExtractPlugin()],
    resolve: {
      alias: {
        "@": "/src",
        "@pages": "/src/pages",
        "@features": "/src/features",
        "@shared": "/src/shared",
        "@store": "/src/store",
        // 환경별 assets 경로 설정
        "@assets": isDev ? "/src/assets" : "/public/assets",
        "@types": "/src/types",
        "@data": "/src/data",
      },
    },

    // 빌드 에러 무시 설정
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.code === "UNUSED_EXTERNAL_IMPORT") return;
          if (warning.code === "CIRCULAR_DEPENDENCY") return;
          if (warning.code === "EMPTY_BUNDLE") return;
          if (warning.code === "EVAL") return;
          warn(warning);
        },
      },
      emptyOutDir: true,
      sourcemap: false,
      chunkSizeWarningLimit: 1000,
    },

    esbuild: {
      drop: [],
      logOverride: {
        "this-is-undefined-in-esm": "silent",
        "empty-import-meta": "silent",
      },
    },

    server: {
      hmr: {
        overlay: false,
      },
    },
  };
});
