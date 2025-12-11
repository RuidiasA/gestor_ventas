import React from 'react';
import styles from './Alert.module.css';

interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'danger';
  message: string;
}

const Alert: React.FC<AlertProps> = ({ type = 'info', message }) => (
  <div className={`${styles.alert} ${styles[type]}`}>{message}</div>
);

export default Alert;
