import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Column = ({ title, tasks, onStatusChange, onEditTask, onDeleteTask }) => {
  const [dropdownOpen, setDropdownOpen] = useState(null);

  // Toggle the dropdown menu
  const toggleDropdown = (taskId) => {
    setDropdownOpen(dropdownOpen === taskId ? null : taskId);
  };

  // Handle changing the status of a task
  const handleStatusChange = (taskId, newStatus) => {
    onStatusChange(taskId, newStatus);
    setDropdownOpen(null); // Close dropdown after selection
  };

  // Determine background color based on priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500 text-white'; // Red background for High priority
      case 'Medium':
        return 'bg-yellow-500 text-black'; // Yellow background for Medium priority
      case 'Low':
        return 'bg-green-500 text-white'; // Green background for Low priority
      default:
        return 'bg-gray-300 text-black'; // Default background
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {tasks.map((task) => (
        <div key={task.id} className="relative p-4 mb-4 rounded-md shadow-md bg-white">
          {/* Priority Display */}
          <div className={`absolute top-2 left-2 text-xs ${getPriorityColor(task.priority)} px-2 py-1 rounded-md`}>
            {task.priority}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-2 right-2 flex items-center space-x-2">
            {/* Edit Button */}
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => onEditTask(task)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>

            {/* Delete Button */}
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => onDeleteTask(task.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>

            {/* Dropdown Arrow */}
            <button
              onClick={() => toggleDropdown(task.id)}
              className="text-gray-600 hover:text-gray-800"
            >
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </div>

          {/* Status Dropdown Menu */}
          {dropdownOpen === task.id && (
            <div className="absolute top-10 right-2 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
              <div className="py-1 px-4">
                <p className="text-base font-bold mb-2">Change Status</p>
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none"
                >
                  <option value="TODO">TODO</option>
                  <option value="IN PROGRESS">IN PROGRESS</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </div>
            </div>
          )}

          {/* Task Content */}
          <h3 className="text-lg font-bold mt-8">
            {task.title}
          </h3>
          <p className="text-gray-600">{task.description}</p>
          <p className="text-sm text-gray-400">Due: {task.date}</p>
        </div>
      ))}
    </div>
  );
};

export default Column;
