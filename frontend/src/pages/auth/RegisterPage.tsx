import { FormEvent, useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Alert from '../../components/ui/Alert';

const RegisterPage = () => {
  const [form, setForm] = useState({ nombre: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setMessage('Registro enviado. Confirma en backend.');
  };

  return (
    <form onSubmit={handleSubmit}>
      {message && <Alert type="info" message={message} />}
      <Input
        label="Nombre completo"
        value={form.nombre}
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        required
      />
      <Input
        label="Correo electrónico"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <Input
        label="Contraseña"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <Button type="submit" style={{ width: '100%', marginTop: 12 }}>
        Crear cuenta
      </Button>
    </form>
  );
};

export default RegisterPage;
