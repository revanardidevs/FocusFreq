'use client';

import React from 'react';
import Link from 'next/link';
import styles from '@/app/app/app-shell.module.css';

export default function AppMobileNav() {
  return (
    <header className={styles.appMobileTop}>
      <Link href="/app" className={styles.appBrand} style={{ textDecoration: 'none' }}>
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
      </Link>
      <button className={styles.menuBtn}>Menu</button>
    </header>
  );
}
