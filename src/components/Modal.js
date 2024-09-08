import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, onCreate, newTask, setNewTask, editing }) => {
  useEffect(() => {
    if (editing && newTask) {
      setNewTask({ ...newTask });
    }
  }, [editing, newTask, setNewTask]);

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
          <h2 className="text-xl font-semibold">{editing ? 'Edit Task' : 'Create New Task'}</h2>
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
              value={newTask.title || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={newTask.description || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium">Select Date</label>
            <input
              type="date"
              name="date"
              value={newTask.date || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={newTask.status || 'TODO'}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
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
              value={newTask.priority || 'Medium'}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            className="bg-white-500 border-purple-950 text-purple-700 px-4 py-2 rounded-md hover:bg-white"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
            onClick={onCreate}
          >
            {editing ? 'Save Changes' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
