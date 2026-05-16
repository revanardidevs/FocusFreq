'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '@/app/app/app-shell.module.css';

export default function AppSidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Focus',
      href: '/app',
      exact: true,
      icon: (
        <svg className={styles.navIcon} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="7.5"></circle>
          <circle cx="12" cy="12" r="2.5"></circle>
        </svg>
      ),
    },
    {
      name: 'History',
      href: '/app/history',
      exact: false,
      icon: (
        <svg className={styles.navIcon} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8"></circle>
          <path d="M12 7v5l3 2"></path>
        </svg>
      ),
    },
    {
      name: 'Leaderboard',
      href: '/app/leaderboard',
      exact: false,
      icon: (
        <svg className={styles.navIcon} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 20h8"></path>
          <path d="M12 16v4"></path>
          <path d="M7 4h10v3a5 5 0 0 1-10 0V4Z"></path>
          <path d="M7 7H4a3 3 0 0 0 3 3"></path>
          <path d="M17 7h3a3 3 0 0 1-3 3"></path>
        </svg>
      ),
    },
  ];

  return (
    <aside className={styles.appSidebar}>
      <div className={styles.appBrand}>
        <div className={styles.appLogo}>
          <svg viewBox="0 0 64 64" fill="none">
            <path
              d="M32 10v44M22 18v28M42 18v28M13 26v12M51 26v12M5 31v2M59 31v2"
              stroke="#F05A3C"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <span>FocusFreq</span>
      </div>

      <nav className={styles.appNav}>
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link href={item.href} key={item.name} passHref legacyBehavior>
              <button className={`${styles.navButton} ${isActive ? styles.active : ''}`}>
                {item.icon}
                <span>{item.name}</span>
              </button>
            </Link>
          );
        })}
      </nav>

      <div className={styles.appSidebarCard}>
        <div className={styles.appEyebrow}>Ready to focus</div>
        <p>Choose one task, start the timer, and let the sound stay in the background.</p>
      </div>
    </aside>
  );
}
