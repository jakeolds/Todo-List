import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignIn.module.css'; 

function SignIn({ onSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log('Submitting sign in form with email:', email);

    onSignIn(email, password)
      .then(() => {
        // Navigate to home page after successful sign in
        navigate('/');
      })
      .catch((error) => {
        setError(error.message);
        console.error('Sign in error:', error.message);
      });
  };

  return (
    <div className={styles.signInContainer}>
      <h1>Sign In</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSignIn} className={styles.signInForm}>
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
        <button type="submit" className={styles.signInButton}>Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;

