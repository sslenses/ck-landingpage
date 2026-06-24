'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

export default function MitraLogin() {
  const router = useRouter();
  const [mitraId, setMitraId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Set document title for SEO/A11y
    document.title = 'Login Portal Mitra - Cigarskruie (CK) Indonesia';
    
    // Check if already logged in
    const session = localStorage.getItem('mitraSession');
    if (session) {
      router.push('/mitra');
    }
  }, [router]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!mitraId.trim() || !password.trim()) {
      setError('ID Mitra dan Kata Sandi harus diisi.');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate network delay
    setTimeout(() => {
      // If it looks like a Kedai ID, log in as Kedai CK, otherwise Clubber CK
      const isKedai = mitraId.toLowerCase().includes('kedai') || mitraId.toUpperCase().startsWith('KD');
      
      const userData = isKedai 
        ? {
            id: mitraId.toUpperCase(),
            name: 'Kedai CK Malang Kota',
            role: 'kedai',
            rank: 'Kedai CK (Distributor Resmi)',
            points: 8450,
            commissions: 9850000,
            downlineCount: 34,
            joinDate: '12 April 2023',
            stocks: {
              ckSoft: 120,
              assikhaGold: 85,
            }
          }
        : {
            id: mitraId.toUpperCase().startsWith('CK-') ? mitraId.toUpperCase() : `CK-${mitraId.toUpperCase()}`,
            name: 'Budi Santoso',
            role: 'clubber',
            rank: 'Clubber CK (Mitra Niaga)',
            points: 1250,
            commissions: 1450000,
            downlineCount: 8,
            joinDate: '24 Oktober 2024',
          };

      localStorage.setItem('mitraSession', JSON.stringify(userData));
      router.push('/mitra');
    }, 800);
  };

  const loginDemo = (role) => {
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      const userData = role === 'kedai'
        ? {
            id: 'KD-440291',
            name: 'Kedai CK Malang Kota',
            role: 'kedai',
            rank: 'Kedai CK (Distributor Resmi)',
            points: 8450,
            commissions: 9850000,
            downlineCount: 34,
            joinDate: '12 April 2023',
            stocks: {
              ckSoft: 120,
              assikhaGold: 85,
            }
          }
        : {
            id: 'CK-889302',
            name: 'Budi Santoso',
            role: 'clubber',
            rank: 'Clubber CK (Mitra Niaga)',
            points: 1250,
            commissions: 1450000,
            downlineCount: 8,
            joinDate: '24 Oktober 2024',
          };

      localStorage.setItem('mitraSession', JSON.stringify(userData));
      router.push('/mitra');
    }, 500);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.backgroundOverlay}></div>
      <div className={styles.glowCircle1}></div>
      <div className={styles.glowCircle2}></div>

      <div className={`${styles.loginCard} glass-card`}>
        <div className={styles.cardHeader}>
          <Link href="/" className={styles.logoGroup}>
            <svg viewBox="0 0 100 100" width="48" height="48" className={styles.logoSvg}>
              <defs>
                <radialGradient id="loginRedGrad" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#ff3b30" />
                  <stop offset="70%" stopColor="#b30000" />
                  <stop offset="100%" stopColor="#4d0000" />
                </radialGradient>
              </defs>
              <circle cx="50" cy="50" r="48" fill="url(#loginRedGrad)" />
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
          <h2>Portal Kemitraan</h2>
          <p>Silakan masuk untuk mengelola jaringan dan pemesanan stok Anda.</p>
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleLogin} className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="mitraId">ID Mitra CK</label>
            <input 
              type="text" 
              id="mitraId"
              placeholder="Contoh: CK-889302 atau KD-440291"
              value={mitraId}
              onChange={(e) => setMitraId(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Kata Sandi</label>
            <input 
              type="password" 
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '44px' }}
            disabled={loading}
          >
            {loading ? <span className={styles.spinner}></span> : 'Masuk Ke Portal'}
          </button>
        </form>

        <div className={styles.divider}>
          <span>Atau Demo Cepat</span>
        </div>

        <div className={styles.demoButtons}>
          <button 
            type="button" 
            className={`${styles.demoBtn} ${styles.demoClubber}`}
            onClick={() => loginDemo('clubber')}
            disabled={loading}
          >
            <span>Clubber CK (Mitra)</span>
            <small>Lihat komisi, jaringan & alat WA</small>
          </button>

          <button 
            type="button" 
            className={`${styles.demoBtn} ${styles.demoKedai}`}
            onClick={() => loginDemo('kedai')}
            disabled={loading}
          >
            <span>Kedai CK (Stokis)</span>
            <small>Lihat inventori & kalkulator restock</small>
          </button>
        </div>

        <div className={styles.cardFooter}>
          Belum terdaftar sebagai mitra?{' '}
          <Link href="/kemitraan">Daftar Kemitraan</Link>
        </div>
      </div>
    </div>
  );
}
