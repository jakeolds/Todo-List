import { useState } from 'react';

export const useTasks = (initialTasks = []) => {
  const [tasks, setTasks] = useState(initialTasks || []); // Ensure tasks is always an array

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), isCompleted: false }]);
  };

  const toggleTaskCompleted = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  const calculateProgress = () => {
    const completedTasks = tasks.filter(task => task.isCompleted).length;
    return tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;
  };

  return { tasks, addTask, toggleTaskCompleted, calculateProgress };
};
