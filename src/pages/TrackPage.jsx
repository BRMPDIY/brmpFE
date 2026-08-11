import React, { useState } from 'react';
import { Search, CheckCircle, Clock, Download, X, FlaskConical, FileText, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LAB_STEPS = [
  'Pengajuan Diterima',
  'Verifikasi Dokumen',
  'Pengujian Sampel',
  'Analisis Hasil',
  'Laporan Selesai',
];

const labDatabase = [
  {
    code: 'LAB-2026-001', type: 'lab',
    title: 'Uji Mutu & Daya Kecambah Benih Padi Ciherang',
    pemohon: 'Kelompok Tani Sido Mulyo, Sleman',
    tanggalMasuk: '02 Agustus 2026',
    estimasiSelesai: '18 Agustus 2026',
    step: 4,
    parameter: [
      { nama: 'Daya Kecambah', nilai: '94%', standar: '≥ 80%', status: 'Memenuhi' },
      { nama: 'Kemurnian Benih', nilai: '99.2%', standar: '≥ 98%', status: 'Memenuhi' },
      { nama: 'Kadar Air', nilai: '11.5%', standar: '≤ 13%', status: 'Memenuhi' },
    ],
  },
  {
    code: 'LAB-2026-002', type: 'lab',
    title: 'Uji Kemurnian & Kadar Air Benih Jagung Hibrida',
    pemohon: 'Dinas Pertanian Bantul',
    tanggalMasuk: '05 Agustus 2026',
    estimasiSelesai: '12 Agustus 2026',
    step: 5,
    parameter: [
      { nama: 'Daya Kecambah', nilai: '96%', standar: '≥ 85%', status: 'Memenuhi' },
      { nama: 'Kemurnian Benih', nilai: '99.5%', standar: '≥ 99%', status: 'Memenuhi' },
    ],
  },
  {
    code: 'LAB-2026-003', type: 'lab',
    title: 'Analisis Unsur Hara Tanah Sawah Kulon Progo',
    pemohon: 'BPP Nanggulan',
    tanggalMasuk: '08 Agustus 2026',
    estimasiSelesai: '22 Agustus 2026',
    step: 3,
    parameter: [
      { nama: 'pH Tanah', nilai: '6.5', standar: '6.0–7.0', status: 'Optimal' },
      { nama: 'N-Total', nilai: '0.25%', standar: 'Sedang', status: 'Memenuhi' },
    ],
  },
];

const resiDatabase = [
  {
    code: 'REQ-8892', type: 'resi',
    layanan: 'Konsultasi Teknis Standar Benih',
    pemohon: 'Agus Setiawan',
    tanggalMasuk: '04 Agustus 2026',
    status: 'Sedang Diproses oleh Tim Pakar',
    catatan: 'Jadwal konsultasi online disiapkan pada 12 Agustus 2026.',
  },
  {
    code: 'REQ-7741', type: 'resi',
    layanan: 'Magang Mahasiswa UGM',
    pemohon: 'Dian Permata',
    tanggalMasuk: '01 Agustus 2026',
    status: 'Selesai – Surat Balasan Diterbitkan',
    catatan: 'Permohonan magang diterima untuk periode September–November 2026.',
  },
];

function LabResult({ data, onClose }) {
  return (
    <div style={{
      backgroundColor: '#ffffff', borderRadius: '20px',
      padding: '1.8rem', border: '1px solid #e2e8f0',
      boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
      animation: 'fadeInUp 0.4s cubic-bezier(0.22,1,0.36,1)',
      position: 'relative',
    }}>
      <button onClick={onClose} style={{
        position: 'absolute', top: '1rem', right: '1rem',
        backgroundColor: '#f1f5f9', border: 'none', borderRadius: '50%',
        width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: '#64748b',
      }}>
        <X size={16} />
      </button>

      {/* Header */}
      <div style={{ display: 'flex', gap: '0.9rem', marginBottom: '1.5rem' }}>
        <div style={{
          width: '52px', height: '52px', borderRadius: '14px',
          background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
          color: '#0d6e38', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <FlaskConical size={26} />
        </div>
        <div>
          <span style={{
            fontSize: '0.72rem', fontWeight: 700, color: '#0d6e38',
            backgroundColor: '#dcfce7', padding: '0.15rem 0.55rem', borderRadius: '6px',
          }}>{data.code}</span>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginTop: '0.3rem', lineHeight: 1.3 }}>{data.title}</h3>
        </div>
      </div>

      {/* Info */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Pemohon', val: data.pemohon },
          { label: 'Tgl Masuk', val: data.tanggalMasuk },
          { label: 'Est. Selesai', val: data.estimasiSelesai },
          { label: 'Tahap', val: `${data.step} / ${LAB_STEPS.length}` },
        ].map((i) => (
          <div key={i.label} style={{ backgroundColor: '#f8fafc', padding: '0.75rem', borderRadius: '10px' }}>
            <div style={{ fontSize: '0.72rem', color: '#64748b', marginBottom: '0.15rem' }}>{i.label}</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b' }}>{i.val}</div>
          </div>
        ))}
      </div>

      {/* 5-step Timeline */}
      <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '1rem' }}>Progress Pengujian:</h4>
      <div style={{ position: 'relative', marginBottom: '1.8rem' }}>
        {/* Track line */}
        <div style={{
          position: 'absolute', top: '16px', left: '24px', right: '24px',
          height: '3px', backgroundColor: '#e2e8f0', borderRadius: '2px', zIndex: 0,
        }}>
          <div style={{
            height: '100%', borderRadius: '2px',
            width: `${((data.step - 1) / (LAB_STEPS.length - 1)) * 100}%`,
            background: 'linear-gradient(90deg, #0d6e38, #10b981)',
            transition: 'width 1.2s ease',
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', zIndex: 1, position: 'relative' }}>
          {LAB_STEPS.map((step, i) => {
            const done = i + 1 <= data.step;
            const current = i + 1 === data.step;
            return (
              <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  backgroundColor: done ? '#0d6e38' : '#e2e8f0',
                  color: done ? '#ffffff' : '#94a3b8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '0.78rem',
                  boxShadow: current ? '0 0 0 4px rgba(16,185,129,0.25)' : done ? '0 4px 10px rgba(13,110,56,0.3)' : 'none',
                  transition: 'all 0.3s ease', marginBottom: '0.5rem',
                  zIndex: 2, position: 'relative',
                }}>
                  {done ? <CheckCircle size={17} /> : i + 1}
                </div>
                <span style={{
                  fontSize: '0.62rem', fontWeight: done ? 700 : 500,
                  color: done ? '#0d6e38' : '#94a3b8', textAlign: 'center', lineHeight: 1.3,
                  maxWidth: '70px',
                }}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Parameters */}
      <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.75rem' }}>Hasil Parameter Uji:</h4>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem', minWidth: '400px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9' }}>
              {['Parameter', 'Hasil', 'Standar', 'Status'].map((h) => (
                <th key={h} style={{ padding: '0.55rem 0.75rem', textAlign: 'left', fontWeight: 700, color: '#475569' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.parameter.map((p, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '0.55rem 0.75rem', fontWeight: 600, color: '#334155' }}>{p.nama}</td>
                <td style={{ padding: '0.55rem 0.75rem', color: '#0d6e38', fontWeight: 700 }}>{p.nilai}</td>
                <td style={{ padding: '0.55rem 0.75rem', color: '#64748b' }}>{p.standar}</td>
                <td style={{ padding: '0.55rem 0.75rem' }}>
                  <span style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '0.12rem 0.5rem', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 700 }}>{p.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.step === LAB_STEPS.length && (
        <button onClick={() => alert(`Mengunduh Laporan ${data.code}`)} style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          background: 'linear-gradient(135deg, #0d6e38, #10b981)',
          color: '#ffffff', padding: '0.8rem', borderRadius: '10px',
          fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
          boxShadow: '0 6px 16px rgba(13,110,56,0.25)',
        }}>
          <Download size={18} /> Unduh Laporan PDF
        </button>
      )}
    </div>
  );
}

