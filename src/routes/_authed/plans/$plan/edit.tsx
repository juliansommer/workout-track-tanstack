import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authed/plans/$plan/edit")({
  head: () => ({
    meta: [
      {
        title: "Edit Plan",
      },
    ],
  }),
  component: Comp,
})

function Comp() {
  return <div>Edit Plan Page</div>
}
