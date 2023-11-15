// src/hooks/useTasks.js
import { useState } from 'react';

export const useTasks = (initialTasks = []) => {
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = (newTask) => {
    setTasks(prevTasks => [...prevTasks, { ...newTask, id: Date.now(), isCompleted: false }]);
  };

  const editTask = (updatedTask) => {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === updatedTask.id ? { ...task, ...updatedTask } : task))
    );
  };

  const toggleTaskCompleted = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task))
    );
  };

  const calculateProgress = () => {
    const completedTasksCount = tasks.filter(task => task.isCompleted).length;
    return tasks.length > 0 ? (completedTasksCount / tasks.length) * 100 : 0;
  };

  return {
    tasks,
    addTask,
    editTask,
    toggleTaskCompleted,
    calculateProgress
  };
};
