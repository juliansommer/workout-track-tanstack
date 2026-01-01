import { createFileRoute, Link } from "@tanstack/react-router"

import { Heading } from "@/components/heading"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { getUserPlans } from "@/server/fetching/getUserPlans"

export const Route = createFileRoute("/_authed/plans/")({
  loader: () => getUserPlans(),
  head: () => ({
    meta: [
      {
        title: "Plans | Workout Track",
      },
    ],
  }),
  component: Plans,
})

export default function Plans() {
  const data = Route.useLoaderData()

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
