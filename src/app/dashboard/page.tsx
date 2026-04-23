'use client';

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ConsentForm from '@/components/dashboard/ConsentForm';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fcfcfc' }}>
      <Header />
      <div style={{ flex: 1, padding: '6rem 2rem' }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '5rem' }}
          >
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.7rem', color: 'var(--primary-gold)', fontWeight: 700 }}>Bienvenida de vuelta</span>
            <h1 style={{ fontSize: '4rem', marginTop: '1rem' }}>Sra. <span className="premium-gold-text">Santillana</span></h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Tu espacio personal de rituales y bienestar.</p>
          </motion.div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4rem' }}>
            {/* Sidebar info - Innovative vertical layout */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ gridColumn: '1 / span 3', display: 'flex', flexDirection: 'column', gap: '3rem' }}
            >
              <div>
                <h4 style={{ marginBottom: '1.5rem', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--primary-gold)' }}>Estado de Cuenta</h4>
                <div style={{ fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
                    <span>Nivel</span>
                    <span style={{ fontWeight: 700 }}>Diamond Elite</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
                    <span>Puntos</span>
                    <span style={{ fontWeight: 700 }}>2,450</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '1.5rem', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--primary-gold)' }}>Menú Privado</h4>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <li><a href="#" className="nav-link-premium">Mis Rituales Reservados</a></li>
                  <li><a href="#" className="nav-link-premium">Historial de Belleza</a></li>
                  <li><a href="#" className="nav-link-premium">Configuración de Perfil</a></li>
                  <li><a href="#" className="nav-link-premium" style={{ color: '#d9534f' }}>Cerrar Sesión</a></li>
                </ul>
              </div>

              <style jsx>{`
                .nav-link-premium {
                  color: var(--text-dark);
                  text-decoration: none;
                  transition: all 0.3s ease;
                  display: block;
                  padding: 0.5rem 0;
                  border-left: 2px solid transparent;
                }
                .nav-link-premium:hover {
                  color: var(--primary-gold);
                  padding-left: 1rem;
                  border-left-color: var(--primary-gold);
                }
              `}</style>
            </motion.div>
            
            {/* Main content - Consent Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ gridColumn: '5 / span 8' }}
            >
              <ConsentForm />
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
