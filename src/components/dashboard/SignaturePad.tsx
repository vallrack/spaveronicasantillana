'use client';

import React, { useRef, useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Upload, Eraser, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface SignaturePadProps {
  onSave: (signatureData: string) => void;
  onClear: () => void;
}

export default function SignaturePad({ onSave, onClear }: SignaturePadProps) {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasSignature, setHasSignature] = useState(false);
  const [uploadMode, setUploadMode] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 220 });

  useEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      if (containerRef.current) {
        setCanvasSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    const observer = new ResizeObserver(updateSize);
    observer.observe(containerRef.current);
    updateSize();

    return () => observer.disconnect();
  }, []);

  const clear = () => {
    sigCanvas.current?.clear();
    setHasSignature(false);
    onClear();
  };

  const save = () => {
    if (sigCanvas.current) {
      const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
      onSave(dataURL);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onSave(event.target.result as string);
          setHasSignature(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
        <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {uploadMode ? 'Subir Imagen de Firma' : 'Dibujar Firma'}
        </h4>
        <button 
          onClick={() => setUploadMode(!uploadMode)}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: 'var(--primary-gold)', 
            fontSize: '0.7rem', 
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          {uploadMode ? 'Cambiar a dibujar' : 'Cambiar a subir imagen'}
        </button>
      </div>

      {!uploadMode ? (
        <div 
          ref={containerRef}
          style={{ 
            border: '1px solid rgba(212, 175, 55, 0.2)', 
            backgroundColor: '#fff',
            position: 'relative',
            height: 'clamp(150px, 30vh, 220px)',
            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.02)',
            overflow: 'hidden'
          }}
        >
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            fontSize: 'clamp(3rem, 10vw, 5rem)', 
            color: 'rgba(212, 175, 55, 0.05)', 
            pointerEvents: 'none',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            whiteSpace: 'nowrap'
          }}>
            Firma
          </div>
          <SignatureCanvas
            ref={sigCanvas}
            penColor="#1A1A1A"
            canvasProps={{
              width: canvasSize.width,
              height: canvasSize.height,
              className: 'signature-canvas',
              style: { width: '100%', height: '100%', position: 'relative', zIndex: 1 }
            }}
            onEnd={() => {
              setHasSignature(true);
              save();
            }}
          />
          <div style={{ position: 'absolute', bottom: '10px', right: '10px', display: 'flex', gap: '0.5rem', zIndex: 10 }}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={clear}
              style={{ padding: '0.5rem', borderRadius: '50%', border: 'none', backgroundColor: '#f5f5f5', cursor: 'pointer' }}
              title="Borrar"
            >
              <Eraser size={16} color="#666" />
            </motion.button>
          </div>
        </div>
      ) : (
        <div style={{ 
          border: '2px dashed rgba(212, 175, 55, 0.3)', 
          height: '200px', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: 'rgba(212, 175, 55, 0.02)',
          cursor: 'pointer'
        }}
        onClick={() => document.getElementById('signature-upload')?.click()}
        >
          <Upload size={32} color="var(--primary-gold)" style={{ marginBottom: '1rem' }} />
          <p style={{ fontSize: '0.8rem', margin: 0 }}>Haga clic para subir su firma digital</p>
          <input 
            id="signature-upload"
            type="file" 
            accept="image/*" 
            onChange={handleFileUpload} 
            style={{ display: 'none' }}
          />
        </div>
      )}

      {hasSignature && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4CAF50', fontSize: '0.8rem', marginTop: '1rem' }}
        >
          <Check size={16} /> Firma capturada correctamente
        </motion.div>
      )}
    </div>
  );
}
