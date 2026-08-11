import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, ChevronRight } from 'lucide-react';

function useScrollReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

const benihList = [
  { id: 1, nama: 'Jagung', varietas: 'Jagung Hibrida BSI-1', stok: '1,250 kg', statusStok: 'Tersedia', kelas: 'Benih Sebar (BR)', harga: 'Rp 45.000 / kg', image: '/images/seed_jagung.png', dayaKecambah: '92%', kemurnian: '99.5%', kadarAir: '12.0%', deskripsi: 'Varietas Jagung Hibrida unggulan tahan kekeringan dengan potensi hasil 9.5 Ton/Ha.', color: '#f59e0b' },
  { id: 2, nama: 'Padi', varietas: 'Padi Inpari 32 HDB', stok: '3,400 kg', statusStok: 'Tersedia', kelas: 'Benih Pokok (BP)', harga: 'Rp 14.500 / kg', image: '/images/seed_padi.png', dayaKecambah: '95%', kemurnian: '99.8%', kadarAir: '11.8%', deskripsi: 'Padi tahan hawar daun bakteri, cocok untuk lahan sawah irigasi DIY.', color: '#10b981' },
  { id: 3, nama: 'Bawang Merah', varietas: 'Bawang Merah Tajuk', stok: '850 kg', statusStok: 'Tersedia', kelas: 'Benih Pokok (BP)', harga: 'Rp 38.000 / kg', image: '/images/seed_bawang.png', dayaKecambah: '88%', kemurnian: '98.5%', kadarAir: '13.0%', deskripsi: 'Umbi benih varietas Tajuk, produktivitas 12–15 Ton/Ha.', color: '#ec4899' },
  { id: 4, nama: 'Kedelai', varietas: 'Kedelai Anjasmoro', stok: '600 kg', statusStok: 'Terbatas', kelas: 'Benih Sebar (BR)', harga: 'Rp 22.000 / kg', image: '/images/seed_kedelai.png', dayaKecambah: '90%', kemurnian: '99.0%', kadarAir: '11.0%', deskripsi: 'Biji besar, polong tidak mudah pecah, potensi hasil tinggi.', color: '#eab308' },
  { id: 5, nama: 'Cabai', varietas: 'Cabai Rawit Barat DIY', stok: '120 kg', statusStok: 'Tersedia', kelas: 'Benih Sebar (BR)', harga: 'Rp 120.000 / 100gr', image: '/images/seed_jagung.png', dayaKecambah: '94%', kemurnian: '99.2%', kadarAir: '8.5%', deskripsi: 'Buah lebat, sangat pedas, toleran penyakit antraknosa.', color: '#ef4444' },
];

