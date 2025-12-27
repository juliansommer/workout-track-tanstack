import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authed/plans/")({
  head: () => ({
    meta: [
      {
        title: "Plans",
      },
    ],
  }),
  component: Comp,
})

function Comp() {
  return <div>Plans Page</div>
}
