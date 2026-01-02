import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"
import { Dumbbell, Edit } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { convertToWebp, createSlug } from "@/lib/utils"
import { specificPlanQueryOptions } from "@/queries/plans"
import DeletePlan from "../-components/delete-plan"

export const Route = createFileRoute("/_authed/plans/$plan/")({
  loader: ({ params, context }) =>
    context.queryClient.ensureQueryData(specificPlanQueryOptions(params.plan)),
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `Plan ${loaderData?.name ?? ""} | Workout Track`,
      },
    ],
  }),
  component: PlanDetails,
  pendingComponent: PendingPlanDetails,
})

function PlanDetails() {
  const { plan } = Route.useParams()
  const { data } = useSuspenseQuery(specificPlanQueryOptions(plan))

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <Card>
        <CardHeader className="flex flex-col space-y-1.5 p-6">
          <div className="flex items-center justify-between">
            <CardTitle className="font-bold text-2xl">{data.name}</CardTitle>
            <div className="flex space-x-2">
              <Link
                className={buttonVariants({
                  variant: "outline",
                  size: "icon",
                })}
                params={{ plan: data.id }}
                to="/plans/$plan/edit"
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit Plan</span>
              </Link>
              <DeletePlan planId={data.id} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!!data.notes && (
            <div className="mb-6">
              <h2 className="mb-2 font-semibold text-xl">Notes</h2>
              <p className="text-neutral-700 dark:text-neutral-300">
                {data.notes}
              </p>
            </div>
          )}
          <h2 className="mb-4 font-semibold text-xl">Exercises</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {data.exercises.map((exercise) => (
              <Card className="overflow-hidden" key={exercise.id}>
                <Link
                  params={{ exercise: createSlug(exercise.name) }}
                  to="/exercises/$exercise"
                >
                  <div className="relative aspect-video">
                    <img
                      alt={exercise.name}
                      className="h-full w-full"
                      height={300}
                      loading="eager"
                      src={`/images/${convertToWebp(exercise.image)}`}
                      width={500}
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="mb-2 font-semibold text-lg">
                      {exercise.name}
                    </h3>
                    <div className="flex items-center text-neutral-600 text-sm dark:text-neutral-500">
                      <Dumbbell className="mr-2 h-4 w-4" />
                      <span>{exercise.sets} sets</span>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function PendingPlanDetails() {
  return (
    <div className="container mx-auto max-w-4xl p-4">
      {/* Height is guaranteed to be at least 132 pixels as thats the height on desktop with 1 exercise */}
      <Skeleton className="h-132 rounded-lg" />
    </div>
  )
}
