// components/ui/table.tsx
'use client';

import React from 'react';
import styles from './table.module.css'; // Import CSS Module

export function Table({ children, className, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return <table className={`${styles.table} ${className || ''}`.trim()} {...props}>{children}</table>;
}

export function Thead({ children, className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={`${styles.thead} ${className || ''}`.trim()} {...props}>{children}</thead>;
}

export function Tbody({ children, className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={`${styles.tbody} ${className || ''}`.trim()} {...props}>{children}</tbody>;
}

export function Tr({ children, className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={`${styles.tr} ${className || ''}`.trim()} {...props}>{children}</tr>;
}

export function Th({ children, className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) {
  return <th scope="col" className={`${styles.th} ${className || ''}`.trim()} {...props}>{children}</th>;
}

export function Td({ children, className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) {
  return <td className={`${styles.td} ${className || ''}`.trim()} {...props}>{children}</td>;
}