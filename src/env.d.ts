// Client-side environment variables
interface ImportMetaEnv {
  readonly VITE_SITE_URL: string
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_PUBLISHABLE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Server-side environment variables
declare namespace NodeJS {
  interface ProcessEnv {
    readonly VITE_SITE_URL: string
    readonly VITE_SUPABASE_URL: string
    readonly VITE_SUPABASE_PUBLISHABLE_KEY: string
  }
}
