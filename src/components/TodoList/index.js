import React from 'react';
import TodoItem from '../TodoItem';
import styles from './styles.module.css';

function TodoList({ todos, toggleComplete, onEditTask, onDeleteTask }) {
  if (!todos) {
    console.error('TodoList was rendered without todos. This should not happen.');
    return null; // or return a fallback UI
  }

  return (
    <div className={styles.todoList}>
      {todos.map((todo) => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          toggleComplete={toggleComplete}
          onEdit={onEditTask} // Renamed to match expected prop name in TodoItem
          onDelete={onDeleteTask} // Renamed to match expected prop name in TodoItem
        />
      ))}
    </div>
  );
}

export default TodoList;
