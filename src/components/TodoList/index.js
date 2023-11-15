import React from 'react';
import TodoItem from '../TodoItem';
import styles from './styles.module.css';

function TodoList({ todos, toggleComplete, onEditTask, onDeleteTask }) {
  if (!todos) {
    return <div>No tasks available.</div>;
  }

  return (
    <div className={styles.todoList}>
      {todos.map((todo) => (
        <TodoItem 
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          onEdit={() => onEditTask(todo)}
          onDelete={() => onDeleteTask(todo.id)}
        />
      ))}
    </div>
  );
}

export default TodoList;