function ResiResult({ data, onClose }) {
  return (
    <div style={{
      backgroundColor: '#ffffff', borderRadius: '20px',
      padding: '1.8rem', border: '1px solid #e2e8f0',
      boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
      animation: 'fadeInUp 0.4s cubic-bezier(0.22,1,0.36,1)',
      position: 'relative',
    }}>
      <button onClick={onClose} style={{
        position: 'absolute', top: '1rem', right: '1rem',
        backgroundColor: '#f1f5f9', border: 'none', borderRadius: '50%',
        width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: '#64748b',
      }}>
        <X size={16} />
      </button>

      <div style={{ display: 'flex', gap: '0.9rem', marginBottom: '1.3rem' }}>
        <div style={{
          width: '52px', height: '52px', borderRadius: '14px',
          background: 'linear-gradient(135deg, #e0f2fe, #bae6fd)',
          color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <FileText size={24} />
        </div>
        <div>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0284c7', backgroundColor: '#e0f2fe', padding: '0.15rem 0.55rem', borderRadius: '6px' }}>
            {data.code}
          </span>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginTop: '0.3rem' }}>{data.layanan}</h3>
        </div>
      </div>

      <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '12px', fontSize: '0.86rem', marginBottom: '1.2rem', lineHeight: 1.7 }}>
        <div><span style={{ color: '#64748b' }}>Pemohon: </span><strong>{data.pemohon}</strong></div>
        <div><span style={{ color: '#64748b' }}>Tanggal Masuk: </span><strong>{data.tanggalMasuk}</strong></div>
        <div><span style={{ color: '#64748b' }}>Status: </span>
          <strong style={{ color: data.status.includes('Selesai') ? '#0d6e38' : '#d97706' }}>{data.status}</strong>
        </div>
      </div>
      <div style={{ backgroundColor: '#fffbeb', padding: '0.9rem', borderRadius: '10px', border: '1px solid #fde68a', fontSize: '0.85rem', color: '#92400e' }}>
        📝 <strong>Catatan:</strong> {data.catatan}
      </div>
    </div>
  );
}

