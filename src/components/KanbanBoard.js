import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase"; // Adjust path as needed
import Column from "./Column";
import ButtonsModule from "./ButtonsModule";
import BoardInfinityLogo from "../assets/images/board-infinity-logo.png"; // Import the logo

const KanbanBoard = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    completed: [],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        const tasksData = { todo: [], inProgress: [], completed: [] };
        querySnapshot.forEach((doc) => {
          const task = { ...doc.data(), id: doc.id }; // Include the task ID
          const statusKey = task.status.toLowerCase().replace(" ", ""); // Normalize status key
          if (tasksData[statusKey] !== undefined) {
            tasksData[statusKey].push(task);
          }
        });
        setTasks(tasksData);
      } catch (err) {
        setError("Failed to fetch tasks. Please try again later.");
        console.error(err);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (newTask) => {
    try {
      const docRef = await addDoc(collection(db, "tasks"), newTask);
      setTasks((prevTasks) => {
        const statusKey = newTask.status.toLowerCase().replace(" ", ""); // Normalize status key
        return {
          ...prevTasks,
          [statusKey]: [...(prevTasks[statusKey] || []), { ...newTask, id: docRef.id }],
        };
      });
    } catch (err) {
      setError("Failed to add task. Please try again later.");
      console.error(err);
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const taskDoc = doc(db, "tasks", taskId);
      await updateDoc(taskDoc, { status: newStatus });

      setTasks((prevTasks) => {
        // Remove task from old status
        const prevStatusKey = Object.keys(prevTasks).find(statusKey =>
          prevTasks[statusKey].some(task => task.id === taskId)
        );
        
        // Update tasks in state
        const updatedPrevTasks = {
          ...prevTasks,
          [prevStatusKey]: prevTasks[prevStatusKey].filter(task => task.id !== taskId),
        };

        // Add task to new status
        const newStatusKey = newStatus.toLowerCase().replace(" ", "");
        const taskToUpdate = { ...prevTasks[prevStatusKey].find(task => task.id === taskId), status: newStatus };

        return {
          ...updatedPrevTasks,
          [newStatusKey]: [...(updatedPrevTasks[newStatusKey] || []), taskToUpdate],
        };
      });
    } catch (err) {
      setError("Failed to update task status. Please try again later.");
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen p-4 sm:p-8 lg:p-16">
      {/* Logo section */}
      <div className="absolute top-0 left-0 p-4">
        <img
          src={BoardInfinityLogo}
          alt="Board Infinity Logo"
          className="h-20 w-auto" // Adjust the height as needed
        />
      </div>

      {/* Main content */}
      <div className="pt-20">
        {" "}
        {/* Add padding-top to avoid overlap with logo */}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <ButtonsModule onAddTask={addTask} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Column title="TODO" tasks={tasks.todo} onStatusChange={updateTaskStatus} />
          <Column title="IN PROGRESS" tasks={tasks.inProgress} onStatusChange={updateTaskStatus} />
          <Column title="COMPLETED" tasks={tasks.completed} onStatusChange={updateTaskStatus} />
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
