//vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import express from "vite3-plugin-express";

export default defineConfig({
  plugins: [vue(), express("index.ts")],
});
