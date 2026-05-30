import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import { nitro } from "nitro/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    ...tanstackStart({
      server: { entry: "server" },
    }),
    nitro({
      preset: process.env.NITRO_PRESET || (process.env.VERCEL ? "vercel" : "node-server"),
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
});
