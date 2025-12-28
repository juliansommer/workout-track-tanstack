import { createFileRoute, redirect } from "@tanstack/react-router"

import { createSupabaseBrowserClient } from "@/lib/supabase/client"

export const Route = createFileRoute("/_authed")({
  beforeLoad: async () => {
    const supabase = createSupabaseBrowserClient()
    const claim = await supabase.auth.getClaims()
    const user = claim.data?.claims.sub
    if (!user) {
      throw redirect({ to: "/login", replace: true })
    }
    return user
  },
})
