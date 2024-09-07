// src/components/ButtonsModule.js
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
    onAddTask(newTask);
    setNewTask({
      title: '',
      description: '',
      date: '',
      status: 'TODO',
      priority: 'Medium',
    });
    closeModal();
  };

  return (
    <div className="flex items-center justify-between mb-4 mx-4 sm:mx-8 lg:mx-16">
      <span className="text-2xl font-bold">Desktop & Mobile Application</span>
      <button
        className="bg-green-500 text-white px-8 py-3 rounded-md shadow-md hover:bg-green-600 w-3/4 sm:w-auto text-lg"
        onClick={openModal}
      >
        Create Task
      </button>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        newTask={newTask}
        setNewTask={setNewTask}
      />
    </div>
  );
};

export default ButtonsModule;
