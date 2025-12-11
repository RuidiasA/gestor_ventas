import React from 'react';
import styles from './Select.module.css';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

const Select: React.FC<SelectProps> = ({ label, children, ...rest }) => (
  <div className={styles.wrapper}>
    {label && <label className={styles.label}>{label}</label>}
    <select className={styles.select} {...rest}>
      {children}
    </select>
  </div>
);

export default Select;
