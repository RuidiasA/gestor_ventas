import AppRouter from './core/routing/AppRouter';
import { useNotificacion } from './hooks/useNotificacion';

function App() {
  useNotificacion();
  return <AppRouter />;
}

export default App;
