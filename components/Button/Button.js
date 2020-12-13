import React from 'react';
import styles from './Button.module.css';

export default function Button({ children, ...props }) {
  return <button {...props}>{children}</button>;
}
