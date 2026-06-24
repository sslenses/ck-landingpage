import styles from './page.module.css';

export default function TentangPage() {
  return (
    <>
      {/* HEADER SECTION */}
      <section className={styles.headerSection}>
        <div className={styles.glow}></div>
        <div className="scroll-reveal">
          <h1 style={{ marginBottom: '1rem' }}>Tentang Cigarskruie</h1>
          <p className={styles.introText}>
            Kembali ke fitrah kretek nusantara sebagai perpaduan tembakau berkualitas tinggi dan rempah-rempah herbal berkhasiat.
          </p>
        </div>
      </section>

      {/* CORE HISTORY SECTION */}
      <section className="section-container" style={{ paddingTop: '2rem' }}>
        <div className={styles.historyLayout}>
          <div className={`${styles.historyTexts} scroll-reveal`}>
            <h2>Sejarah PR Indokretek</h2>
            <p>
              Cigarskruie diproduksi secara resmi oleh **PR Indokretek** yang berbasis di Malang, Jawa Timur. Didirikan pada tahun 2012, PR Indokretek lahir dari visi para pendiri untuk melestarikan tradisi kretek nusantara dengan menghapus ketergantungan pada saus kimia pabrikan.
            </p>
            <p>
              Dalam budaya nusantara, kretek awalnya ditemukan sebagai obat asma oleh Haji Djamhari pada abad ke-19 melalui perpaduan tembakau dan cengkeh. Namun, industri rokok modern bergeser menggunakan saus perisa kimia buatan yang berdampak kurang baik bagi tubuh.
            </p>
            <p>
              PR Indokretek hadir untuk membalikkan tren ini. Melalui riset bertahun-tahun, kami memadukan tembakau lokal Jawa Timur berkualitas tinggi dengan racikan 12 bahan rempah alami. Hasilnya adalah **Cigarskruie**—kretek yang menghidupkan kembali konsep *kruie* (rempah-rempah) sebagai warisan kesehatan alami.
            </p>
          </div>

          <div className={`${styles.historyVisual} scroll-reveal-scale`}>
            <div className={styles.visualQuote}>
              <p className={styles.quoteText}>
                &ldquo;Cigars berarti gulungan tembakau, dan Kruie berasal dari bahasa Afrika kuno yang berarti rempah-rempah. Cigarskruie adalah penyatuan citarasa tembakau dan kebaikan rempah nusantara.&rdquo;
              </p>
              <div className={styles.quoteAuthor}>— CK Manajemen</div>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY SUMMARY */}
      <section className="section-container" style={{ paddingTop: '0', paddingBottom: '4rem' }}>
        <div className="glass-card scroll-reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
          <div>
            <h3 style={{ color: 'var(--color-gold)', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>Visi Kami</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
              Menjadi pelopor rokok herbal premium di Indonesia yang dipercaya karena kemurnian racikan rempah alaminya, serta memberikan kontribusi ekonomi nyata bagi masyarakat melalui sistem penjualan langsung yang adil.
            </p>
          </div>
          <div>
            <h3 style={{ color: 'var(--color-gold)', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>Misi Utama</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
              Menyediakan produk tembakau herbal alternatif yang ramah bagi tenggorokan dan sistem pernapasan, serta melestarikan budaya agraris tembakau dan cengkeh lokal tanpa intervensi zat kimia buatan.
            </p>
          </div>
          <div>
            <h3 style={{ color: 'var(--color-gold)', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>Ekonomi Berbagi</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
              Melalui konsep &ldquo;Sistem Lebah&rdquo;, kami percaya bahwa kesuksesan bisnis harus dinikmati bersama. Distribusi produk difokuskan untuk memajukan Kedai CK lokal dan melarang persaingan bebas di pasar umum (marketplace).
            </p>
          </div>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className={styles.timelineSection}>
        <div className={`${styles.sectionHeader} scroll-reveal`}>
          <h2>Milestones Perjalanan Kami</h2>
          <p className={styles.sectionSubtitle}>Bagaimana kami tumbuh bersama komunitas kretek rempah herbal di Indonesia.</p>
        </div>

        <div className={styles.timeline}>
          <div className={`${styles.timelineItem} scroll-reveal`}>
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineYear}>2012</div>
            <h3 className={styles.timelineTitle}>Pendirian PR Indokretek Malang</h3>
            <p className={styles.timelineDesc}>
              Memulai penelitian formulasi rempah-rempah yang dapat dipadukan secara harmonis dengan tembakau tanpa mengurangi cita rasanya. Batch pertama Cigarskruie resmi dirilis secara terbatas.
            </p>
          </div>

          <div className={`${styles.timelineItem} scroll-reveal`}>
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineYear}>2014</div>
            <h3 className={styles.timelineTitle}>Pembentukan CK Manajemen</h3>
            <p className={styles.timelineDesc}>
              PT Catur Kencana Manajemen resmi didirikan untuk mengelola sistem distribusi eksklusif. Konsep &ldquo;Clubber CK&rdquo; dan &ldquo;Kedai CK&rdquo; diperkenalkan sebagai pilar ekonomi kerakyatan.
            </p>
          </div>

          <div className={`${styles.timelineItem} scroll-reveal`}>
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineYear}>2018</div>
            <h3 className={styles.timelineTitle}>Keanggotaan Resmi AP2LI</h3>
            <p className={styles.timelineDesc}>
              CK Manajemen resmi terdaftar di Asosiasi Perusahaan Penjualan Langsung Indonesia (AP2LI), menegaskan legitimasi bisnis penjualan langsung Cigarskruie yang patuh hukum dan transparan.
            </p>
          </div>

          <div className={`${styles.timelineItem} scroll-reveal`}>
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineYear}>2021</div>
            <h3 className={styles.timelineTitle}>Peluncuran Aplikasi CKMobile</h3>
            <p className={styles.timelineDesc}>
              Memodernisasi ekosistem dengan merilis aplikasi seluler khusus untuk membantu anggota melakukan pencatatan transaksi, pendaftaran mitra baru, dan manajemen stok di Kedai CK.
            </p>
          </div>

          <div className={`${styles.timelineItem} scroll-reveal`}>
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineYear}>Saat Ini</div>
            <h3 className={styles.timelineTitle}>Jaringan 1000+ Kedai CK Nusantara</h3>
            <p className={styles.timelineDesc}>
              Kini memiliki ribuan mitra kedai resmi yang tersebar dari Sumatera hingga Papua, melayani ribuan Clubber CK aktif dengan mempertahankan integritas larangan penjualan di marketplace.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
