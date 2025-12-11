import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { obtenerProducto } from '../../api/productosApi';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import { useCart } from '../../hooks/useCart';

const DetalleProductoPage = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const productId = Number(id);

  const { data, isLoading } = useQuery({
    queryKey: ['producto', productId],
    queryFn: () => obtenerProducto(productId),
    enabled: !!productId
  });

  if (isLoading || !data) return <Loader />;

  return (
    <div className="card">
      <h2>{data.nombre}</h2>
      <p>{data.descripcion}</p>
      <p>
        <strong>S/ {data.precio.toFixed(2)}</strong>
      </p>
      <p>Stock disponible: {data.stock}</p>
      <Button onClick={() => addItem(data)}>Agregar al carrito</Button>
    </div>
  );
};

export default DetalleProductoPage;
