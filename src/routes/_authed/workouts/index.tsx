import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"

import { Heading } from "@/components/heading"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cleanTimestamp, cn } from "@/lib/utils"
import { userWorkoutsQueryOptions } from "@/queries/workouts"

export const Route = createFileRoute("/_authed/workouts/")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(userWorkoutsQueryOptions()),
  head: () => ({
    meta: [
      {
        title: "Workouts | Workout Track",
      },
    ],
  }),
  component: Workouts,
})

function Workouts() {
  const { data } = useSuspenseQuery(userWorkoutsQueryOptions())

  return (
    <>
      <Heading title="Workouts" />
      <div className="mx-auto flex max-w-4xl items-center justify-center rounded-md">
        <Link
          className={cn(buttonVariants({ variant: "default" }), "w-full")}
          to="/workouts/create"
        >
          Create Workout
        </Link>
      </div>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((workout) => (
            <Link
              key={workout.id}
              params={{ workout: workout.id }}
              to="/workouts/$workout"
            >
              <Card className="transition-shadow duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>{workout.plan.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    {cleanTimestamp(workout.created_at)}
                  </p>
                  <ul className="list-disc pt-2 pl-5 text-muted-foreground text-sm">
                    {workout.workout_exercise.map((exercise) => (
                      <li key={exercise.exercise_id}>
                        {exercise.exercise.name}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
