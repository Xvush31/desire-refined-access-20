
import React from "react";

const LoadingState: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-16 w-16 bg-gray-300 dark:bg-gray-700 rounded-full mb-4"></div>
        <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
        <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
      </div>
    </div>
  );
};

export default LoadingState;
