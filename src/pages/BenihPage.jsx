import React, { useState, useRef, useEffect } from 'react';
import { Search, MessageCircle, X, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

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

const allBenih = [
  {
    id: 1, nama: 'Jagung', varietas: 'Jagung Hibrida BSI-1', kategori: 'Serealia',
    stok: 1250, satuan: 'kg', statusStok: 'Tersedia',
    kelas: 'Benih Sebar (BR)', harga: 'Rp 45.000 / kg',
    image: '/images/seed_jagung.png', dayaKecambah: '92%', kemurnian: '99.5%', kadarAir: '12.0%',
    deskripsi: 'Varietas Jagung Hibrida unggulan tahan kekeringan dengan potensi hasil 9.5 Ton/Ha. Adaptif di lahan kering dan tegalan DIY.',
    color: '#f59e0b', bgColor: '#fef3c7',
  },
  {
    id: 2, nama: 'Padi', varietas: 'Padi Inpari 32 HDB', kategori: 'Serealia',
    stok: 3400, satuan: 'kg', statusStok: 'Tersedia',
    kelas: 'Benih Pokok (BP)', harga: 'Rp 14.500 / kg',
    image: '/images/seed_padi.png', dayaKecambah: '95%', kemurnian: '99.8%', kadarAir: '11.8%',
    deskripsi: 'Padi tahan hawar daun bakteri (HDB), cocok untuk lahan sawah irigasi DIY, potensi hasil 6.5 Ton/Ha.',
    color: '#10b981', bgColor: '#d1fae5',
  },
  {
    id: 3, nama: 'Bawang Merah', varietas: 'Bawang Merah Tajuk', kategori: 'Sayuran',
    stok: 850, satuan: 'kg', statusStok: 'Tersedia',
    kelas: 'Benih Pokok (BP)', harga: 'Rp 38.000 / kg',
    image: '/images/seed_bawang.png', dayaKecambah: '88%', kemurnian: '98.5%', kadarAir: '13.0%',
    deskripsi: 'Umbi benih varietas Tajuk, produktivitas 12–15 Ton/Ha, tahan busuk umbi, cocok di dataran medium DIY.',
    color: '#ec4899', bgColor: '#fce7f3',
  },
  {
    id: 4, nama: 'Kedelai', varietas: 'Kedelai Anjasmoro', kategori: 'Kacang-kacangan',
    stok: 600, satuan: 'kg', statusStok: 'Terbatas',
    kelas: 'Benih Sebar (BR)', harga: 'Rp 22.000 / kg',
    image: '/images/seed_kedelai.png', dayaKecambah: '90%', kemurnian: '99.0%', kadarAir: '11.0%',
    deskripsi: 'Biji besar, polong tidak mudah pecah, potensi hasil 2.5 Ton/Ha. Adaptasi lahan kering & sawah tadah hujan.',
    color: '#eab308', bgColor: '#fef9c3',
  },
  {
    id: 5, nama: 'Cabai Rawit', varietas: 'Cabai Rawit Barat DIY', kategori: 'Sayuran',
    stok: 120, satuan: 'gram', statusStok: 'Tersedia',
    kelas: 'Benih Sebar (BR)', harga: 'Rp 120.000 / 100gr',
    image: '/images/seed_jagung.png', dayaKecambah: '94%', kemurnian: '99.2%', kadarAir: '8.5%',
    deskripsi: 'Buah lebat, sangat pedas (≥80.000 SHU), toleran penyakit antraknosa. Cocok untuk lahan terbuka DIY.',
    color: '#ef4444', bgColor: '#fee2e2',
  },
];

const KATEGORI = ['Semua', 'Serealia', 'Sayuran', 'Kacang-kacangan'];

export default function BenihPage() {
  const [sectionRef, sectionVisible] = useScrollReveal();
  const [search, setSearch] = useState('');
  const [kategori, setKategori] = useState('Semua');
  const [stokFilter, setStokFilter] = useState('Semua');
  const [selected, setSelected] = useState(null);

  const filtered = allBenih.filter((b) => {
    const matchSearch = b.nama.toLowerCase().includes(search.toLowerCase()) ||
      b.varietas.toLowerCase().includes(search.toLowerCase());
    const matchKategori = kategori === 'Semua' || b.kategori === kategori;
    const matchStok = stokFilter === 'Semua' || b.statusStok === stokFilter;
    return matchSearch && matchKategori && matchStok;
  });

  const handleWA = (nama = '') => {
    const text = encodeURIComponent(`Halo BRMP DIY, saya ingin info stok benih ${nama || 'unggul'}. Terima kasih.`);
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
  };

  return (
    <div style={{ backgroundColor: '#ffffff', paddingTop: '80px', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #022c22 0%, #0d6e38 60%, #065f46 100%)',
        padding: '4rem 1.5rem 5rem',
        position: 'relative', overflow: 'hidden', color: '#ffffff',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px', pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
            padding: '0.4rem 1rem', borderRadius: '9999px',
            fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', marginBottom: '1.2rem',
            border: '1px solid rgba(255,255,255,0.25)', color: '#6ee7b7',
          }}>
            🌾 Katalog Benih Terkini
          </div>
          <h1 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800,
            letterSpacing: '-0.025em', lineHeight: 1.15, marginBottom: '0.8rem',
          }}>
            Informasi Benih Unggulan BRMP DIY
          </h1>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.6 }}>
            Data stok real-time benih tanaman pangan dan hortikultura bersertifikat di wilayah Daerah Istimewa Yogyakarta.
          </p>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" style={{ width: '100%', height: '60px' }}>
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#ffffff" />
          </svg>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
        {/* Filters */}
        <div
          style={{
            display: 'flex', flexWrap: 'wrap', gap: '1rem',
            alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '2rem',
            opacity: sectionVisible ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
          ref={sectionRef}
        >
          {/* Search */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.6rem',
            backgroundColor: '#f8fafc', border: '2px solid #e2e8f0', borderRadius: '12px',
            padding: '0.6rem 1rem', flex: '1', minWidth: '240px',
            transition: 'border-color 0.2s ease',
          }}
            onFocusCapture={(e) => (e.currentTarget.style.borderColor = '#10b981')}
            onBlurCapture={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
          >
            <Search size={18} color="#94a3b8" />
            <input
              type="text" value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama atau varietas benih..."
              style={{ border: 'none', outline: 'none', fontSize: '0.9rem', color: '#1e293b', backgroundColor: 'transparent', flex: 1 }}
            />
          </div>

          {/* Kategori Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {KATEGORI.map((k) => (
              <button key={k} onClick={() => setKategori(k)} style={{
                padding: '0.5rem 1rem', borderRadius: '9999px', border: '1.5px solid',
                borderColor: kategori === k ? '#0d6e38' : '#e2e8f0',
                backgroundColor: kategori === k ? '#0d6e38' : '#ffffff',
                color: kategori === k ? '#ffffff' : '#374151',
                fontSize: '0.85rem', fontWeight: kategori === k ? 700 : 500,
                cursor: 'pointer', transition: 'all 0.2s cubic-bezier(0.34,1.56,0.64,1)',
              }}>
                {k}
              </button>
            ))}
          </div>

          {/* Stok filter */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['Semua', 'Tersedia', 'Terbatas'].map((s) => (
              <button key={s} onClick={() => setStokFilter(s)} style={{
                padding: '0.5rem 0.85rem', borderRadius: '9999px', border: '1.5px solid',
                borderColor: stokFilter === s ? '#10b981' : '#e2e8f0',
                backgroundColor: stokFilter === s ? '#e8f5ed' : '#ffffff',
                color: stokFilter === s ? '#0d6e38' : '#6b7280',
                fontSize: '0.82rem', fontWeight: stokFilter === s ? 700 : 400,
                cursor: 'pointer', transition: 'all 0.2s ease',
              }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Count info */}
        <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem' }}>
          Menampilkan <strong style={{ color: '#0d6e38' }}>{filtered.length}</strong> dari {allBenih.length} komoditas benih
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#64748b' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌱</div>
            <p style={{ fontWeight: 600, fontSize: '1rem' }}>Benih tidak ditemukan</p>
            <p style={{ fontSize: '0.86rem' }}>Coba ubah filter atau kata kunci pencarian</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1.5rem',
          }}>
            {filtered.map((benih, i) => (
              <div
                key={benih.id}
                onClick={() => setSelected(benih)}
                className="hover-lift card-shine"
                style={{
                  backgroundColor: '#ffffff', borderRadius: '20px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                  padding: '1.4rem', cursor: 'pointer',
                  opacity: sectionVisible ? 1 : 0,
                  transform: sectionVisible ? 'translateY(0)' : 'translateY(40px)',
                  transition: `opacity 0.5s ${i * 0.08}s ease, transform 0.5s ${i * 0.08}s cubic-bezier(0.22,1,0.36,1)`,
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {/* Top accent */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
                  borderRadius: '20px 20px 0 0', backgroundColor: benih.color,
                }} />

                {/* Image */}
                <div style={{
                  width: '100%', aspectRatio: '1/1', backgroundColor: '#f8fafc',
                  borderRadius: '14px', marginBottom: '1rem', overflow: 'hidden',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative',
                }}>
                  <img
                    src={benih.image} alt={benih.nama}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                    onMouseOver={(e) => (e.target.style.transform = 'scale(1.08)')}
                    onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
                  />
                  <span style={{
                    position: 'absolute', top: '8px', right: '8px',
                    backgroundColor: benih.statusStok === 'Tersedia' ? '#16a34a' : '#d97706',
                    color: '#ffffff', fontSize: '0.68rem', fontWeight: 700,
                    padding: '0.2rem 0.55rem', borderRadius: '9999px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                  }}>
                    {benih.statusStok}
                  </span>
                </div>

                {/* Category badge */}
                <span style={{
                  display: 'inline-block', fontSize: '0.68rem', fontWeight: 700,
                  color: benih.color, backgroundColor: benih.bgColor,
                  padding: '0.15rem 0.55rem', borderRadius: '6px', marginBottom: '0.4rem',
                }}>
                  {benih.kategori}
                </span>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.2rem' }}>
                  {benih.nama}
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem' }}>{benih.varietas}</p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: benih.color }}>
                    {benih.stok.toLocaleString()} {benih.satuan}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#2563eb', fontWeight: 700 }}>
                    Detail <ChevronRight size={14} />
                  </div>
                </div>

                {/* Stok bar */}
                <div style={{ marginTop: '0.8rem', backgroundColor: '#f1f5f9', borderRadius: '9999px', height: '5px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: '9999px',
                    width: benih.statusStok === 'Tersedia' ? `${Math.min((benih.stok / 4000) * 100, 100)}%` : '25%',
                    backgroundColor: benih.statusStok === 'Tersedia' ? benih.color : '#d97706',
                    transition: 'width 1s ease',
                  }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* WA CTA */}
        <div style={{ marginTop: '3.5rem', textAlign: 'center' }}>
          <div style={{
            backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '20px',
            padding: '2rem', maxWidth: '600px', margin: '0 auto',
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              Tertarik Memesan Benih?
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1.5rem' }}>
              Hubungi tim BRMP DIY langsung via WhatsApp untuk informasi ketersediaan, harga, dan pemesanan benih bersertifikat.
            </p>
            <button onClick={() => handleWA()} style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.7rem',
              background: 'linear-gradient(135deg, #16a34a, #0d6e38)',
              color: '#ffffff', padding: '0.85rem 1.8rem', borderRadius: '9999px',
              fontWeight: 700, fontSize: '0.95rem',
              boxShadow: '0 6px 20px rgba(22,163,74,0.35)',
              transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
              border: 'none', cursor: 'pointer',
            }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px) scale(1.04)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; }}
            >
              <MessageCircle size={20} /> Hubungi via WhatsApp
            </button>
          </div>
        </div>

        {/* Back */}
        <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
          <Link to="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            color: '#0d6e38', fontWeight: 600, fontSize: '0.9rem',
            textDecoration: 'none', padding: '0.6rem 1.2rem',
            borderRadius: '9999px', border: '1.5px solid #bbf7d0',
            backgroundColor: '#f0fdf4', transition: 'all 0.2s ease',
          }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#dcfce7'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#f0fdf4'; }}
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div style={{
          position: 'fixed', inset: 0,
          backgroundColor: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2000, padding: '1.5rem',
        }} onClick={() => setSelected(null)}>
          <div style={{
            backgroundColor: '#ffffff', borderRadius: '24px',
            maxWidth: '520px', width: '100%',
            padding: '2rem', position: 'relative',
            boxShadow: '0 30px 60px -12px rgba(0,0,0,0.3)',
            animation: 'scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1)',
            overflow: 'hidden',
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '5px',
              borderRadius: '24px 24px 0 0', backgroundColor: selected.color,
            }} />

            <button onClick={() => setSelected(null)} style={{
              position: 'absolute', top: '1.2rem', right: '1.2rem',
              backgroundColor: '#f1f5f9', border: 'none', borderRadius: '50%',
              width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#64748b',
            }}>
              <X size={18} />
            </button>

            <div style={{ display: 'flex', gap: '1.2rem', marginBottom: '1.2rem', marginTop: '0.5rem' }}>
              <div style={{
                width: '100px', height: '100px', borderRadius: '14px', overflow: 'hidden',
                backgroundColor: '#f8fafc', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              }}>
                <img src={selected.image} alt={selected.nama} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: selected.color, backgroundColor: selected.bgColor, padding: '0.18rem 0.55rem', borderRadius: '6px' }}>
                  {selected.kelas}
                </span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginTop: '0.35rem', lineHeight: 1.2 }}>
                  {selected.nama}
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#64748b' }}>{selected.varietas}</p>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: selected.color, marginTop: '0.3rem' }}>{selected.harga}</div>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.55, marginBottom: '1.2rem' }}>{selected.deskripsi}</p>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.75rem',
              backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '14px', textAlign: 'center', marginBottom: '1.5rem',
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

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => { setSelected(null); handleWA(selected.nama); }} style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                background: 'linear-gradient(135deg, #16a34a, #0d6e38)',
                color: '#ffffff', padding: '0.85rem', borderRadius: '12px',
                fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(22,163,74,0.3)',
              }}>
                <MessageCircle size={18} /> Pesan via WA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
