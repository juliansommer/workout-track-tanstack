import { createFileRoute, Link } from "@tanstack/react-router"

import { Heading } from "@/components/heading"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getUserPlans } from "@/server/fetching/getUserPlans"

export const Route = createFileRoute("/_authed/workouts/create/")({
  loader: () => getUserPlans(),
  head: () => ({
    meta: [
      {
        title: "Create Workout | Workout Track",
      },
    ],
  }),
  component: CreateWorkout,
})

function CreateWorkout() {
  const data = Route.useLoaderData()

  return (
    <>
      <Heading title="Create Workout" />
      <h2 className="mb-6 text-center font-semibold text-xl md:text-2xl">
        Select Plan
      </h2>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((plan) => (
            <Link
              key={plan.id}
              params={{ id: plan.id }}
              to="/workouts/create/$id"
            >
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
