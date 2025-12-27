import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authed/workouts/$workout")({
  head: () => ({
    meta: [
      {
        title: "Workout",
      },
    ],
  }),
  component: Comp,
})

function Comp() {
  return <div>Workout Page</div>
}
