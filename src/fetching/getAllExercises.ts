import { getSupabaseClient } from "@/lib/supabase/isomorphic"

export async function getAllExercises() {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from("exercise")
    .select("id, name")
    .order("name", { ascending: true })

  if (error) {
    throw new Error("Failed to fetch exercises", { cause: error })
  }

  return data
}
