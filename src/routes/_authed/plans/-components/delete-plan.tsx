import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "@tanstack/react-router"
import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { deletePlan } from "@/server/actions/deletePlan"

export default function DeletePlan({ planId }: { planId: string }) {
  const router = useRouter()
  const queryClient = useQueryClient()

  async function handleDelete() {
    await deletePlan({ data: { planId } })
    queryClient.invalidateQueries({ queryKey: ["plans-user"] })
    router.navigate({ to: "/plans" })
  }

  return (
    <Button onClick={handleDelete} size="icon" variant="outline">
      <Trash2 className="h-4 w-4" />
      <span className="sr-only">Delete Plan</span>
    </Button>
  )
}
