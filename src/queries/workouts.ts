import { queryOptions } from "@tanstack/react-query"

import { getSpecificWorkout } from "@/server/fetching/getSpecificWorkout"
import { getUserWorkouts } from "@/server/fetching/getUserWorkouts"
import { getWorkoutTargets } from "@/server/fetching/getWorkoutTargets"

export const userWorkoutsQueryOptions = () =>
  queryOptions({
    queryKey: ["workouts-user"],
    queryFn: () => getUserWorkouts(),
    staleTime: 60 * 5 * 1000, // 5 minutes
  })

export const specificWorkoutQueryOptions = (workoutId: string) =>
  queryOptions({
    queryKey: ["workouts-specific", workoutId],
    queryFn: () => getSpecificWorkout({ data: { workoutId } }),
    staleTime: 60 * 5 * 1000, // 5 minutes
  })

export const workoutTargetsQueryOptions = (planId: string) =>
  queryOptions({
    queryKey: ["workout-targets", planId],
    queryFn: () => getWorkoutTargets({ data: { planId } }),
    staleTime: 60 * 5 * 1000, // 5 minutes
  })
