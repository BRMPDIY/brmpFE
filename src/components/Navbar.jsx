import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X, Leaf } from 'lucide-react';

export default function Navbar({ onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('beranda');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'beranda', label: 'Beranda', href: '#beranda' },
    { id: 'track-layanan', label: 'Lacak Layanan', href: '#lab-tracking' },
    { id: 'permohonan', label: 'Permohonan Layanan', href: '#portal-layanan' },
    { id: 'tentang', label: 'Tentang Kami', href: '#tentang' },
    { id: 'konsultasi', label: 'Konsultasi Ahli', href: '#konsultasi' },
  ];

  const handleNavClick = (id, href) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    if (onNavigate) onNavigate(id);
    const elem = document.querySelector(href);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: isScrolled ? '#ffffff' : 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: isScrolled
          ? '0 4px 30px rgba(13,110,56,0.1), 0 1px 0 rgba(13,110,56,0.08)'
          : '0 2px 12px rgba(0,0,0,0.04)',
        transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
        borderBottom: isScrolled ? '1px solid rgba(16,185,129,0.15)' : '1px solid rgba(0,0,0,0.04)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-20px)',
      }}
    >
      {/* Animated green accent line at top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #0d6e38, #10b981, #fbbf24, #10b981, #0d6e38)',
          backgroundSize: '300% 100%',
          animation: 'gradientShift 4s ease infinite',
        }}
      />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0.85rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Logo */}
        <a
          href="#beranda"
          onClick={(e) => { e.preventDefault(); handleNavClick('beranda', '#beranda'); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.9rem',
            textDecoration: 'none',
            transition: 'transform 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <img
            src="/images/brmp_emblem.png"
            alt="BRMP DIY Emblem"
            style={{
              height: '48px',
              width: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.14))',
              transition: 'filter 0.3s ease',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#0d6e38', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
              BRMP DIY
            </span>
            <span style={{ fontSize: '0.62rem', fontWeight: 700, color: '#10b981', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              AGRO MODERN
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: 'none', alignItems: 'center', gap: '0.25rem' }}>
          {navLinks.map((link, i) => {
            const isActive = activeTab === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.id, link.href); }}
                style={{
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#0d6e38' : '#374151',
                  position: 'relative',
                  padding: '0.5rem 0.85rem',
                  borderRadius: '10px',
                  backgroundColor: isActive ? 'rgba(13,110,56,0.08)' : 'transparent',
                  transition: 'all 0.2s ease',
                  animation: `fadeInUp 0.5s ${i * 0.06}s both`,
                }}
                onMouseOver={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(13,110,56,0.06)';
                  e.currentTarget.style.color = '#0d6e38';
                }}
                onMouseOut={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = isActive ? '#0d6e38' : '#374151';
                }}
              >
                {link.label}
                {isActive && (
                  <span style={{
                    position: 'absolute', bottom: '4px', left: '50%',
                    transform: 'translateX(-50%)', width: '4px', height: '4px',
                    borderRadius: '50%', backgroundColor: '#0d6e38',
                    animation: 'bounceIn 0.4s ease',
                  }} />
                )}
              </a>
            );
          })}
        </nav>

        {/* CTA + Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <a
            href="#portal-layanan"
            onClick={(e) => { e.preventDefault(); handleNavClick('permohonan', '#portal-layanan'); }}
            className="btn-ripple"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'linear-gradient(135deg, #d97706, #b45309)',
              color: '#ffffff',
              padding: '0.65rem 1.3rem',
              borderRadius: '9999px',
              fontSize: '0.88rem',
              fontWeight: 700,
              boxShadow: '0 4px 14px rgba(217,119,6,0.35)',
              transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
              animation: 'fadeInUp 0.5s 0.3s both',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.04)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(217,119,6,0.45)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(217,119,6,0.35)';
            }}
          >
            <span>Mulai Sekarang</span>
            <ArrowRight size={15} />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
            className="mobile-toggle"
            style={{
              display: 'flex',
              padding: '0.5rem',
              borderRadius: '10px',
              backgroundColor: '#f3f4f6',
              color: '#1f2937',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e5e7eb')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
          >
            <div style={{ transition: 'transform 0.3s ease', transform: mobileMenuOpen ? 'rotate(90deg)' : 'rotate(0)' }}>
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div style={{
        maxHeight: mobileMenuOpen ? '400px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.4s cubic-bezier(0.22,1,0.36,1)',
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderTop: '1px solid #f3f4f6',
          padding: mobileMenuOpen ? '1rem 1.5rem 1.5rem' : '0 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.id, link.href); }}
              style={{
                fontSize: '1rem',
                fontWeight: activeTab === link.id ? 700 : 500,
                color: activeTab === link.id ? '#0d6e38' : '#374151',
                padding: '0.7rem 1rem',
                borderRadius: '10px',
                backgroundColor: activeTab === link.id ? 'rgba(13,110,56,0.08)' : 'transparent',
                transition: 'all 0.2s ease',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
