import React from 'react';
import AppSidebar from '@/components/layout/AppSidebar';
import AppMobileNav from '@/components/layout/AppMobileNav';
import styles from './app-shell.module.css';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.appShell}>
      <AppSidebar />
      <div>
        <AppMobileNav />
        <main className={styles.appMain}>
          {children}
        </main>
      </div>
    </div>
  );
}
