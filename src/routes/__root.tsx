import type { QueryClient } from "@tanstack/react-query"
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router"
import type * as React from "react"

import { DefaultCatchBoundary } from "@/components/default-catch-boundary"
import Nav from "@/components/nav"
import { NotFound } from "@/components/not-found"
import ProgressBar from "@/components/progress-bar"
import { seo } from "@/lib/seo"
import appCss from "@/styles/app.css?url"

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: "Workout Track",
        description:
          "Workout Track is an open source app that helps you monitor your workouts, set goals, and achieve your fitness dreams.",
        image: "/opengraph-image.png",
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen overflow-y-scroll bg-neutral-100 font-sans antialiased selection:bg-neutral-300 dark:bg-neutral-900 dark:selection:bg-neutral-700">
        <main className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center px-6 sm:px-16">
          <ProgressBar>
            <Nav />
            {children}
            <Scripts />
          </ProgressBar>
        </main>
      </body>
    </html>
  )
}
