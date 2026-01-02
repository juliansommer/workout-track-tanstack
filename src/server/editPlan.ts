import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"

import { createSupabaseServerClient } from "@/lib/supabase/server"
import { planFormSchema } from "@/types/planForm"

const editPlanSchema = z.object({
  planId: z.string().min(1, "Plan ID is required"),
  formData: planFormSchema,
})

export const editPlan = createServerFn({ method: "POST" })
  .inputValidator(editPlanSchema)
  .handler(async ({ data }) => {
    const supabase = createSupabaseServerClient()

    // get the user and check auth
    const claims = await supabase.auth.getClaims()
    const user = claims.data?.claims.sub

    if (!user) {
      throw new Error("User not found")
    }

    // update the plan with name and notes
    const { error } = await supabase
      .from("plan")
      .update({
        name: data.formData.name,
        notes: data.formData.notes,
      })
      .eq("id", data.planId)

    if (error) {
      throw new Error("Failed to update plan", { cause: error })
    }

    // delete the old exercises
    const { error: error2 } = await supabase
      .from("plan_exercise")
      .delete()
      .eq("plan_id", data.planId)

    if (error2) {
      throw new Error("Failed to delete exercises", { cause: error2 })
    }

    // insert the new exercises
    for (const exercise of data.formData.exercises) {
      const { error: error3 } = await supabase.from("plan_exercise").insert({
        plan_id: data.planId,
        exercise_id: exercise.value,
        sets: exercise.sets,
      })

      if (error3) {
        throw new Error("Failed to create plan_exercise", { cause: error3 })
      }
    }
  })
