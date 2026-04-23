'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Header() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { name: 'Inicio', href: '/' },
    { name: 'Experiencia', href: '#rituales' },
  ];

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.165, 0.84, 0.44, 1] }}
        style={{
          padding: '1.5rem 2rem',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(30px)',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(212, 175, 55, 0.1)'
        }}
      >
        <div className="logo">
          <Link href="/" style={{ fontSize: '1.1rem', fontWeight: 900, textDecoration: 'none', letterSpacing: '0.2em' }}>
            <span className="premium-gold-text">VERÓNICA <span className="mobile-hide">SANTILLANA</span></span>
          </Link>
        </div>
        
        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ position: 'relative' }}>
          <ul style={{ display: 'flex', gap: '3rem', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }}>
            {links.map((link) => (
              <li key={link.name} onMouseEnter={() => setHoveredLink(link.name)} onMouseLeave={() => setHoveredLink(null)}>
                <Link href={link.href} style={{
                  fontWeight: 700,
                  color: 'var(--text-dark)',
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  position: 'relative',
                  transition: 'color 0.3s ease'
                }}>
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/register" className="gold-button" style={{ 
                padding: '0.8rem 1.5rem', 
                fontSize: '0.65rem'
              }}>
                Reserva Elite
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.5rem',
            color: 'var(--primary-gold)',
            display: 'none'
          }}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '80%',
              height: '100vh',
              backgroundColor: 'white',
              zIndex: 1001,
              padding: '8rem 2rem',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.05)'
            }}
          >
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {links.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ fontSize: '1.5rem', fontWeight: 300, color: 'var(--text-dark)', textDecoration: 'none' }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li style={{ marginTop: '2rem' }}>
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="gold-button" style={{ width: '100%', display: 'block', textAlign: 'center' }}>
                  Reserva Elite
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none; }
          .mobile-toggle { display: block !important; }
          .mobile-hide { display: none; }
        }
      `}</style>
    </>
  );
}
