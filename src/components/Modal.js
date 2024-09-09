import React, { useEffect } from 'react'; // Import necessary hooks from React

const Modal = ({ isOpen, onClose, onCreate, onUpdate, newTask, setNewTask, editing }) => {
  // Effect to update the newTask state if editing
  useEffect(() => {
    if (editing && newTask) {
      setNewTask({ ...newTask });
    }
  }, [editing, newTask, setNewTask]);

  // Return null if the modal is not open
  if (!isOpen) return null;

  // Handle input change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    if (editing && typeof onUpdate === 'function') {
      onUpdate(newTask); // Call onUpdate if editing
    } else if (!editing && typeof onCreate === 'function') {
      onCreate(newTask); // Call onCreate if creating a new task
    }
    onClose(); // Close the modal after submission
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
      {/* Modal container */}
      <div className="bg-white w-11/12 sm:w-96 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{editing ? 'Edit Task' : 'Create New Task'}</h2>
          {/* Close button */}
          <button className="text-xl font-bold" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>
        <div className="space-y-4">
          {/* Title input */}
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
          {/* Description textarea */}
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
          {/* Date input */}
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
          {/* Status dropdown */}
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
          {/* Priority dropdown */}
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
        {/* Action buttons */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="bg-white-500 text-black py-2 px-4 rounded hover:bg-purple-600"
            onClick={onClose} // Close the modal without saving
          >
            Cancel
          </button>
          <button
            className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
            onClick={handleSubmit} // Save task and close the modal
          >
            {editing ? 'Update Task' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
