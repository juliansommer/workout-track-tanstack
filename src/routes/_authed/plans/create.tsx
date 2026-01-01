import { createFileRoute } from "@tanstack/react-router"

import { Heading } from "@/components/heading"
import { getAllExerciseNames } from "@/server/fetching/getAllExerciseNames"
import PlanForm from "./-components/plan-form"

export const Route = createFileRoute("/_authed/plans/create")({
  loader: () => getAllExerciseNames(),
  head: () => ({
    meta: [
      {
        title: "Create Plan | Workout Track",
      },
    ],
  }),
  component: CreatePlan,
})

function CreatePlan() {
  const data = Route.useLoaderData()
  return (
    <>
      <Heading title="Create Plan" />
      <PlanForm data={data} />
    </>
  )
}
