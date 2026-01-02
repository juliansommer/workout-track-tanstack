import { createFileRoute, redirect } from "@tanstack/react-router"

import { getSupabaseClient } from "@/lib/supabase/isomorphic"

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
