import { Skeleton } from "@/components/ui/skeleton"

export const SummarySkeleton = () => {
    return (
        <div className="border rounded-lg p-4">
            <div className="h-40 p-4">
                <div className="flex justify-between " >
                    <div className="flex flex-col justify-between gap-5" >
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-8 w-[200px]" />
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[350px]" />

                    </div>
                    <div className="flex flex-col justify-between items-center gap-1" >
                        <Skeleton className="h-[110px] w-[110px] rounded-full" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            </div>
        </div>
    )
}