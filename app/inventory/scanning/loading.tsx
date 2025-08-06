import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ScanningLoading() {
  return (
    <div className="flex-1 space-y-4 p-2 sm:p-4 md:p-6 lg:p-8">
      {/* Header Skeleton */}
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="space-y-2">
          <Skeleton className="h-6 sm:h-8 w-48 sm:w-64" />
          <Skeleton className="h-4 w-32 sm:hidden" />
        </div>
        <Skeleton className="h-6 w-24 sm:w-32" />
      </div>

      {/* Statistics Cards Skeleton */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="p-2 sm:p-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 p-0 sm:p-6">
              <Skeleton className="h-3 sm:h-4 w-16 sm:w-20" />
              <Skeleton className="h-3 w-3 sm:h-4 sm:w-4" />
            </CardHeader>
            <CardContent className="p-0 sm:p-6 pt-1 sm:pt-0">
              <Skeleton className="h-5 sm:h-8 w-12 sm:w-16 mb-1" />
              <Skeleton className="h-3 w-20 sm:w-24 hidden sm:block" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs Skeleton */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-8 sm:h-10" />
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <Skeleton className="h-5 sm:h-6 w-32 sm:w-40" />
              <Skeleton className="h-4 w-48 sm:w-64" />
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <Skeleton className="aspect-video w-full" />
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <Skeleton className="h-5 sm:h-6 w-28 sm:w-36" />
                <Skeleton className="h-4 w-40 sm:w-52" />
              </CardHeader>
              <CardContent className="p-3 sm:p-6 space-y-2 sm:space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 sm:h-11 w-full" />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
