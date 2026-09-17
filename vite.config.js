import { defineConfig } from "vite";
export default defineConfig({
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (
          warning.code === "MODULE_LEVEL_DIRECTIVE" &&
          warning.message.includes("use client")
        )
          return;
        warn(warning);
      },
      output: {
        manualChunks: { three: ["three"], motion: ["framer-motion", "gsap"] },
      },
    },
  },
});
