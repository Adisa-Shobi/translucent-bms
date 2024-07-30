import { Skeleton } from "@/components/ui/skeleton"


export const SkeletonCardList = () => {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton />
            <Skeleton />
        </div>
    )
}