import { useState } from 'react';

export const useTasks = (initialTasks = []) => {
    const [tasks, setTasks] = useState(initialTasks);

    const addTask = (task) => {
        setTasks([...tasks, { ...task, id: Date.now(), isCompleted: false }]);
    };

    const editTask = (updatedTask) => {
        setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    };

    const toggleTaskCompleted = (taskId) => {
        setTasks(tasks.map(task => 
            task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
        ));
    };

    const calculateProgress = () => {
        const completedTasks = tasks.filter(task => task.isCompleted).length;
        return tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;
    };

    return { tasks, setTasks, addTask, editTask, toggleTaskCompleted, calculateProgress };
};

