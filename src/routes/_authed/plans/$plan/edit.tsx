import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

import { Heading } from "@/components/heading"
import { Skeleton } from "@/components/ui/skeleton"
import { getAllExerciseNamesQueryOptions } from "@/queries/exercises"
import { specificPlanQueryOptions } from "@/queries/plans"
import PlanForm from "../-components/plan-form"
import PlanFormSkeleton from "../-components/plan-form-skeleton"

export const Route = createFileRoute("/_authed/plans/$plan/edit")({
  loader: async ({ params, context }) => {
    const [planData, _] = await Promise.all([
      context.queryClient.ensureQueryData(
        specificPlanQueryOptions(params.plan),
      ),
      context.queryClient.ensureQueryData(getAllExerciseNamesQueryOptions()),
    ])
    return planData.name
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `Edit Plan ${loaderData ?? ""} | Workout Track`,
      },
    ],
  }),
  component: EditPlan,
  pendingComponent: PendingEditPlan,
})

function EditPlan() {
  const { plan } = Route.useParams()
  const { data: exerciseData } = useSuspenseQuery(
    getAllExerciseNamesQueryOptions(),
  )
  const { data: planData } = useSuspenseQuery(specificPlanQueryOptions(plan))

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

function PendingEditPlan() {
  return (
    <>
      <Heading title="Edit Plan" />
      <PlanFormSkeleton>
        {/* Exercise components */}
        <div className="space-y-5 pt-5">
          {["exercise-a", "exercise-b", "exercise-c"].map((key) => (
            <div className="flex items-center justify-between" key={key}>
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </PlanFormSkeleton>
    </>
  )
}
