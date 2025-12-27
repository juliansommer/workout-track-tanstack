import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/workouts/")({
  head: () => ({
    meta: [
      {
        title: "Workouts",
      },
    ],
  }),
  component: Comp,
})

function Comp() {
  return <div>Workouts Page</div>
}
