import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/exercises/")({
  loader: () => {
    throw redirect({
      to: "/exercises/p/$page",
      params: { page: "1" },
      statusCode: 301,
      replace: true,
    })
  },
})
