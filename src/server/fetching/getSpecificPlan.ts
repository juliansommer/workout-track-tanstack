import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"

import { createSupabaseServerClient } from "@/lib/supabase/server"
import type { PlanData } from "@/types"

const getSpecificPlanSchema = z.object({
  planId: z.string().min(1, "Plan ID is required"),
})

export const getSpecificPlan = createServerFn()
  .inputValidator(getSpecificPlanSchema)
  .handler(async ({ data }): Promise<PlanData> => {
    const supabase = createSupabaseServerClient()

    // get the user and check auth
    const claims = await supabase.auth.getClaims()
    const user = claims.data?.claims.sub

    if (!user) {
      throw new Error("User not found")
    }

    const { data: planData, error } = await supabase
      .from("plan")
      .select(
        `
        id,
        name,
        notes,
        plan_exercise (
          exercise_id,
          sets,
          exercise (
            name,
            image
          )
        )
      `,
      )
      .eq("id", data.planId)
      .single()

    if (error) {
      throw new Error("Failed to fetch plan details", { cause: error })
    }

    // reformat the data to match the PlanData type
    const combinedData: PlanData = {
      id: planData.id,
      name: planData.name,
      notes: planData.notes,
      exercises: planData.plan_exercise.map((plan_exercise) => ({
        id: plan_exercise.exercise_id,
        sets: plan_exercise.sets,
        name: plan_exercise.exercise.name,
        image: plan_exercise.exercise.image,
      })),
    }

    return combinedData
  })
