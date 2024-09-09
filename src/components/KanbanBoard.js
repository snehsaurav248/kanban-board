import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Assuming Firebase is configured here
import Column from './Column';
import Modal from './Modal';
import ButtonsModule from './ButtonsModule';
import Logo from './Logo'; // Import Logo component

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({});
  const [editing, setEditing] = useState(false);

  // Fetch tasks from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
      const fetchedTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(fetchedTasks);
    });

    return () => unsubscribe();
  }, []);

  // Handle task creation
  const handleCreate = async (task) => {
    await addDoc(collection(db, 'tasks'), task);
  };

  // Handle task update
  const handleUpdate = async (task) => {
    const taskRef = doc(db, 'tasks', task.id);
    await updateDoc(taskRef, task);
  };

  // Handle task deletion
  const handleDelete = async (taskId) => {
    const taskRef = doc(db, 'tasks', taskId);
    await deleteDoc(taskRef);
  };

  // Handle task edit
  const handleEdit = (task) => {
    setNewTask(task);
    setEditing(true);
    setModalOpen(true);
  };

  return (
    <div className="px-9 sm:px-18 lg:px-24 py-4 pt-32"> {/* Adjusted pt-32 to push content further down */}
      {/* Logo Component */}
      <Logo />

      {/* Button Module Component */}
      <ButtonsModule onAddTask={handleCreate} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {/* TODO Column */}
        <Column
          title="TODO"
          tasks={tasks.filter((task) => task.status === 'TODO')}
          onStatusChange={(taskId, newStatus) => handleUpdate({ id: taskId, status: newStatus })}
          onEditTask={handleEdit}
          onDeleteTask={handleDelete}
        />

        {/* IN PROGRESS Column */}
        <Column
          title="IN PROGRESS"
          tasks={tasks.filter((task) => task.status === 'IN PROGRESS')}
          onStatusChange={(taskId, newStatus) => handleUpdate({ id: taskId, status: newStatus })}
          onEditTask={handleEdit}
          onDeleteTask={handleDelete}
        />

        {/* COMPLETED Column */}
        <Column
          title="COMPLETED"
          tasks={tasks.filter((task) => task.status === 'COMPLETED')}
          onStatusChange={(taskId, newStatus) => handleUpdate({ id: taskId, status: newStatus })}
          onEditTask={handleEdit}
          onDeleteTask={handleDelete}
        />
      </div>

      {/* Modal for task editing */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        newTask={newTask}
        setNewTask={setNewTask}
        editing={editing}
      />
    </div>
  );
};

export default KanbanBoard;
