import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/plans/$plan/")({
  head: () => ({
    meta: [
      {
        title: "Plan Details",
      },
    ],
  }),
  component: Comp,
})

function Comp() {
  return <div>Plan Details Page</div>
}