export default function BenihSection() {
  const [sectionRef, sectionVisible] = useScrollReveal();
  const [selected, setSelected] = useState(null);

  const handleWA = (nama = '') => {
    const text = encodeURIComponent(`Halo BRMP DIY, saya ingin info stok benih ${nama || 'unggul'}. Terima kasih.`);
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
  };

  return (
    <section
      id="informasi-benih"
      ref={sectionRef}
      style={{
        backgroundColor: '#ffffff',
        padding: '6rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'radial-gradient(rgba(16,185,129,0.05) 1.5px, transparent 1.5px)',
        backgroundSize: '32px 32px', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
        {/* Section Header */}
        <div style={{
          textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem auto',
          opacity: sectionVisible ? 1 : 0,
          transform: sectionVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
            color: '#15803d', padding: '0.4rem 1rem', borderRadius: '9999px',
            fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase', marginBottom: '1rem',
            border: '1px solid rgba(22,163,74,0.2)',
          }}>
            🌾 Katalog Benih Unggulan
          </div>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
            fontWeight: 800, color: '#0f172a',
            letterSpacing: '-0.02em', marginBottom: '0.8rem',
          }}>
            Informasi Benih Terkini
          </h2>
          <p style={{ fontSize: '1rem', color: '#64748b', lineHeight: 1.55 }}>
            Stok & pengawasan mutu benih tanaman pangan unggulan di wilayah Yogyakarta
          </p>
        </div>

        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3.5rem',
        }}>
          {benihList.map((benih, i) => (
            <div
              key={benih.id}
              onClick={() => setSelected(benih)}
              className="hover-lift card-shine"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                padding: '1.4rem',
                cursor: 'pointer',
                opacity: sectionVisible ? 1 : 0,
                transform: sectionVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.6s ${i * 0.1}s ease, transform 0.6s ${i * 0.1}s cubic-bezier(0.22,1,0.36,1)`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Color bar top accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
                borderRadius: '20px 20px 0 0',
                backgroundColor: benih.color,
              }} />

              {/* Image */}
              <div style={{
                width: '100%', aspectRatio: '1/1',
                backgroundColor: '#f8fafc',
                borderRadius: '14px', marginBottom: '1rem',
                overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                <img
                  src={benih.image}
                  alt={benih.nama}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  onMouseOver={(e) => (e.target.style.transform = 'scale(1.08)')}
                  onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
                />
                <span style={{
                  position: 'absolute', top: '8px', right: '8px',
                  backgroundColor: benih.statusStok === 'Tersedia' ? '#16a34a' : '#d97706',
                  color: '#ffffff', fontSize: '0.68rem', fontWeight: 700,
                  padding: '0.22rem 0.6rem', borderRadius: '9999px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}>
                  {benih.statusStok}
                </span>
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.2rem' }}>
                {benih.nama}
              </h3>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: benih.color, marginBottom: '0.4rem' }}>
                {benih.stok}
              </div>
              <p style={{ fontSize: '0.76rem', color: '#64748b', lineHeight: 1.4, marginBottom: '0.9rem' }}>
                {benih.varietas}
              </p>

              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                paddingTop: '0.6rem', borderTop: '1px solid #f1f5f9',
              }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563eb' }}>Lihat Detail</span>
                <ChevronRight size={15} color="#2563eb" />
              </div>
            </div>
          ))}
        </div>

        {/* WA Button */}
        <div style={{
          textAlign: 'center',
          opacity: sectionVisible ? 1 : 0,
          transition: 'opacity 0.7s 0.5s ease',
        }}>
          <button
            onClick={() => handleWA()}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.7rem',
              background: 'linear-gradient(135deg, #16a34a, #0d6e38)',
              color: '#ffffff', padding: '0.9rem 2rem', borderRadius: '9999px',
              fontWeight: 700, fontSize: '0.95rem',
              boxShadow: '0 6px 20px rgba(22,163,74,0.35)',
              transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
              border: 'none', cursor: 'pointer',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.04)';
              e.currentTarget.style.boxShadow = '0 14px 30px rgba(22,163,74,0.45)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(22,163,74,0.35)';
            }}
          >
            <MessageCircle size={20} />
            <span>Hubungi via WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div
          style={{
            position: 'fixed', inset: 0,
            backgroundColor: 'rgba(15,23,42,0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 2000, padding: '1.5rem',
          }}
          onClick={() => setSelected(null)}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              maxWidth: '520px', width: '100%',
              padding: '2rem',
              boxShadow: '0 30px 60px -12px rgba(0,0,0,0.3)',
              animation: 'scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top color bar */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '5px',
              borderRadius: '24px 24px 0 0', backgroundColor: selected.color,
            }} />

            <button onClick={() => setSelected(null)} style={{
              position: 'absolute', top: '1.2rem', right: '1.2rem',
              backgroundColor: '#f1f5f9', border: 'none', borderRadius: '50%',
              width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#64748b', transition: 'all 0.2s ease',
            }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e2e8f0')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', gap: '1.2rem', marginBottom: '1.2rem', marginTop: '0.5rem' }}>
              <div style={{
                width: '100px', height: '100px', borderRadius: '14px', overflow: 'hidden',
                backgroundColor: '#f8fafc', flexShrink: 0,
                boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
              }}>
                <img src={selected.image} alt={selected.nama} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <span style={{
                  backgroundColor: selected.color + '22', color: selected.color,
                  padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700,
                }}>
                  {selected.kelas}
                </span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginTop: '0.4rem', lineHeight: 1.2 }}>
                  {selected.nama}
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.15rem' }}>{selected.varietas}</p>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: selected.color, marginTop: '0.3rem' }}>
                  {selected.harga}
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.55, marginBottom: '1.2rem' }}>
              {selected.deskripsi}
            </p>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.75rem',
              backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '14px',
              textAlign: 'center', marginBottom: '1.5rem',
            }}>
              {[
                { label: 'Daya Kecambah', val: selected.dayaKecambah },
                { label: 'Kemurnian', val: selected.kemurnian },
                { label: 'Kadar Air', val: selected.kadarAir },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '0.25rem' }}>{item.label}</div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0d6e38' }}>{item.val}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleWA(selected.nama)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                background: 'linear-gradient(135deg, #16a34a, #0d6e38)',
                color: '#ffffff', padding: '0.85rem', borderRadius: '12px',
                fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(22,163,74,0.3)',
                transition: 'all 0.25s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <MessageCircle size={20} />
              <span>Pesan via WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
