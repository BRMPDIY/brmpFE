import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, BookOpen, Sparkles, Shield, Leaf } from 'lucide-react';

function Particle({ style }) {
  return <div className="particle" style={style} />;
}

export default function Hero({ onOpenBenihModal, onOpenGuideModal }) {
  const [loaded, setLoaded] = useState(false);
  const particles = useRef(
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      size: Math.random() * 14 + 4,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${Math.random() * 14 + 10}s`,
    }))
  ).current;

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="beranda"
      style={{
        position: 'relative',
        minHeight: '92vh',
        paddingTop: '90px',
        paddingBottom: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url('/images/hero_background.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#ffffff',
        overflow: 'hidden',
      }}
    >
      {/* Multi-layer gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(5,56,27,0.94) 0%, rgba(13,110,56,0.80) 50%, rgba(4,47,68,0.88) 100%)',
        zIndex: 1,
      }} />

      {/* Animated dot-grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.12) 1.5px, transparent 1.5px)',
        backgroundSize: '28px 28px',
        pointerEvents: 'none',
      }} />

      {/* Glowing orbs */}
      <div style={{
        position: 'absolute', top: '15%', right: '12%', zIndex: 2,
        width: '420px', height: '420px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,185,129,0.22) 0%, transparent 70%)',
        filter: 'blur(40px)',
        animation: 'pulseGlow 6s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '8%', zIndex: 2,
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(251,191,36,0.18) 0%, transparent 70%)',
        filter: 'blur(50px)',
        animation: 'pulseGlow 8s 2s ease-in-out infinite',
      }} />

      {/* Floating Particles */}
      {particles.map((p) => (
        <Particle key={p.id} style={{
          width: `${p.size}px`, height: `${p.size}px`,
          left: p.left, bottom: '-20px',
          animationDuration: p.duration,
          animationDelay: p.delay,
          zIndex: 2,
        }} />
      ))}

      <div
        style={{
          maxWidth: '1280px',
          width: '100%',
          margin: '0 auto',
          padding: '2rem 1.5rem',
          display: 'grid',
          gridTemplateColumns: '1.15fr 0.85fr',
          gap: '3rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 3,
        }}
        className="hero-grid"
      >
        {/* LEFT: Text Content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {/* Badge */}
          <div
            className="glass"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.5rem 1.1rem',
              borderRadius: '9999px',
              fontSize: '0.76rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#7dd3fc',
              marginBottom: '1.6rem',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s 0.1s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <Sparkles size={14} color="#38bdf8" style={{ animation: 'spin 4s linear infinite' }} />
            <span>SISTEM INFORMASI TERPADU</span>
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              marginBottom: '1.2rem',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.7s 0.2s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            APLIKASI INFORMASI <br />
            TERPADU <br />
            <span className="gradient-text">AGROMODERN</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
              fontWeight: 400,
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.88)',
              maxWidth: '580px',
              marginBottom: '2.2rem',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(25px)',
              transition: 'all 0.7s 0.32s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            Satu pintu untuk pengelolaan, pemantauan, pengawasan, mutu benih tanaman, dan layanan modernisasi pertanian di Daerah Istimewa Yogyakarta.
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s 0.44s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <a
              href="#informasi-benih"
              onClick={(e) => {
                e.preventDefault();
                const elem = document.querySelector('#informasi-benih');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-ripple card-shine"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: 'linear-gradient(135deg, #10b981, #0d6e38)',
                color: '#ffffff',
                padding: '0.9rem 1.75rem',
                borderRadius: '9999px',
                fontSize: '0.95rem',
                fontWeight: 700,
                boxShadow: '0 8px 24px rgba(13,110,56,0.45), inset 0 1px 0 rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.15)',
                transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                textDecoration: 'none',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.04)';
                e.currentTarget.style.boxShadow = '0 16px 35px rgba(13,110,56,0.55)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(13,110,56,0.45), inset 0 1px 0 rgba(255,255,255,0.2)';
              }}
            >
              <Leaf size={18} />
              <span>Layanan Perbenihan</span>
              <ChevronRight size={17} />
            </a>

            <button
              onClick={onOpenGuideModal}
              className="glass btn-ripple"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                color: '#ffffff',
                padding: '0.9rem 1.75rem',
                borderRadius: '9999px',
                fontSize: '0.95rem',
                fontWeight: 600,
                transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.04)';
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.22)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.backgroundColor = '';
              }}
            >
              <BookOpen size={18} />
              <span>Pelajari Panduan</span>
            </button>
          </div>

          {/* Quick Stats */}
          <div
            style={{
              display: 'flex',
              gap: '2rem',
              marginTop: '2.5rem',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(18px)',
              transition: 'all 0.6s 0.58s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {[
              { num: '5+', label: 'Komoditas Benih' },
              { num: '3', label: 'Lab Pengujian' },
              { num: '6', label: 'Jenis Layanan' },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fde047', lineHeight: 1 }}>{stat.num}</div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', marginTop: '0.2rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Emblem */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateX(0)' : 'translateX(40px)',
            transition: 'all 0.8s 0.3s cubic-bezier(0.22,1,0.36,1)',
          }}
          className="hero-emblem-container"
        >
          {/* Ring 1 (outer rotating) */}
          <div style={{
            position: 'absolute',
            width: 'clamp(310px, 36vw, 420px)',
            height: 'clamp(310px, 36vw, 420px)',
            borderRadius: '50%',
            border: '2px dashed rgba(255,255,255,0.2)',
            animation: 'spin 30s linear infinite',
            zIndex: 1,
          }} />
          {/* Ring 2 counter-rotating */}
          <div style={{
            position: 'absolute',
            width: 'clamp(260px, 30vw, 360px)',
            height: 'clamp(260px, 30vw, 360px)',
            borderRadius: '50%',
            border: '1.5px dashed rgba(251,191,36,0.3)',
            animation: 'spin 20s linear infinite reverse',
            zIndex: 1,
          }} />

          {/* Glow halo */}
          <div style={{
            position: 'absolute',
            width: 'clamp(240px, 28vw, 340px)',
            height: 'clamp(240px, 28vw, 340px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(234,179,8,0.4) 0%, transparent 70%)',
            filter: 'blur(30px)',
            zIndex: 1,
            animation: 'pulseGlow 4s ease-in-out infinite',
          }} />

          {/* Emblem Image */}
          <div
            className="animate-float-rotate"
            style={{
              position: 'relative',
              zIndex: 2,
              width: 'clamp(240px, 30vw, 340px)',
            }}
          >
            <img
              src="/images/brmp_emblem.png"
              alt="Logo Resmi BRMP DIY"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.5)) drop-shadow(0 0 30px rgba(234,179,8,0.4))',
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 4, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" style={{ width: '100%', height: '80px' }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#ffffff" />
        </svg>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; text-align: center; }
          .hero-grid > div:first-child { align-items: center !important; }
          .hero-emblem-container { margin-top: 2rem; }
        }
      `}</style>
    </section>
  );
}
