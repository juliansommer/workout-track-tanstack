import { createServerFn } from "@tanstack/react-start"

import { createSupabaseServerClient } from "@/lib/supabase/server"

export const getAllExerciseNames = createServerFn().handler(async () => {
  const supabase = createSupabaseServerClient()

  // exercises are public so no need to check for user

  const { data, error } = await supabase
    .from("exercise")
    .select("id, name")
    .order("name", { ascending: true })

  if (error) {
    throw new Error("Failed to fetch exercises", { cause: error })
  }

  return data
})
