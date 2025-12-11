import Select from '../ui/Select';
import Input from '../ui/Input';
import Button from '../ui/Button';
import styles from './ProductFilterBar.module.css';

export interface CatalogoFiltros {
  categoria?: string;
  marca?: string;
  minPrecio?: number;
  maxPrecio?: number;
  orden?: 'asc' | 'desc';
}

interface Props {
  filtros: CatalogoFiltros;
  onChange: (filtros: CatalogoFiltros) => void;
  onReset: () => void;
}

const ProductFilterBar: React.FC<Props> = ({ filtros, onChange, onReset }) => (
  <div className={styles.bar}>
    <Select
      value={filtros.categoria ?? ''}
      onChange={(e) => onChange({ ...filtros, categoria: e.target.value })}
      label="Categoría"
    >
      <option value="">Todas</option>
      <option value="Tecnología">Tecnología</option>
      <option value="Moda">Moda</option>
    </Select>

    <Select
      value={filtros.marca ?? ''}
      onChange={(e) => onChange({ ...filtros, marca: e.target.value })}
      label="Marca"
    >
      <option value="">Todas</option>
      <option value="Marca A">Marca A</option>
      <option value="Marca B">Marca B</option>
    </Select>

    <Input
      type="number"
      label="Mínimo"
      value={filtros.minPrecio ?? ''}
      onChange={(e) => onChange({ ...filtros, minPrecio: Number(e.target.value) })}
      placeholder="S/"
    />

    <Input
      type="number"
      label="Máximo"
      value={filtros.maxPrecio ?? ''}
      onChange={(e) => onChange({ ...filtros, maxPrecio: Number(e.target.value) })}
      placeholder="S/"
    />

    <Select
      value={filtros.orden ?? ''}
      onChange={(e) => onChange({ ...filtros, orden: e.target.value as 'asc' | 'desc' })}
      label="Orden"
    >
      <option value="">Relevancia</option>
      <option value="asc">Precio asc</option>
      <option value="desc">Precio desc</option>
    </Select>

    <Button variant="ghost" onClick={onReset}>
      Limpiar
    </Button>
  </div>
);

export default ProductFilterBar;
