'use client';

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ConsentForm from '@/components/dashboard/ConsentForm';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { FileText, User as UserIcon, Calendar, ExternalLink, ShieldCheck, LogIn, Users, Download, Trash2 } from 'lucide-react';
import jsPDF from 'jspdf';

export default function DashboardPage() {
  const { user, isAdmin, loading, loginWithGoogle, logout } = useAuth();
  const [consents, setConsents] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [fetching, setFetching] = useState(false);
  const [activeTab, setActiveTab] = useState<'consents' | 'users'>('consents');

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, isAdmin, activeTab]);

  const fetchData = async () => {
    setFetching(true);
    try {
      if (isAdmin && activeTab === 'users') {
        const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(docs);
      } else {
        // If admin, fetch all. If client, fetch only theirs.
        const consentsRef = collection(db, 'consents');
        let q;
        if (isAdmin) {
          q = query(consentsRef, orderBy('signedAt', 'desc'));
        } else {
          // Find all consents matching the user's email (links anonymous signs)
          q = query(consentsRef, where('userEmail', '==', user?.email), orderBy('signedAt', 'desc'));
        }
        
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setConsents(docs);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setFetching(false);
    }
  };

  const toggleAdmin = async (userId: string, currentRole: string) => {
    if (!isAdmin) return;
    try {
      const newRole = currentRole === 'admin' ? 'user' : 'admin';
      await updateDoc(doc(db, 'users', userId), { role: newRole });
      fetchData(); // Refresh list
    } catch (error) {
      alert("Error al actualizar rol");
    }
  };

  const generatePDF = (consent: any, preview: boolean = true) => {
    const doc = new jsPDF();
    const gold = '#D4AF37';
    
    // Header
    doc.setFont('serif', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40);
    doc.text('VERÓNICA SANTILLANA', 105, 30, { align: 'center' });
    
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.5);
    doc.line(80, 35, 130, 35);
    
    doc.setFontSize(14);
    doc.text('CONSENTIMIENTO INFORMADO', 105, 45, { align: 'center' });
    
    // Content
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    
    const bodyText = [
      '01. PROPÓSITO DEL TRATAMIENTO: El Centro de Belleza Verónica Santillana se compromete a utilizar únicamente productos orgánicos y biotecnológicos de grado médico. Nuestros rituales han sido diseñados meticulosamente para promover la regeneración celular y la relajación profunda.',
      '',
      '02. DECLARACIÓN DE SALUD: Al firmar este documento, el usuario declara bajo juramento no padecer enfermedades infectocontagiosas ni alergias no declaradas previamente. Se compromete a informar de cualquier cambio en su estado físico.',
      '',
      '03. PROTECCIÓN DE DATOS: La información recopilada será tratada bajo los más estrictos estándares de la Ley de Protección de Datos. Sus registros se utilizarán exclusivamente para mejorar su experiencia sensorial.'
    ];
    
    const splitText = doc.splitTextToSize(bodyText.join('\n'), 170);
    doc.text(splitText, 20, 60);
    
    // Footer / Signature
    doc.setDrawColor(240, 240, 240);
    doc.rect(20, 140, 170, 80);
    
    doc.setFontSize(8);
    doc.text('FIRMA DEL CLIENTE:', 30, 155);
    
    if (consent.signatureBase64) {
      // Even smaller signature and centered
      doc.addImage(consent.signatureBase64, 'PNG', 85, 168, 40, 18);
    }
    
    doc.setFontSize(12);
    doc.setFont('serif', 'italic');
    doc.text(consent.userName, 105, 210, { align: 'center' });
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(150, 150, 150);
    doc.text(`Documento validado digitalmente el ${consent.signedAt?.toDate ? consent.signedAt.toDate().toLocaleString() : new Date().toLocaleString()}`, 105, 230, { align: 'center' });
    doc.text(`ID de Registro: ${consent.id}`, 105, 235, { align: 'center' });
    
    if (preview) {
      window.open(doc.output('bloburl'), '_blank');
    } else {
      doc.save(`Consentimiento_${consent.userName}.pdf`);
    }
  };

  const deleteConsent = async (id: string) => {
    if (!isAdmin) return;
    if (!confirm('¿Está seguro de que desea eliminar este registro? Esta acción no se puede deshacer.')) return;
    
    try {
      await deleteDoc(doc(db, 'consents', id));
      setConsents(consents.filter(c => c.id !== id));
    } catch (error) {
      console.error("Error deleting consent:", error);
      alert("Error al eliminar el registro.");
    }
  };

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} style={{ width: '40px', height: '40px', border: '4px solid var(--primary-gold)', borderTopColor: 'transparent', borderRadius: '50%' }} />
      </div>
    );
  }

  if (!user) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
        <Header />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '400px' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Área <span className="premium-gold-text">Privada</span></h1>
            <p style={{ marginBottom: '3rem' }}>Por favor, inicie sesión para acceder a su panel de control y gestionar sus rituales.</p>
            <button onClick={loginWithGoogle} className="gold-button" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              <LogIn size={20} /> Entrar con Google
            </button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fcfcfc' }}>
      <Header />
      <div style={{ flex: 1, padding: '8rem 2rem 4rem' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '5rem' }}>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.7rem', color: 'var(--primary-gold)', fontWeight: 700 }}>
                {isAdmin ? 'Panel de Administración' : 'Bienvenida de vuelta'}
              </span>
              <h1 style={{ fontSize: '3.5rem', marginTop: '1rem' }}>
                {isAdmin ? 'Gestión de' : 'Sra.'} <span className="premium-gold-text">{isAdmin ? 'Rituales' : (user.displayName?.split(' ')[0] || 'Santillana')}</span>
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                {isAdmin ? 'Supervisión de consentimientos y experiencia.' : 'Consulta tus documentos firmados y rituales.'}
              </p>
            </motion.div>
            
            <button onClick={logout} style={{ background: 'none', border: '1px solid #ddd', padding: '0.8rem 1.5rem', cursor: 'pointer', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Cerrar Sesión
            </button>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4rem' }}>
            {/* Sidebar info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ gridColumn: '1 / span 3', display: 'flex', flexDirection: 'column', gap: '3rem' }}
            >
              <div>
                <h4 style={{ marginBottom: '1.5rem', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--primary-gold)' }}>Tu Perfil</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                  {user.photoURL && <img src={user.photoURL} alt="Avatar" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />}
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{user.displayName}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{user.email}</div>
                  </div>
                </div>
                <div style={{ fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
                    <span>Rol</span>
                    <span style={{ fontWeight: 700, color: isAdmin ? 'var(--primary-gold)' : 'inherit' }}>{isAdmin ? 'Administrador' : 'Cliente Gold'}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '1.5rem', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--primary-gold)' }}>Navegación</h4>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <li><button onClick={() => setActiveTab('consents')} className={`nav-link-premium ${activeTab === 'consents' ? 'active-link' : ''}`}>Mis Documentos</button></li>
                  {isAdmin && <li><button onClick={() => setActiveTab('users')} className={`nav-link-premium ${activeTab === 'users' ? 'active-link' : ''}`}>Gestión de Usuarios</button></li>}
                </ul>
              </div>

              <style jsx>{`
                .nav-link-premium {
                  background: none;
                  border: none;
                  width: 100%;
                  text-align: left;
                  color: var(--text-dark);
                  text-decoration: none;
                  transition: all 0.3s ease;
                  display: block;
                  padding: 0.5rem 0;
                  border-left: 2px solid transparent;
                  cursor: pointer;
                  font-family: inherit;
                  font-size: inherit;
                }
                .nav-link-premium:hover, .active-link {
                  color: var(--primary-gold);
                  padding-left: 1rem;
                  border-left-color: var(--primary-gold);
                }
              `}</style>
            </motion.div>
            
            {/* Main content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ gridColumn: '5 / span 8' }}
            >
              {activeTab === 'users' && isAdmin ? (
                <div>
                   <h3 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Control de <span className="premium-gold-text">Usuarios</span></h3>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                     {users.map(u => (
                       <div key={u.id} style={{ backgroundColor: 'white', padding: '1.5rem', border: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <div>
                           <div style={{ fontWeight: 700 }}>{u.displayName}</div>
                           <div style={{ fontSize: '0.8rem', color: '#666' }}>{u.email}</div>
                           <div style={{ fontSize: '0.7rem', color: u.role === 'admin' ? 'var(--primary-gold)' : '#999', textTransform: 'uppercase', marginTop: '0.5rem' }}>{u.role}</div>
                         </div>
                         {u.uid !== user.uid && (
                           <button onClick={() => toggleAdmin(u.uid, u.role)} style={{ 
                             padding: '0.5rem 1rem', 
                             border: '1px solid var(--primary-gold)', 
                             backgroundColor: u.role === 'admin' ? 'var(--primary-gold)' : 'transparent',
                             color: u.role === 'admin' ? 'white' : 'var(--primary-gold)',
                             fontSize: '0.7rem',
                             cursor: 'pointer'
                           }}>
                             {u.role === 'admin' ? 'Quitar Admin' : 'Hacer Admin'}
                           </button>
                         )}
                       </div>
                     ))}
                   </div>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '2rem' }}>{isAdmin ? 'Consentimientos' : 'Tus'} <span className="premium-gold-text">Firmados</span></h3>
                    <button onClick={fetchData} style={{ padding: '0.5rem', border: '1px solid #eee', background: 'white', cursor: 'pointer' }}>Actualizar</button>
                  </div>
                  
                  {fetching ? (
                    <p>Cargando registros...</p>
                  ) : consents.length === 0 ? (
                    <div style={{ padding: '4rem', textAlign: 'center', border: '1px dashed #ddd', backgroundColor: 'white' }}>
                      <FileText size={48} color="#ddd" style={{ marginBottom: '1rem' }} />
                      <p>No hay consentimientos registrados aún.</p>
                      {!isAdmin && (
                        <p style={{ fontSize: '0.8rem', marginTop: '1rem' }}>Vuelve a la página principal para firmar tu primer consentimiento.</p>
                      )}
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      {consents.map((c) => (
                        <div key={c.id} style={{ 
                          backgroundColor: 'white', 
                          padding: '2rem', 
                          border: '1px solid #eee',
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr 1fr auto',
                          alignItems: 'center',
                          gap: '1.5rem'
                        }}>
                          <div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--primary-gold)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Cliente</div>
                            <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <UserIcon size={14} /> {c.userName}
                            </div>
                          </div>
                          <div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--primary-gold)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Fecha</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                              <Calendar size={14} /> {c.signedAt?.toDate ? c.signedAt.toDate().toLocaleString() : 'Reciente'}
                            </div>
                          </div>
                          <div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--primary-gold)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Estado</div>
                            <div style={{ fontSize: '0.9rem', color: '#4CAF50', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                              <ShieldCheck size={14} /> Validado
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button 
                              onClick={() => generatePDF(c)}
                              style={{ 
                                background: 'none',
                                color: 'var(--text-dark)', 
                                textDecoration: 'none',
                                padding: '0.5rem 1rem',
                                border: '1px solid var(--text-dark)',
                                fontSize: '0.8rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                cursor: 'pointer'
                              }}
                            >
                              Ver PDF Firmado <ExternalLink size={14} />
                            </button>
                            
                            {isAdmin && (
                              <button 
                                onClick={() => deleteConsent(c.id)}
                                style={{ 
                                  background: 'none',
                                  color: '#ff4d4d', 
                                  padding: '0.5rem',
                                  border: '1px solid #ff4d4d',
                                  display: 'flex',
                                  alignItems: 'center',
                                  cursor: 'pointer'
                                }}
                                title="Eliminar registro"
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
