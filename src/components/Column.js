import React, { useState } from 'react';

const Column = ({ title, tasks, onStatusChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(null);

  // Handle changing the status of a task
  const handleStatusChange = (taskId, newStatus) => {
    if (typeof onStatusChange === 'function') {
      onStatusChange(taskId, newStatus);
      setDropdownOpen(null); // Close dropdown after selection
    } else {
      console.error('onStatusChange is not a function');
    }
  };

  // Toggle the dropdown menu for a specific task
  const toggleDropdown = (taskId) => {
    setDropdownOpen(dropdownOpen === taskId ? null : taskId);
  };

  // Get priority label classes
  const getPriorityLabelClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500 text-white';
      case 'Medium':
        return 'bg-yellow-500 text-black';
      case 'Low':
        return 'bg-green-500 text-white';
      default:
        return '';
    }
  };

  return (
    <div className="w-full p-4 border border-[#E3E3E3] shadow-lg bg-white">
      <h2 className={`text-xl font-semibold ${title === 'TODO' ? 'bg-purple-600 text-white' : title === 'IN PROGRESS' ? 'bg-yellow-500 text-black' : 'bg-green-600 text-white'} p-2 rounded mb-4`}>
        {title}
      </h2>
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks available</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="relative bg-[#F4F4F4] p-4 rounded border border-[#E3E3E3] shadow-sm">
              <div className="flex justify-between items-start">
                {/* Priority label */}
                <span className={`px-2 py-1 rounded text-sm font-semibold ${getPriorityLabelClass(task.priority)}`}>
                  {task.priority}
                </span>

                {/* Dropdown arrow for status change */}
                <button
                  onClick={() => toggleDropdown(task.id)}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
              </div>

              {/* Task content */}
              <div className="mt-2">
                <p className="text-lg font-semibold">{task.title}</p>
                <p className="text-sm text-gray-700">{task.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <i className="fas fa-calendar-alt mr-2"></i>
                  <p>{task.date}</p>
                </div>
              </div>

              {/* Dropdown for changing task status */}
              {dropdownOpen === task.id && (
                <div className="absolute top-0 right-0 mt-8 w-48 bg-gray-100 border border-gray-300 rounded-md shadow-lg z-10">
                  <div className="py-2 px-4">
                    <p className="text-base font-bold mb-2 text-gray-700">Change Status</p>
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="TODO">TODO</option>
                      <option value="IN PROGRESS">IN PROGRESS</option>
                      <option value="COMPLETED">COMPLETED</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Column;
