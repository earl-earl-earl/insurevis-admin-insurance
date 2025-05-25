// components/ui/input.tsx
'use client';

import React from 'react';
import styles from './input.module.css'; // Import CSS Module

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={`${styles.input} ${className || ''}`.trim()} // Combine with external className
      {...props}
    />
  );
}