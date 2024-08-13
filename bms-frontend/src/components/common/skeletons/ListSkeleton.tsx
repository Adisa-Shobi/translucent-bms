import { Skeleton } from "@/components/ui/skeleton"


export const SkeletonCardList = () => {
    return (
        <div className="flex items-center space-x-4">
            <Skeleton className="h-11 w-12 rounded-full" />
            <div className="space-y-2 w-full">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
            </div>
        </div>
    )
}