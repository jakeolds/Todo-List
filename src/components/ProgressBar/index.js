import React from 'react';
import styles from './styles.module.css';

const ProgressBar = ({ progress, color }) => {   
  return (
    <div className={styles.progressBar}>
      <div className={styles.progressBarFiller} style={{ width: `${progress}%`, backgroundColor: color }}></div>
    </div>
  );
};

export default ProgressBar;
