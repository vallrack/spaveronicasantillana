'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { LogIn, User as UserIcon } from 'lucide-react';

export default function RegisterForm() {
  const { user, loginWithGoogle } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, let's just use manual registration as a mockup or redirect
    router.push('/dashboard');
  };

  const handleGoogleRegister = async () => {
    await loginWithGoogle();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '1.2rem 0',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    borderRadius: '0',
    fontFamily: 'inherit',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s ease'
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    fontWeight: 700,
    color: 'var(--text-muted)',
    marginBottom: '0.2rem'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <motion.button 
          onClick={handleGoogleRegister}
          className="gold-button" 
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', backgroundColor: 'var(--text-dark)' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogIn size={20} /> INICIAR SESIÓN CON GOOGLE
        </motion.button>

        <motion.button 
          onClick={handleGoogleRegister}
          style={{ 
            width: '100%', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: '1rem', 
            padding: '1.2rem',
            backgroundColor: 'transparent',
            border: '1px solid var(--primary-gold)',
            color: 'var(--primary-gold)',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '0.8rem',
            letterSpacing: '0.1em'
          }}
          whileHover={{ backgroundColor: 'rgba(212, 175, 55, 0.05)', scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <UserIcon size={20} /> REGISTRARSE CON GOOGLE
        </motion.button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1rem 0' }}>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#eee' }}></div>
        <span style={{ fontSize: '0.7rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.1em' }}>o acceder manualmente</span>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#eee' }}></div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <label htmlFor="name" style={labelStyle}>Nombre Completo</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Tu nombre aquí"
            onFocus={(e) => e.currentTarget.style.borderBottomColor = 'var(--primary-gold)'}
            onBlur={(e) => e.currentTarget.style.borderBottomColor = 'rgba(0,0,0,0.1)'}
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <label htmlFor="email" style={labelStyle}>Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
            placeholder="email@ejemplo.com"
            onFocus={(e) => e.currentTarget.style.borderBottomColor = 'var(--primary-gold)'}
            onBlur={(e) => e.currentTarget.style.borderBottomColor = 'rgba(0,0,0,0.1)'}
          />
        </motion.div>
        <motion.button 
          type="submit" 
          className="outline-button" 
          style={{ width: '100%', padding: '1rem' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Continuar Manualmente
        </motion.button>
      </form>
    </div>
  );
}
