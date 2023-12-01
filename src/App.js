import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import NewListModal from './components/NewListModal';
import ListDetailView from './components/ListDetailView';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

function App() {
  const [lists, setLists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingListId, setEditingListId] = useState(null);
  const [user, setUser] = useState(null); // State to track user authentication
  const auth = getAuth(); // Firebase auth instance

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      console.log('Auth state changed. Current user:', currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleSignIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        console.log('User signed in:', userCredential.user);
      })
      .catch((error) => {
        console.error('Sign in error:', error);
      });
  };
  
  const handleSignUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        console.log('User signed up:', userCredential.user);
      })
      .catch((error) => {
        console.error('Sign up error:', error);
      });
  };
  
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        console.log('User signed out');
      })
      .catch((error) => {
        console.error('Sign out error:', error);
      });
  };

  const addOrUpdateList = (id, title, iconName, colorTheme) => {
    if (id) {
      setLists(prevLists =>
        prevLists.map(list =>
          list.id === id ? { ...list, title, icon: iconName, colorTheme } : list
        )
      );
    } else {
      const newList = {
        id: Date.now().toString(),
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
    setEditingListId(null);
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
          <Route path="/" element={user ? <Home lists={lists} onCreateNewList={onCreateNewList} deleteList={deleteList} editList={onEditList} onSignOut={handleSignOut} /> : <Navigate replace to="/signin" />} />
          <Route path="/list/:listId" element={user ? <ListDetailView lists={lists} updateListTasks={updateListTasks} /> : <Navigate replace to="/signin" />} />
          <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
          <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
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



