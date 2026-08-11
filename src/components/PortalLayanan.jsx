import React, { useEffect, useRef, useState } from 'react';
import {
  Users, MessageSquareWarning, Building2, Volume2, UserCheck, MapPin,
  Search, CheckCircle, X, Send, FileCheck,
} from 'lucide-react';

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

const serviceTiles = [
  { id: 'konsultasi', title: 'Konsultasi', icon: Users, color: '#10b981', bgColor: '#d1fae5', desc: 'Layanan konsultasi teknis budidaya dan penerapan standar agro modern dengan pakar BRMP DIY.' },
  { id: 'pengaduan', title: 'Pengaduan', icon: MessageSquareWarning, color: '#f59e0b', bgColor: '#fef3c7', desc: 'Saluran pengaduan resmi pelayanan publik dan mutu benih/pupuk di wilayah D.I. Yogyakarta.' },
  { id: 'magang', title: 'Magang', icon: Building2, color: '#6366f1', bgColor: '#ede9fe', desc: 'Pendaftaran magang & PKL mahasiswa/siswa di Lab & Kebun Percobaan BRMP DIY.' },
  { id: 'narasumber', title: 'Narasumber', icon: Volume2, color: '#0ea5e9', bgColor: '#e0f2fe', desc: 'Permohonan narasumber ahli untuk bimbingan teknis, workshop, dan seminar pertanian.' },
  { id: 'informasi-publik', title: 'Permohonan Informasi Publik', icon: UserCheck, color: '#8b5cf6', bgColor: '#f5f3ff', desc: 'Permohonan data publik, dokumen standar teknis, dan laporan resmi PPID BRMP DIY.' },
  { id: 'kunjungan', title: 'Kunjungan', icon: MapPin, color: '#ef4444', bgColor: '#fee2e2', desc: 'Pengajuan kunjungan edukasi ke fasilitas laboratorium & lahan modern BRMP DIY.' },
];

const requestDatabase = {
  'REQ-8892': {
    kode: 'REQ-8892', layanan: 'Konsultasi Teknis Standar Benih', pemohon: 'Agus Setiawan',
    tanggal: '04 Agustus 2026', status: 'Sedang Diproses oleh Tim Pakar',
    catatan: 'Jadwal konsultasi online disiapkan pada 12 Agustus 2026.',
  },
  'REQ-7741': {
    kode: 'REQ-7741', layanan: 'Magang Mahasiswa UGM', pemohon: 'Dian Permata',
    tanggal: '01 Agustus 2026', status: 'Selesai – Surat Balasan Diterbitkan',
    catatan: 'Permohonan magang diterima untuk periode September–November 2026.',
  },
};

