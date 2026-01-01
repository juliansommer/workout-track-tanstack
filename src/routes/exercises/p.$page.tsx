import { createFileRoute, Link } from "@tanstack/react-router"

import { Heading } from "@/components/heading"
import PaginationContainer from "@/components/pagination-container"
import exercises from "@/lib/exercises.json"
import { createSlug, titleCase } from "@/lib/utils"
import type { Database } from "@/types/supabase"

type ExerciseData = Pick<
  Database["public"]["Tables"]["exercise"]["Row"],
  "name" | "image" | "primary_muscles"
>

// Cache totalPages calculation since exercises is static
const TOTAL_PAGES = Math.ceil(exercises.length / 10)

export const Route = createFileRoute("/exercises/p/$page")({
  loader: ({ params }) => {
    const page = Number(params.page)
    const startIndex = (page - 1) * 10
    const endIndex = page * 10
    return exercises.slice(startIndex, endIndex) as ExerciseData[]
  },
  head: ({ params }) => ({
    meta: [
      {
        title: `Exercises Page ${params.page} | Workout Track`,
      },
    ],
  }),
  component: Exercises,
  preloadStaleTime: 1000 * 60 * 60 * 24, // 24 hours
})

function Exercises() {
  const page = Number(Route.useParams().page)
  const data = Route.useLoaderData()

  return (
    <>
      <Heading title="Exercises" />
      <div className="w-full">
        {data.map((exercise) => (
          <ExerciseCard exercise={exercise} key={exercise.name} />
        ))}
      </div>
      <PaginationContainer
        currentPage={page}
        route="/exercises"
        totalPages={TOTAL_PAGES}
      />
    </>
  )
}

function ExerciseCard({ exercise }: { exercise: ExerciseData }) {
  return (
    <Link
      params={{ exercise: createSlug(exercise.name) }}
      to="/exercises/$exercise"
    >
      <div className="flex items-center justify-between rounded-md p-4">
        <div className="flex items-center space-x-4">
          <img
            alt={exercise.name}
            className="aspect-video overflow-hidden rounded-lg object-cover"
            height={100}
            src={`/images/${exercise.image}`}
            width={100}
          />
          <div>
            <h2 className="font-medium text-lg">{exercise.name}</h2>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-sm" key={exercise.primary_muscles[0]}>
            {titleCase(exercise.primary_muscles[0] ?? "")}
          </p>
        </div>
      </div>
    </Link>
  )
}
