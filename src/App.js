import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import NewListModal from './components/NewListModal';
import ListDetailView from './components/ListDetailView';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Import Firestore methods
import { db } from './firebase-config'; // Import Firestore instance

function App() {
  const [lists, setLists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingListId, setEditingListId] = useState(null);
  const [user, setUser] = useState(null); // State to track user authentication
  const auth = getAuth(); // Firebase auth instance

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setLists(docSnap.data().lists); // Load lists from Firestore
          } else {
            console.log('No lists found in Firestore');
          }
        } catch (error) {
          console.error('Error loading lists:', error);
        }
      } else {
        setLists([]); // Clear lists when user logs out
      }
      console.log('Auth state changed. Current user:', currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const saveListsToFirestore = async (updatedLists) => {
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), { lists: updatedLists });
        console.log('Lists saved to Firestore');
      } catch (error) {
        console.error('Error saving lists:', error);
      }
    }
  };

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
    let updatedLists;
    if (id) {
      updatedLists = lists.map(list =>
        list.id === id ? { ...list, title, icon: iconName, colorTheme } : list
      );
    } else {
      const newList = {
        id: Date.now().toString(),
        title,
        icon: iconName,
        colorTheme,
        tasks: [],
      };
      updatedLists = [...lists, newList];
    }
    setLists(updatedLists);
    saveListsToFirestore(updatedLists); // Save updated lists to Firestore
  };

  const updateListTasks = (listId, newTasks) => {
    const updatedLists = lists.map(list =>
      list.id === listId ? { ...list, tasks: newTasks } : list
    );
    setLists(updatedLists);
    saveListsToFirestore(updatedLists); // Save updated lists to Firestore
  };

  const deleteList = (listId) => {
    const updatedLists = lists.filter(list => list.id !== listId);
    setLists(updatedLists);
    saveListsToFirestore(updatedLists); // Save updated lists to Firestore
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




