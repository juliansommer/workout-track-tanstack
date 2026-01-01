import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authed/workouts/")({
  head: () => ({
    meta: [
      {
        title: "Workouts | Workout Track",
      },
    ],
  }),
  component: Comp,
})

function Comp() {
  return <div>Workouts Page</div>
}
