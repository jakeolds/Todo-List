import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NewListModal from './components/NewListModal';
import ListDetailView from './components/ListDetailView';
// ... other necessary imports

function App() {
  const [lists, setLists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingListId, setEditingListId] = useState(null);

  const addOrUpdateList = (id, title, iconName, colorTheme) => {
    if (id) {
      // Update existing list
      setLists(prevLists =>
        prevLists.map(list =>
          list.id === id ? { ...list, title, icon: iconName, colorTheme } : list
        )
      );
    } else {
      // Add new list
      const newList = {
        id: Date.now().toString(), // Convert timestamp to string for consistency
        title,
        icon: iconName,
        colorTheme,
        tasks: [],
      };
      setLists(prevLists => [...prevLists, newList]);
    }
  };

  const updateListTasks = (listId, newTasks) => {
    setLists(prevLists =>
      prevLists.map(list =>
        list.id === listId ? { ...list, tasks: newTasks } : list
      )
    );
  };

  const deleteList = (listId) => {
    setLists(prevLists => prevLists.filter(list => list.id !== listId));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingListId(null);
  };

  const onCreateNewList = () => {
    setEditingListId(null); // Reset editing state
    setIsModalOpen(true);
  };

  const onEditList = (listId) => {
    setEditingListId(listId);
    setIsModalOpen(true);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home lists={lists} onCreateNewList={onCreateNewList} deleteList={deleteList} editList={onEditList} />} />
          <Route path="/list/:listId" element={<ListDetailView lists={lists} updateListTasks={updateListTasks} />} />
        </Routes>
        {isModalOpen && (
          <NewListModal
            addOrUpdateList={addOrUpdateList}
            closeModal={closeModal}
            editingList={lists.find(list => list.id === editingListId)}
          />
        )}
      </div>
    </Router>
  );
}

export default App;

