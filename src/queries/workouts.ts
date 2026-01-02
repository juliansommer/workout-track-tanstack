import { queryOptions } from "@tanstack/react-query"

import { getSpecificWorkout } from "@/fetching/getSpecificWorkout"
import { getUserWorkouts } from "@/fetching/getUserWorkouts"
import { getWorkoutTargets } from "@/fetching/getWorkoutTargets"

export const userWorkoutsQueryOptions = () =>
  queryOptions({
    queryKey: ["workouts-user"],
    queryFn: () => getUserWorkouts(),
    staleTime: 60 * 5 * 1000, // 5 minutes
  })

export const specificWorkoutQueryOptions = (workoutId: string) =>
  queryOptions({
    queryKey: ["workouts-specific", workoutId],
    queryFn: () => getSpecificWorkout(workoutId),
    staleTime: 60 * 5 * 1000, // 5 minutes
  })

export const workoutTargetsQueryOptions = (planId: string) =>
  queryOptions({
    queryKey: ["workout-targets", planId],
    queryFn: () => getWorkoutTargets(planId),
    staleTime: 60 * 5 * 1000, // 5 minutes
  })
