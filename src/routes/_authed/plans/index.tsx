import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"

import { Heading } from "@/components/heading"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { userPlansQueryOptions } from "@/queries/plans"

export const Route = createFileRoute("/_authed/plans/")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(userPlansQueryOptions()),
  head: () => ({
    meta: [
      {
        title: "Plans | Workout Track",
      },
    ],
  }),
  component: Plans,
  pendingComponent: PlansPending,
})

export default function Plans() {
  const { data } = useSuspenseQuery(userPlansQueryOptions())

  return (
    <>
      <Heading title="Plans" />
      <div className="mx-auto flex max-w-4xl items-center justify-center rounded-md">
        <Link
          className={cn(buttonVariants({ variant: "default" }), "w-full")}
          to="/plans/create"
        >
          Create Plan
        </Link>
      </div>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((plan) => (
            <Link key={plan.id} params={{ plan: plan.id }} to="/plans/$plan">
              <Card className="transition-shadow duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{plan.notes}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

function PlansPending() {
  return (
    <>
      <Heading title="Plans" />
      <div className="mx-auto flex max-w-4xl items-center justify-center rounded-md">
        <Link
          className={cn(buttonVariants({ variant: "default" }), "w-full")}
          to="/plans/create"
        >
          Create Plan
        </Link>
      </div>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => `skeleton-${i}`).map((key) => (
            <Card
              className="animate-pulse bg-neutral-100 dark:bg-neutral-800"
              key={key}
            >
              <CardHeader>
                <Skeleton className="h-6 w-3/4 rounded" />
              </CardHeader>
              <CardContent>
                <Skeleton className="mb-2 h-4 w-full rounded" />
                <Skeleton className="h-4 w-2/3 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
