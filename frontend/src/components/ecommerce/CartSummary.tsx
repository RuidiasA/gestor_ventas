import { useCart } from '../../hooks/useCart';
import Button from '../ui/Button';
import styles from './CartSummary.module.css';

interface Props {
  onCheckout?: () => void;
}

const CartSummary: React.FC<Props> = ({ onCheckout }) => {
  const { items, total } = useCart();
  const igv = total * 0.18;
  const subtotal = total - igv;

  return (
    <div className={`${styles.summary} card`}>
      <h3>Resumen</h3>
      <div className={styles.row}>
        <span>Subtotal</span>
        <strong>S/ {subtotal.toFixed(2)}</strong>
      </div>
      <div className={styles.row}>
        <span>IGV (18%)</span>
        <strong>S/ {igv.toFixed(2)}</strong>
      </div>
      <div className={styles.row}>
        <span>Total</span>
        <strong className={styles.total}>S/ {total.toFixed(2)}</strong>
      </div>
      <p className={styles.muted}>Productos: {items.length}</p>
      {onCheckout && (
        <Button style={{ width: '100%' }} onClick={onCheckout} disabled={items.length === 0}>
          Ir a checkout
        </Button>
      )}
    </div>
  );
};

export default CartSummary;
