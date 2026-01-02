import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"

import { createSupabaseServerClient } from "@/lib/supabase/server"
import { setsSchema } from "@/types/workoutForm"

const createWorkoutSchema = z.object({
  id: z.string().min(1, "Plan ID is required"),
  sets: setsSchema,
})

export const createWorkout = createServerFn({ method: "POST" })
  .inputValidator(createWorkoutSchema)
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: shh
  .handler(async ({ data }) => {
    const supabase = createSupabaseServerClient()

    // get the user and check auth
    const claim = await supabase.auth.getClaims()
    const user = claim.data?.claims.sub

    if (!user) {
      throw new Error("User not found")
    }

    // create main workout record
    const workoutId = crypto.randomUUID()
    const { error } = await supabase.from("workout").insert({
      id: workoutId,
      user_id: user,
      plan_id: data.id,
    })

    if (error) {
      throw new Error("Failed to create workout", { cause: error })
    }

    // then create workout_exercise records
    if (!data.sets) {
      throw new Error("Workout sets not found")
    }

    const setKeys = Object.keys(data.sets)
    for (let i = 0; i < setKeys.length; i++) {
      const workoutExerciseId = crypto.randomUUID()

      const key = setKeys[i]
      if (key === undefined) {
        throw new Error("Set key is undefined")
      }

      const exerciseSet = data.sets[key]
      if (!exerciseSet) {
        throw new Error("Exercise set not found")
      }

      const { error: error2 } = await supabase.from("workout_exercise").insert({
        id: workoutExerciseId,
        workout_id: workoutId,
        exercise_id: key,
        order: i,
      })

      if (error2) {
        throw new Error("Failed to create workout_exercise", { cause: error2 })
      }

      // loop through sets and insert them
      for (let j = 0; j < exerciseSet.length; j++) {
        const setId = crypto.randomUUID()
        const set = exerciseSet[j]
        if (!set) {
          throw new Error("Set not found")
        }

        const { error: error3 } = await supabase.from("set").insert({
          id: setId,
          workout_exercise_id: workoutExerciseId,
          weight: set.weight,
          reps: set.reps,
          order: j,
        })

        if (error3) {
          throw new Error("Failed to create set", { cause: error3 })
        }
      }
    }
  })
