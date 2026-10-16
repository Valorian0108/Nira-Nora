import { useState } from 'react';
import { Link, useParams } from 'wouter';
import { ArrowLeft, ArrowRight, Check, ShoppingBag } from 'lucide-react';
import { formatNgn } from '../data/products';
import { Availability, Label, ProductImage } from '../components/store-ui';
import { canAddToCart, getProduct } from '../lib/store';
import { NotFoundPage } from './not-found';

export function ProductDetailPage({ onAdd }: { onAdd: (id: string, size: string) => void }) {
  const { id } = useParams<{ id: string }>();
  const product = getProduct(id || '');
  const [size, setSize] = useState('');
  const [added, setAdded] = useState(false);
  if (!product) return <NotFoundPage />;
  const readyToOrder = canAddToCart(product);

  return <div className="product-detail section-wrap"><Link href="/shop" className="back-link"><ArrowLeft size={15}/> Back to the edit</Link><div className="detail-layout">
    <div className="detail-visual"><ProductImage product={product}/><span className="visual-caption mono">DEMONSTRATION PRODUCT / N&N / 01</span></div>
    <div className="detail-copy"><Label>{product.category.toUpperCase()} / DEMO PRODUCT</Label><h1 className="serif">{product.name}</h1><Availability value={product.fulfilment}/><p className="detail-desc">{product.description}</p>
      <div className="detail-price">{product.price ? <>{formatNgn(product.price)}<small>DEMONSTRATION PRICE · NGN</small></> : <span>Price to be confirmed on enquiry<small>NO DEMONSTRATION PRICE PROVIDED</small></span>}</div>
      <div className="detail-data"><div><span>COLOUR</span><strong>{product.colour}</strong></div><div><span>FULFILMENT</span><strong>{product.fulfilment}</strong></div><div><span>SIZE OPTIONS</span><strong>{product.sizes.join(' / ')}</strong></div></div>
      {readyToOrder ? <>
        <label className="size-label" htmlFor="product-size">Select a size <span>Required</span></label>
        <select id="product-size" className="form-control size-select" value={size} onChange={event => { setSize(event.target.value); setAdded(false); }} data-testid="select-product-size"><option value="">Choose a size</option>{product.sizes.map(item => <option key={item}>{item}</option>)}</select>
        <button className="button button-dark full-button" disabled={!size} onClick={() => { onAdd(product.id, size); setAdded(true); }} data-testid="button-add-cart"><ShoppingBag size={16}/>{added ? 'Added to your demo bag' : 'Add to demo bag'} <ArrowRight size={15}/></button>
        {added && <p className="inline-success" role="status"><Check size={14}/> Preview only. No payment taken.</p>}
      </> : <>
        <div className="enquiry-notice"><strong>This is an enquiry path, not checkout.</strong><p>We’ll use your request to check whether a similar piece can be sourced. No order is placed by enquiring.</p></div>
        <Link href={`/request?item=${encodeURIComponent(product.name)}`} className="button button-dark full-button">Enquire about this piece <ArrowRight size={15}/></Link>
      </>}
      <p className="demo-disclaimer">Demonstration listing. The image and details are illustrative; final availability and product specifics are not confirmed.</p>
    </div>
  </div></div>;
}
