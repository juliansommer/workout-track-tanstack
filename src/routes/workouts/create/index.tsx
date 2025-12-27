import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/workouts/create/")({
  head: () => ({
    meta: [
      {
        title: "Create Workout",
      },
    ],
  }),
  component: Comp,
})

function Comp() {
  return <div>Create Workout Page</div>
}
