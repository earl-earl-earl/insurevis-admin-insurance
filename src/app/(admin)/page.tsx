'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard by default
    router.replace('/dashboard');
  }, [router]);
  return (
    <div className={styles.redirectContainer}>
      <div className={styles.redirectContent}>
        <i className={`fa-solid fa-spinner fa-spin ${styles.redirectSpinner}`}></i>
        <span>Redirecting to dashboard...</span>
      </div>
    </div>
  );
}