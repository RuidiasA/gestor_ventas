import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { obtenerProductos } from '../../api/productosApi';
import ProductCard from '../../components/ecommerce/ProductCard';
import ProductFilterBar, { CatalogoFiltros } from '../../components/ecommerce/ProductFilterBar';
import Pagination from '../../components/ui/Pagination';
import Loader from '../../components/ui/Loader';
import { useCart } from '../../hooks/useCart';

const CatalogoPage = () => {
  const [filtros, setFiltros] = useState<CatalogoFiltros>({ page: 1, size: 6 });
  const navigate = useNavigate();
  const { addItem } = useCart();

  const { data, isLoading } = useQuery({
    queryKey: ['productos', filtros],
    queryFn: () => obtenerProductos({ ...filtros, page: (filtros.page ?? 1) - 1 }),
    keepPreviousData: true
  });

  const handleReset = () => setFiltros({ page: 1, size: 6 });

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h2>Catálogo</h2>
      <ProductFilterBar
        filtros={filtros}
        onChange={(updated) => setFiltros({ ...filtros, ...updated, page: 1 })}
        onReset={handleReset}
      />
      {isLoading && <Loader />}
      <div style={{ display: 'grid', gap: 12 }}>
        {data?.content.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            onAdd={addItem}
            onView={(id) => navigate(`/producto/${id}`)}
          />
        ))}
      </div>
      <Pagination
        page={filtros.page ?? 1}
        pageSize={filtros.size ?? 6}
        total={data?.total ?? 0}
        onPageChange={(page) => setFiltros({ ...filtros, page })}
      />
    </div>
  );
};

export default CatalogoPage;
