import { queryOptions } from "@tanstack/react-query"

import { getAllExercises } from "@/fetching/getAllExercises"

export const getAllExerciseNamesQueryOptions = () =>
  queryOptions({
    queryKey: ["exercises-all"],
    queryFn: async () => await getAllExercises(),
    staleTime: 60 * 5 * 1000,
  })
