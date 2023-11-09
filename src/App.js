// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NewListModal from './components/NewListModal';
import ListDetailView from './components/ListDetailView';
// ... other necessary imports

function App() {
  const [lists, setLists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addList = (title, icon, colorTheme) => {
    const newList = {
      id: Date.now().toString(), // Convert timestamp to string for consistency
      title,
      icon, // Store the icon's name
      colorTheme,
      tasks: [],
    };
    setLists(prevLists => [...prevLists, newList]);
  };

  const updateListTasks = (listId, newTasks) => {
    setLists(prevLists =>
      prevLists.map(list =>
        list.id === listId ? { ...list, tasks: newTasks } : list
      )
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onCreateNewList = () => {
    setIsModalOpen(true);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home lists={lists} onCreateNewList={onCreateNewList} />} />
          <Route path="/list/:listId" element={<ListDetailView lists={lists} updateListTasks={updateListTasks} />} />
        </Routes>
        {isModalOpen && <NewListModal addList={addList} closeModal={closeModal} />}
      </div>
    </Router>
  );
}

export default App;






