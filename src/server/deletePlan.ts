import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"

import { createSupabaseServerClient } from "@/lib/supabase/server"

const deletePlanSchema = z.object({
  planId: z.string().min(1, "Plan ID is required"),
})

export const deletePlan = createServerFn({ method: "POST" })
  .inputValidator(deletePlanSchema)
  .handler(async ({ data }) => {
    const supabase = createSupabaseServerClient()

    // get the user and check auth
    const claims = await supabase.auth.getClaims()
    const user = claims.data?.claims.sub

    if (!user) {
      throw new Error("User not found")
    }

    const { error } = await supabase.from("plan").delete().eq("id", data.planId)

    if (error) {
      throw new Error("Failed to delete plan", { cause: error })
    }
  })
