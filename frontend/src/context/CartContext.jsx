import { createContext, useContext, useEffect, useState } from 'react';
const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);
export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('shopnest_cart')) || []; } catch { return []; }
  });
  useEffect(() => localStorage.setItem('shopnest_cart', JSON.stringify(cart)), [cart]);
  const add = product => setCart(old => {
    const found = old.find(x => x.id === product.id);
    return found ? old.map(x => x.id === product.id ? { ...x, quantity: Math.min(x.quantity + 1, product.stock) } : x) : [...old, { ...product, quantity: 1 }];
  });
  const update = (id, quantity) => setCart(old => old.map(x => x.id === id ? { ...x, quantity: Math.max(1, Math.min(Number(quantity) || 1, x.stock)) } : x));
  const remove = id => setCart(old => old.filter(x => x.id !== id));
  const clear = () => setCart([]);
  const count = cart.reduce((sum, x) => sum + x.quantity, 0);
  const total = cart.reduce((sum, x) => sum + Number(x.price) * x.quantity, 0);
  return <CartContext.Provider value={{ cart, add, update, remove, clear, count, total }}>{children}</CartContext.Provider>;
}
