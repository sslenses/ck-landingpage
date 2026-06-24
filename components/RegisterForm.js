'use client';

import { useState } from 'react';
import styles from './RegisterForm.module.css';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    city: '',
    type: 'Clubber CK (Mitra Penjualan)',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct the formatted WhatsApp message
    const formattedMessage = `Halo Admin CK Manajemen, saya tertarik untuk bergabung dalam Kemitraan Cigarskruie.

Nama Lengkap: ${formData.name}
Nomor WhatsApp: ${formData.whatsapp}
Kota Domisili: ${formData.city}
Pilihan Kemitraan: ${formData.type}
Pesan Tambahan: ${formData.message || '-'}`;

    // Admin WhatsApp Number (placeholder)
    const adminPhone = '6281234567890';
    const waLink = `https://wa.me/${adminPhone}?text=${encodeURIComponent(formattedMessage)}`;

    // Open WhatsApp in a new tab
    window.open(waLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nameInput" className="form-label">Nama Lengkap</label>
          <input
            id="nameInput"
            name="name"
            type="text"
            className="form-input"
            placeholder="Masukkan nama lengkap Anda"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="whatsappInput" className="form-label">Nomor WhatsApp</label>
          <input
            id="whatsappInput"
            name="whatsapp"
            type="tel"
            className="form-input"
            placeholder="Contoh: 081234567890"
            value={formData.whatsapp}
            onChange={handleChange}
            required
            autoComplete="tel"
          />
        </div>

        <div className="form-group">
          <label htmlFor="cityInput" className="form-label">Kota / Kabupaten Domisili</label>
          <input
            id="cityInput"
            name="city"
            type="text"
            className="form-input"
            placeholder="Contoh: Malang, Bandung, Medan"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="typeSelect" className="form-label">Pilihan Kemitraan</label>
          <select
            id="typeSelect"
            name="type"
            className="form-select"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="Clubber CK (Mitra Penjualan)">Clubber CK (Mitra Penjualan / Reseller)</option>
            <option value="Kedai CK (Distributor / Outlet Resmi)">Kedai CK (Distributor / Outlet Resmi)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="messageTextarea" className="form-label">Pesan Tambahan (Opsional)</label>
          <textarea
            id="messageTextarea"
            name="message"
            className="form-textarea"
            rows="4"
            placeholder="Tulis pertanyaan atau informasi tambahan..."
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
          Kirim Pendaftaran via WhatsApp
        </button>

        <p className={styles.note}>
          *Menekan tombol di atas akan mengarahkan Anda langsung ke WhatsApp chat Admin CK Manajemen pusat untuk proses verifikasi data lebih lanjut.
        </p>
      </form>
    </div>
  );
}
