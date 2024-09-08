import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, onCreate, onUpdate, newTask, setNewTask, editing }) => {
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

  const handleSubmit = () => {
    if (editing && typeof onUpdate === 'function') {
      onUpdate(newTask);
    } else if (!editing && typeof onCreate === 'function') {
      onCreate(newTask);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-11/12 sm:w-96 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{editing ? 'Edit Task' : 'Create New Task'}</h2>
          <button className="text-xl font-bold" onClick={onClose} aria-label="Close">
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
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="bg-white-500 text-black py-2 px-4 rounded hover:bg-purple-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
            onClick={handleSubmit}
          >
            {editing ? 'Update Task' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
