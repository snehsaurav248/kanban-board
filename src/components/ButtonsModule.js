import React, { useState } from 'react'; 
import Modal from './Modal'; // Import the Modal component

const ButtonsModule = ({ onAddTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    date: '',
    status: 'TODO',
    priority: 'Medium',
  }); // State to manage the new task's data

  // Open modal for task creation
  const openModal = () => setIsModalOpen(true);

  // Close modal
  const closeModal = () => setIsModalOpen(false);

  // Handle task save
  const handleSave = () => {
    if (newTask.title && newTask.status) { // Check if required fields are filled
      onAddTask(newTask); // Pass the new task to the parent component
      setNewTask({
        title: '',
        description: '',
        date: '',
        status: 'TODO',
        priority: 'Medium',
      }); // Reset newTask state
      closeModal(); // Close the modal
    } else {
      alert('Please fill in all required fields.'); // Alert if fields are missing
    }
  };

  return (
    <div className="flex items-center justify-between mb-4 mx-4 sm:mx-8 lg:mx-19 bg-gray-100 p-4 rounded-lg shadow-md">
      <span className="text-lg sm:text-2xl font-bold">Desktop & Mobile Application</span>
      <button
        className="bg-purple-500 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-md shadow-md hover:bg-purple-600 w-full sm:w-auto text-base sm:text-lg"
        onClick={openModal} // Open the modal when button is clicked
      >
        Create Task
      </button>

      {/* Modal for task creation */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal} // Function to close the modal
        onCreate={handleSave} // Function to save the new task
        newTask={newTask} // Pass current newTask state to the modal
        setNewTask={setNewTask} // Function to update newTask state from the modal
      />
    </div>
  );
};

export default ButtonsModule;
