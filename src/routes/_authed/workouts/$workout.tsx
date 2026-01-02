import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

import { Heading } from "@/components/heading"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cleanTimestamp, convertToWebp } from "@/lib/utils"
import { specificWorkoutQueryOptions } from "@/queries/workouts"

export const Route = createFileRoute("/_authed/workouts/$workout")({
  loader: ({ params, context }) =>
    context.queryClient.ensureQueryData(
      specificWorkoutQueryOptions(params.workout),
    ),
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${cleanTimestamp(loaderData?.created_at ?? "")} Workout | Workout Track`,
      },
    ],
  }),
  component: Workout,
})

function Workout() {
  const { workout } = Route.useParams()
  const { data } = useSuspenseQuery(specificWorkoutQueryOptions(workout))

  return (
    <>
      <Heading title={`${cleanTimestamp(data.created_at)} Workout`} />
      <div className="container mx-auto px-4 py-6 md:px-6">
        <div className="flex flex-col space-y-6">
          <div className="grid gap-6">
            {data.workout_exercise.map((exercise) => (
              <Card className="overflow-hidden" key={exercise.exercise.name}>
                <div className="grid gap-4 md:grid-cols-[300px_1fr]">
                  <div className="relative h-[200px] md:h-full">
                    <img
                      alt={exercise.exercise.name}
                      className="h-full w-full object-cover"
                      height={200}
                      loading="eager"
                      src={`/images/${convertToWebp(exercise.exercise.image)}`}
                      width={300}
                    />
                  </div>
                  <div className="p-4">
                    <CardHeader className="p-0 pb-4">
                      <CardTitle>{exercise.exercise.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="grid gap-4">
                        {exercise.set.map((set, setIndex) => (
                          <div
                            className="grid grid-cols-[auto_1fr_1fr] items-center gap-4"
                            key={set.id}
                          >
                            <div className="font-medium">
                              Set {setIndex + 1}
                            </div>
                            <div className="space-y-1">
                              <Label
                                htmlFor={`${exercise.exercise.name}-set-${setIndex}-weight`}
                              >
                                Weight
                              </Label>
                              <Input
                                id={`${exercise.exercise.name}-set-${setIndex}-weight`}
                                readOnly
                                type="number"
                                value={set.weight}
                              />
                            </div>
                            <div className="space-y-1">
                              <Label
                                htmlFor={`${exercise.exercise.name}-set-${setIndex}-reps`}
                              >
                                Reps
                              </Label>
                              <Input
                                id={`${exercise.exercise.name}-set-${setIndex}-reps`}
                                placeholder="0"
                                readOnly
                                value={set.reps}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
