import { createFileRoute } from "@tanstack/react-router"

import { LoginForm } from "@/components/login-form"

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      {
        title: "Login | Workout Track",
      },
    ],
  }),
  component: LoginForm,
})
