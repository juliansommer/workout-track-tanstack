import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

import { Heading } from "@/components/heading"
import { Skeleton } from "@/components/ui/skeleton"
import { getAllExerciseNamesQueryOptions } from "@/queries/exercises"
import PlanForm from "./-components/plan-form"
import PlanFormSkeleton from "./-components/plan-form-skeleton"

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
  pendingComponent: PendingCreatePlan,
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

function PendingCreatePlan() {
  return (
    <>
      <Heading title="Create Plan" />
      <PlanFormSkeleton>
        {/* Submit Button */}
        <div className="pt-5">
          <Skeleton className="h-10 w-20" />
        </div>
      </PlanFormSkeleton>
    </>
  )
}
