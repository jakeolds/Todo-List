import React from 'react';
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa'; // Import additional icons
import styles from './styles.module.css';

function TodoItem({ todo, toggleComplete, onEdit, onDelete }) {
  return (
    <div className={`${styles.todoItem} ${todo.isCompleted ? styles.completed : ''}`}>
      <div className={styles.text}>{todo.text}</div>
      <div className={styles.actions}>
        <button className={styles.editButton} onClick={() => onEdit(todo)}>
          <FaEdit />
        </button>
        <button className={styles.completeButton} onClick={() => toggleComplete(todo.id)}>
          <FaCheck />
        </button>
        <button className={styles.deleteButton} onClick={() => onDelete(todo.id)}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
