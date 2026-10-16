import { useState, type ReactNode } from 'react';
import { Link } from 'wouter';
import { ArrowDownRight, ArrowRight, Menu, ShoppingBag, X } from 'lucide-react';
import { formatNgn, type Product } from '../data/products';

export function Header({ count, current }: { count: number; current: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [['Shop', '/shop'], ['Our approach', '/about'], ['Delivery', '/delivery'], ['FAQ', '/faq'], ['Contact', '/contact']];

  return <>
    <div className="announcement"><span>INDEPENDENT CLOTHING SOURCING</span><span>Browse first. Confirm availability before you buy.</span><Link href="/request">Make a request <ArrowRight size={13}/></Link></div>
    <header className="site-header">
      <button className="mobile-menu icon-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)} data-testid="button-mobile-menu">{menuOpen ? <X size={19}/> : <Menu size={19}/>}</button>
      <Link href="/" className="wordmark" aria-label="Nira and Nora home"><span className="wordmark-main">Nira <i>&</i> Nora</span><span className="wordmark-sub">CLOTHING, CONSIDERED</span></Link>
      <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setMenuOpen(false)} className={`nav-link ${current === href ? 'is-current' : ''}`} data-testid={`link-nav-${href.slice(1)}`}>{label}</Link>)}</nav>
      <Link href="/cart" className={`bag-link ${current === '/cart' ? 'is-current' : ''}`} data-testid="link-cart"><ShoppingBag size={17}/><span>Bag</span><span className="bag-count">{count}</span></Link>
    </header>
  </>;
}

export function Footer() {
  return <footer className="footer"><div className="footer-top"><Link href="/" className="footer-brand">Nira <i>&</i> Nora</Link><p>Good clothes, found with care.<br/>Availability, always made clear.</p><Link href="/request" className="text-link">Tell us what you’re looking for <ArrowRight size={14}/></Link></div><div className="footer-bottom"><span>© Nira & Nora · Prototype preview</span><div><Link href="/about">About</Link><Link href="/delivery">Delivery</Link><Link href="/faq">FAQ</Link><Link href="/contact">Contact</Link></div><span>All sample products and prices are for demonstration.</span></div></footer>;
}

export function Label({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'accent' | 'dark' }) {
  return <span className={`eyebrow-tag tag-${tone}`}>{children}</span>;
}

export function ProductImage({ product, className = '' }: { product: Product; className?: string }) {
  return <div className={`product-image image-${product.imageTone} ${className}`}><img src={product.image} alt="" loading="eager" decoding="async"/><span className="image-caption">{product.category} / N&N EDIT</span></div>;
}

export function Availability({ value }: { value: Product['fulfilment'] }) {
  const tone = value === 'Ready to order' ? 'available' : value === 'Sourced on request' ? 'on-request' : 'special';
  return <span className={`availability ${tone}`}><span className="availability-dot"/>{value}</span>;
}

export function ProductTile({ product, index = 0 }: { product: Product; index?: number }) {
  return <article className={`product-tile tile-${index % 3}`} data-testid={`card-product-${product.id}`}>
    <Link href={`/product/${product.id}`} className="tile-image-link" aria-label={`View ${product.name}`}><ProductImage product={product}/><span className="tile-arrow"><ArrowDownRight size={18}/></span></Link>
    <div className="tile-meta"><div><span className="tile-category">{product.category} · DEMO</span><h3><Link href={`/product/${product.id}`}>{product.name}</Link></h3></div><div className="tile-price">{product.price ? formatNgn(product.price) : <span>Price on enquiry</span>}<small>{product.price ? 'DEMO PRICE' : 'NO DEMO PRICE'}</small></div></div>
    <div className="tile-bottom"><Availability value={product.fulfilment}/><span>{product.note}</span></div>
  </article>;
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="field"><span>{label}</span>{children}</label>;
}
