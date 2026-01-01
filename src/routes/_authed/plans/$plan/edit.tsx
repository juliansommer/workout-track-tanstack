import { createFileRoute } from "@tanstack/react-router"

import { Heading } from "@/components/heading"
import { getAllExerciseNames } from "@/server/fetching/getAllExerciseNames"
import { getSpecificPlan } from "@/server/fetching/getSpecificPlan"
import PlanForm from "../-components/plan-form"

export const Route = createFileRoute("/_authed/plans/$plan/edit")({
  loader: async ({ params }) => {
    const [exerciseData, planData] = await Promise.all([
      getAllExerciseNames(),
      getSpecificPlan({ data: { planId: params.plan } }),
    ])
    return { exerciseData, planData }
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `Edit Plan ${loaderData?.planData?.name ?? ""} | Workout Track`,
      },
    ],
  }),
  component: EditPlan,
})

function EditPlan() {
  const { exerciseData, planData } = Route.useLoaderData()

  const newPlanData = {
    id: planData.id,
    name: planData.name,
    notes: planData.notes,
    exercises: planData.exercises.map((exercise) => ({
      label: exercise.name,
      value: exercise.id,
      sets: exercise.sets ?? 0,
    })),
  }

  return (
    <>
      <Heading title="Edit Plan" />
      <PlanForm data={exerciseData} planData={newPlanData} />
    </>
  )
}
