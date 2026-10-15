import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"

import { createSupabaseServerClient } from "@/lib/supabase/server"
import { setsSchema } from "@/types/workoutForm"

const createWorkoutSchema = z.object({
  id: z.string().min(1, "Plan ID is required"),
  sets: setsSchema,
})

export const createWorkout = createServerFn({ method: "POST" })
  .validator(createWorkoutSchema)
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

    // build every row up front so each table takes a single insert
    const workoutExercises = Object.entries(data.sets).map(
      ([exerciseId, exerciseSets], order) => ({
        id: crypto.randomUUID(),
        workout_id: workoutId,
        exercise_id: exerciseId,
        order,
        exerciseSets,
      }),
    )

    const { error: error2 } = await supabase
      .from("workout_exercise")
      .insert(workoutExercises.map(({ exerciseSets: _, ...row }) => row))

    if (error2) {
      throw new Error("Failed to create workout_exercise", { cause: error2 })
    }

    const { error: error3 } = await supabase.from("set").insert(
      workoutExercises.flatMap(({ id, exerciseSets }) =>
        exerciseSets.map((set, order) => ({
          id: crypto.randomUUID(),
          workout_exercise_id: id,
          weight: set.weight,
          reps: set.reps,
          order,
        })),
      ),
    )

    if (error3) {
      throw new Error("Failed to create set", { cause: error3 })
    }
  })
