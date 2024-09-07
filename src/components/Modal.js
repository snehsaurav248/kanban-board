// src/components/Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, onSave, newTask, setNewTask }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-11/12 sm:w-96 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create New Task</h2>
          <button className="text-xl font-bold" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium">Select Date</label>
            <input
              type="date"
              name="date"
              value={newTask.date}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={newTask.status}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="TODO">TODO</option>
              <option value="IN PROGRESS">IN PROGRESS</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Priority</label>
            <select
              name="priority"
              value={newTask.priority}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;