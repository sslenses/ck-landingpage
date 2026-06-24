'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Tentang Kami', href: '/tentang' },
    { name: 'Produk', href: '/produk' },
    { name: 'Kemitraan', href: '/kemitraan' },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <svg viewBox="0 0 100 100" width="36" height="36" className={styles.logoSvg}>
            <defs>
              <radialGradient id="logoRedGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#ff3b30" />
                <stop offset="70%" stopColor="#b30000" />
                <stop offset="100%" stopColor="#4d0000" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="48" fill="url(#logoRedGrad)" />
            <text 
              x="50" 
              y="52" 
              fill="#ffffff" 
              fontSize="44" 
              fontWeight="800" 
              fontFamily="var(--font-heading), sans-serif" 
              textAnchor="middle" 
              dominantBaseline="middle"
            >
              CK
            </text>
          </svg>
          <span className={styles.logoText}>Cigarskruie</span>
        </Link>

        <button 
          className={`${styles.menuToggle} ${isOpen ? styles.menuOpen : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>

        <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navLinks}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className={`${styles.link} ${isActive ? styles.activeLink : ''}`}
                    onClick={closeMenu}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <a 
            href="https://wa.me/6281234567890?text=Halo%20Admin%20Cigarskruie,%20saya%20tertarik%20untuk%20bertanya%20mengenai%20produk%20dan%20kemitraan." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary"
            style={{ fontSize: '0.85rem', padding: '0.5rem 1.2rem', minHeight: '38px' }}
          >
            Hubungi CK Admin
          </a>
        </nav>
      </div>
    </header>
  );
}
