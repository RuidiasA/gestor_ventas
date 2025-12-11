import { FormEvent, useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import CartSummary from '../../components/ecommerce/CartSummary';
import { useCart } from '../../hooks/useCart';
import { emitNotificacion } from '../../hooks/useNotificacion';

const CheckoutPage = () => {
  const { items, clear } = useCart();
  const [entrega, setEntrega] = useState<'ENVIO' | 'RETIRO'>('ENVIO');
  const [direccion, setDireccion] = useState('');
  const [tarjeta, setTarjeta] = useState({ numero: '', nombre: '', vencimiento: '' });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    emitNotificacion({ type: 'success', message: 'Pedido registrado correctamente' });
    clear();
  };

  return (
    <div className="container" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
      <form className="card" onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <Select label="Tipo de entrega" value={entrega} onChange={(e) => setEntrega(e.target.value as 'ENVIO' | 'RETIRO')}>
          <option value="ENVIO">Envío a domicilio</option>
          <option value="RETIRO">Retiro en tienda</option>
        </Select>
        {entrega === 'ENVIO' && (
          <Input label="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
        )}
        <h4>Pago</h4>
        <Input
          label="Número de tarjeta"
          value={tarjeta.numero}
          onChange={(e) => setTarjeta({ ...tarjeta, numero: e.target.value })}
          required
        />
        <Input
          label="Nombre en tarjeta"
          value={tarjeta.nombre}
          onChange={(e) => setTarjeta({ ...tarjeta, nombre: e.target.value })}
          required
        />
        <Input
          label="Vencimiento"
          placeholder="MM/AA"
          value={tarjeta.vencimiento}
          onChange={(e) => setTarjeta({ ...tarjeta, vencimiento: e.target.value })}
          required
        />
        <Button type="submit" disabled={items.length === 0}>
          Confirmar pedido
        </Button>
      </form>
      <CartSummary />
    </div>
  );
};

export default CheckoutPage;
