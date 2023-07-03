import React from "react";
import styles from'./LoadingSpinner.module.css'

const LoadingSpinner = () => {
  return (
    <div className={styles.spinner__container}>
      <div className={styles.loading__spinner}></div>
    </div>
  );
};

export default LoadingSpinner;
