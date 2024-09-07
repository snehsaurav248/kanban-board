// src/components/KanbanBoard.js
import React, { useState } from 'react';
import Column from './Column';
import ButtonsModule from './ButtonsModule';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    completed: [],
  });

  const addTask = (newTask) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      todo: [...prevTasks.todo, newTask],
    }));
  };

  return (
    <div className="container mx-auto p-4 sm:p-8 lg:p-16">

      {/* Buttons Module */}
      <ButtonsModule onAddTask={addTask} />

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Column title="TODO" tasks={tasks.todo} />
        <Column title="IN PROGRESS" tasks={tasks.inProgress} />
        <Column title="COMPLETED" tasks={tasks.completed} />
      </div>
    </div>
  );
};

export default KanbanBoard;