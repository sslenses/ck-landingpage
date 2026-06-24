import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Compliance Warning Box */}
        <div className={styles.warningBox}>
          <div className={styles.warningBadge}>21+</div>
          <p className={styles.warningText}>
            <strong>PERINGATAN:</strong> KHUSUS DEWASA (USIA 21 TAHUN KE ATAS). MEROKOK DAPAT MENGGANGGU KESEHATAN. JAUHKAN DARI JANGKAUAN ANAK-ANAK DAN WANITA HAMIL. BIJAK DALAM MEMILIH PRODUK HERBAL.
          </p>
        </div>

        {/* Footer Top Links */}
        <div className={styles.topRow}>
          <div className={styles.brandCol}>
            <div className={styles.logo}>
              <svg viewBox="0 0 100 100" width="36" height="36" className={styles.logoSvg}>
                <defs>
                  <radialGradient id="footerLogoRedGrad" cx="35%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#ff3b30" />
                    <stop offset="70%" stopColor="#b30000" />
                    <stop offset="100%" stopColor="#4d0000" />
                  </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="url(#footerLogoRedGrad)" />
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
            </div>
            <p className={styles.brandDesc}>
              Kretek rempah herbal alami racikan nusantara yang diproduksi oleh PR Indokretek di Malang sejak tahun 2012. Alternatif natural yang ramah lingkungan dan bebas dari saus kimia.
            </p>
          </div>

          <div>
            <h4 className={styles.colTitle}>Navigasi</h4>
            <ul className={styles.linksList}>
              <li><Link href="/" className={styles.link}>Home</Link></li>
              <li><Link href="/tentang" className={styles.link}>Tentang Kami</Link></li>
              <li><Link href="/produk" className={styles.link}>Produk</Link></li>
              <li><Link href="/kemitraan" className={styles.link}>Kemitraan</Link></li>
            </ul>
          </div>

          <div>
            <h4 className={styles.colTitle}>Bahan Utama</h4>
            <ul className={styles.linksList}>
              <li className={styles.link}>Jinten Hitam</li>
              <li className={styles.link}>Kayu Manis</li>
              <li className={styles.link}>Kapulaga</li>
              <li className={styles.link}>Madu Klanceng</li>
            </ul>
          </div>

          <div>
            <h4 className={styles.colTitle}>Hubungi Kami</h4>
            <p className={styles.contactText}>
              <strong>PR Indokretek</strong><br />
              Malang, Jawa Timur, Indonesia<br /><br />
              <strong>CK Manajemen</strong><br />
              PT Catur Kencana Manajemen<br />
              Email: info@cigarskruie.com
            </p>
          </div>
        </div>

        <div className={styles.divider}></div>

        {/* Footer Bottom Row */}
        <div className={styles.bottomRow}>
          <div className={styles.copyright}>
            &copy; {currentYear} Cigarskruie (CK) Indonesia. All Rights Reserved.
          </div>
          <div className={styles.legalText}>
            Anggota Resmi AP2LI (Asosiasi Perusahaan Penjualan Langsung Indonesia).
          </div>
        </div>
      </div>
    </footer>
  );
}
