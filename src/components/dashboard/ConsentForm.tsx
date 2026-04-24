'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SignaturePad from './SignaturePad';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { Loader2, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export default function ConsentForm({ onComplete }: { onComplete?: () => void }) {
  const { user } = useAuth();
  const [signed, setSigned] = useState(false);
  const [signatureName, setSignatureName] = useState('');
  const [anonymousEmail, setAnonymousEmail] = useState('');
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSign = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailToUse = user?.email || anonymousEmail;
    
    if (!signatureName.trim() || !signatureData || !emailToUse) {
      alert('Por favor, complete todos los campos y realice su firma.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Guardamos la firma directamente como Base64 en Firestore
      // Esto evita usar Firebase Storage y posibles problemas de pago/cuotas
      await addDoc(collection(db, 'consents'), {
        userId: user?.uid || 'anonymous',
        userName: signatureName,
        userEmail: emailToUse,
        signatureBase64: signatureData, // Guardamos el string base64 aquí
        signedAt: serverTimestamp(),
        documentType: 'Consentimiento Informado',
        status: 'signed'
      });

      setSigned(true);
      if (onComplete) {
        setTimeout(onComplete, 3000);
      }
    } catch (error) {
      console.error("Error saving consent:", error);
      alert("Hubo un error al guardar su firma. Por favor intente de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-panel" style={{ 
      border: '1px solid rgba(212, 175, 55, 0.1)', 
      position: 'relative', 
      maxWidth: '900px', 
      margin: '0 auto',
      padding: '4rem',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      boxShadow: 'var(--shadow-soft)'
    }}>
      {/* ... (rest of the header and content remains same) ... */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-gold)', marginBottom: '1rem' }}
        >
          <ShieldCheck size={20} />
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.7rem', fontWeight: 700 }}>Documento Oficial</span>
        </motion.div>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem', lineHeight: 1.1 }}>Consentimiento <span className="premium-gold-text">Informado</span></h2>
        <div style={{ width: '60px', height: '2px', backgroundColor: 'var(--primary-gold)', margin: '0 auto 1.5rem' }}></div>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Este documento garantiza la excelencia y seguridad en su ritual de bienestar.
        </p>
      </div>
      
      <div style={{ 
        height: '350px', 
        overflowY: 'auto', 
        paddingRight: '1.5rem',
        marginBottom: '3rem',
        fontSize: '0.95rem',
        color: 'var(--text-muted)',
        lineHeight: 1.8,
        textAlign: 'justify',
        border: '1px solid #f0f0f0',
        padding: '2.5rem',
        backgroundColor: '#fff',
        borderRadius: '0',
        boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.02)'
      }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
             <div style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid var(--primary-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'var(--primary-gold)', fontWeight: 700 }}>01</div>
             <h4 style={{ color: 'var(--text-dark)', margin: 0, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.1em' }}>Propósito del Tratamiento</h4>
          </div>
          <p>El Centro de Belleza Verónica Santillana se compromete a utilizar únicamente productos orgánicos y biotecnológicos de grado médico. Nuestros rituales han sido diseñados meticulosamente para promover la regeneración celular y la relajación profunda del sistema nervioso central, asegurando resultados visibles desde la primera sesión.</p>
        </div>
        
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
             <div style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid var(--primary-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'var(--primary-gold)', fontWeight: 700 }}>02</div>
             <h4 style={{ color: 'var(--text-dark)', margin: 0, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.1em' }}>Declaración de Salud y Compromiso</h4>
          </div>
          <p>Al firmar este documento, el usuario declara bajo juramento no padecer enfermedades infectocontagiosas ni alergias no declaradas previamente. Se compromete formalmente a informar de cualquier cambio en su medicación o estado físico antes de cada sesión para ajustar los protocolos de seguridad pertinentes.</p>
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
             <div style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid var(--primary-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'var(--primary-gold)', fontWeight: 700 }}>03</div>
             <h4 style={{ color: 'var(--text-dark)', margin: 0, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.1em' }}>Protección de Datos y Confidencialidad</h4>
          </div>
          <p>La información recopilada será tratada bajo los más estrictos estándares de la Ley de Protección de Datos. Sus registros se utilizarán exclusivamente para personalizar su experiencia sensorial y mejorar los resultados clínicos de sus tratamientos futuros.</p>
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
            style={{ 
              border: '1px solid #f0f0f0', 
              padding: '3rem',
              backgroundColor: 'var(--accent-white)'
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: user ? '1fr' : '1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
              <div>
                <label htmlFor="signature-name" style={{ 
                  display: 'block', 
                  fontSize: '0.75rem', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.25em', 
                  fontWeight: 700,
                  marginBottom: '1rem',
                  color: 'var(--text-dark)'
                }}>Nombre Completo:</label>
                <input
                  type="text"
                  id="signature-name"
                  required
                  value={signatureName}
                  onChange={(e) => setSignatureName(e.target.value)}
                  placeholder="ESCRIBA SU NOMBRE"
                  style={{
                    width: '100%',
                    padding: '1rem 0',
                    border: 'none',
                    borderBottom: '1px solid var(--primary-gold)',
                    background: 'transparent',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.2rem',
                    fontStyle: 'italic',
                    outline: 'none',
                    color: 'var(--text-dark)'
                  }}
                />
              </div>
              {!user && (
                <div>
                  <label htmlFor="anonymous-email" style={{ 
                    display: 'block', 
                    fontSize: '0.75rem', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.25em', 
                    fontWeight: 700,
                    marginBottom: '1rem',
                    color: 'var(--text-dark)'
                  }}>Correo Electrónico:</label>
                  <input
                    type="email"
                    id="anonymous-email"
                    required
                    value={anonymousEmail}
                    onChange={(e) => setAnonymousEmail(e.target.value)}
                    placeholder="EMAIL@EJEMPLO.COM"
                    style={{
                      width: '100%',
                      padding: '1rem 0',
                      border: 'none',
                      borderBottom: '1px solid var(--primary-gold)',
                      background: 'transparent',
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.2rem',
                      fontStyle: 'italic',
                      outline: 'none',
                      color: 'var(--text-dark)'
                    }}
                  />
                </div>
              )}
            </div>

            <div style={{ marginBottom: '3rem' }}>
              <SignaturePad 
                onSave={(data) => setSignatureData(data)} 
                onClear={() => setSignatureData(null)} 
              />
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="gold-button" 
              style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', padding: '1.5rem' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? <><Loader2 className="animate-spin" size={20} /> PROCESANDO FIRMA...</> : <><CheckCircle2 size={20} /> CONFIRMAR Y FIRMAR DOCUMENTO</>}
            </motion.button>
          </motion.form>
        ) : (
          /* ... (signed state remains same) ... */
          <motion.div 
            key="signed-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ 
              textAlign: 'center', 
              padding: '5rem 2rem', 
              backgroundColor: 'var(--text-dark)', 
              color: 'white',
              borderRadius: '0',
              backgroundImage: 'radial-gradient(circle at center, #222 0%, #1A1A1A 100%)'
            }}
          >
            <motion.div 
              initial={{ rotate: -10, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              style={{ fontSize: '5rem', marginBottom: '2rem' }}
            >
              ⚜️
            </motion.div>
            <h3 style={{ color: 'var(--primary-gold)', fontSize: '2.2rem', marginBottom: '1.5rem', letterSpacing: '0.1em' }}>CERTIFICADO DE FIRMA</h3>
            <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--primary-gold)', margin: '0 auto 2.5rem' }}></div>
            <p style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: '2.8rem', 
              fontStyle: 'italic',
              background: 'linear-gradient(to right, #BF953F, #FCF6BA, #AA771C)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '2rem'
            }}>
              {signatureName}
            </p>
            {signatureData && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                <img src={signatureData} alt="Firma" style={{ height: '100px', filter: 'invert(1) grayscale(1) brightness(1.5)', marginBottom: '2rem' }} />
              </motion.div>
            )}
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.3em', marginTop: '2rem' }}>
              DOCUMENTO ENCRIPTADO Y VALIDADO POR VERÓNICA SANTILLANA • {new Date().toLocaleDateString()}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
