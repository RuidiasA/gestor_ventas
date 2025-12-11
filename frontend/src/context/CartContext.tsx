import { createContext, useMemo, useState } from 'react';
import { Producto } from '../core/types/producto';

export interface CartItem {
  producto: Producto;
  cantidad: number;
}

interface CartContextState {
  items: CartItem[];
  addItem: (producto: Producto, cantidad?: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, cantidad: number) => void;
  clear: () => void;
  total: number;
}

export const CartContext = createContext<CartContextState | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (producto: Producto, cantidad = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.producto.id === producto.id);
      if (existing) {
        return prev.map((i) =>
          i.producto.id === producto.id ? { ...i, cantidad: i.cantidad + cantidad } : i
        );
      }
      return [...prev, { producto, cantidad }];
    });
  };

  const removeItem = (id: number) => setItems((prev) => prev.filter((i) => i.producto.id !== id));

  const updateQuantity = (id: number, cantidad: number) =>
    setItems((prev) => prev.map((i) => (i.producto.id === id ? { ...i, cantidad } : i)));

  const clear = () => setItems([]);

  const total = useMemo(
    () => items.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0),
    [items]
  );

  const value = useMemo(
    () => ({ items, addItem, removeItem, updateQuantity, clear, total }),
    [items, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
