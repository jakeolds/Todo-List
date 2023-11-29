import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 
import { icons } from './icons';
import { FaEdit, FaTrash } from 'react-icons/fa';

function Home({ lists, onCreateNewList, deleteList, editList }) {
  const handleDeleteList = (listId) => {
    deleteList(listId);
  };

  const handleEditList = (listId) => {
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
              <div className="list-actions">
                <button className="icon-button edit-button" onClick={() => handleEditList(list.id)}>
                  <FaEdit />
                </button>
                <button className="icon-button delete-button" onClick={() => handleDeleteList(list.id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}

export default Home;
