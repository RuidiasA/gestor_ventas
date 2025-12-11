import { FormEvent, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listarPedidosCliente } from '../../api/pedidosApi';
import { crearReclamo } from '../../api/reclamosApi';
import Select from '../../components/ui/Select';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { emitNotificacion } from '../../hooks/useNotificacion';
import Loader from '../../components/ui/Loader';

const CrearReclamoPage = () => {
  const queryClient = useQueryClient();
  const { data: pedidos, isLoading } = useQuery({ queryKey: ['mis-pedidos'], queryFn: listarPedidosCliente });
  const [form, setForm] = useState({ pedidoId: '', motivo: '', descripcion: '' });
  const mutation = useMutation({
    mutationFn: () => crearReclamo({ pedido: { id: Number(form.pedidoId) } as any, motivo: form.motivo, descripcion: form.descripcion }),
    onSuccess: () => {
      emitNotificacion({ type: 'success', message: 'Reclamo creado' });
      void queryClient.invalidateQueries({ queryKey: ['reclamos-cliente'] });
    }
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  if (isLoading) return <Loader />;

  return (
    <div className="card">
      <h2>Crear reclamo</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Select
          label="Pedido"
          required
          value={form.pedidoId}
          onChange={(e) => setForm({ ...form, pedidoId: e.target.value })}
        >
          <option value="">Seleccione</option>
          {pedidos?.map((pedido) => (
            <option key={pedido.id} value={pedido.id}>
              {pedido.codigo} - S/ {pedido.total}
            </option>
          ))}
        </Select>
        <Input
          label="Motivo"
          value={form.motivo}
          onChange={(e) => setForm({ ...form, motivo: e.target.value })}
          required
        />
        <Input
          label="Descripción"
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
          required
        />
        <Button type="submit" disabled={mutation.isPending}>
          Enviar reclamo
        </Button>
      </form>
    </div>
  );
};

export default CrearReclamoPage;
