import React from 'react';
import styles from './styles.module.css';

const ProgressBar = ({ progress, color }) => {
  document.documentElement.style.setProperty('--user-selected-color', color);

  const fillerStyles = {
    width: `${progress}%`,
    borderRadius: progress > 0 ? '20px 0 0 20px' : '20px',
  };

  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBarFiller} style={fillerStyles}></div>
    </div>
  );
};

export default ProgressBar;

