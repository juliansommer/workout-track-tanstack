import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/exercises/p/$page")({
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
