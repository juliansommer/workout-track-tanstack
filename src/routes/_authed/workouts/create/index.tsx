import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authed/workouts/create/")({
  head: () => ({
    meta: [
      {
        title: "Create Workout | Workout Track",
      },
    ],
  }),
  component: Comp,
})

function Comp() {
  return <div>Create Workout Page</div>
}
