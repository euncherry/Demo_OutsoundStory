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
      "@assets": "/public/assets",
      "@types": "/src/types",
      "@data": "/src/data",
    },
  },

  // 빌드 에러 무시 설정
  build: {
    // 빌드 시 에러가 발생해도 계속 진행
    rollupOptions: {
      onwarn(warning, warn) {
        // 특정 경고들 무시
        if (warning.code === "UNUSED_EXTERNAL_IMPORT") return;
        if (warning.code === "CIRCULAR_DEPENDENCY") return;
        if (warning.code === "EMPTY_BUNDLE") return;
        if (warning.code === "EVAL") return;

        // 나머지 경고는 표시
        warn(warning);
      },
    },
    // 빌드 출력 디렉터리 비우기
    emptyOutDir: true,
    // 소스맵 생성 (디버깅용, 필요없으면 false)
    sourcemap: false,
    // 더 관대한 chunk size 경고
    chunkSizeWarningLimit: 1000,
  },

  // ESBuild 설정 (TypeScript/JavaScript 변환)
  esbuild: {
    // console.log 등을 제거하지 않음 (production에서 제거하려면 ['console', 'debugger'])
    drop: [],
    // TypeScript 에러에 대해 더 관대하게
    logOverride: {
      "this-is-undefined-in-esm": "silent",
      "empty-import-meta": "silent",
    },
  },

  // 개발 서버 설정
  server: {
    // 개발 중에는 에러로 인한 HMR 중단 방지
    hmr: {
      overlay: false, // 에러 오버레이 비활성화
    },
  },
});
