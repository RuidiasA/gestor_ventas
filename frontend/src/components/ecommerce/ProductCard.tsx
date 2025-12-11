import { Producto } from '../../core/types/producto';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import styles from './ProductCard.module.css';

interface Props {
  producto: Producto;
  onAdd: (producto: Producto) => void;
  onView: (id: number) => void;
}

const ProductCard: React.FC<Props> = ({ producto, onAdd, onView }) => (
  <div className={styles.card}>
    <div className={styles.image} style={{ backgroundImage: `url(${producto.imagenUrl ?? ''})` }} />
    <div className={styles.info}>
      <div className={styles.header}>
        <h4>{producto.nombre}</h4>
        {producto.enPromocion && <Badge label="Promo" tone="warning" />}
      </div>
      <p className={styles.muted}>{producto.categoria}</p>
      <p className={styles.price}>S/ {producto.precio.toFixed(2)}</p>
      <div className={styles.actions}>
        <Button variant="ghost" onClick={() => onView(producto.id)}>
          Ver detalle
        </Button>
        <Button onClick={() => onAdd(producto)} disabled={producto.stock <= 0}>
          Agregar
        </Button>
      </div>
    </div>
  </div>
);

export default ProductCard;
