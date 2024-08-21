import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config'; // Adjusted path to firebase-config
import styles from './SignUp.module.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Successfully signed up
        console.log('User signed up:', userCredential.user);
        navigate('/'); // Navigate to home or other page after signup
      })
      .catch((error) => {
        setError(error.message);
        console.error('Sign up error:', error.message);
      });
  };

  return (
    <div className={styles.signUpContainer}>
      <h1>Sign Up</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSignUp} className={styles.signUpForm}>
        <input
          type="email"
          className={styles.inputField}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className={styles.inputField}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className={styles.signUpButton}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;

