import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 
import { icons } from './icons';

function Home({ lists, onCreateNewList }) {
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
            <Link key={list.id} to={`/list/${list.id}`} className="list-preview" style={{ backgroundColor: list.colorTheme }}>
              <div className="list-icon">
                {IconComponent && <IconComponent size={30} />}
              </div>
              <h2>{list.title}</h2>
            </Link>
          );
        })}
      </main>
    </div>
  );
}

export default Home;
