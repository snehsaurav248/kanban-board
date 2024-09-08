import React, { useState } from 'react';
import Modal from './Modal';

const ButtonsModule = ({ onAddTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    date: '',
    status: 'TODO',
    priority: 'Medium',
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleSave = () => {
    if (newTask.title && newTask.status) {
      onAddTask(newTask);
      setNewTask({
        title: '',
        description: '',
        date: '',
        status: 'TODO',
        priority: 'Medium',
      });
      closeModal();
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div className="flex items-center justify-between mb-4 mx-4 sm:mx-8 lg:mx-19 bg-gray-100 p-4 rounded-lg shadow-md">
      <span className="text-lg sm:text-2xl font-bold">Desktop & Mobile Application</span>
      <button
        className="bg-purple-500 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-md shadow-md hover:bg-purple-600 w-full sm:w-auto text-base sm:text-lg"
        onClick={openModal}
      >
        Create Task
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreate={handleSave}
        newTask={newTask}
        setNewTask={setNewTask}
      />
    </div>
  );
};

export default ButtonsModule;
