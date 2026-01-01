import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authed/workouts/create/$id")({
  head: () => ({
    meta: [
      {
        title: "Edit Workout | Workout Track",
      },
    ],
  }),
  component: Comp,
})

function Comp() {
  return <div>Edit Workout Page</div>
}
