import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBUBNFv4OmJ4hy6Hs5xOyfCd-Ji_QvxUas" ,
  authDomain: "todo-lists-7b0cc.firebaseapp.com" ,
  projectId: "todo-lists-7b0cc",
  storageBucket: "todo-lists-7b0cc.appspot.com",
  messagingSenderId: "1041010965217",
  appId: "1:1041010965217:web:84cb13f5283f8de4cdd5a0",
  measurementId: "G-3K37HJDBJZ"
};


const app = initializeApp(firebaseConfig);


const analytics = getAnalytics(app);

export default app;
