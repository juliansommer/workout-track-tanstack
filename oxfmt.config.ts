import { defineConfig } from "oxfmt"

export default defineConfig({
  printWidth: 80,
  semi: false,
  sortPackageJson: false,
  sortImports: {
    newlinesBetween: true,
  },
  sortTailwindcss: {
    stylesheet: "./src/styles/app.css",
    functions: ["clsx", "cn", "cva"],
  },
  ignorePatterns: [
    ".output/**",
    "src/routeTree.gen.ts",
    "src/types/supabase.ts",
  ],
})
