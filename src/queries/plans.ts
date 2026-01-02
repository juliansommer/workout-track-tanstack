import { queryOptions } from "@tanstack/react-query"

import { getSpecificPlan } from "@/fetching/getSpecificPlan"
import { getUserPlans } from "@/fetching/getUserPlans"

export const userPlansQueryOptions = () =>
  queryOptions({
    queryKey: ["plans-user"],
    queryFn: () => getUserPlans(),
    staleTime: 60 * 5 * 1000, // 5 minutes
  })

export const specificPlanQueryOptions = (planId: string) =>
  queryOptions({
    queryKey: ["plans-specific", planId],
    queryFn: () => getSpecificPlan(planId),
    staleTime: 60 * 5 * 1000, // 5 minutes
  })
