// app/(admin)/layout.tsx
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';
import styles from './layout.module.css'; // Import CSS Module

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.adminLayout}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header />
        <main className={styles.pageWrapper}>{children}</main>
      </div>
    </div>
  );
}