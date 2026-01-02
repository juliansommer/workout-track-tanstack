import { createIsomorphicFn } from "@tanstack/react-start"

import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { createSupabaseServerClient } from "@/lib/supabase/server"

// need this as a full ssr of a protected route would call the browser client, and wouldn't be able to auth properly
// so this function will return the correct client based on the environment
export const getSupabaseClient = createIsomorphicFn()
  .server(() => createSupabaseServerClient())
  .client(() => createSupabaseBrowserClient())
