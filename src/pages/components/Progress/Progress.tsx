import React from "react";

interface Props {
  percent: number;
}
const CircularProgress = ({ percent }: Props) => {
  return (
    <div className="relative w-40 h-40">
      <svg
        className="w-full h-full"
        width="36"
        height="36"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Circle */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-gray-200 dark:text-gray-700"
          strokeWidth="2"
        ></circle>
        {/* Progress Circle inside a group with rotation */}
        <g className="origin-center -rotate-90 transform">
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className="stroke-current text-blue-600 dark:text-blue-500"
            strokeWidth="2"
            strokeDasharray="100"
            strokeDashoffset={100 - percent}
          ></circle>
        </g>
      </svg>
      {/* Percentage Text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <span className="text-center text-2xl font-bold text-gray-800 dark:text-white">
          {percent?.toFixed(2)}%
        </span>
      </div>
    </div>
  );
};

export default CircularProgress;
