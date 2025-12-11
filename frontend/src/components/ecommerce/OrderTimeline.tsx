import { EstadoPedido } from '../../core/types/pedido';
import styles from './OrderTimeline.module.css';

const steps: EstadoPedido[] = ['REGISTRADO', 'PAGADO', 'PREPARADO', 'DESPACHADO', 'ENTREGADO'];

const OrderTimeline = ({ estado }: { estado: EstadoPedido }) => {
  const activeIndex = steps.indexOf(estado);
  return (
    <div className={styles.timeline}>
      {steps.map((step, index) => (
        <div key={step} className={`${styles.step} ${index <= activeIndex ? styles.active : ''}`}>
          <div className={styles.dot} />
          <span>{step}</span>
        </div>
      ))}
    </div>
  );
};

export default OrderTimeline;
