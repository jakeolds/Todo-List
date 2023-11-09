import React from 'react';

function NewListForm({ onSubmit }) {
  return (
    <div className="new-list-form">
      {/* Form inputs for title, icon selection, and color theme will go here */}
      <button onClick={onSubmit}>Create List</button>
    </div>
  );
}

export default NewListForm;