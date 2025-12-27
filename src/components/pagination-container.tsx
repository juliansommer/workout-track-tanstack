import { Pagination } from "@heroui/pagination"
import { useRouter } from "@tanstack/react-router"

interface PaginationContainerProps {
  totalPages: number
  currentPage: number
  route: string
}

export default function PaginationContainer({
  totalPages,
  currentPage,
  route,
}: PaginationContainerProps) {
  const router = useRouter()
  if (totalPages === 1) {
    return null
  }

  return (
    <div className="flex items-center p-5">
      <Pagination
        className="cursor-pointer rounded-lg border border-neutral-200 bg-white text-neutral-950 shadow-xs dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50"
        initialPage={1}
        onChange={(page) =>
          router.navigate({ to: `${route}/p/${page}`, replace: true })
        }
        page={currentPage}
        total={totalPages}
      />
    </div>
  )
}
