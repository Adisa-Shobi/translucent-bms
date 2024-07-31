import React from 'react';
import { BudgetSkeletonCard } from './CardSkeleton'; // Ensure the correct import path

export const SkeletonGrid = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-4">
            {Array.from({ length: 6 }).map((_, index) => (
                <BudgetSkeletonCard key={index} />
            ))}
        </div>
    );
};

export default SkeletonGrid;
