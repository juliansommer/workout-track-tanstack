import { queryOptions } from "@tanstack/react-query"

import { getSpecificPlan } from "@/fetching/getSpecificPlan"
import { getUserPlans } from "@/fetching/getUserPlans"

export const userPlansQueryOptions = () =>
  queryOptions({
    queryKey: ["plans-user"],
    queryFn: async () => await getUserPlans(),
    staleTime: 60 * 5 * 1000,
  })

export const specificPlanQueryOptions = (planId: string) =>
  queryOptions({
    queryKey: ["plans-specific", planId],
    queryFn: async () => await getSpecificPlan(planId),
    staleTime: 60 * 5 * 1000,
  })
