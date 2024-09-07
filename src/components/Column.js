// src/components/Column.js

import React from 'react';

// Helper function to get background color and text color based on column title
const getTitleStyles = (title) => {
  switch (title) {
    case 'TODO':
      return {
        bgColor: 'bg-purple-600', // Purple background for title
        textColor: 'text-white' // White text color for better contrast
      };
    case 'IN PROGRESS':
      return {
        bgColor: 'bg-yellow-500', // Yellow background for title
        textColor: 'text-black' // Black text color for better contrast
      };
    case 'COMPLETED':
      return {
        bgColor: 'bg-green-600', // Green background for title
        textColor: 'text-white' // White text color for better contrast
      };
    default:
      return {
        bgColor: 'bg-gray-200', // Default background for title
        textColor: 'text-black' // Default text color
      };
  }
};

const Column = ({ title, tasks }) => {
  const { bgColor, textColor } = getTitleStyles(title);

  return (
    <div className="w-[264px] h-[150px] p-4 border border-[#E3E3E3] shadow-lg">
      <h2 className={`text-xl font-semibold ${bgColor} ${textColor} p-2 rounded mb-4`}>
        {title}
      </h2>
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="bg-[#F4F4F4] p-2 rounded border border-[#E3E3E3] shadow-sm"
          >
            {task}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Column;
