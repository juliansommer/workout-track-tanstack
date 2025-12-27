import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/exercises/$exercise")({
  head: () => ({
    meta: [
      {
        title: "Exercise",
      },
    ],
  }),
  component: Comp,
})

function Comp() {
  return <div>Exercise Page</div>
}
