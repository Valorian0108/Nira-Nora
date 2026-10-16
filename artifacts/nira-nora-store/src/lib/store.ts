import { products, type Product } from '../data/products';

export type CartLine = { productId: string; size: string; quantity: number };
export type CheckoutPreview = { lines: CartLine[]; total: number } | null;

const CART_KEY = 'nn-demo-cart';

export function getProduct(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function canAddToCart(product: Product | undefined): boolean {
  return product?.fulfilment === 'Ready to order';
}

export function getReadyCartLines(lines: CartLine[]): CartLine[] {
  return lines.filter(line => canAddToCart(getProduct(line.productId)));
}

export function getCartCount(lines: CartLine[]): number {
  return lines.reduce((count, line) => count + line.quantity, 0);
}

export function getCartTotal(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + (getProduct(line.productId)?.price || 0) * line.quantity, 0);
}

export function readCart(): CartLine[] {
  try {
    const stored = JSON.parse(localStorage.getItem(CART_KEY) || '[]') as CartLine[];
    return getReadyCartLines(stored);
  } catch {
    return [];
  }
}

export function saveCart(lines: CartLine[]): void {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(getReadyCartLines(lines)));
  } catch {
    // The demo remains usable when browser storage is unavailable.
  }
}

export function addCartLine(lines: CartLine[], productId: string, size: string): CartLine[] {
  if (!canAddToCart(getProduct(productId))) return lines;
  const existing = lines.find(line => line.productId === productId && line.size === size);
  return existing
    ? lines.map(line => line === existing ? { ...line, quantity: line.quantity + 1 } : line)
    : [...lines, { productId, size, quantity: 1 }];
}

export function updateCartLine(lines: CartLine[], productId: string, size: string, quantity: number): CartLine[] {
  if (quantity <= 0) return lines.filter(line => !(line.productId === productId && line.size === size));
  return lines.map(line => line.productId === productId && line.size === size ? { ...line, quantity } : line);
}
