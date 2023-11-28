// components/NewListModal.js
import React, { useState, useEffect } from 'react';
import { icons } from './icons'; // Import the icons from the centralized icons.js file
import './NewListModal.css';

// Define a calming color palette
const calmingColors = [
  '#a8e6cf', // Mint green
  '#dcedc1', // Tea green
  '#ffd3b6', // Peach
  '#ffaaa5', // Light coral
  '#ff8b94', // Salmon pink
  '#c8b6e2', // Soft purple
  '#fae3d9', // Blush beige
  '#bbded6', // Pale turquoise
  '#ffb6b9', // Soft pink
  '#fafac6', // Pale lemon
];

function NewListModal({ addOrUpdateList, closeModal, editingList }) {
  // If editing an existing list, prefill the form, otherwise start with empty values
  const [title, setTitle] = useState(editingList ? editingList.title : '');
  const [selectedIcon, setSelectedIcon] = useState(editingList ? editingList.icon : icons[0].name);
  const [colorTheme, setColorTheme] = useState(editingList ? editingList.colorTheme : calmingColors[0]);

  useEffect(() => {
    // Update CSS variable for selected color
    document.documentElement.style.setProperty('--selected-color-theme', colorTheme);
  }, [colorTheme]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use editingList's id if available, otherwise pass null for a new list
    addOrUpdateList(editingList ? editingList.id : null, title, selectedIcon, colorTheme);
    closeModal();
  };

  return (
    <div className="new-list-modal-overlay">
      <div className="new-list-modal-content">
        <button onClick={closeModal} className="close-modal-button">&times;</button>
        <h2 className="modal-title">Create New List</h2>
        <form onSubmit={handleSubmit} className="new-list-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="List Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-input"
              required
            />
          </div>
          <div className="icon-selection">
            {icons.map(({ component: Icon, name }) => (
              <div
                key={name}
                className={`icon-wrapper ${selectedIcon === name ? 'selected' : ''}`}
                onClick={() => setSelectedIcon(name)}
              >
                <Icon size={30} className="icon" />
              </div>
            ))}
          </div>
          <label className="color-input-label">Choose a Color Theme:</label>
          <div className="color-selection">
            {calmingColors.map((color, index) => (
              <div
                key={index}
                className={`color-option ${colorTheme === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setColorTheme(color)}
              />
            ))}
          </div>
          <button type="submit" className="create-list-button">Create List</button>
        </form>
      </div>
    </div>
  );
}

export default NewListModal;

