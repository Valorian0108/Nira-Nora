import { Link } from 'wouter';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import { formatNgn } from '../data/products';
import { Label, ProductImage } from '../components/store-ui';
import { getCartTotal, getProduct, getReadyCartLines, type CartLine } from '../lib/store';

export function CartPage({ lines, onEdit }: { lines: CartLine[]; onEdit: (id: string, size: string, quantity: number) => void }) {
  const readyLines = getReadyCartLines(lines);
  return <div className="cart-page section-wrap">
    <div className="page-kicker"><span className="mono">N&N / BAG</span><Label>DEMO CART</Label></div><h1 className="serif">Your <em>bag.</em></h1><p className="page-deck">Only ready-to-order demo pieces can be added here. No payment has been taken.</p>
    {lines.length === 0 ? <div className="empty-state cart-empty"><span className="mono">NOTHING SET ASIDE / 00</span><h2 className="serif">A little room for a find.</h2><p>Your demo bag is empty. Browse the edit to see what’s ready to order.</p><Link href="/shop" className="button button-dark">Explore the edit <ArrowRight size={15}/></Link></div> : <div className="cart-layout">
      <div className="cart-lines">{readyLines.map(line => {
        const product = getProduct(line.productId);
        if (!product) return null;
        return <article className="cart-line" key={`${line.productId}-${line.size}`}>
          <Link href={`/product/${product.id}`} className="cart-thumb"><ProductImage product={product}/></Link>
          <div className="cart-line-copy"><span className="mono">DEMO PRODUCT / READY TO ORDER</span><h2 className="serif">{product.name}</h2><span>Size: {line.size}</span><strong>{formatNgn(product.price || 0)} <small>DEMO PRICE</small></strong><button className="remove-link" onClick={() => onEdit(product.id, line.size, 0)}>Remove</button></div>
          <div className="qty-control"><button aria-label={`Decrease ${product.name} quantity`} onClick={() => onEdit(product.id, line.size, line.quantity - 1)}><Minus size={13}/></button><span>{line.quantity}</span><button aria-label={`Increase ${product.name} quantity`} onClick={() => onEdit(product.id, line.size, line.quantity + 1)}><Plus size={13}/></button></div>
          <strong className="line-total">{formatNgn((product.price || 0) * line.quantity)}</strong>
        </article>;
      })}</div>
      <aside className="cart-summary"><span className="mono">DEMO SUMMARY</span><div><span>Subtotal <small>DEMO PRICE</small></span><strong>{formatNgn(getCartTotal(readyLines))}</strong></div><p>Delivery charges and timing are not available in this prototype. No payment is taken.</p><Link href={readyLines.length ? '/checkout' : '/shop'} className="button button-dark full-button">{readyLines.length ? 'Continue to demo checkout' : 'Browse ready-to-order pieces'} <ArrowRight size={15}/></Link><Link href="/shop" className="quiet-link">Continue browsing</Link></aside>
    </div>}
  </div>;
}
