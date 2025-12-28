import { createFileRoute } from "@tanstack/react-router"

import { createSupabaseServerClient } from "@/lib/supabase/server"

export const Route = createFileRoute("/auth/callback")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url)
        const code = url.searchParams.get("code")
        const isLocalEnv = process.env.NODE_ENV === "development"

        if (code) {
          const supabase = createSupabaseServerClient()
          const { error } = await supabase.auth.exchangeCodeForSession(code)
          if (!error) {
            const forwardedHost = request.headers.get("x-forwarded-host") // original origin before load balancer
            let redirectUrl: string
            if (isLocalEnv) {
              // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
              redirectUrl = `${url.origin}`
            } else if (forwardedHost) {
              redirectUrl = `https://${forwardedHost}`
            } else {
              redirectUrl = `${url.origin}}`
            }
            // Create a Response with mutable headers so TanStack Start can merge cookies
            return new Response(null, {
              status: 302,
              headers: {
                Location: redirectUrl,
              },
            })
          }
        }
      },
    },
  },
})
