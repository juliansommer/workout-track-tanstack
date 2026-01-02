import { getSupabaseClient } from "@/lib/supabase/isomorphic"

export async function getUserWorkouts() {
  const supabase = getSupabaseClient()

  const claims = await supabase.auth.getClaims()
  const user = claims.data?.claims.sub

  if (!user) {
    throw new Error("User not found")
  }

  const { data, error } = await supabase
    .from("workout")
    .select(
      `
        id,
        created_at,
        plan (
          name
        ),
        workout_exercise (
          exercise_id,
          exercise (
            name
          )
        )
      `,
    )
    .order("created_at", { ascending: false })
    .eq("user_id", user)

  if (error) {
    throw new Error("Failed to fetch workouts", { cause: error })
  }

  return data
}
