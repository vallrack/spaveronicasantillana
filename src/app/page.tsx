'use client';

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ParticleBackground from '@/components/common/ParticleBackground';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);

  const springConfig = { damping: 25, stiffness: 150 };
  const dx = useSpring(mouseX, springConfig);
  const dy = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [mouseX, mouseY]);

  return (
    <main style={{ backgroundColor: 'white' }}>
      <Header />
      
      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        height: isMobile ? '80vh' : '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '0 1rem',
        overflow: 'hidden',
        background: 'radial-gradient(circle at center, #ffffff 0%, #f7f3e8 100%)'
      }}>
        {!isMobile && <ParticleBackground />}
        
        {!isMobile && (
          <motion.div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 1,
              x: dx,
              y: dy,
              translateX: '-50%',
              translateY: '-50%',
            }}
          />
        )}

        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.165, 0.84, 0.44, 1] }}
          >
            <span style={{ 
              textTransform: 'uppercase', 
              letterSpacing: isMobile ? '0.3em' : '0.8em', 
              fontSize: isMobile ? '0.6rem' : '0.7rem', 
              marginBottom: '2rem', 
              display: 'block',
              fontWeight: 700,
              color: 'var(--primary-gold)'
            }}>
              Lujo • Bienestar • Armonía
            </span>
            
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 12vw, 8rem)', 
              marginBottom: '1rem', 
              lineHeight: 0.9,
              fontWeight: 900,
              color: 'var(--text-dark)'
            }}>
              Verónica <br />
              <span className="premium-gold-text" style={{ fontStyle: 'italic', fontWeight: 400 }}>Santillana</span>
            </h1>
            
            <p style={{ 
              fontSize: isMobile ? '0.9rem' : '1.1rem', 
              marginTop: '2rem',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: isMobile ? '2.5rem' : '4rem', 
              maxWidth: '700px', 
              color: 'var(--text-muted)',
              lineHeight: 1.6
            }}>
              Donde la ciencia de la piel se encuentra con el arte del bienestar.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexDirection: isMobile ? 'column' : 'row' }}>
              <Link href="/register" className="gold-button">Iniciar Experiencia</Link>
              <Link href="#rituales" className="outline-button">Ver Catálogo</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="experiencia" style={{ backgroundColor: 'var(--accent-white)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '4rem', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 style={{ fontSize: isMobile ? '2.5rem' : '4rem', marginBottom: '2rem' }}>
                Una filosofía de <span className="premium-gold-text">paz interior</span>
              </h2>
              <p>No solo transformamos tu apariencia; elevamos tu espíritu. Cada tratamiento es una oda a la sofisticación.</p>
            </motion.div>
          </div>
          <div style={{ flex: 1, width: '100%', position: 'relative', height: isMobile ? '300px' : '500px' }}>
            <Image src="/hero.png" alt="Spa Interior" fill style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* Rituales Section */}
      <section id="rituales" className="container">
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '4rem' : '8rem' }}>
          <h2 style={{ fontSize: isMobile ? '2.5rem' : '4.5rem' }}>Rituales de <span className="premium-gold-text">Luz</span></h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100%, 1fr))', gap: '2rem' }}>
          {isMobile ? (
             /* Stacked version for mobile */
             [
              { title: 'Aurum Facial', desc: 'Tratamiento con láminas de oro puro de 24k.' },
              { title: 'White Pearl Spa', desc: 'Exfoliación con polvo de perla blanca.' }
             ].map((item, i) => (
              <div key={i} style={{ padding: '2rem', border: '1px solid #eee' }}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
             ))
          ) : (
            /* Detailed version for desktop */
            [
              { title: 'Aurum Facial', desc: 'Tratamiento con láminas de oro puro de 24k para una regeneración celular profunda y luminosidad instantánea.', color: 'var(--light-gold)' },
              { title: 'White Pearl Spa', desc: 'Exfoliación con polvo de perla blanca y masajes con aceites esenciales de jazmín y neroli.', color: '#fff' }
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ scale: 1.02 }} style={{ padding: '4rem', backgroundColor: item.color, border: '1px solid rgba(212, 175, 55, 0.1)', boxShadow: 'var(--shadow-soft)' }}>
                <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>{item.title}</h3>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 2 }}>{item.desc}</p>
                <Link href="/register" style={{ marginTop: '3rem', display: 'inline-block', color: 'var(--primary-gold)', fontWeight: 700 }}>Reservar →</Link>
              </motion.div>
            ))
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
