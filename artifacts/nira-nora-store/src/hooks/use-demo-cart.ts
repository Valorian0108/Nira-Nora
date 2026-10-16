import { useEffect, useState } from 'react';
import {
  addCartLine,
  getCartCount,
  readCart,
  saveCart,
  updateCartLine,
  type CartLine,
} from '../lib/store';

export function useDemoCart() {
  const [lines, setLines] = useState<CartLine[]>(readCart);

  useEffect(() => {
    saveCart(lines);
  }, [lines]);

  return {
    lines,
    count: getCartCount(lines),
    add: (productId: string, size: string) => setLines(current => addCartLine(current, productId, size)),
    update: (productId: string, size: string, quantity: number) =>
      setLines(current => updateCartLine(current, productId, size, quantity)),
    clear: () => setLines([]),
  };
}
