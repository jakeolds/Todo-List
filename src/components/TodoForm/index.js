// src/components/TodoForm/index.js
import React, { useState } from 'react';
import styles from './styles.module.css'; 

function TodoForm({ addTodo }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    addTodo({
      id: Date.now(),
      text: input,
      isCompleted: false
    });
    setInput('');
  };

  return (
    <form className={styles.todoForm} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.inputField} 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a todo"
        required
      />
      <button className={styles.addButton} type="submit">Add Todo</button>
    </form>
  );
}

export default TodoForm;

