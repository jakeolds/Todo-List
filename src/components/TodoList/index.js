import React from 'react';
import TodoItem from '../TodoItem';
import styles from './styles.module.css';

function TodoList({ todos, toggleComplete }) {
  // Log the current state of todos for debugging
  console.log('Current todos in TodoList:', todos);

  // Safeguard: Render null or a message if todos is undefined
  if (!todos) {
    console.error('TodoList was rendered without todos. This should not happen.');
    return null; // or return a fallback UI if you prefer
  }

  return (
    <div className={styles.todoList}>
      {todos.map((todo) => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          toggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
}

export default TodoList;
