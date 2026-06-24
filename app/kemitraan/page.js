import RegisterForm from '@/components/RegisterForm';
import KedaiFinder from '@/components/KedaiFinder';
import styles from './page.module.css';

export default function KemitraanPage() {
  return (
    <>
      {/* HEADER SECTION */}
      <section className={styles.headerSection}>
        <div className={styles.glow}></div>
        <div className="scroll-reveal">
          <h1 style={{ marginBottom: '1rem' }}>Peluang Kemitraan Cigarskruie</h1>
          <p className={styles.introText}>
            Membangun ekonomi kerakyatan yang mandiri dan berkeadilan melalui ekosistem &ldquo;Sistem Lebah&rdquo;.
          </p>
        </div>
      </section>

      {/* SISTEM LEBAH PHILOSOPHY */}
      <section className={styles.modelSection}>
        <div className={`${styles.sectionHeader} scroll-reveal`}>
          <h2>Filosofi Sistem Lebah</h2>
          <p className={styles.sectionSubtitle}>
            Terinspirasi dari koloni lebah: bekerja keras bersama, saling melindungi, dan membagi manisnya madu kemakmuran secara adil.
          </p>
        </div>

        <div className={styles.modelGrid}>
          <div className={`${styles.modelCard} scroll-reveal`}>
            <div className={styles.cardIcon}>
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3>Jaringan Terproteksi</h3>
            <p>
              Kami melindungi usaha Kedai CK dan Clubber CK dengan melarang keras penjualan produk di marketplace bebas. Pembeli diarahkan langsung ke mitra lokal terdekat untuk menjaga stabilitas omzet dan harga.
            </p>
          </div>

          <div className={`${styles.modelCard} scroll-reveal`}>
            <div className={styles.cardIcon}>
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </div>
            <h3>Sistem Bagi Hasil Adil</h3>
            <p>
              Sistem pemasaran berjenjang kami dirancang secara transparan sesuai kaidah AP2LI. Poin penjualan, komisi rujukan, dan bonus dibagikan secara adil berdasarkan kontribusi nyata anggota tanpa skema ponzi.
            </p>
          </div>

          <div className={`${styles.modelCard} scroll-reveal`}>
            <div className={styles.cardIcon}>
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3>Kerja Sama Komunitas</h3>
            <p>
              Setiap Kedai CK bertindak sebagai sarana edukasi dan koordinasi bagi para Clubber CK di sekitarnya. Kami memberikan pembinaan rutin tentang cara pengembangan jaringan bisnis dan edukasi khasiat rempah.
            </p>
          </div>
        </div>
      </section>

      {/* JOIN ADVANTAGES & FORM */}
      <section className={styles.interactiveSection}>
        <div className={styles.interactiveGrid}>
          <div className={`${styles.sectionTexts} scroll-reveal`}>
            <h2>Gabung Bersama Kami</h2>
            <p>
              Pilih peran Anda dalam membangun kemandirian ekonomi bersama Cigarskruie. Terdapat dua pilihan kemitraan yang dapat Anda pilih sesuai kapasitas modal dan tujuan bisnis Anda:
            </p>

            <div className={styles.benefitList}>
              <div className={styles.benefitItem}>
                <span className={styles.benefitCheck}>✓</span>
                <div className={styles.benefitContent}>
                  <h4>Clubber CK (Mitra Penjualan)</h4>
                  <p>Cocok untuk individu yang ingin memulai bisnis sampingan dengan modal ringan. Sebagai Clubber, Anda berhak membeli produk dengan harga khusus member dan mendapatkan komisi poin dari setiap penjualan.</p>
                </div>
              </div>

              <div className={styles.benefitItem}>
                <span className={styles.benefitCheck}>✓</span>
                <div className={styles.benefitContent}>
                  <h4>Kedai CK (Distributor / Agen Resmi)</h4>
                  <p>Cocok untuk Anda yang memiliki lokasi strategis/warung dan ingin menjadi pusat stok produk di wilayah Anda. Kedai CK bertindak sebagai penyuplai utama bagi para Clubber CK lokal dan memperoleh margin keuntungan grosir.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="scroll-reveal-scale">
            <RegisterForm />
          </div>
        </div>
      </section>

      {/* KEDAI FINDER SECTION */}
      <section className="section-container" style={{ borderTop: '1px solid rgba(212, 175, 55, 0.1)', paddingBottom: '6rem' }}>
        <div className={`${styles.sectionHeader} scroll-reveal`} id="cari-kedai">
          <h2>Cari Kedai CK Terdekat</h2>
          <p className={styles.sectionSubtitle}>
            Temukan lokasi distributor Kedai CK resmi untuk membeli produk Cigarskruie asli langsung di kota Anda.
          </p>
        </div>

        <div className="scroll-reveal-scale">
          <KedaiFinder />
        </div>
      </section>
    </>
  );
}
