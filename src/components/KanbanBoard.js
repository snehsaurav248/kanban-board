import React, { useState, useEffect } from 'react'; 
import { collection, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'; 
import { db } from '../firebase'; 
import Column from './Column'; 
import Modal from './Modal'; 
import ButtonsModule from './ButtonsModule'; 
import Logo from './Logo'; 

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]); // State to hold tasks
  const [isModalOpen, setModalOpen] = useState(false); // State to manage modal visibility
  const [newTask, setNewTask] = useState({}); // State to hold data for the new or edited task
  const [editing, setEditing] = useState(false); // State to manage editing mode

  // Effect to fetch tasks from Firestore when component mounts
  useEffect(() => {
    // Set up a real-time listener for the 'tasks' collection
    const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
      // Map Firestore documents to the state
      const fetchedTasks = snapshot.docs.map((doc) => ({
        id: doc.id, // Get the document ID
        ...doc.data(), // Get the document data
      }));
      setTasks(fetchedTasks); // Update state with fetched tasks
    });

    // Cleanup function to unsubscribe from the listener when component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array means this effect runs once on mount

  // Function to create a new task
  const handleCreate = async (task) => {
    await addDoc(collection(db, 'tasks'), task); // Add new task to Firestore
  };

  // Function to update an existing task
  const handleUpdate = async (task) => {
    const taskRef = doc(db, 'tasks', task.id); // Reference to the task document
    await updateDoc(taskRef, task); // Update the task in Firestore
  };

  // Function to delete a task
  const handleDelete = async (taskId) => {
    const taskRef = doc(db, 'tasks', taskId); // Reference to the task document
    await deleteDoc(taskRef); // Delete the task from Firestore
  };

  // Function to open the modal for editing a task
  const handleEdit = (task) => {
    setNewTask(task); // Set the task to be edited
    setEditing(true); // Set editing mode to true
    setModalOpen(true); // Open the modal
  };

  return (
    <div className="px-9 sm:px-18 lg:px-24 py-4 pt-32">
      <Logo /> {/* Render the Logo component */}
      <ButtonsModule onAddTask={handleCreate} /> {/* Render ButtonsModule and pass handleCreate function */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {/* TODO Column */}
        <div>
          <Column
            title="TODO"
            tasks={tasks.filter((task) => task.status === 'TODO')} // Filter tasks with status 'TODO'
            droppableId="TODO" // ID for the droppable area
            onStatusChange={(taskId, newStatus) => handleUpdate({ id: taskId, status: newStatus })} // Function to update task status
            onEditTask={handleEdit} // Function to handle task editing
            onDeleteTask={handleDelete} // Function to handle task deletion
          />
        </div>

        {/* IN PROGRESS Column */}
        <div>
          <Column
            title="IN PROGRESS"
            tasks={tasks.filter((task) => task.status === 'IN PROGRESS')} // Filter tasks with status 'IN PROGRESS'
            droppableId="IN PROGRESS" // ID for the droppable area
            onStatusChange={(taskId, newStatus) => handleUpdate({ id: taskId, status: newStatus })} // Function to update task status
            onEditTask={handleEdit} // Function to handle task editing
            onDeleteTask={handleDelete} // Function to handle task deletion
          />
        </div>

        {/* COMPLETED Column */}
        <div>
          <Column
            title="COMPLETED"
            tasks={tasks.filter((task) => task.status === 'COMPLETED')} // Filter tasks with status 'COMPLETED'
            droppableId="COMPLETED" // ID for the droppable area
            onStatusChange={(taskId, newStatus) => handleUpdate({ id: taskId, status: newStatus })} // Function to update task status
            onEditTask={handleEdit} // Function to handle task editing
            onDeleteTask={handleDelete} // Function to handle task deletion
          />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen} // Determine if the modal should be open
        onClose={() => setModalOpen(false)} // Function to close the modal
        onCreate={handleCreate} // Function to create a new task
        onUpdate={handleUpdate} // Function to update an existing task
        newTask={newTask} // Task data for the modal
        setNewTask={setNewTask} // Function to update task data in the modal
        editing={editing} // Determine if in editing mode
      />
    </div>
  );
};

export default KanbanBoard;
