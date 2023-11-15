import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 
import { icons } from './icons';

function Home({ lists, onCreateNewList, deleteList, editList }) {
  const handleDeleteList = (listId) => {
    // Call the deleteList function passed as a prop
    deleteList(listId);
  };

  const handleEditList = (listId) => {
    // Call the editList function passed as a prop
    editList(listId);
  };

  return (
    <div className="home">
      <header className="home-header">
        <h1>To Do Lists</h1>
        <button className="add-list-button" onClick={onCreateNewList}>
          <span className="plus-icon">+</span> Add List
        </button>
      </header>
      <main className="list-container">
        {lists.map(list => {
          const IconComponent = icons.find(icon => icon.name === list.icon)?.component || null;
          return (
            <div key={list.id} className="list-item">
              <Link to={`/list/${list.id}`} className="list-preview" style={{ backgroundColor: list.colorTheme }}>
                <div className="list-icon">
                  {IconComponent && <IconComponent size={30} />}
                </div>
                <h2>{list.title}</h2>
              </Link>
              <button onClick={() => handleEditList(list.id)}>Edit</button>
              <button onClick={() => handleDeleteList(list.id)}>Delete</button>
            </div>
          );
        })}
      </main>
    </div>
  );
}

export default Home;