export interface PlanData {
  id: string
  name: string
  notes: string | null
  exercises: {
    id: string
    sets: number | null
    name: string
    image: string
  }[]
}
