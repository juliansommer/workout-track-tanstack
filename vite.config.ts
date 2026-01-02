import { fileURLToPath, URL } from "node:url"

import tailwindcss from "@tailwindcss/vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import { nitro } from "nitro/vite"
import { defineConfig, type Plugin } from "vite"

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1500,
  },
  server: {
    port: 3000,
  },
  plugins: [
    validateEnv(),
    tanstackStart(),
    nitro(),
    viteReact({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})

function validateEnv(): Plugin {
  return {
    name: "validate-env",
    configResolved(config) {
      const envVars = [
        "VITE_SITE_URL",
        "VITE_SUPABASE_URL",
        "VITE_SUPABASE_PUBLISHABLE_KEY",
      ] as const

      // Validate client env vars
      for (const key of envVars) {
        if (!config.env[key]) {
          throw new Error(`Missing required environment variable: ${key}`)
        }
      }

      // Validate server env vars
      for (const key of envVars) {
        if (!process.env[key]) {
          throw new Error(`Missing required environment variable: ${key}`)
        }
      }
    },
  }
}
