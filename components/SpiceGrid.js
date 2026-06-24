'use client';

import { useState } from 'react';
import styles from './SpiceGrid.module.css';

const SPICES_DATA = [
  {
    id: 'jinten',
    name: 'Jinten Hitam',
    latin: 'Nigella Sativa / Habbatussauda',
    icon: '🌱',
    desc: 'Bahan herbal legendaris yang kaya akan antioksidan, dipercaya secara tradisional untuk membantu meningkatkan sistem kekebalan tubuh, stamina, dan vitalitas tubuh secara menyeluruh.',
  },
  {
    id: 'kayumanis',
    name: 'Kayu Manis',
    latin: 'Cinnamomum Verum',
    icon: '🪵',
    desc: 'Menghasilkan aroma manis berempah yang menenangkan saat dihisap, serta memiliki sifat alami anti-inflamasi dan membantu melancarkan peredaran darah.',
  },
  {
    id: 'kapulaga',
    name: 'Kapulaga',
    latin: 'Amomum Compactum',
    icon: '✨',
    desc: 'Rempah aromatik premium yang melegakan tenggorokan, membantu mengencerkan lendir, dan memberikan sensasi napas yang lebih bersih dan segar.',
  },
  {
    id: 'cengkeh',
    name: 'Cengkeh',
    latin: 'Syzygium Aromaticum',
    icon: '🍂',
    desc: 'Rempah utama kretek nusantara yang memberikan efek hangat khas di dada, memiliki kandungan eugenol sebagai antiseptik alami, serta memperkuat cita rasa tembakau.',
  },
  {
    id: 'madu',
    name: 'Madu Klanceng',
    latin: 'Meliponini Honey',
    icon: '🍯',
    desc: 'Madu hutan alami dari lebah tanpa sengat, memberikan sensasi gurih-manis yang lembut di tenggorokan, mencegah batuk kering, dan mengikat kelembapan rajangan rempah.',
  },
  {
    id: 'siwak',
    name: 'Siwak',
    latin: 'Salvadora Persica',
    icon: '🦷',
    desc: 'Dikenal luas untuk kesehatan mulut dan gigi. Ekstrak siwak dalam racikan membantu menetralisir bau mulut dan menjaga kesegaran rongga mulut setelah merokok.',
  },
  {
    id: 'sirih',
    name: 'Sirih',
    latin: 'Piper Betle',
    icon: '🍃',
    desc: 'Daun herbal antiseptik alami yang merawat saluran pernapasan, membantu meredakan gatal di tenggorokan, serta memiliki khasiat detoksifikasi ringan.',
  },
  {
    id: 'jahe',
    name: 'Jahe',
    latin: 'Zingiber Officinale',
    icon: '🍠',
    desc: 'Menghangatkan tubuh secara instan ketika dihisap, merangsang sirkulasi darah, membantu meredakan mual, dan memberikan rasa pedas hangat yang mantap.',
  },
  {
    id: 'kencur',
    name: 'Kencur',
    latin: 'Kaempferia Galanga',
    icon: '🌾',
    desc: 'Khasiat utama merawat pita suara dan melegakan tenggorokan. Sangat baik untuk meredakan radang ringan dan membuat suara terasa lebih plong.',
  },
  {
    id: 'ketumbar',
    name: 'Ketumbar',
    latin: 'Coriandrum Sativum',
    icon: '🥯',
    desc: 'Memberikan nuansa aroma herba yang kompleks dan menenangkan sistem saraf, menyeimbangkan aroma cengkeh dan jahe agar hisapan terasa solid.',
  },
  {
    id: 'ladahitam',
    name: 'Lada Hitam',
    latin: 'Piper Nigrum',
    icon: '🧉',
    desc: 'Memberikan efek tendangan (throat hit) hangat yang mantap secara alami tanpa tambahan saus kimia, membantu meredakan hidung tersumbat.',
  },
  {
    id: 'kulitpisang',
    name: 'Kulit Pisang Raja',
    latin: 'Musa Sapientum Peel',
    icon: '🍌',
    desc: 'Kaya akan kandungan serotonin alami dan pati yang difermentasi, berfungsi sebagai penyeimbang rasa agar kretek rempah membakar dengan stabil dan tidak terasa hambar.',
  },
];

export default function SpiceGrid() {
  const [activeSpice, setActiveSpice] = useState(SPICES_DATA[0]);

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {SPICES_DATA.map((spice) => {
          const isActive = activeSpice.id === spice.id;
          return (
            <div
              key={spice.id}
              className={`${styles.card} ${isActive ? styles.activeCard : ''}`}
              onClick={() => setActiveSpice(spice)}
              role="button"
              aria-pressed={isActive}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveSpice(spice);
                }
              }}
            >
              <span className={styles.icon}>{spice.icon}</span>
              <span className={styles.spiceName}>{spice.name}</span>
            </div>
          );
        })}
      </div>

      <div className={styles.detailBox}>
        <div className={styles.detailIcon}>
          {activeSpice.icon}
        </div>
        <div className={styles.detailInfo}>
          <h3 className={styles.detailTitle}>{activeSpice.name}</h3>
          <span className={styles.detailLatin}>{activeSpice.latin}</span>
          <p className={styles.detailDesc}>{activeSpice.desc}</p>
        </div>
      </div>
    </div>
  );
}
