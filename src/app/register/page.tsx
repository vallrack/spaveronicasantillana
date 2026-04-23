'use client';

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import RegisterForm from '@/components/forms/RegisterForm';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <section style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FAF9F6 0%, #FFFFFF 100%)',
        padding: '4rem 2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decorative elements */}
        <div style={{ 
          position: 'absolute', 
          top: '-10%', 
          right: '-5%', 
          width: '400px', 
          height: '400px', 
          borderRadius: '50%', 
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
          zIndex: 0
        }} />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
          className="glass-panel" 
          style={{ maxWidth: '600px', width: '100%', position: 'relative', zIndex: 1, border: 'none' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.7rem', color: 'var(--primary-gold)', fontWeight: 700 }}>Membresía Elite</span>
            <h1 style={{ marginTop: '1rem', fontSize: '3rem' }}>Únete a <span className="premium-gold-text">Nosotros</span></h1>
            <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
              Comienza tu viaje hacia el bienestar total hoy mismo.
            </p>
          </div>
          <RegisterForm />
        </motion.div>
      </section>
      <Footer />
    </main>
  );
}
