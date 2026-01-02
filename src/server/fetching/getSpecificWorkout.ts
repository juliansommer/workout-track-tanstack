import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"

import { createSupabaseServerClient } from "@/lib/supabase/server"

const getSpecificWorkoutSchema = z.object({
  workoutId: z.string().min(1, "Workout ID is required"),
})

export const getSpecificWorkout = createServerFn()
  .inputValidator(getSpecificWorkoutSchema)
  .handler(async ({ data }) => {
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
        created_at,
        workout_exercise (
          exercise (
            name,
            image
          ),
          set (
            id,
            weight,
            reps
          )
        )
      `,
      )
      .eq("id", data.workoutId)
      .single()

    if (error) {
      throw new Error("Failed to fetch workout details", { cause: error })
    }

    return workoutData
  })
