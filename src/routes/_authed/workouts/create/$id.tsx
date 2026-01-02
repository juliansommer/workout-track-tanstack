import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

import { Heading } from "@/components/heading"
import { specificPlanQueryOptions } from "@/queries/plans"
import { workoutTargetsQueryOptions } from "@/queries/workouts"
import WorkoutForm from "../-components/workout-form"

export const Route = createFileRoute("/_authed/workouts/create/$id")({
  loader: async ({ params, context }) => {
    const [planData, _] = await Promise.all([
      context.queryClient.ensureQueryData(specificPlanQueryOptions(params.id)),
      context.queryClient.ensureQueryData(
        workoutTargetsQueryOptions(params.id),
      ),
    ])
    return planData.name
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `Create Workout of Plan ${loaderData ?? ""} | Workout Track`,
      },
    ],
  }),
  component: CreateWorkoutId,
})

function CreateWorkoutId() {
  const { id } = Route.useParams()
  const { data } = useSuspenseQuery(specificPlanQueryOptions(id))
  const { data: targets } = useSuspenseQuery(workoutTargetsQueryOptions(id))

  return (
    <>
      <Heading title={`${data.name} Workout`} />
      <WorkoutForm workoutData={data} workoutTargets={targets} />
    </>
  )
}
