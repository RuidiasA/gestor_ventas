import { FormEvent, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Alert from '../../components/ui/Alert';
import { emitNotificacion } from '../../hooks/useNotificacion';

const LoginPage = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login({ username, password });
      emitNotificacion({ type: 'success', message: 'Bienvenido de nuevo' });
    } catch (err) {
      console.error(err);
      setError('Credenciales inválidas');
      emitNotificacion({ type: 'error', message: 'No pudimos iniciar sesión' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <Alert type="danger" message={error} />}
      <Input
        label="Usuario o email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <Input
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" style={{ width: '100%', marginTop: 12 }}>
        Ingresar
      </Button>
    </form>
  );
};

export default LoginPage;
