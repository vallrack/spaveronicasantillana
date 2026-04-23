'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
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
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
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
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <label htmlFor="phone" style={labelStyle}>Teléfono de Contacto</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          style={inputStyle}
          placeholder="+57"
          onFocus={(e) => e.currentTarget.style.borderBottomColor = 'var(--primary-gold)'}
          onBlur={(e) => e.currentTarget.style.borderBottomColor = 'rgba(0,0,0,0.1)'}
        />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <label htmlFor="password" style={labelStyle}>Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
          style={inputStyle}
          placeholder="********"
          onFocus={(e) => e.currentTarget.style.borderBottomColor = 'var(--primary-gold)'}
          onBlur={(e) => e.currentTarget.style.borderBottomColor = 'rgba(0,0,0,0.1)'}
        />
      </motion.div>
      <motion.button 
        type="submit" 
        className="gold-button" 
        style={{ marginTop: '1rem', width: '100%' }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Crear Cuenta Elite
      </motion.button>
    </form>
  );
}
