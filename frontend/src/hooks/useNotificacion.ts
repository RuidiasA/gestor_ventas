import { useEffect } from 'react';

export interface NotificacionPayload {
  message: string;
  type?: 'success' | 'error' | 'info';
}

export const emitNotificacion = (payload: NotificacionPayload) => {
  window.dispatchEvent(new CustomEvent('notify', { detail: payload }));
};

export const useNotificacion = () => {
  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<NotificacionPayload>).detail;
      if (detail) {
        // Integrar con librería de toasts si se desea
        // eslint-disable-next-line no-alert
        alert(`${detail.type ?? 'info'}: ${detail.message}`);
      }
    };
    window.addEventListener('notify', handler);
    return () => window.removeEventListener('notify', handler);
  }, []);
};
