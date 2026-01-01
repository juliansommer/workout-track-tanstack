import { createFileRoute, redirect } from "@tanstack/react-router"
import { createIsomorphicFn } from "@tanstack/react-start"

import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { createSupabaseServerClient } from "@/lib/supabase/server"

// need this as a full ssr of a protected route would call the browser client, and wouldn't be able to auth properly
// so this function will return the correct client based on the environment
const getSupabaseClient = createIsomorphicFn()
  .server(() => createSupabaseServerClient())
  .client(() => createSupabaseBrowserClient())

export const Route = createFileRoute("/_authed")({
  beforeLoad: async () => {
    const supabase = getSupabaseClient()
    const claim = await supabase.auth.getClaims()
    const user = claim.data?.claims.sub
    if (!user) {
      throw redirect({ to: "/login", replace: true })
    }
    return user
  },
})
