export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--text-dark)',
      color: 'white',
      padding: '4rem 2rem 2rem',
      marginTop: 'auto'
    }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
        <div>
          <h3 className="premium-gold-text" style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>CENTRO DE BELLEZA</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
            Dedicados a resaltar tu belleza natural con los más altos estándares de calidad y lujo.
          </p>
        </div>
        <div>
          <h4 style={{ color: 'var(--primary-gold)', marginBottom: '1.5rem', fontSize: '1rem', textTransform: 'uppercase' }}>Contacto</h4>
          <ul style={{ listStyle: 'none', padding: 0, color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Calle de la Elegancia #123</li>
            <li style={{ marginBottom: '0.5rem' }}>Tel: +57 300 000 0000</li>
            <li style={{ marginBottom: '0.5rem' }}>info@veronicasantillana.com</li>
          </ul>
        </div>
        <div>
          <h4 style={{ color: 'var(--primary-gold)', marginBottom: '1.5rem', fontSize: '1rem', textTransform: 'uppercase' }}>Horario</h4>
          <ul style={{ listStyle: 'none', padding: 0, color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Lun - Vie: 8:00 AM - 7:00 PM</li>
            <li style={{ marginBottom: '0.5rem' }}>Sáb: 9:00 AM - 5:00 PM</li>
            <li style={{ marginBottom: '0.5rem' }}>Dom: Cerrado</li>
          </ul>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '3rem', paddingTop: '2rem', textAlign: 'center', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
        © {new Date().getFullYear()} Centro de Belleza Verónica Santillana. Todos los derechos reservados.
      </div>
    </footer>
  );
}
