// src/components/KanbanBoard.js
import React, { useState } from 'react';
import Column from './Column';
import ButtonsModule from './ButtonsModule';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState({
    TODO: [],
    'IN PROGRESS': [],
    COMPLETED: [],
  });

  const addTask = (task) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [task.status]: [...prevTasks[task.status], task],
    }));
  };

  const moveTask = (task, fromColumn, toColumn) => {
    setTasks((prevTasks) => {
      const updatedFromColumn = prevTasks[fromColumn].filter((t) => t !== task);
      const updatedToColumn = [...prevTasks[toColumn], task];
      return {
        ...prevTasks,
        [fromColumn]: updatedFromColumn,
        [toColumn]: updatedToColumn,
      };
    });
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-10">Kanban Board</h1>
      
      {/* Buttons Module */}
      <ButtonsModule onAddTask={addTask} />
      
      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-4 sm:mx-8 lg:mx-16">
        <Column title="TODO" tasks={tasks.TODO} moveTask={moveTask} />
        <Column title="IN PROGRESS" tasks={tasks['IN PROGRESS']} moveTask={moveTask} />
        <Column title="COMPLETED" tasks={tasks.COMPLETED} moveTask={moveTask} />
      </div>
    </div>
  );
};

export default KanbanBoard;
