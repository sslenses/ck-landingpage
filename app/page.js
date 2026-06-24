import Link from 'next/link';
import Image from 'next/image';
import SpiceGrid from '@/components/SpiceGrid';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className={styles.hero} id="home">
        <div className={styles.heroGlow}></div>
        <div className={styles.heroGlowLeft}></div>
        
        <div className={styles.heroContent}>
          <div className={`${styles.heroTexts} scroll-reveal`}>
            <span className={styles.badge}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.2a7 7 0 0 1-9 8.8zm0 0v-4" />
              </svg>
              100% Rempah Alami
            </span>
            <h1 className={styles.title}>
              Sensasi Kretek Rempah <br />
              <span className={styles.titleHighlight}>Alami Nusantara</span>
            </h1>
            <p className={styles.subtitle}>
              Cigarskruie (Rokok CK) menghadirkan harmoni cita rasa tembakau pilihan dan khasiat 12 rempah nusantara. Diracik tanpa bahan kimia tambahan untuk kepuasan rokok herbal yang mantap, hangat, dan lebih ramah bagi tubuh.
            </p>
            <div className={styles.ctas}>
              <Link href="/produk" className="btn btn-primary">
                Cari Tahu Produk Kami
              </Link>
              <Link href="/kemitraan" className="btn btn-secondary">
                Peluang Kemitraan
              </Link>
            </div>
          </div>

          <div className={`${styles.heroVisual} scroll-reveal-scale`}>
            <div className={styles.imageFrame}>
              <Image 
                src="/cigarskruie_hero.jpg" 
                alt="Cigarskruie Edisi Semarang Raya" 
                width={520}
                height={520}
                className={styles.heroImage}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION SECTION */}
      <section className="section-container" id="philosophy">
        <div className={`${styles.sectionHeader} scroll-reveal`}>
          <h2>Kenapa Memilih Cigarskruie?</h2>
          <p className={styles.sectionSubtitle}>Alternatif rokok herbal berkualitas tinggi yang menghargai kesehatan dan ekonomi lokal.</p>
        </div>

        <div className={styles.featureGrid}>
          <div className={`${styles.featureCard} glass-card scroll-reveal`}>
            <div className={styles.featureIcon}>
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.2a7 7 0 0 1-9 8.8zm0 0v-4" />
              </svg>
            </div>
            <h3>100% Rempah Asli</h3>
            <p>
              Diracik dari cengkeh pilihan, kayu manis, kapulaga, jinten hitam, madu klanceng, dan rempah berkhasiat lainnya tanpa saus kimia sintetis.
            </p>
          </div>

          <div className={`${styles.featureCard} glass-card scroll-reveal`}>
            <div className={styles.featureIcon}>
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3>Khasiat Alami</h3>
            <p>
              Perpaduan rempah alami memberikan efek hangat yang melegakan dada, menjaga tenggorokan tetap plong, dan memiliki kadar nikotin yang lebih rendah.
            </p>
          </div>

          <div className={`${styles.featureCard} glass-card scroll-reveal`}>
            <div className={styles.featureIcon}>
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3>Ekonomi Berbagi</h3>
            <p>
              Didistribusikan melalui Sistem Lebah PT Catur Kencana Manajemen. Memberikan kemakmuran bersama bagi para anggota (Clubber CK) dan Kedai CK.
            </p>
          </div>
        </div>
      </section>

      {/* INTERACTIVE SPICES SECTION */}
      <section className="section-container" style={{ backgroundColor: 'rgba(15, 22, 16, 0.2)' }} id="spices">
        <div className={`${styles.sectionHeader} scroll-reveal`}>
          <h2>Kekayaan 12 Rempah Nusantara</h2>
          <p className={styles.sectionSubtitle}>Mengenal komposisi legendaris rahasia di balik kelezatan dan kehangatan kretek Cigarskruie.</p>
        </div>

        <div className="scroll-reveal-scale">
          <SpiceGrid />
        </div>
      </section>

      {/* TEASER HERITAGE SECTION */}
      <section className="section-container">
        <div className={styles.teaserLayout}>
          <div className={`${styles.teaserVisual} scroll-reveal-scale`}>
            <div className={styles.teaserCard}>
              <div className={styles.teaserNum}>2012</div>
              <div className={styles.teaserLabel}>Tahun Berdiri</div>
              <div className={styles.teaserDesc}>Memulai perjalanan inovasi kretek herbal dari kota Malang.</div>
            </div>
            <div className={styles.teaserCard}>
              <div className={styles.teaserNum}>12+</div>
              <div className={styles.teaserLabel}>Rempah Pilihan</div>
              <div className={styles.teaserDesc}>Komposisi herbal alami berkualitas tinggi bebas saus kimia.</div>
            </div>
            <div className={styles.teaserCard}>
              <div className={styles.teaserNum}>100%</div>
              <div className={styles.teaserLabel}>Ekonomi Lokal</div>
              <div className={styles.teaserDesc}>Mendukung petani tembakau dan jaringan kemitraan rakyat.</div>
            </div>
            <div className={styles.teaserCard}>
              <div className={styles.teaserNum}>0%</div>
              <div className={styles.teaserLabel}>Saus Kimia</div>
              <div className={styles.teaserDesc}>Menjamin kemurnian hisapan tanpa perisa buatan pabrikan.</div>
            </div>
          </div>

          <div className={`${styles.teaserTexts} scroll-reveal`}>
            <span className={styles.badge}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5v-15z" />
              </svg>
              Sejarah & Filosofi
            </span>
            <h2>Merawat Tradisi Kretek, Menghargai Kesehatan</h2>
            <p>
              Diproduksi oleh **PR Indokretek** di Malang, Jawa Timur, Cigarskruie lahir dari keprihatinan atas maraknya rokok kimia modern. Kami kembali ke akar sejarah kretek nusantara di mana rokok awalnya digunakan sebagai sarana penyembuhan tradisional (*kruie* atau rempah).
            </p>
            <p>
              Dengan memadukan tembakau lokal berkualitas tinggi dengan racikan rempah pilihan seperti Habbatussauda dan madu klanceng, kami menyajikan produk tembakau yang tidak hanya nikmat, tetapi juga menghangatkan tubuh secara alami.
            </p>
            <div>
              <Link href="/tentang" className="btn btn-secondary">
                Baca Selengkapnya
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="section-container" style={{ paddingTop: '2rem' }}>
        <div className={`${styles.banner} scroll-reveal`}>
          <h2>Siap Menikmati Sensasi Kretek Rempah Alami?</h2>
          <p>
            Dapatkan produk Cigarskruie asli melalui jaringan mitra resmi kami di seluruh Indonesia, atau bergabunglah menjadi bagian dari Clubber CK untuk memulai kemakmuran mandiri.
          </p>
          <div className={styles.bannerCtas}>
            <a 
              href="https://wa.me/6281234567890?text=Halo%20Admin%20Cigarskruie,%20saya%20tertarik%20untuk%20membeli%20produk%20rokok%20CK."
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary"
            >
              Hubungi Admin via WhatsApp
            </a>
            <Link href="/kemitraan" className="btn btn-secondary">
              Temukan Kedai CK Terdekat
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
