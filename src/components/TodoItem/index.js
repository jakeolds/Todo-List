import React from 'react';
import { FaCheck } from 'react-icons/fa'; // Make sure to install react-icons
import styles from './styles.module.css';

function TodoItem({ todo, toggleComplete }) {
  return (
    <div className={`${styles.todoItem} ${todo.isCompleted ? styles.completed : ''}`}>
      <div className={styles.text}>{todo.text}</div>
      <button className={styles.completeButton} onClick={() => toggleComplete(todo.id)}>
        <FaCheck />
      </button>
      {/* Include other buttons or icons for edit and delete */}
    </div>
  );
}

export default TodoItem;
