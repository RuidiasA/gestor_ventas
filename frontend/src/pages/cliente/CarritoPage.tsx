import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import CartSummary from '../../components/ecommerce/CartSummary';
import { useCart } from '../../hooks/useCart';

const CarritoPage = () => {
  const { items, updateQuantity, removeItem } = useCart();

  return (
    <div className="container" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
      <div className="card">
        <h2>Carrito</h2>
        {items.length === 0 && <p>No tienes productos agregados.</p>}
        {items.map((item) => (
          <div
            key={item.producto.id}
            style={{ display: 'grid', gridTemplateColumns: '1fr 140px 80px', gap: 12, alignItems: 'center' }}
          >
            <div>
              <strong>{item.producto.nombre}</strong>
              <p style={{ color: '#6b7280' }}>S/ {item.producto.precio.toFixed(2)}</p>
            </div>
            <Input
              type="number"
              value={item.cantidad}
              min={1}
              onChange={(e) => updateQuantity(item.producto.id, Number(e.target.value))}
            />
            <Button variant="ghost" onClick={() => removeItem(item.producto.id)}>
              Quitar
            </Button>
          </div>
        ))}
      </div>
      <CartSummary onCheckout={() => (window.location.href = '/checkout')} />
    </div>
  );
};

export default CarritoPage;
