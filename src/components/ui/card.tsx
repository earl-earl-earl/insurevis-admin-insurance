// components/ui/card.tsx
'use client';

import React from 'react';
import styles from './card.module.css'; // Import CSS Module

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
}

export function Card({ title, children, className, ...props }: CardProps) {
  return (
    <div
      className={`${styles.card} ${className || ''}`.trim()}
      {...props}
    >
      {title && (
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{title}</h3>
        </div>
      )}
      <div className={styles.cardContent}>{children}</div>
    </div>
  );
}

export function CardHeader({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`${styles.cardHeader} ${className || ''}`.trim()} {...props}>{children}</div>;
}

export function CardContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`${styles.cardContent} ${className || ''}`.trim()} {...props}>{children}</div>;
}

export function CardFooter({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`${styles.cardFooter} ${className || ''}`.trim()} {...props}>{children}</div>;
}