import { SkeletonCardList } from "@/components/common"
import { Skeleton } from "@/components/ui/skeleton"

export const StatSkeleton = () => {
    return (
        <div className="border rounded-lg p-4 h-[400px] overflow-clip" >
            <div className="h-[400px] p-4">
                <Skeleton className="h-4 my-2 w-[200px]" />
                <Skeleton className="h-6 mb-8 w-[100px]" />
                <div className="flex flex-col gap-6" >
                    <SkeletonCardList />
                    <SkeletonCardList />
                    <SkeletonCardList />
                    <SkeletonCardList />
                </div>
            </div>
        </div>
    )
}