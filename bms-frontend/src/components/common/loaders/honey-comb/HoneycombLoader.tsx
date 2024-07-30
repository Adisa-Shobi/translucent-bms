import React from 'react';
import './HoneycombLoader.css';

export const HoneycombLoader: React.FC = () => {
    return (
        <div className="honeycomb w-6 h-6 relative">
            {[...Array(7)].map((_, index) => (
                <div key={index} className={`honeycomb-cell absolute bg-primary w-6 h-3 mt-1.5`} />
            ))}
        </div>
    );
};