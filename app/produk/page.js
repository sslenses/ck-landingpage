import Image from 'next/image';
import styles from './page.module.css';

export default function ProdukPage() {
  const products = [
    {
      id: 'ck-soft',
      name: 'CK Soft',
      image: '/ck_soft.png',
      badge: 'Best Seller',
      tagline: 'Sensasi Ringan, Aroma Lembut Madu Hutan',
      desc: 'Diformulasikan khusus bagi Anda yang menyukai karakter hisapan yang cenderung ringan (soft) namun tetap berkarakter hangat. Memiliki perpaduan rempah yang seimbang dengan aroma manis alami madu klanceng yang memanjakan tenggorokan.',
      specs: {
        'Isi per Bungkus': '12 Batang',
        'Tipe Rokok': 'SKT (Sigaret Kretek Tangan)',
        'Kadar Nikotin': '0.92 mg',
        'Kadar Tar': '31.25 mg',
        'Kemasan': 'Soft Pack Eksklusif',
        'Karakter Hisapan': 'Lembut, hangat, manis madu klanceng',
      },
      herbs: ['Madu Klanceng', 'Cengkeh', 'Kulit Pisang Raja', 'Kapulaga', 'Kayu Manis', 'Ketumbar'],
      waMessage: 'Halo Admin Cigarskruie, saya tertarik untuk memesan produk CK Soft. Mohon informasi harga dan cara pembeliannya.',
    },
    {
      id: 'assikha-gold',
      name: 'Assikha Gold',
      image: '/assikha_gold.png',
      badge: 'Premium Spice',
      tagline: 'Karakter Rempah Kuat, Nikotin Rendah',
      desc: 'Dirancang bagi penikmat kretek rempah sejati yang mendambakan sensasi herbal yang pekat dan mantap. Dengan konsentrasi rempah yang lebih tinggi, varian ini menghasilkan efek hangat yang kuat namun memiliki kadar nikotin yang sangat rendah.',
      specs: {
        'Isi per Bungkus': '12 Batang',
        'Tipe Rokok': 'SKT (Sigaret Kretek Tangan)',
        'Kadar Nikotin': '0.1 mg',
        'Kadar Tar': '12.45 mg',
        'Kemasan': 'Soft Pack Emas Mewah',
        'Karakter Hisapan': 'Pekat, mantap, rasa rempah jahe-kencur dominan',
      },
      herbs: ['Jinten Hitam', 'Jahe', 'Kencur', 'Siwak', 'Sirih', 'Lada Hitam'],
      waMessage: 'Halo Admin Cigarskruie, saya tertarik untuk memesan produk Assikha Gold. Mohon informasi harga dan cara pembeliannya.',
    },
  ];

  return (
    <>
      {/* HEADER SECTION */}
      <section className={styles.headerSection}>
        <div className={styles.glow}></div>
        <div className="scroll-reveal">
          <h1 style={{ marginBottom: '1rem' }}>Katalog Produk Cigarskruie</h1>
          <p className={styles.introText}>
            Dua mahakarya kretek tangan (SKT) racikan rempah alami nusantara untuk kepuasan hisapan yang sejati.
          </p>
        </div>
      </section>

      {/* CATALOG GRID SECTION */}
      <section className="section-container" style={{ paddingTop: '1rem' }}>
        <div className={styles.catalogGrid}>
          {products.map((product) => {
            const encodedMsg = encodeURIComponent(product.waMessage);
            const waLink = `https://wa.me/6281234567890?text=${encodedMsg}`;

            return (
              <div key={product.id} className={`${styles.productCard} scroll-reveal`}>
                <span className={styles.productBadge}>{product.badge}</span>
                
                <div className={styles.productHeader}>
                  <h2 className={styles.productTitle}>{product.name}</h2>
                  <span className={styles.productTagline}>{product.tagline}</span>
                </div>

                {product.image && (
                  <div className={styles.productImageFrame}>
                    <Image 
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={300}
                      className={styles.productImage}
                    />
                  </div>
                )}

                <p className={styles.productDesc}>{product.desc}</p>

                {/* Herbs badges */}
                <div className={styles.herbsBlock}>
                  <h4 className={styles.herbsTitle}>Rempah Utama Dominan:</h4>
                  <div className={styles.herbsGrid}>
                    {product.herbs.map((herb) => (
                      <span key={herb} className={styles.herbBadge}>
                        {herb}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Specs sheets */}
                <div className={styles.specsBlock}>
                  <h4 className={styles.specsTitle}>Spesifikasi Produk:</h4>
                  <div className={styles.specsList}>
                    {Object.entries(product.specs).map(([label, val]) => (
                      <div key={label} className={styles.specRow}>
                        <span className={styles.specName}>{label}</span>
                        <span className={styles.specVal}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.cardActions}>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Pesan via WhatsApp
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Regulatory & Anti-Marketplace Disclaimer */}
        <div className={`${styles.disclaimerBox} scroll-reveal`}>
          <h3 className={styles.disclaimerTitle}>Kebijakan Resmi Pembelian Produk</h3>
          <p className={styles.disclaimerText}>
            Demi menjaga ekosistem kemitraan adil (&ldquo;Sistem Lebah&rdquo;) dan menghindari produk palsu, manajemen Cigarskruie **melarang keras** segala bentuk jual-beli produk CK di platform marketplace umum (seperti Shopee, Tokopedia, Bukalapak, Lazada, dll.). Pembelian yang sah hanya dilayani melalui admin CK Manajemen pusat (via tombol WhatsApp di atas) atau melalui distributor lokal berlisensi (**Kedai CK**) yang tersebar di wilayah Anda.
          </p>
        </div>
      </section>
    </>
  );
}
