import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authed")({
  beforeLoad: () => {
    console.log("Authed layout beforeLoad")
  },
  errorComponent: ({ error }) => {
    // if (error.message === "Not authenticated") {
    //   return <Login />
    // }

    throw error
  },
})
