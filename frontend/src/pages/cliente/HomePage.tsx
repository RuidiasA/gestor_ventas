import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const HomePage = () => (
  <div className="container">
    <section className="card" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16 }}>
      <div>
        <p style={{ color: '#2563eb', fontWeight: 700 }}>Experiencia Saga Falabella</p>
        <h1>Compra online y recibe en minutos</h1>
        <p>Explora nuestro catálogo y disfruta de envíos rápidos o retiro en tienda.</p>
        <Link to="/catalogo">
          <Button>Ver catálogo</Button>
        </Link>
      </div>
      <div style={{ background: '#eef2ff', borderRadius: 16, minHeight: 180 }} />
    </section>
  </div>
);

export default HomePage;
