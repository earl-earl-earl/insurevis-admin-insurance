// components/admin/Header.tsx
'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // Dark mode state
  // const [darkMode, setDarkMode] = useState(false);

  // useEffect(() => {
  //   const isDark = document.body.classList.contains('dark') ||
  //     window.matchMedia('(prefers-color-scheme: dark)').matches;
  //   setDarkMode(isDark);
  // }, []);

  // useEffect(() => {
  //   if (darkMode) {
  //     document.body.classList.add('dark');
  //   } else {
  //     document.body.classList.remove('dark');
  //   }
  // }, [darkMode]);
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

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    
    // Close modal
    setShowLogoutModal(false);
    
    // Redirect to login
    router.push('/login');
  };

  const getCurrentUserEmail = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userEmail') || 'admin@insurevis.com';
    }
    return 'admin@insurevis.com';
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
          {/* User Profile Dropdown */}
        <div className={styles.userProfile} ref={profileRef}>
          <button 
            className={styles.profileButton}
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            aria-label="User profile menu"
          >
            <div className={styles.avatarContainer}>
              <i className="fa-solid fa-user"></i>
            </div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>Admin User</span>
              <span className={styles.userEmail}>{getCurrentUserEmail()}</span>
            </div>
            <i className={`fa-solid fa-chevron-down ${styles.dropdownIcon} ${showProfileDropdown ? styles.rotated : ''}`}></i>
          </button>
          
          {showProfileDropdown && (
            <div className={styles.profileDropdown}>
              <div className={styles.dropdownItem}>
                <i className="fa-regular fa-user"></i>
                <span>Profile</span>
              </div>
              <div className={styles.dropdownItem}>
                <i className="fa-regular fa-gear"></i>
                <span>Settings</span>
              </div>
              <div className={styles.dropdownDivider}></div>
              <button 
                className={`${styles.dropdownItem} ${styles.logoutItem}`}
                onClick={() => setShowLogoutModal(true)}
              >
                <i className="fa-regular fa-sign-out"></i>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className={styles.modalOverlay} onClick={() => setShowLogoutModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Confirm Logout</h3>
              <button 
                className={styles.modalCloseButton}
                onClick={() => setShowLogoutModal(false)}
                aria-label="Close modal"
              >
                <i className="fa-solid fa-times"></i>
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalIcon}>
                <i className="fa-solid fa-sign-out"></i>
              </div>
              <p className={styles.modalMessage}>
                Are you sure you want to logout? You will need to sign in again to access the dashboard.
              </p>
            </div>
            <div className={styles.modalFooter}>
              <button 
                className={styles.cancelButton}
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button 
                className={styles.confirmButton}
                onClick={handleLogout}
              >
                <i className="fa-regular fa-sign-out"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}