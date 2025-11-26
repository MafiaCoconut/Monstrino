import React from 'react';
import styles from './styles.module.css';

export default function DocCard({ title, children }) {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}
