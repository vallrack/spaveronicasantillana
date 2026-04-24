'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100vw', 
          height: '100vh', 
          zIndex: 1000, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              backgroundColor: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(5px)'
            }}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{ 
              position: 'relative', 
              zIndex: 1001, 
              width: '90%', 
              maxWidth: '850px',
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: '0'
            }}
          >
            <button 
              onClick={onClose}
              style={{ 
                position: 'absolute', 
                top: '20px', 
                right: '20px', 
                background: 'none', 
                border: 'none', 
                color: 'var(--primary-gold)', 
                cursor: 'pointer',
                zIndex: 1002
              }}
            >
              <X size={24} />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
