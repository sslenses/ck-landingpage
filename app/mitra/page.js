'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function MitraDashboard() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // overview, network, stock, tools
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // States for Network panel
  const [searchQuery, setSearchQuery] = useState('');
  const [networkFilter, setNetworkFilter] = useState('all'); // all, clubber, kedai

  // States for Stock/Order panel
  const [ckSoftQty, setCkSoftQty] = useState(10);
  const [assikhaGoldQty, setAssikhaGoldQty] = useState(10);
  const [selectedKedai, setSelectedKedai] = useState('KD-440291');

  // States for WA Tool panel
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('CK Soft');
  const [customNote, setCustomNote] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  // States for Interactive Chart hover tooltip
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Mock data for downline network
  const downlines = {
    clubber: [
      { id: 'CK-002931', name: 'Ahmad Yani', role: 'clubber', rank: 'Clubber CK', points: 250, status: 'Aktif', joinDate: '12 Jan 2025' },
      { id: 'CK-003829', name: 'Rina Wijaya', role: 'clubber', rank: 'Clubber CK', points: 180, status: 'Aktif', joinDate: '05 Feb 2025' },
      { id: 'CK-004481', name: 'Hendra Saputra', role: 'clubber', rank: 'Clubber CK', points: 0, status: 'Tidak Aktif', joinDate: '18 Mar 2025' },
      { id: 'CK-005012', name: 'Siti Aminah', role: 'clubber', rank: 'Clubber CK', points: 420, status: 'Aktif', joinDate: '22 Apr 2025' },
    ],
    kedai: [
      { id: 'CK-002931', name: 'Ahmad Yani', role: 'clubber', rank: 'Clubber CK', points: 250, status: 'Aktif', joinDate: '12 Jan 2025' },
      { id: 'CK-003829', name: 'Rina Wijaya', role: 'clubber', rank: 'Clubber CK', points: 180, status: 'Aktif', joinDate: '05 Feb 2025' },
      { id: 'CK-004481', name: 'Hendra Saputra', role: 'clubber', rank: 'Clubber CK', points: 0, status: 'Tidak Aktif', joinDate: '18 Mar 2025' },
      { id: 'CK-005012', name: 'Siti Aminah', role: 'clubber', rank: 'Clubber CK', points: 420, status: 'Aktif', joinDate: '22 Apr 2025' },
      { id: 'KD-003310', name: 'Kedai CK Pasuruan', role: 'kedai', rank: 'Kedai CK', points: 3400, status: 'Aktif', joinDate: '30 Mei 2024' },
      { id: 'KD-004810', name: 'Kedai CK Batu', role: 'kedai', rank: 'Kedai CK', points: 2100, status: 'Aktif', joinDate: '15 Jul 2024' },
      { id: 'CK-006200', name: 'Dian Lestari', role: 'clubber', rank: 'Clubber CK', points: 310, status: 'Aktif', joinDate: '02 Mei 2025' },
      { id: 'CK-007190', name: 'Toni Prabowo', role: 'clubber', rank: 'Clubber CK', points: 90, status: 'Aktif', joinDate: '10 Jun 2025' },
    ]
  };

  // Mock chart data for commissions (January - June 2026)
  const chartData = [
    { label: 'Jan', value: 650000, points: 520, coord: { x: 50, y: 150 } },
    { label: 'Feb', value: 850000, points: 680, coord: { x: 130, y: 120 } },
    { label: 'Mar', value: 1200000, points: 960, coord: { x: 210, y: 80 } },
    { label: 'Apr', value: 1050000, points: 840, coord: { x: 290, y: 95 } },
    { label: 'Mei', value: 1550000, points: 1240, coord: { x: 370, y: 40 } },
    { label: 'Jun', value: 1850000, points: 1480, coord: { x: 450, y: 15 } },
  ];

  // Mock list of local Kedai CK outlets for orders
  const localKedaiList = [
    { id: 'KD-440291', name: 'Kedai CK Malang Kota', phone: '6281234567890', city: 'Malang' },
    { id: 'KD-003310', name: 'Kedai CK Pasuruan', phone: '6282233445566', city: 'Pasuruan' },
    { id: 'KD-004810', name: 'Kedai CK Batu', phone: '6285566778899', city: 'Batu' },
  ];

  useEffect(() => {
    document.title = 'Dashboard Mitra CK - Cigarskruie (CK) Indonesia';
    const savedSession = localStorage.getItem('mitraSession');
    if (!savedSession) {
      router.push('/mitra/login');
    } else {
      setTimeout(() => {
        setSession(JSON.parse(savedSession));
      }, 0);
    }
  }, [router]);

  // Formatter for Currency
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val);
  };

  const handleLogout = () => {
    localStorage.removeItem('mitraSession');
    router.push('/mitra/login');
  };

  if (!session) {
    return (
      <div className={styles.loadingScreen}>
        <span className={styles.spinner}></span>
        <p>Memuat Sesi Dashboard...</p>
      </div>
    );
  }

  // Calculate values for Order Stok
  const pricePerSlop = 180000; // Rp 180.000 / slop
  const rawTotal = (ckSoftQty + assikhaGoldQty) * pricePerSlop;
  const discountRate = session.role === 'kedai' ? 0.12 : 0; // 12% discount for stockist Kedai
  const discountVal = rawTotal * discountRate;
  const grandTotal = rawTotal - discountVal;

  const handleSendOrderWA = () => {
    const totalQty = ckSoftQty + assikhaGoldQty;
    let text = `Halo Admin CK Pusat, saya ingin melakukan pemesanan restok keanggotaan *${session.rank}*:\n\n`;
    if (session.role === 'clubber') {
      const kd = localKedaiList.find(k => k.id === selectedKedai) || localKedaiList[0];
      text = `Halo ${kd.name}, saya ingin melakukan pemesanan produk lewat koordinasi *${session.rank}*:\n\n`;
    }
    
    text += `- CK Soft: *${ckSoftQty} slop*\n`;
    text += `- Assikha Gold: *${assikhaGoldQty} slop*\n`;
    text += `\nTotal Item: *${totalQty} slop*`;
    text += `\nTotal Belanja: *${formatCurrency(rawTotal)}*`;
    
    if (discountRate > 0) {
      text += `\nPotongan Distributor (12%): *- ${formatCurrency(discountVal)}*`;
      text += `\nTotal Pembayaran: *${formatCurrency(grandTotal)}*`;
    }
    
    text += `\n\nNama Mitra: ${session.name}\nID Mitra: ${session.id}`;

    const phone = session.role === 'kedai' 
      ? '6281234567890' // CK Pusat Admin
      : localKedaiList.find(k => k.id === selectedKedai)?.phone || '6281234567890';

    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  // WA Tools Generator Link logic
  const handleGenerateLink = (e) => {
    e.preventDefault();
    if (!custPhone.trim() || !custName.trim()) return;

    let cleanPhone = custPhone.replace(/\D/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '62' + cleanPhone.substring(1);
    } else if (!cleanPhone.startsWith('62')) {
      cleanPhone = '62' + cleanPhone;
    }

    let msg = `Halo ${custName},\n\nTerima kasih telah tertarik dengan produk Cigarskruie (Rokok CK) herbal rempah pilihan asli nusantara.\n\nBerikut rekomendasi produk terbaik untuk Anda:\n`;
    if (selectedProduct === 'CK Soft') {
      msg += `\n*CK SOFT (Herbal Kretek)*\nRasa gurih, mantap, dan berkhasiat madu kapulaga dengan racikan 12 rempah.\nCocok untuk perokok kretek mantap.\n`;
    } else {
      msg += `\n*ASSIKHA GOLD (Herbal Kretek)*\nRasa lebih halus, harum rempah yang khas, dan tar rendah.\nCocok untuk yang menyukai rasa ringan/halus.\n`;
    }
    
    if (customNote.trim()) {
      msg += `\nCatatan Khusus:\n_${customNote}_\n`;
    }
    
    msg += `\nHubungi saya kembali di obrolan ini jika Anda ingin melakukan pemesanan secara langsung.\n\nSalam Hangat,\n*${session.name}* (Official Partner Cigarskruie)`;

    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    setGeneratedLink(waUrl);
    setCopied(false);
  };

  const handleCopyLink = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Filtered network list
  const activeNetworkData = session.role === 'kedai' ? downlines.kedai : downlines.clubber;
  const filteredNetwork = activeNetworkData.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        m.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter = networkFilter === 'all' || m.role === networkFilter;
    return matchSearch && matchFilter;
  });

  return (
    <div className={styles.dashboardContainer}>
      {/* Mobile Header */}
      <div className={styles.mobileHeader}>
        <div className={styles.mobileLogo}>
          <svg viewBox="0 0 100 100" width="30" height="30" className={styles.logoSvg}>
            <defs>
              <radialGradient id="dashRedGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#ff3b30" />
                <stop offset="70%" stopColor="#b30000" />
                <stop offset="100%" stopColor="#4d0000" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="48" fill="url(#dashRedGrad)" />
            <text x="50" y="52" fill="#ffffff" fontSize="44" fontWeight="800" textAnchor="middle" dominantBaseline="middle">CK</text>
          </svg>
          <span>CK Mitra</span>
        </div>
        <button 
          className={styles.menuToggle} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.bar} ${mobileMenuOpen ? styles.bar1Active : ''}`}></span>
          <span className={`${styles.bar} ${mobileMenuOpen ? styles.bar2Active : ''}`}></span>
          <span className={`${styles.bar} ${mobileMenuOpen ? styles.bar3Active : ''}`}></span>
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`${styles.sidebar} ${mobileMenuOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <svg viewBox="0 0 100 100" width="36" height="36" className={styles.logoSvg}>
              <defs>
                <radialGradient id="dashRedGradSide" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#ff3b30" />
                  <stop offset="70%" stopColor="#b30000" />
                  <stop offset="100%" stopColor="#4d0000" />
                </radialGradient>
              </defs>
              <circle cx="50" cy="50" r="48" fill="url(#dashRedGradSide)" />
              <text x="50" y="52" fill="#ffffff" fontSize="44" fontWeight="800" textAnchor="middle" dominantBaseline="middle">CK</text>
            </svg>
            <span className={styles.logoText}>Cigarskruie</span>
          </div>
          <span className={styles.portalBadge}>Portal Mitra</span>
        </div>

        <div className={styles.userProfile}>
          <div className={styles.avatar}>
            {session.name.charAt(0)}
          </div>
          <div className={styles.userInfo}>
            <h4>{session.name}</h4>
            <span className={styles.userRoleBadge}>{session.rank}</span>
            <small>{session.id}</small>
          </div>
        </div>

        <nav className={styles.navMenu}>
          <button 
            className={`${styles.navItem} ${activeTab === 'overview' ? styles.navActive : ''}`}
            onClick={() => { setActiveTab('overview'); setMobileMenuOpen(false); }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
            Ringkasan Mutasi
          </button>
          
          <button 
            className={`${styles.navItem} ${activeTab === 'network' ? styles.navActive : ''}`}
            onClick={() => { setActiveTab('network'); setMobileMenuOpen(false); }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Jaringan Lebah
          </button>

          <button 
            className={`${styles.navItem} ${activeTab === 'stock' ? styles.navActive : ''}`}
            onClick={() => { setActiveTab('stock'); setMobileMenuOpen(false); }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
              <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
              <polygon points="12 22.08 12 12 3 6.92 3 17.08 12 22.08" />
              <polygon points="12 12 21 6.92 21 17.08 12 22.08" />
              <polygon points="12 2 21 6.92 12 12 3 6.92 12 2" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
            {session.role === 'kedai' ? 'Inventori & Restok' : 'Pesan Produk'}
          </button>

          <button 
            className={`${styles.navItem} ${activeTab === 'tools' ? styles.navActive : ''}`}
            onClick={() => { setActiveTab('tools'); setMobileMenuOpen(false); }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            Alat Penjualan WA
          </button>
        </nav>

        <div className={styles.sidebarFooter}>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.logoutIcon}>
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Keluar Sesi
          </button>
        </div>
      </aside>

      {/* Main Dashboard Area */}
      <main className={styles.mainContent}>
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <h2>Halo Kembali, {session.name}!</h2>
                <p className={styles.panelDesc}>Pantau perkembangan komisi dan performa jaringan Sistem Lebah Anda.</p>
              </div>
              <div className={styles.dateTime}>
                Keanggotaan Sejak: <strong>{session.joinDate}</strong>
              </div>
            </div>

            {/* KPI Cards Grid */}
            <div className={styles.kpiGrid}>
              <div className={`${styles.kpiCard} glass-card`}>
                <div className={styles.kpiIconGroup}>
                  <span className={styles.kpiIcon} style={{ background: 'rgba(212,175,55,0.1)', color: 'var(--color-gold)' }}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
                      <path d="M4 6v12a2 2 0 0 0 2 2h14v-4" />
                      <path d="M18 12a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4v-6z" />
                    </svg>
                  </span>
                  <span className={styles.kpiTrend}>+12.4%</span>
                </div>
                <h3>Komisi Terkumpul</h3>
                <p className={styles.kpiVal}>{formatCurrency(session.commissions)}</p>
                <small className={styles.kpiDetail}>Mutasi aktif periode bulan ini</small>
              </div>

              <div className={`${styles.kpiCard} glass-card`}>
                <div className={styles.kpiIconGroup}>
                  <span className={styles.kpiIcon} style={{ background: 'rgba(18,62,30,0.15)', color: '#86efac' }}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.2a7 7 0 0 1-9 8.8zm0 0v-4" />
                    </svg>
                  </span>
                  <span className={styles.kpiTrend}>+8%</span>
                </div>
                <h3>Poin Jaringan</h3>
                <p className={styles.kpiVal}>{session.points.toLocaleString('id-ID')} Pt</p>
                <small className={styles.kpiDetail}>Total akumulasi omzet binaan</small>
              </div>

              <div className={`${styles.kpiCard} glass-card`}>
                <div className={styles.kpiIconGroup}>
                  <span className={styles.kpiIcon} style={{ background: 'rgba(59,130,246,0.1)', color: '#60a5fa' }}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </span>
                  <span className={styles.kpiTrend}>+3 baru</span>
                </div>
                <h3>Mitra Binaan</h3>
                <p className={styles.kpiVal}>{session.downlineCount} Mitra</p>
                <small className={styles.kpiDetail}>Anggota lebah terdaftar aktif</small>
              </div>
            </div>

            {/* Commission Chart Card */}
            <div className={`${styles.chartCard} glass-card`}>
              <div className={styles.chartHeader}>
                <div>
                  <h3>Pertumbuhan Komisi</h3>
                  <p>Visualisasi tren pendapatan komisi bulanan (Semester I 2026)</p>
                </div>
                <div className={styles.chartLegend}>
                  <span className={styles.legendColor}></span>
                  <span>Komisi Bulanan (Rp)</span>
                </div>
              </div>

              <div className={styles.chartContainer}>
                {/* SVG Interactive Line Chart */}
                <svg viewBox="0 0 500 200" className={styles.svgChart}>
                  {/* Grid Lines */}
                  <line x1="50" y1="150" x2="470" y2="150" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  <line x1="50" y1="100" x2="470" y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  <line x1="50" y1="50" x2="470" y2="50" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  <line x1="50" y1="15" x2="470" y2="15" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

                  {/* SVG Chart Area Fill */}
                  <path 
                    d={`M 50,150 
                        L 50,${chartData[0].coord.y} 
                        L 130,${chartData[1].coord.y} 
                        L 210,${chartData[2].coord.y} 
                        L 290,${chartData[3].coord.y} 
                        L 370,${chartData[4].coord.y} 
                        L 450,${chartData[5].coord.y} 
                        L 450,150 Z`}
                    fill="url(#chartAreaGrad)"
                  />

                  {/* SVG Chart Line */}
                  <path 
                    d={`M 50,${chartData[0].coord.y} 
                        L 130,${chartData[1].coord.y} 
                        L 210,${chartData[2].coord.y} 
                        L 290,${chartData[3].coord.y} 
                        L 370,${chartData[4].coord.y} 
                        L 450,${chartData[5].coord.y}`}
                    fill="none"
                    stroke="var(--color-gold)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Gradient Definitions */}
                  <defs>
                    <linearGradient id="chartAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Interactive Circles / Hover Points */}
                  {chartData.map((d, idx) => (
                    <g key={idx}>
                      <circle 
                        cx={d.coord.x} 
                        cy={d.coord.y} 
                        r="6" 
                        fill="#070b08" 
                        stroke="var(--color-gold)" 
                        strokeWidth="2.5" 
                        className={styles.chartDot}
                        onMouseEnter={() => setHoveredPoint(idx)}
                        onMouseLeave={() => setHoveredPoint(null)}
                      />
                      
                      {/* X Axis Labels */}
                      <text 
                        x={d.coord.x} 
                        y="170" 
                        fill="var(--color-text-muted)" 
                        fontSize="10" 
                        textAnchor="middle"
                      >
                        {d.label}
                      </text>
                    </g>
                  ))}

                  {/* Hover Tooltip inside SVG */}
                  {hoveredPoint !== null && (
                    <g transform={`translate(${chartData[hoveredPoint].coord.x - 60}, ${chartData[hoveredPoint].coord.y - 45})`}>
                      <rect 
                        width="120" 
                        height="32" 
                        rx="6" 
                        fill="rgba(15, 22, 16, 0.95)" 
                        stroke="var(--color-gold)" 
                        strokeWidth="1" 
                      />
                      <text x="60" y="14" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                        Komisi: {formatCurrency(chartData[hoveredPoint].value)}
                      </text>
                      <text x="60" y="24" fill="var(--color-text-muted)" fontSize="8" textAnchor="middle">
                        Poin Jaringan: {chartData[hoveredPoint].points} Pt
                      </text>
                    </g>
                  )}
                </svg>
              </div>
              <p className={styles.chartTip}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.4rem', marginTop: '-2px' }}>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <em>Arahkan kursor Anda ke titik grafik untuk melihat rincian mutasi komisi bulanan secara mendetail.</em>
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: NETWORK */}
        {activeTab === 'network' && (
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <h2>Jaringan Sistem Lebah</h2>
                <p className={styles.panelDesc}>Kelola downline/mitra yang terdaftar di bawah struktur keanggotaan Anda.</p>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className={styles.filterBar}>
              <input 
                type="text" 
                placeholder="Cari ID Mitra atau Nama..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchBox}
              />
              <div className={styles.filterBtns}>
                <button 
                  className={networkFilter === 'all' ? styles.filterActive : ''}
                  onClick={() => setNetworkFilter('all')}
                >
                  Semua
                </button>
                <button 
                  className={networkFilter === 'clubber' ? styles.filterActive : ''}
                  onClick={() => setNetworkFilter('clubber')}
                >
                  Clubber CK
                </button>
                {session.role === 'kedai' && (
                  <button 
                    className={networkFilter === 'kedai' ? styles.filterActive : ''}
                    onClick={() => setNetworkFilter('kedai')}
                  >
                    Kedai CK
                  </button>
                )}
              </div>
            </div>

            {/* Downline Table / Cards */}
            <div className={`${styles.tableCard} glass-card`}>
              {filteredNetwork.length > 0 ? (
                <div className={styles.tableResponsive}>
                  <table className={styles.networkTable}>
                    <thead>
                      <tr>
                        <th>ID Mitra</th>
                        <th>Nama Lengkap</th>
                        <th>Tipe Mitra</th>
                        <th>Tanggal Bergabung</th>
                        <th>Poin Akumulasi</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredNetwork.map((m, idx) => (
                        <tr key={idx}>
                          <td className={styles.tdId}><code>{m.id}</code></td>
                          <td className={styles.tdName}>{m.name}</td>
                          <td>
                            <span className={`${styles.roleBadge} ${m.role === 'kedai' ? styles.roleKedai : styles.roleClubber}`}>
                              {m.rank}
                            </span>
                          </td>
                          <td>{m.joinDate}</td>
                          <td className={styles.tdPoints}><strong>{m.points.toLocaleString('id-ID')} Pt</strong></td>
                          <td>
                            <span className={`${styles.statusLabel} ${m.status === 'Aktif' ? styles.statusActive : styles.statusInactive}`}>
                              {m.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <p>Tidak ada data mitra ditemukan untuk pencarian &quot;{searchQuery}&quot;</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: STOCK & ORDER */}
        {activeTab === 'stock' && (
          <div className={styles.panel}>
            {session.role === 'kedai' ? (
              // KEDAI CK VIEW (STOCKIST)
              <>
                <div className={styles.panelHeader}>
                  <div>
                    <h2>Inventori & Restok Kedai</h2>
                    <p className={styles.panelDesc}>Kelola ketersediaan stok Kedai CK Anda dan lakukan pengajuan restok ke pusat.</p>
                  </div>
                </div>

                <div className={styles.gridTwoCol}>
                  {/* Stock Levels Card */}
                  <div className={`${styles.stockCard} glass-card`}>
                    <h3>Ketersediaan Produk Kedai</h3>
                    <div className={styles.stockItemGrid}>
                      <div className={styles.stockItem}>
                        <div className={styles.stockItemInfo}>
                          <h4>CK Soft</h4>
                          <span className={styles.stockBadgeGreen}>Aman</span>
                        </div>
                        <div className={styles.stockVolume}>
                          <strong>{session.stocks.ckSoft}</strong> <small>slop</small>
                        </div>
                        <div className={styles.stockBarContainer}>
                          <div className={styles.stockBar} style={{ width: '80%', background: '#86efac' }}></div>
                        </div>
                        <p className={styles.stockRecom}>Stok cukup untuk 14 hari penjualan.</p>
                      </div>

                      <div className={styles.stockItem}>
                        <div className={styles.stockItemInfo}>
                          <h4>Assikha Gold</h4>
                          <span className={styles.stockBadgeAmber}>Perlu Restok</span>
                        </div>
                        <div className={styles.stockVolume}>
                          <strong>{session.stocks.assikhaGold}</strong> <small>slop</small>
                        </div>
                        <div className={styles.stockBarContainer}>
                          <div className={styles.stockBar} style={{ width: '45%', background: 'var(--color-gold)' }}></div>
                        </div>
                        <p className={styles.stockRecom}>Stok menipis, disarankan melakukan restok segera.</p>
                      </div>
                    </div>
                  </div>

                  {/* Restock Order Calculator */}
                  <div className={`${styles.calculatorCard} glass-card`}>
                    <h3>Form Restok Pusat (Kalkulator)</h3>
                    <p>Formulir simulasi belanja grosir ke agen pusat manajemen CK.</p>

                    <div className={styles.calcForm}>
                      <div className={styles.formGroup}>
                        <label>Jumlah CK Soft (slop)</label>
                        <input 
                          type="number" 
                          min="0" 
                          value={ckSoftQty} 
                          onChange={(e) => setCkSoftQty(Math.max(0, parseInt(e.target.value) || 0))}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label>Jumlah Assikha Gold (slop)</label>
                        <input 
                          type="number" 
                          min="0" 
                          value={assikhaGoldQty} 
                          onChange={(e) => setAssikhaGoldQty(Math.max(0, parseInt(e.target.value) || 0))}
                        />
                      </div>

                      <div className={styles.calcSummary}>
                        <div className={styles.summaryRow}>
                          <span>Subtotal Belanja:</span>
                          <span>{formatCurrency(rawTotal)}</span>
                        </div>
                        <div className={styles.summaryRow}>
                          <span className={styles.discountLabel}>Potongan Distributor (12%):</span>
                          <span className={styles.discountVal}>- {formatCurrency(discountVal)}</span>
                        </div>
                        <div className={`${styles.summaryRow} ${styles.rowTotal}`}>
                          <span>Total Pembayaran:</span>
                          <span>{formatCurrency(grandTotal)}</span>
                        </div>
                      </div>

                      <button 
                        onClick={handleSendOrderWA} 
                        className="btn btn-primary"
                        style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', minHeight: '44px' }}
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                        </svg>
                        Kirim Form Pesanan via WA
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // CLUBBER CK VIEW (MARKETING PARTNER)
              <>
                <div className={styles.panelHeader}>
                  <div>
                    <h2>Pesan Produk ke Kedai Terdekat</h2>
                    <p className={styles.panelDesc}>Pesan pasokan rokok herbal CK langsung dari Kedai CK resmi regional Anda.</p>
                  </div>
                </div>

                <div className={styles.gridTwoCol}>
                  {/* Order History */}
                  <div className={`${styles.historyCard} glass-card`}>
                    <h3>Riwayat Point Belanja</h3>
                    <div className={styles.historyList}>
                      <div className={styles.historyItem}>
                        <div className={styles.historyHeader}>
                          <span><strong>Poin Saat Ini:</strong></span>
                          <span className={styles.pointsHighlight}>{session.points} Pt</span>
                        </div>
                        <p>Poin dikumpulkan dari setiap pembelanjaan grosir resmi lewat Kedai CK.</p>
                      </div>
                      
                      <div className={styles.historyRecord}>
                        <div className={styles.recordLeft}>
                          <strong>+150 Pt</strong>
                          <small>12 Juni 2025</small>
                        </div>
                        <div className={styles.recordRight}>
                          <span>Restok 15 slop CK Soft</span>
                          <small>Selesai via Kedai Malang</small>
                        </div>
                      </div>

                      <div className={styles.historyRecord}>
                        <div className={styles.recordLeft}>
                          <strong>+200 Pt</strong>
                          <small>28 Mei 2025</small>
                        </div>
                        <div className={styles.recordRight}>
                          <span>Restok 20 slop Assikha Gold</span>
                          <small>Selesai via Kedai Malang</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Form */}
                  <div className={`${styles.calculatorCard} glass-card`}>
                    <h3>Form Pemesanan Kedai</h3>
                    <p>Formulir hitung dan kirim orderan produk langsung ke Kedai CK wilayah Anda.</p>

                    <div className={styles.calcForm}>
                      <div className={styles.formGroup}>
                        <label>Pilih Kedai Tujuan</label>
                        <select 
                          value={selectedKedai} 
                          onChange={(e) => setSelectedKedai(e.target.value)}
                        >
                          {localKedaiList.map(k => (
                            <option key={k.id} value={k.id}>{k.name} ({k.city})</option>
                          ))}
                        </select>
                      </div>

                      <div className={styles.formGroup}>
                        <label>Jumlah CK Soft (slop)</label>
                        <input 
                          type="number" 
                          min="0" 
                          value={ckSoftQty} 
                          onChange={(e) => setCkSoftQty(Math.max(0, parseInt(e.target.value) || 0))}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label>Jumlah Assikha Gold (slop)</label>
                        <input 
                          type="number" 
                          min="0" 
                          value={assikhaGoldQty} 
                          onChange={(e) => setAssikhaGoldQty(Math.max(0, parseInt(e.target.value) || 0))}
                        />
                      </div>

                      <div className={styles.calcSummary}>
                        <div className={`${styles.summaryRow} ${styles.rowTotal}`}>
                          <span>Estimasi Total:</span>
                          <span>{formatCurrency(rawTotal)}</span>
                        </div>
                      </div>

                      <button 
                        onClick={handleSendOrderWA} 
                        className="btn btn-primary"
                        style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', minHeight: '44px' }}
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                        </svg>
                        Hubungi Kedai & Kirim Order
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* TAB 4: WA TOOLS */}
        {activeTab === 'tools' && (
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <h2>Alat Penjualan WhatsApp</h2>
                <p className={styles.panelDesc}>Buat tautan promosi instan untuk calon pelanggan lengkap dengan deskripsi manfaat produk CK.</p>
              </div>
            </div>

            <div className={styles.gridTwoCol}>
              {/* Form Generator */}
              <div className={`${styles.calculatorCard} glass-card`}>
                <h3>Generator Tautan Penjualan</h3>
                <form onSubmit={handleGenerateLink} className={styles.calcForm}>
                  <div className={styles.formGroup}>
                    <label htmlFor="custName">Nama Calon Pelanggan</label>
                    <input 
                      type="text" 
                      id="custName" 
                      placeholder="Contoh: Pak Joko"
                      value={custName}
                      onChange={(e) => setCustName(e.target.value)}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="custPhone">Nomor WhatsApp Pelanggan</label>
                    <input 
                      type="tel" 
                      id="custPhone" 
                      placeholder="Contoh: 081234567890"
                      value={custPhone}
                      onChange={(e) => setCustPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Rekomendasi Paket Produk</label>
                    <select 
                      value={selectedProduct} 
                      onChange={(e) => setSelectedProduct(e.target.value)}
                    >
                      <option value="CK Soft">CK Soft (Madu, Jinten Hitam, Kapulaga)</option>
                      <option value="Assikha Gold">Assikha Gold (Cita Rasa Halus, Tar Rendah)</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="customNote">Catatan / Sapaan Khusus (Opsional)</label>
                    <textarea 
                      id="customNote" 
                      placeholder="Contoh: Promo free ongkir untuk pembelian minggu ini."
                      value={customNote}
                      onChange={(e) => setCustomNote(e.target.value)}
                      rows="3"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    style={{ width: '100%', minHeight: '44px' }}
                  >
                    Generate Tautan Pesan
                  </button>
                </form>
              </div>

              {/* Output Result */}
              <div className={`${styles.historyCard} glass-card`}>
                <h3>Tautan WhatsApp Dihasilkan</h3>
                {generatedLink ? (
                  <div className={styles.outputBox}>
                    <p className={styles.outputDesc}>Tautan URL berikut siap dibagikan ke calon pelanggan Anda:</p>
                    
                    <div className={styles.urlDisplay}>
                      <code>{generatedLink}</code>
                    </div>

                    <div className={styles.outputActions}>
                      <button 
                        onClick={handleCopyLink} 
                        className={`btn ${copied ? 'btn-secondary' : 'btn-primary'}`}
                        style={{ flex: 1, minHeight: '42px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                      >
                        {copied ? (
                          <>
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Berhasil Disalin
                          </>
                        ) : (
                          <>
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                            Salin Tautan
                          </>
                        )}
                      </button>

                      <a 
                        href={generatedLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-secondary"
                        style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', minHeight: '42px', textDecoration: 'none' }}
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                        </svg>
                        Uji Kirim Chat
                      </a>
                    </div>

                    <div className={styles.previewBox}>
                      <h5>Pratinjau Pesan yang Dikirim:</h5>
                      <div className={styles.previewContent}>
                        <p><strong>Penerima WA:</strong> {custPhone}</p>
                        <hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '0.5rem 0' }} />
                        <p style={{ whiteSpace: 'pre-wrap', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                          {decodeURIComponent(generatedLink.split('text=')[1] || '')}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.emptyState}>
                    <p>Isi formulir di sebelah kiri dan klik &quot;Generate Tautan Pesan&quot; untuk membuat URL WhatsApp promosi otomatis.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
