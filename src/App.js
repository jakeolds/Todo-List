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
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in successfully
        const user = userCredential.user;
        setUser(user); // Update user state
        console.log('User signed in:', user);
      })
  };
  
  const handleSignUp = (email, password) => {
    console.log('Attempting to sign up with:', email); // Log email for debugging
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Signed up:', userCredential.user);
        setUser(userCredential.user);
      })
      .catch((error) => {
        console.error('Sign up error:', error.message);
      });
  };
  
  const handleSignOut = () => {
    console.log('Attempting to sign out');
    signOut(auth)
      .then(() => {
        console.log('Sign out successful');
        setUser(null);
      })
      .catch((error) => {
        console.error('Sign out error:', error.message);
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
          <Route path="/" element={user ? (console.log('Rendering Home'), <Home lists={lists} onCreateNewList={onCreateNewList} deleteList={deleteList} editList={onEditList} />) : (console.log('Redirecting to SignIn'), <Navigate replace to="/signin" />)} />
          <Route path="/list/:listId" element={user ? (console.log('Rendering ListDetailView'), <ListDetailView lists={lists} updateListTasks={updateListTasks} />) : (console.log('Redirecting to SignIn'), <Navigate replace to="/signin" />)} />
          <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
          <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
          {/* Add a signout path if needed */}
          {/* Other routes */}
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


