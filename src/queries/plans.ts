import { queryOptions } from "@tanstack/react-query"

import { getSpecificPlan } from "@/server/fetching/getSpecificPlan"
import { getUserPlans } from "@/server/fetching/getUserPlans"

export const userPlansQueryOptions = () =>
  queryOptions({
    queryKey: ["plans-user"],
    queryFn: () => getUserPlans(),
    staleTime: 60 * 5 * 1000, // 5 minutes
  })

export const specificPlanQueryOptions = (planId: string) =>
  queryOptions({
    queryKey: ["plans-specific", planId],
    queryFn: () => getSpecificPlan({ data: { planId } }),
    staleTime: 60 * 5 * 1000, // 5 minutes
  })
