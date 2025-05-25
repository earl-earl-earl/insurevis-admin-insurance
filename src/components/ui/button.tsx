// components/ui/button.tsx
'use client';

import React from 'react';
import styles from './button.module.css'; // Import CSS Module

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  // Combine class names using template literals and the styles object
  const buttonClasses = `
    ${styles.base}
    ${styles[variant]} 
    ${styles[size]}
    ${className || ''} 
  `;

  return (
    <button
      className={buttonClasses.trim()} // Trim to remove leading/trailing whitespace
      {...props}
    >
      {children}
    </button>
  );
}