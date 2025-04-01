/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    include: ["src/**/*.test.{ts,tsx}"], // Only include test files here
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: true,
    // Benchmark configuration goes inside 'test'
    benchmark: {
      include: ["src/**/*.bench.{ts,tsx}"], // Only include bench files here
      // environment and setupFiles are likely inherited from the main test config
    },
  },
});
