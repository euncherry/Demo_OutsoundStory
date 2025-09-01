import { globalStyle } from "@vanilla-extract/css";

// PitchContourTab 애니메이션 스타일
globalStyle("@keyframes pitchFloat", {
  "0%, 100%": {
    transform: "translateY(0px)",
  },
  "50%": {
    transform: "translateY(-5px)",
  },
});

globalStyle("@keyframes pitchPulse", {
  "0%, 100%": {
    transform: "scale(1)",
    opacity: "0.8",
  },
  "50%": {
    transform: "scale(1.05)",
    opacity: "1",
  },
});
