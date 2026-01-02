import { createFileRoute } from "@tanstack/react-router"

import { Heading } from "@/components/heading"
import { getSpecificPlan } from "@/server/fetching/getSpecificPlan"
import { getWorkoutTargets } from "@/server/fetching/getWorkoutTargets"
import WorkoutForm from "../-components/workout-form"

export const Route = createFileRoute("/_authed/workouts/create/$id")({
  loader: async ({ params }) => {
    const [data, targets] = await Promise.all([
      getSpecificPlan({ data: { planId: params.id } }),
      getWorkoutTargets({ data: { planId: params.id } }),
    ])
    return { data, targets }
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `Create Workout of Plan ${loaderData?.data?.name ?? ""} | Workout Track`,
      },
    ],
  }),
  component: CreateWorkoutId,
})

function CreateWorkoutId() {
  const { data, targets } = Route.useLoaderData()

  return (
    <>
      <Heading title={`${data.name} Workout`} />
      <WorkoutForm workoutData={data} workoutTargets={targets} />
    </>
  )
}
