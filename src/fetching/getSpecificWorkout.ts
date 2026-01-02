import { getSupabaseClient } from "@/lib/supabase/isomorphic"

export async function getSpecificWorkout(workoutId: string) {
  const supabase = getSupabaseClient()

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
    .eq("id", workoutId)
    .single()

  if (error) {
    throw new Error("Failed to fetch workout details", { cause: error })
  }

  return workoutData
}
