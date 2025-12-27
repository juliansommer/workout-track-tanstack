import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authed/plans/create")({
  head: () => ({
    meta: [
      {
        title: "Create Plan",
      },
    ],
  }),
  component: Comp,
})

function Comp() {
  return <div>Create Plan Page</div>
}
