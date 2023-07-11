import React from 'react';
import styles from './OrderInfo.module.css';

const OrderInfo = ({ label, value }) => {
  return (
    <div className={styles.container__info}>
      <label className={styles.label}>{label}</label>
      <div className={styles.value}>{value}</div>
    </div>
  );
};

export default OrderInfo;