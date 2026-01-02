import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"

import { createSupabaseServerClient } from "@/lib/supabase/server"
import type { WorkoutTargets } from "@/types/workoutForm"

const getWorkoutTargetsSchema = z.object({
  planId: z.string().min(1, "Plan ID is required"),
})

export const getWorkoutTargets = createServerFn()
  .inputValidator(getWorkoutTargetsSchema)
  .handler(async ({ data }): Promise<WorkoutTargets> => {
    const supabase = await createSupabaseServerClient()

    // get the user and check auth
    const claims = await supabase.auth.getClaims()
    const user = claims.data?.claims.sub

    if (!user) {
      throw new Error("User not found")
    }

    const { data: workoutData, error } = await supabase
      .from("workout")
      .select(
        `
        workout_exercise (
          created_at,
          exercise_id,
          set (
            weight,
            reps,
            order
          )
        )
      `,
      )
      .eq("plan_id", data.planId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        // No workout found for the given planId
        // meaning its first time tracking for this plan
        // so we can return an empty object
        return {}
      }
      throw new Error("Failed to fetch workout details", { cause: error })
    }

    // Transform data into the required format
    // this format is required as we need to be able to use exercise_id and set_number as keys
    const formattedData: WorkoutTargets = {}

    if (workoutData?.workout_exercise) {
      // Iterate through each exercise
      for (const exercise of workoutData.workout_exercise) {
        const exerciseId = exercise.exercise_id
        formattedData[exerciseId] ??= {}

        // Iterate through sets for this exercise
        if (exercise.set) {
          for (const set of exercise.set) {
            // Use set order as the set number (zero-indexed)
            const setNumber = set.order

            formattedData[exerciseId] = formattedData[exerciseId] ?? {}
            formattedData[exerciseId][setNumber] = {
              weight: set.weight,
              reps: set.reps,
            }
          }
        }
      }
    }

    return formattedData
  })
