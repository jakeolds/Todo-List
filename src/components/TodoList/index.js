import React from 'react';
import TodoItem from '../TodoItem';
import styles from './styles.module.css';

function TodoList({ todos, toggleComplete, onEditTask, onDeleteTask }) {
  // Sort tasks so that completed tasks are at the bottom
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.isCompleted === b.isCompleted) {
      return 0; // Keep existing order if both are completed or not
    }
    return a.isCompleted ? 1 : -1; // Incomplete tasks first
  });

  return (
    <div className={styles.todoList}>
      {sortedTodos.map((todo) => (
        <TodoItem 
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
}

export default TodoList;

