import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function WorkoutFormSkeleton({
  children,
}: {
  children?: React.ReactNode
}) {
  return (
    <div className="container mx-auto px-4 py-6 md:px-6">
      <div className="flex flex-col space-y-6">
        <div className="grid gap-6">
          {Array.from({ length: 3 }, (_, i) => `exercise-${i}`).map((key) => (
            <Card className="overflow-hidden" key={key}>
              <div className="grid gap-4 md:grid-cols-[300px_1fr]">
                <div className="relative h-[200px] md:h-full">
                  <Skeleton className="h-full w-full" />
                </div>
                <div className="p-4">
                  <CardHeader className="p-0 pb-4">
                    <Skeleton className="h-6 w-32" />
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="grid gap-4">
                      {Array.from({ length: 3 }, (_, i) => `set-${i}`).map(
                        (setKey) => (
                          <div
                            className="grid grid-cols-[auto_1fr_1fr] items-center gap-4"
                            key={setKey}
                          >
                            <Skeleton className="h-5 w-12" />
                            <div className="space-y-1">
                              <Skeleton className="h-4 w-12" />
                              <Skeleton className="h-10 w-full" />
                              <Skeleton className="h-5 w-full" />
                            </div>
                            <div className="space-y-1">
                              <Skeleton className="h-4 w-12" />
                              <Skeleton className="h-10 w-full" />
                              <Skeleton className="h-5 w-full" />
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
        {children}
      </div>
    </div>
  )
}
