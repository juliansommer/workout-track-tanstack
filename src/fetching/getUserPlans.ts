import { getSupabaseClient } from "@/lib/supabase/isomorphic"

export async function getUserPlans() {
  const supabase = getSupabaseClient()

  const claims = await supabase.auth.getClaims()
  const user = claims.data?.claims.sub

  if (!user) {
    throw new Error("User not found")
  }

  const { data, error } = await supabase
    .from("plan")
    .select("id, name, notes")
    .order("name", { ascending: true })
    .eq("user_id", user)

  if (error) {
    throw new Error("Failed to fetch plans", { cause: error })
  }

  return data
}