export default function PortalLayanan() {
  const [sectionRef, sectionVisible] = useScrollReveal();
  const [selectedService, setSelectedService] = useState(null);
  const [trackInput, setTrackInput] = useState('');
  const [trackResult, setTrackResult] = useState(null);
  const [formData, setFormData] = useState({ nama: '', telepon: '', instansi: '', pesan: '' });
  const [submitted, setSubmitted] = useState(null);
  const [hoveredTile, setHoveredTile] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    const code = trackInput.trim().toUpperCase();
    setTrackResult(requestDatabase[code] || {
      kode: code || 'DEMO', layanan: 'Permohonan Layanan Agromodern', pemohon: 'Pemohon Terdaftar',
      tanggal: '11 Agustus 2026', status: 'Dalam Verifikasi Administrasi',
      catatan: 'Nomor resi terverifikasi dalam antrean sistem BRMP DIY.',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = `REQ-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmitted({ code, service: selectedService.title, nama: formData.nama || 'Pemohon BRMP DIY' });
    setFormData({ nama: '', telepon: '', instansi: '', pesan: '' });
  };

  return (
    <section
      id="portal-layanan"
      ref={sectionRef}
      style={{
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
        padding: '6rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background accent */}
      <div style={{
        position: 'absolute', top: '10%', left: '-100px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(13,110,56,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto',
          opacity: sectionVisible ? 1 : 0,
          transform: sectionVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            backgroundColor: '#dcfce7', color: '#15803d',
            padding: '0.4rem 1rem', borderRadius: '9999px',
            fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase', marginBottom: '1rem',
            border: '1px solid rgba(22,163,74,0.2)',
          }}>
            🏛️ Layanan Publik Digital
          </div>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
            fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em',
          }}>
            Portal Sistem Informasi Manajemen Agro Modern
          </h2>
        </div>

        {/* Portal Container - 6 Tiles */}
        <div
          style={{
            background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
            borderRadius: '28px',
            padding: '3rem 2.5rem',
            marginBottom: '2.5rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
            border: '1px solid rgba(255,255,255,0.5)',
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(35px)',
            transition: 'all 0.7s 0.15s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.25rem',
            maxWidth: '780px',
            margin: '0 auto',
          }}
            className="portal-grid"
          >
            {serviceTiles.map((tile, i) => {
              const IconComp = tile.icon;
              const isHover = hoveredTile === tile.id;
              return (
                <div
                  key={tile.id}
                  onClick={() => { setSelectedService(tile); setSubmitted(null); }}
                  onMouseOver={() => setHoveredTile(tile.id)}
                  onMouseOut={() => setHoveredTile(null)}
                  style={{
                    backgroundColor: isHover ? '#ffffff' : 'rgba(255,255,255,0.55)',
                    borderRadius: '18px',
                    padding: '2rem 1.2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    cursor: 'pointer',
                    border: isHover ? `2px solid ${tile.color}40` : '2px solid rgba(255,255,255,0.4)',
                    boxShadow: isHover ? `0 16px 36px ${tile.color}25` : '0 4px 12px rgba(0,0,0,0.04)',
                    transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                    transform: isHover ? 'translateY(-8px) scale(1.04)' : 'translateY(0) scale(1)',
                    animation: sectionVisible ? `fadeInUp 0.5s ${i * 0.08 + 0.3}s both` : 'none',
                    opacity: sectionVisible ? undefined : 0,
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {/* Icon with colored bg */}
                  <div style={{
                    width: '64px', height: '64px', borderRadius: '18px',
                    backgroundColor: isHover ? tile.bgColor : 'rgba(255,255,255,0.6)',
                    color: tile.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1rem',
                    boxShadow: isHover ? `0 6px 16px ${tile.color}30` : 'none',
                    transition: 'all 0.3s ease',
                    transform: isHover ? 'scale(1.1)' : 'scale(1)',
                  }}>
                    <IconComp size={34} strokeWidth={1.8} />
                  </div>
                  <h3 style={{
                    fontSize: '1rem', fontWeight: 800,
                    color: isHover ? tile.color : '#1e293b',
                    lineHeight: 1.3, transition: 'color 0.2s ease',
                  }}>
                    {tile.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sub-text */}
        <p style={{
          textAlign: 'center', fontSize: '0.88rem', color: '#64748b', marginBottom: '1.2rem',
          opacity: sectionVisible ? 1 : 0, transition: 'opacity 0.7s 0.5s ease',
        }}>
          Sudah pernah mengajukan permohonan layanan? Cek kode layanan disini.
        </p>

        {/* Track Layanan Search */}
        <form
          onSubmit={handleTrack}
          style={{
            maxWidth: '720px', margin: '0 auto',
            backgroundColor: '#ffffff', borderRadius: '9999px',
            padding: '0.4rem 0.4rem 0.4rem 1.4rem',
            display: 'flex', alignItems: 'center', gap: '0.8rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            border: '2px solid #e2e8f0',
            opacity: sectionVisible ? 1 : 0,
            transition: 'opacity 0.7s 0.55s ease, border-color 0.25s ease',
          }}
        >
          <Search size={20} color="#94a3b8" style={{ flexShrink: 0 }} />
          <input
            type="text"
            value={trackInput}
            onChange={(e) => setTrackInput(e.target.value)}
            placeholder="Masukkan Nomor Resi / Kode Permohonan Layanan..."
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: '0.92rem', color: '#1e293b', backgroundColor: 'transparent' }}
          />
          <button
            type="submit"
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: '#ffffff', padding: '0.75rem 1.6rem',
              borderRadius: '9999px', fontWeight: 700, fontSize: '0.88rem',
              boxShadow: '0 4px 14px rgba(16,185,129,0.3)', whiteSpace: 'nowrap',
              transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Lacak Layanan
          </button>
        </form>
      </div>

      {/* Service Form Modal */}
      {selectedService && (
        <div style={{
          position: 'fixed', inset: 0,
          backgroundColor: 'rgba(15,23,42,0.7)',
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2000, padding: '1.5rem',
        }} onClick={() => setSelectedService(null)}>
          <div
            style={{
              backgroundColor: '#ffffff', borderRadius: '24px',
              maxWidth: '540px', width: '100%',
              padding: '2rem', position: 'relative',
              boxShadow: '0 30px 60px -12px rgba(0,0,0,0.3)',
              animation: 'scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1)',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top color bar */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '5px',
              borderRadius: '24px 24px 0 0', backgroundColor: selectedService.color,
            }} />

            <button onClick={() => setSelectedService(null)} style={{
              position: 'absolute', top: '1.2rem', right: '1.2rem',
              backgroundColor: '#f1f5f9', border: 'none', borderRadius: '50%',
              width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#64748b', transition: 'all 0.2s ease',
            }}>
              <X size={18} />
            </button>

            {!submitted ? (
              <>
                <div style={{ marginBottom: '1.5rem', marginTop: '0.5rem' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '14px',
                    backgroundColor: selectedService.bgColor,
                    color: selectedService.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '0.8rem',
                  }}>
                    <selectedService.icon size={26} strokeWidth={1.8} />
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                    Layanan {selectedService.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>
                    {selectedService.desc}
                  </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { key: 'nama', label: 'Nama Lengkap / Kelompok Tani *', placeholder: 'Contoh: Pak Budi / Poktan Tani Makmur', type: 'text', required: true },
                    { key: 'telepon', label: 'Nomor WhatsApp *', placeholder: '0812xxxx', type: 'tel', required: true },
                    { key: 'instansi', label: 'Asal Daerah / Instansi', placeholder: 'Sleman / Bantul / UGM', type: 'text', required: false },
                  ].map((f) => (
                    <div key={f.key}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>{f.label}</label>
                      <input
                        type={f.type}
                        required={f.required}
                        value={formData[f.key]}
                        onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                        placeholder={f.placeholder}
                        style={{
                          width: '100%', padding: '0.7rem 0.9rem', borderRadius: '10px',
                          border: '1.5px solid #e2e8f0', fontSize: '0.9rem', outline: 'none',
                          transition: 'border-color 0.2s ease',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = selectedService.color)}
                        onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>Detail Permohonan *</label>
                    <textarea
                      rows={3} required
                      value={formData.pesan}
                      onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
                      placeholder="Jelaskan kebutuhan permohonan layanan secara singkat..."
                      style={{
                        width: '100%', padding: '0.7rem 0.9rem', borderRadius: '10px',
                        border: '1.5px solid #e2e8f0', fontSize: '0.9rem', resize: 'vertical', outline: 'none',
                        transition: 'border-color 0.2s ease',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = selectedService.color)}
                      onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      marginTop: '0.4rem',
                      background: `linear-gradient(135deg, ${selectedService.color}, ${selectedService.color}cc)`,
                      color: '#ffffff', padding: '0.85rem', borderRadius: '12px',
                      fontWeight: 700, fontSize: '0.93rem',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                      boxShadow: `0 6px 18px ${selectedService.color}40`,
                      transition: 'all 0.25s ease', cursor: 'pointer',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                  >
                    <Send size={18} />
                    <span>Kirim Permohonan</span>
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#16a34a',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem',
                  animation: 'bounceIn 0.6s cubic-bezier(0.36,0.07,0.19,0.97)',
                }}>
                  <CheckCircle size={38} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>
                  Permohonan Berhasil Dikirim!
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1.2rem' }}>
                  Terima kasih, <strong>{submitted.nama}</strong>. Permohonan layanan <strong>{submitted.service}</strong> Anda telah tercatat.
                </p>
                <div style={{ backgroundColor: '#f1f5f9', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.3rem' }}>Simpan Nomor Resi:</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0d6e38', letterSpacing: '0.05em' }}>{submitted.code}</div>
                </div>
                <button
                  onClick={() => { setSelectedService(null); setSubmitted(null); }}
                  style={{
                    backgroundColor: '#0f172a', color: '#ffffff',
                    padding: '0.75rem 1.5rem', borderRadius: '9999px',
                    fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer',
                  }}
                >
                  Tutup
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tracking Result Modal */}
      {trackResult && (
        <div style={{
          position: 'fixed', inset: 0,
          backgroundColor: 'rgba(15,23,42,0.7)',
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2000, padding: '1.5rem',
        }} onClick={() => setTrackResult(null)}>
          <div
            style={{
              backgroundColor: '#ffffff', borderRadius: '24px',
              maxWidth: '500px', width: '100%',
              padding: '2rem', position: 'relative',
              boxShadow: '0 30px 60px -12px rgba(0,0,0,0.3)',
              animation: 'scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setTrackResult(null)} style={{
              position: 'absolute', top: '1.2rem', right: '1.2rem',
              backgroundColor: '#f1f5f9', border: 'none', borderRadius: '50%',
              width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#64748b',
            }}>
              <X size={18} />
            </button>

            <div style={{ display: 'flex', gap: '0.9rem', marginBottom: '1.3rem' }}>
              <div style={{
                width: '50px', height: '50px', borderRadius: '14px',
                background: 'linear-gradient(135deg, #e0f2fe, #bae6fd)',
                color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <FileCheck size={24} />
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0284c7', backgroundColor: '#e0f2fe', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                  {trackResult.kode}
                </span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginTop: '0.25rem' }}>{trackResult.layanan}</h3>
              </div>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '12px', fontSize: '0.85rem', marginBottom: '1.2rem', lineHeight: 1.6 }}>
              <div><span style={{ color: '#64748b' }}>Pemohon: </span><strong>{trackResult.pemohon}</strong></div>
              <div><span style={{ color: '#64748b' }}>Tanggal: </span><strong>{trackResult.tanggal}</strong></div>
              <div><span style={{ color: '#64748b' }}>Status: </span><strong style={{ color: '#10b981' }}>{trackResult.status}</strong></div>
            </div>
            <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.55, marginBottom: '1.5rem' }}>
              <strong>Catatan:</strong> {trackResult.catatan}
            </p>
            <button
              onClick={() => setTrackResult(null)}
              style={{
                width: '100%', background: 'linear-gradient(135deg, #0d6e38, #10b981)',
                color: '#ffffff', padding: '0.75rem', borderRadius: '10px',
                fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
              }}
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 700px) {
          .portal-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .portal-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
