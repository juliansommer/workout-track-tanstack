import { getSupabaseClient } from "@/lib/supabase/isomorphic"
import type { PlanData } from "@/types"

export async function getSpecificPlan(planId: string) {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
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
    .eq("id", planId)
    .single()

  if (error) {
    throw new Error("Failed to fetch plan details", { cause: error })
  }

  // reformat the data to match the PlanData type
  const combinedData: PlanData = {
    id: data.id,
    name: data.name,
    notes: data.notes,
    exercises: data.plan_exercise.map((plan_exercise) => ({
      id: plan_exercise.exercise_id,
      sets: plan_exercise.sets,
      name: plan_exercise.exercise.name,
      image: plan_exercise.exercise.image,
    })),
  }

  return combinedData
}
