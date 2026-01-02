import { createServerFn } from "@tanstack/react-start"

import { createSupabaseServerClient } from "@/lib/supabase/server"
import { planFormSchema } from "@/types/planForm"

export const createPlan = createServerFn({ method: "POST" })
  .inputValidator(planFormSchema)
  .handler(async ({ data }) => {
    const supabase = createSupabaseServerClient()

    // get the user and check auth
    const claims = await supabase.auth.getClaims()
    const user = claims.data?.claims.sub

    if (!user) {
      throw new Error("User not found")
    }

    // insert the plan
    const planId = crypto.randomUUID()
    const { error } = await supabase.from("plan").insert({
      id: planId,
      user_id: user,
      name: data.name,
      notes: data.notes,
    })

    if (error) {
      throw new Error("Failed to create plan", { cause: error })
    }

    // loop through exercises and insert them
    for (const exercise of data.exercises) {
      const { error: error2 } = await supabase.from("plan_exercise").insert({
        plan_id: planId,
        exercise_id: exercise.value,
        sets: exercise.sets,
      })

      if (error2) {
        throw new Error("Failed to create plan_exercise", { cause: error2 })
      }
    }
  })
