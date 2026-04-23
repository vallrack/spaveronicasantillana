'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ConsentForm() {
  const [signed, setSigned] = useState(false);
  const [signatureName, setSignatureName] = useState('');

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    if (signatureName.trim()) {
      setSigned(true);
    }
  };

  return (
    <div className="glass-panel" style={{ border: 'none', position: 'relative' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Contrato de <span className="premium-gold-text">Confidencialidad</span></h2>
        <p style={{ fontSize: '0.9rem' }}>Por favor, lea atentamente los términos de su ritual antes de proceder con la firma digital.</p>
      </div>
      
      <div style={{ 
        height: '400px', 
        overflowY: 'auto', 
        paddingRight: '2rem',
        marginBottom: '3rem',
        fontSize: '1rem',
        color: 'var(--text-muted)',
        textAlign: 'justify'
      }}>
        <div style={{ marginBottom: '3rem' }}>
          <h4 style={{ color: 'var(--text-dark)', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>I. Propósito del Tratamiento</h4>
          <p>El Centro de Belleza Verónica Santillana se compromete a utilizar únicamente productos orgánicos y biotecnológicos de grado médico. Los rituales están diseñados para promover la regeneración celular y la relajación profunda del sistema nervioso.</p>
        </div>
        
        <div style={{ marginBottom: '3rem' }}>
          <h4 style={{ color: 'var(--text-dark)', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>II. Declaración de Salud</h4>
          <p>El usuario declara no padecer enfermedades infectocontagiosas ni alergias no declaradas previamente. Se compromete a informar de cualquier cambio en su medicación o estado físico antes de cada sesión.</p>
        </div>
        
        <div style={{ marginBottom: '3rem' }}>
          <h4 style={{ color: 'var(--text-dark)', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>III. Política de Privacidad</h4>
          <p>La información recopilada será tratada bajo los más estrictos estándares de confidencialidad, utilizada exclusivamente para personalizar su experiencia y mejorar los resultados de sus tratamientos.</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!signed ? (
          <motion.form 
            key="sign-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onSubmit={handleSign}
            style={{ borderTop: '1px solid #eee', paddingTop: '3rem' }}
          >
            <div style={{ marginBottom: '2rem' }}>
              <label htmlFor="signature" style={{ 
                display: 'block', 
                fontSize: '0.7rem', 
                textTransform: 'uppercase', 
                letterSpacing: '0.2em', 
                fontWeight: 700,
                marginBottom: '1rem' 
              }}>Firma Digital (Escriba su nombre completo)</label>
              <input
                type="text"
                id="signature"
                required
                value={signatureName}
                onChange={(e) => setSignatureName(e.target.value)}
                placeholder="Firma aquí..."
                style={{
                  width: '100%',
                  padding: '1.5rem 0',
                  border: 'none',
                  borderBottom: '2px solid var(--primary-gold)',
                  background: 'transparent',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2rem',
                  fontStyle: 'italic',
                  outline: 'none',
                  color: 'var(--text-dark)'
                }}
              />
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="gold-button" 
              style={{ width: '100%' }}
            >
              Confirmar y Firmar
            </motion.button>
          </motion.form>
        ) : (
          <motion.div 
            key="signed-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ 
              textAlign: 'center', 
              padding: '4rem 2rem', 
              backgroundColor: 'var(--text-dark)', 
              color: 'white',
              borderRadius: '0'
            }}
          >
            <motion.div 
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{ fontSize: '4rem', marginBottom: '1.5rem' }}
            >
              🖋️
            </motion.div>
            <h3 style={{ color: 'var(--primary-gold)', fontSize: '2rem', marginBottom: '1rem' }}>Ritual Autorizado</h3>
            <p style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: '2.5rem', 
              fontStyle: 'italic',
              background: 'linear-gradient(to right, #BF953F, #FCF6BA, #AA771C)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.5rem'
            }}>
              {signatureName}
            </p>
            <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              Documento encriptado y validado el {new Date().toLocaleDateString()}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
