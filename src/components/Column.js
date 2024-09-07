// src/components/Column.js
import React from 'react';

const Column = ({ title, tasks }) => {
  return (
    <div className="w-full p-4 border border-[#E3E3E3] shadow-lg bg-white">
      <h2 className={`text-xl font-semibold ${title === 'TODO' ? 'bg-purple-600 text-white' : title === 'IN PROGRESS' ? 'bg-yellow-500 text-black' : 'bg-green-600 text-white'} p-2 rounded mb-4`}>
        {title}
      </h2>
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <div key={index} className="bg-[#F4F4F4] p-2 rounded border border-[#E3E3E3] shadow-sm">
            <p><strong>Title:</strong> {task.title}</p>
            <p><strong>Description:</strong> {task.description}</p>
            <p><strong>Date:</strong> {task.date}</p>
            <p><strong>Status:</strong> {task.status}</p>
            <p><strong>Priority:</strong> {task.priority}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Column;
