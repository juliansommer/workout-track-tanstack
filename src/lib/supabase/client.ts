import { createBrowserClient } from "@supabase/ssr"

import type { Database } from "@/types/supabase"

export default function createSupabaseBrowserClient() {
  return createBrowserClient<Database>(
    process.env.VITE_SUPABASE_URL ?? "",
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "",
  )
}
