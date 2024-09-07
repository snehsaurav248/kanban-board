import React from 'react';

const Task = ({ title }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {title}
    </div>
  );
};

export default Task;
