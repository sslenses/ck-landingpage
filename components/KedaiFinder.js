'use client';

import { useState, useMemo } from 'react';
import styles from './KedaiFinder.module.css';

const KEDAI_DATABASE = [
  { id: 1, name: 'Kedai CK Malang Pusat', province: 'Jawa Timur', city: 'Malang', address: 'Jl. Soekarno Hatta No. 22, Lowokwaru, Kota Malang', phone: '+62 812-3344-5566' },
  { id: 2, name: 'Kedai CK Surabaya', province: 'Jawa Timur', city: 'Surabaya', address: 'Jl. Dharmahusada No. 56, Gubeng, Kota Surabaya', phone: '+62 813-7788-9900' },
  { id: 3, name: 'Kedai CK Bandung', province: 'Jawa Barat', city: 'Bandung', address: 'Jl. Buah Batu No. 110, Lengkong, Kota Bandung', phone: '+62 812-1122-3344' },
  { id: 4, name: 'Kedai CK Depok', province: 'Jawa Barat', city: 'Depok', address: 'Jl. Margonda Raya No. 340, Beji, Kota Depok', phone: '+62 815-5566-7788' },
  { id: 5, name: 'Kedai CK Bekasi', province: 'Jawa Barat', city: 'Bekasi', address: 'Jl. Ahmad Yani No. 8, Bekasi Selatan, Kota Bekasi', phone: '+62 812-4455-6677' },
  { id: 6, name: 'Kedai CK Jakarta Selatan', province: 'DKI Jakarta', city: 'Jakarta Selatan', address: 'Jl. Kemang Raya No. 45, Mampang Prapatan, Jakarta Selatan', phone: '+62 819-2233-4455' },
  { id: 7, name: 'Kedai CK Jakarta Timur', province: 'DKI Jakarta', city: 'Jakarta Timur', address: 'Jl. Raden Inten No. 12, Duren Sawit, Jakarta Timur', phone: '+62 813-8899-0011' },
  { id: 8, name: 'Kedai CK Semarang', province: 'Jawa Tengah', city: 'Semarang', address: 'Jl. Pemuda No. 78, Sekayu, Kota Semarang', phone: '+62 815-9900-1122' },
  { id: 9, name: 'Kedai CK Surakarta', province: 'Jawa Tengah', city: 'Solo', address: 'Jl. Slamet Riyadi No. 102, Banjarsari, Kota Surakarta (Solo)', phone: '+62 812-7766-5544' },
  { id: 10, name: 'Kedai CK Medan', province: 'Sumatera Utara', city: 'Medan', address: 'Jl. S. Parman No. 20, Petisah Tengah, Kota Medan', phone: '+62 811-9988-7766' },
  { id: 11, name: 'Kedai CK Palembang', province: 'Sumatera Selatan', city: 'Palembang', address: 'Jl. Jend. Sudirman No. 14, Ilir Timur, Kota Palembang', phone: '+62 813-2211-0099' },
  { id: 12, name: 'Kedai CK Makassar', province: 'Sulawesi Selatan', city: 'Makassar', address: 'Jl. AP Pettarani No. 9, Rappocini, Kota Makassar', phone: '+62 812-8877-6655' },
];

export default function KedaiFinder() {
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Extract unique provinces
  const provinces = useMemo(() => {
    const set = new Set(KEDAI_DATABASE.map(item => item.province));
    return Array.from(set).sort();
  }, []);

  // Extract unique cities based on selected province
  const cities = useMemo(() => {
    if (!selectedProvince) return [];
    const filtered = KEDAI_DATABASE.filter(item => item.province === selectedProvince);
    const set = new Set(filtered.map(item => item.city));
    return Array.from(set).sort();
  }, [selectedProvince]);

  // Handle province change, reset city
  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    setSelectedCity('');
  };

  // Filtered outlets
  const filteredOutlets = useMemo(() => {
    return KEDAI_DATABASE.filter(item => {
      const matchProvince = selectedProvince ? item.province === selectedProvince : true;
      const matchCity = selectedCity ? item.city === selectedCity : true;
      return matchProvince && matchCity;
    });
  }, [selectedProvince, selectedCity]);

  return (
    <div className={styles.finderContainer}>
      <div className={styles.filterRow}>
        <div className="form-group">
          <label htmlFor="provinceSelect" className="form-label">Pilih Provinsi</label>
          <select
            id="provinceSelect"
            className="form-select"
            value={selectedProvince}
            onChange={handleProvinceChange}
          >
            <option value="">Semua Provinsi</option>
            {provinces.map(prov => (
              <option key={prov} value={prov}>{prov}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="citySelect" className="form-label">Pilih Kota/Kabupaten</label>
          <select
            id="citySelect"
            className="form-select"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedProvince}
          >
            <option value="">Semua Kota</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.resultsGrid}>
        {filteredOutlets.length > 0 ? (
          filteredOutlets.map((outlet) => {
            const encodedMsg = encodeURIComponent(`Halo ${outlet.name}, saya mendapatkan info kontak dari website Cigarskruie. Saya ingin bertanya perihal ketersediaan produk CK.`);
            const waLink = `https://wa.me/${outlet.phone.replace(/[^0-9]/g, '')}?text=${encodedMsg}`;

            return (
              <div key={outlet.id} className={styles.outletCard}>
                <div className={styles.outletHeader}>
                  <span className={styles.outletRegion}>{outlet.province} &bull; {outlet.city}</span>
                  <h3 className={styles.outletName}>{outlet.name}</h3>
                </div>
                
                <div className={styles.outletDetails}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailIcon}>📍</span>
                    <span>{outlet.address}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailIcon}>📞</span>
                    <span>{outlet.phone}</span>
                  </div>
                </div>

                <div className={styles.cardAction}>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    Hubungi Kedai
                  </a>
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>🔍</span>
            <h4>Kedai Tidak Ditemukan</h4>
            <p>Silakan ganti filter wilayah Anda untuk mencari lokasi Kedai CK lainnya.</p>
          </div>
        )}
      </div>
    </div>
  );
}
