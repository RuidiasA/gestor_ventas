import React from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
  label: string;
  tone?: 'success' | 'warning' | 'danger' | 'info';
}

const Badge: React.FC<BadgeProps> = ({ label, tone = 'info' }) => (
  <span className={`${styles.badge} ${styles[tone]}`}>{label}</span>
);

export default Badge;
