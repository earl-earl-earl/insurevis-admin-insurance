// components/admin/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

// Main navigation items
const navItems = [
  { label: 'Dashboard', href: '/', icon: 'fa-regular fa-gauge-high' },
  { label: 'Claims', href: '/submissions', icon: 'fa-regular fa-file-lines' },
  { label: 'Policyholders', href: '/clients', icon: 'fa-regular fa-users' },
  { label: 'Staff Management', href: '/users', icon: 'fa-regular fa-user-tie' },
  { label: 'Reports', href: '/reports', icon: 'fa-regular fa-chart-line' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar} aria-label="Main Navigation">
      {/* Logo and Brand Section */}
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <span>I</span>
        </div>
        <div className={styles.logoText}>
          <span className={styles.logoTextMain}>InsureVis</span>
          <span className={styles.logoTextSub}>Admin</span>
        </div>
      </div>
      
      {/* Main Navigation */}
      <nav className={styles.nav}>
        <div className={styles.sectionTitle}>DAILY OPERATIONS</div>
        <ul>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`${styles.navItemLink} ${isActive ? styles.navItemLinkActive : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <i className={`${item.icon} ${styles.icon}`} aria-hidden="true"></i>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Footer Section */}
      <div className={styles.footerSection}>
        <Link
          href="/settings"
          className={styles.navItemLink}
          aria-label="Settings"
        >
          <i className={`fa-regular fa-gear ${styles.icon}`} aria-hidden="true"></i>
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}