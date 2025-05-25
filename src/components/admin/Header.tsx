/* eslint-disable @typescript-eslint/no-unused-vars */
// components/admin/Header.tsx
'use client';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  
  // Map routes to their corresponding titles
  const getTitle = () => {
    if (pathname === '/') return 'Dashboard';
    if (pathname.startsWith('/submissions')) return 'Claims Management';
    if (pathname.startsWith('/clients')) return 'Policyholders';
    if (pathname.startsWith('/users')) return 'Staff Management';
    if (pathname.startsWith('/model-status')) return 'CNN Model Status';
    if (pathname.startsWith('/reports')) return 'Reports';
    if (pathname.startsWith('/settings')) return 'Settings';
    
    // Default fallback
    return 'Insurance Claims Dashboard';
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <h1 className={styles.title}>{getTitle()}</h1>
      </div>
      <div className={styles.actionsContainer}>
        <button aria-label='Search' className={styles.iconButton}>
          <i className={`fa-regular fa-magnifying-glass ${styles.icon}`}></i>
        </button>
        <button aria-label='Notifications' className={styles.iconButton}>
          <i className={`fa-regular fa-bell ${styles.icon}`}></i>
        </button>
        <div className={styles.dateDisplay}>
          <i className={`fa-regular fa-calendar ${styles.calendarIcon}`}></i>
          <span>{new Date().toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</span>
        </div>
      </div>
    </header>
  );
}