export default function TrackPage() {
  const [labQuery, setLabQuery] = useState('');
  const [resiQuery, setResiQuery] = useState('');
  const [labResult, setLabResult] = useState(null);
  const [resiResult, setResiResult] = useState(null);

  const searchLab = (e) => {
    e.preventDefault();
    const q = labQuery.trim().toLowerCase();
    const match = labDatabase.find((s) =>
      s.code.toLowerCase().includes(q) || s.pemohon.toLowerCase().includes(q)
    );
    setLabResult(match || { ...labDatabase[0], _notFound: true, code: q || 'NOT-FOUND' });
  };

  const searchResi = (e) => {
    e.preventDefault();
    const q = resiQuery.trim().toUpperCase();
    const match = resiDatabase.find((s) => s.code === q);
    setResiResult(match || {
      code: q || 'REQ-XXXX', type: 'resi',
      layanan: 'Permohonan Layanan Agromodern',
      pemohon: 'Pemohon Terdaftar',
      tanggalMasuk: '11 Agustus 2026',
      status: 'Dalam Verifikasi Administrasi',
      catatan: 'Nomor resi terverifikasi dalam antrean sistem BRMP DIY.',
    });
  };

  return (
    <div style={{ backgroundColor: '#ffffff', paddingTop: '80px', minHeight: '100vh' }}>
      {/* Page Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #0a3a1e 0%, #0d6e38 60%, #064e3b 100%)',
        padding: '4rem 1.5rem 5rem',
        position: 'relative', overflow: 'hidden',
        color: '#ffffff',
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
            border: '1px solid rgba(255,255,255,0.25)', color: '#7dd3fc',
          }}>
            🔍 Lacak Layanan Online
          </div>
          <h1 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800,
            letterSpacing: '-0.025em', lineHeight: 1.15, marginBottom: '0.8rem',
          }}>
            Pelacakan Layanan BRMP DIY
          </h1>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.6 }}>
            Cek status pengujian laboratorium menggunakan <strong>Nomor SPK/Kode Lab</strong>, atau lacak surat permohonan menggunakan <strong>Nomor Resi</strong>.
          </p>
        </div>
        {/* Wave */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" style={{ width: '100%', height: '60px' }}>
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#ffffff" />
          </svg>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }} className="track-grid">
          {/* LAB TRACKING */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1.2rem' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #dcfce7, #86efac)',
                color: '#0d6e38', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <FlaskConical size={20} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Tracking Lab</h2>
                <p style={{ fontSize: '0.78rem', color: '#64748b' }}>Gunakan Nomor SPK atau Kode Lab</p>
              </div>
            </div>

            <form onSubmit={searchLab} style={{
              backgroundColor: '#f8fafc', borderRadius: '14px',
              border: '2px solid #e2e8f0', overflow: 'hidden', marginBottom: '1.2rem',
              display: 'flex',
            }}>
              <input
                type="text" value={labQuery}
                onChange={(e) => setLabQuery(e.target.value)}
                placeholder="Contoh: LAB-2026-001"
                style={{
                  flex: 1, padding: '0.85rem 1rem', border: 'none', outline: 'none',
                  fontSize: '0.9rem', color: '#1e293b', backgroundColor: 'transparent',
                }}
              />
              <button type="submit" style={{
                background: 'linear-gradient(135deg, #0d6e38, #10b981)',
                color: '#fff', padding: '0.85rem 1.3rem',
                fontWeight: 700, fontSize: '0.88rem', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                transition: 'filter 0.2s ease',
              }}
                onMouseOver={(e) => (e.currentTarget.style.filter = 'brightness(1.1)')}
                onMouseOut={(e) => (e.currentTarget.style.filter = 'none')}
              >
                <Search size={16} /> Cari
              </button>
            </form>

            {/* Demo tags */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.77rem', color: '#64748b' }}>Demo:</span>
              {labDatabase.map((s) => (
                <button key={s.code} onClick={() => { setLabQuery(s.code); setLabResult(s); }} style={{
                  backgroundColor: '#f1f5f9', border: '1.5px solid #cbd5e1', borderRadius: '9999px',
                  padding: '0.15rem 0.65rem', fontSize: '0.75rem', fontWeight: 700, color: '#0d6e38',
                  cursor: 'pointer', transition: 'all 0.2s ease',
                }}
                  onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#0d6e38'; e.currentTarget.style.color = '#fff'; }}
                  onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; e.currentTarget.style.color = '#0d6e38'; }}
                >{s.code}</button>
              ))}
            </div>

            {labResult && <LabResult data={labResult} onClose={() => setLabResult(null)} />}
          </div>

          {/* RESI TRACKING */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1.2rem' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #e0f2fe, #7dd3fc)',
                color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <FileText size={20} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Tracking Resi Surat</h2>
                <p style={{ fontSize: '0.78rem', color: '#64748b' }}>Gunakan Nomor Resi Permohonan</p>
              </div>
            </div>

            <form onSubmit={searchResi} style={{
              backgroundColor: '#f8fafc', borderRadius: '14px',
              border: '2px solid #e2e8f0', overflow: 'hidden', marginBottom: '1.2rem',
              display: 'flex',
            }}>
              <input
                type="text" value={resiQuery}
                onChange={(e) => setResiQuery(e.target.value)}
                placeholder="Contoh: REQ-8892"
                style={{
                  flex: 1, padding: '0.85rem 1rem', border: 'none', outline: 'none',
                  fontSize: '0.9rem', color: '#1e293b', backgroundColor: 'transparent',
                }}
              />
              <button type="submit" style={{
                background: 'linear-gradient(135deg, #0284c7, #0ea5e9)',
                color: '#fff', padding: '0.85rem 1.3rem',
                fontWeight: 700, fontSize: '0.88rem', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                transition: 'filter 0.2s ease',
              }}
                onMouseOver={(e) => (e.currentTarget.style.filter = 'brightness(1.1)')}
                onMouseOut={(e) => (e.currentTarget.style.filter = 'none')}
              >
                <Search size={16} /> Cari
              </button>
            </form>

            {/* Demo tags */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.77rem', color: '#64748b' }}>Demo:</span>
              {resiDatabase.map((s) => (
                <button key={s.code} onClick={() => { setResiQuery(s.code); setResiResult(s); }} style={{
                  backgroundColor: '#f1f5f9', border: '1.5px solid #cbd5e1', borderRadius: '9999px',
                  padding: '0.15rem 0.65rem', fontSize: '0.75rem', fontWeight: 700, color: '#0284c7',
                  cursor: 'pointer', transition: 'all 0.2s ease',
                }}
                  onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#0284c7'; e.currentTarget.style.color = '#fff'; }}
                  onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; e.currentTarget.style.color = '#0284c7'; }}
                >{s.code}</button>
              ))}
            </div>

            {resiResult && <ResiResult data={resiResult} onClose={() => setResiResult(null)} />}
          </div>
        </div>

        {/* Back to Home */}
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
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

      <style>{`
        @media (max-width: 700px) {
          .track-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
