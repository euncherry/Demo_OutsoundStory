import { globalStyle } from "@vanilla-extract/css";

// WaveformTab 애니메이션 스타일
globalStyle("@keyframes legendPulse", {
  "0%, 100%": {
    transform: "scale(1)",
  },
  "50%": {
    transform: "scale(1.2)",
  },
});

globalStyle("@keyframes float", {
  "0%, 100%": {
    transform: "translateY(0px)",
  },
  "50%": {
    transform: "translateY(-10px)",
  },
});
