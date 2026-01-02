import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

import { Heading } from "@/components/heading"
import { getAllExerciseNamesQueryOptions } from "@/queries/exercises"
import PlanForm from "./-components/plan-form"

export const Route = createFileRoute("/_authed/plans/create")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(getAllExerciseNamesQueryOptions()),
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
  const { data } = useSuspenseQuery(getAllExerciseNamesQueryOptions())

  return (
    <>
      <Heading title="Create Plan" />
      <PlanForm data={data} />
    </>
  )
}
