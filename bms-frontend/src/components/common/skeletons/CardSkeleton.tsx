import { Skeleton } from "@/components/ui/skeleton"

export const SkeletonCard = () => {
    return (
        
            <div className="space-y-4 w-full max-w-lg">
                {[1, 2, 3, 4].map((_, index) => (
                    <div key={index} className="flex justify-between items-center pb-4">
                        <div className="flex items-center space-x-3">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div>
                                <Skeleton className="h-4 w-32 mb-2" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <Skeleton className="h-8 w-24 rounded-md" />
                            <Skeleton className="h-8 w-20 rounded-md" />
                        </div>
                    </div>
                ))}
            </div>
    );
};

export const BudgetSkeletonCard = () => {
    return (
      <div className="border border-gray-200 rounded-lg p-4 flex flex-col space-y-4 w-full">
        <div className="space-y-2">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/6" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
    );
  };