import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LabTracking from './components/LabTracking';
import BenihSection from './components/BenihSection';
import PortalLayanan from './components/PortalLayanan';
import Footer from './components/Footer';
import { BookOpen, X, CheckCircle, FileText, Download } from 'lucide-react';

export default function App() {
  const [guideModalOpen, setGuideModalOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      {/* Top Sticky Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main style={{ flex: 1 }}>
        <Hero
          onOpenBenihModal={() => {
            const elem = document.querySelector('#informasi-benih');
            if (elem) elem.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenGuideModal={() => setGuideModalOpen(true)}
        />

        <LabTracking />

        <BenihSection />

        <PortalLayanan />
      </main>

      {/* Footer */}
      <Footer />

      {/* Panduan Modal */}
      {guideModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3000,
            padding: '1.5rem',
          }}
          onClick={() => setGuideModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              maxWidth: '650px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              padding: '2rem',
              position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }}
            onClick={(e) => e.stopPropagation()}
            className="animate-fade-in"
          >
            <button
              onClick={() => setGuideModalOpen(false)}
              style={{
                position: 'absolute',
                top: '1.2rem',
                right: '1.2rem',
                backgroundColor: '#f1f5f9',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748b',
              }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: '#e8f5ed',
                  color: '#0d6e38',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <BookOpen size={24} />
              </div>
              <div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#0d6e38',
                    backgroundColor: '#e8f5ed',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '6px',
                  }}
                >
                  Panduan Penggunaan
                </span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginTop: '0.2rem' }}>
                  Panduan Layanan Agromodern BRMP DIY
                </h3>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', fontSize: '0.9rem', color: '#334155' }}>
              <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '12px' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0d6e38', marginBottom: '0.4rem' }}>
                  1. Tracking Layanan Laboratorium
                </h4>
                <p style={{ color: '#64748b', lineHeight: 1.5 }}>
                  Masukkan Kode Sampel atau Nomor Pengujian Lab pada kolom pencarian (contoh: <code>LAB-2026-001</code>). Anda dapat memantau 4 tahapan status pengujian hingga mengunduh Sertifikat Hasil Uji resmi.
                </p>
              </div>

              <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '12px' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0d6e38', marginBottom: '0.4rem' }}>
                  2. Informasi & Pemesanan Benih Unggul
                </h4>
                <p style={{ color: '#64748b', lineHeight: 1.5 }}>
                  Pilih varietas benih pada katalog (Padi, Jagung, Bawang Merah, Kedelai, Cabai) untuk memeriksa ketersediaan stok real-time dan standar mutu. Klik tombol WhatsApp untuk terhubung langsung dengan tim perbenihan BRMP DIY.
                </p>
              </div>

              <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '12px' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0d6e38', marginBottom: '0.4rem' }}>
                  3. Pengajuan Permohonan Layanan Publik
                </h4>
                <p style={{ color: '#64748b', lineHeight: 1.5 }}>
                  Klik salah satu dari 6 tile layanan (Konsultasi, Pengaduan, Magang, Narasumber, PPID, Kunjungan), isi formulir singkat, dan Anda akan menerima Nomor Resi otomatis (contoh: <code>REQ-8892</code>) yang dapat dilacak sewaktu-waktu.
                </p>
              </div>
            </div>

            <div style={{ marginTop: '1.8rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setGuideModalOpen(false)}
                style={{
                  backgroundColor: '#0d6e38',
                  color: '#ffffff',
                  padding: '0.75rem 1.6rem',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                }}
              >
                Saya Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
