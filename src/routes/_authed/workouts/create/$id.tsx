import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

import { Heading, HeadingSkeleton } from "@/components/heading"
import { Skeleton } from "@/components/ui/skeleton"
import { specificPlanQueryOptions } from "@/queries/plans"
import { workoutTargetsQueryOptions } from "@/queries/workouts"
import WorkoutForm from "../-components/workout-form"
import WorkoutFormSkeleton from "../-components/workout-form-skeleton"

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
  pendingComponent: PendingCreateWorkoutId,
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

function PendingCreateWorkoutId() {
  return (
    <>
      <HeadingSkeleton />
      <WorkoutFormSkeleton>
        <div className="pt-5">
          <Skeleton className="h-10 w-20" />
        </div>
      </WorkoutFormSkeleton>
    </>
  )
}
