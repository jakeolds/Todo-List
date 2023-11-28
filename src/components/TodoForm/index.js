import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

function TodoForm({ addTodo, editTodo, todoBeingEdited, cancelEdit }) {
  const [input, setInput] = useState('');

  useEffect(() => {
    if (todoBeingEdited) setInput(todoBeingEdited.text);
  }, [todoBeingEdited]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (todoBeingEdited) {
      editTodo({
        ...todoBeingEdited,
        text: input
      });
    } else {
      addTodo({
        id: Date.now(),
        text: input,
        isCompleted: false
      });
    }
    setInput('');
    if (cancelEdit) cancelEdit();
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
      <button className={styles.addButton} type="submit">
        {todoBeingEdited ? 'Save Changes' : 'Add Todo'}
      </button>
      {todoBeingEdited && (
        <button className={styles.cancelButton} onClick={cancelEdit} type="button">
          Cancel
        </button>
      )}
    </form>
  );
}

export default TodoForm;


