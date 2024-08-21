import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth'; // Import Firebase Authentication
import { getFirestore } from 'firebase/firestore'; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyBUBNFv4OmJ4hy6Hs5xOyfCd-Ji_QvxUas",
  authDomain: "todo-lists-7b0cc.firebaseapp.com",
  projectId: "todo-lists-7b0cc",
  storageBucket: "todo-lists-7b0cc.appspot.com",
  messagingSenderId: "1041010965217",
  appId: "1:1041010965217:web:84cb13f5283f8de4cdd5a0",
  measurementId: "G-3K37HJDBJZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics
const analytics = getAnalytics(app);

// Initialize Authentication and Firestore
const auth = getAuth(app); // Initialize Firebase Authentication
const db = getFirestore(app); // Initialize Firestore

// Export the Firebase services so they can be used in other parts of your app
export { auth, db, analytics };
