import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';
import ProgressBar from './ProgressBar';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { icons } from './icons';
import './ListDetailView.css';

function ListDetailView({ lists, updateListTasks }) {
  const { listId } = useParams();
  const listIndex = lists.findIndex(list => list.id.toString() === listId);

  // Declare list at the beginning and use it later
  const list = listIndex !== -1 ? lists[listIndex] : null;

  // Initialize tasks state with an empty array if list is not found
  const { tasks, addTask, toggleTaskCompleted, calculateProgress } = useTasks(list ? list.tasks : []);

  // Update the parent state when tasks change
  useEffect(() => {
    // Function to check if tasks are different
    const tasksAreDifferent = (newTasks, currentTasks) => {
      if (newTasks.length !== currentTasks.length) return true;
      for (let i = 0; i < newTasks.length; i++) {
        if (newTasks[i].id !== currentTasks[i].id || newTasks[i].isCompleted !== currentTasks[i].isCompleted) {
          return true;
        }
      }
      return false;
    };
  
    if (list && tasksAreDifferent(tasks, list.tasks)) {
      updateListTasks(list.id, tasks);
    }
  }, [tasks, list, updateListTasks]);

  const IconComponent = icons.find(icon => icon.name === list.icon)?.component;

  return (
    <div className="list-detail-view">
        <h1>{list.title}</h1>
        {IconComponent && <IconComponent size={30} />}
        <ProgressBar progress={calculateProgress()} color={list.colorTheme} />
        <TodoForm addTodo={addTask} />
        <TodoList todos={tasks} toggleComplete={toggleTaskCompleted} />
    </div>
  );
}

export default ListDetailView;
