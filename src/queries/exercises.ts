import { queryOptions } from "@tanstack/react-query"

import { getAllExerciseNames } from "@/server/fetching/getAllExerciseNames"

export const getAllExerciseNamesQueryOptions = () =>
  queryOptions({
    queryKey: ["exercises-all"],
    queryFn: () => getAllExerciseNames(),
    staleTime: 60 * 5 * 1000, // 5 minutes
  })
