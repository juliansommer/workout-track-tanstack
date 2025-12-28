import {
  Root as Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible"
import { createFileRoute } from "@tanstack/react-router"
import { ChevronRightIcon } from "lucide-react"

import { Heading } from "@/components/heading"
import exercises from "@/lib/exercises.json"
import { createSlug, titleCase } from "@/lib/utils"

export const Route = createFileRoute("/exercises/$exercise")({
  loader: ({ params }) => {
    const data = getExerciseBySlug(params.exercise)
    if (!data) {
      throw new Error("Exercise not found")
    }
    return data
  },
  head: () => ({
    meta: [
      {
        title: "Exercise",
      },
    ],
  }),
  component: ExercisePage,
})

function ExercisePage() {
  const data = Route.useLoaderData()

  return (
    <>
      <Heading title={data.name} />
      <div className="flex w-full flex-col items-center justify-center">
        <main className="w-full max-w-4xl">
          <div className="grid gap-6">
            <img
              alt={`${data.name} exercise demonstration`}
              className="aspect-video w-full rounded-lg object-cover"
              height="600"
              src={`/images/${data.image}`}
              width="800"
            />
            <div className="grid gap-2">
              <div className="flex flex-wrap items-center gap-2">
                {data.primary_muscles.map((muscle) => (
                  <div
                    className="rounded-md bg-neutral-200 px-3 py-1 font-medium text-accent-foreground text-xs dark:bg-neutral-500"
                    key={muscle}
                  >
                    {titleCase(muscle)}
                  </div>
                ))}
                {data.secondary_muscles?.map((muscle) => (
                  <div
                    className="rounded-md bg-neutral-200 px-3 py-1 font-medium text-accent-foreground text-xs dark:bg-neutral-500"
                    key={muscle}
                  >
                    {titleCase(muscle)}
                  </div>
                ))}
              </div>
            </div>
            <Collapsible className="space-y-4 pb-10">
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-neutral-200 px-4 py-3 font-medium text-lg transition-colors hover:bg-neutral-300 dark:bg-neutral-500 dark:hover:bg-neutral-600 [&[data-state=open]>svg]:rotate-90">
                Instructions
                <ChevronRightIcon className="h-5 w-5 transition-all" />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 px-4 pb-4">
                {data.instructions.map((instruction, index) => (
                  <p className="text-sm leading-relaxed" key={instruction}>
                    {`${index + 1}. ${instruction}`}
                  </p>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </div>
        </main>
      </div>
    </>
  )
}

function getExerciseBySlug(slug: string) {
  return exercises.find((exercise) => createSlug(exercise.name) === slug)
}
