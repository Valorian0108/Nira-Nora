import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { categories, products } from '../data/products';
import { Label, ProductTile } from '../components/store-ui';

export function CataloguePage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All pieces');
  const [availability, setAvailability] = useState('All availability');
  const [sort, setSort] = useState('Featured');
  const visible = useMemo(() => products
    .filter(product => (category === 'All pieces' || product.category === category)
      && (availability === 'All availability' || product.fulfilment === availability)
      && `${product.name} ${product.category} ${product.colour}`.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => sort === 'Price: low to high'
      ? (a.price || Infinity) - (b.price || Infinity)
      : sort === 'Price: high to low'
        ? (b.price || 0) - (a.price || 0)
        : products.indexOf(a) - products.indexOf(b)), [query, category, availability, sort]);

  return <div className="shop-page section-wrap">
    <div className="page-kicker"><span className="mono">N&N / 01 / 06</span><Label>DEMONSTRATION CATALOGUE</Label></div>
    <div className="shop-heading"><h1 className="serif">The <em>edit.</em></h1><p>A considered shortlist of pieces to browse. Demo prices and listings only; supplier availability is never implied.</p></div>
    <div className="shop-tools">
      <label className="search-field"><span className="mono">SEARCH</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Try “shirt” or “oat”" aria-label="Search products" data-testid="input-search-products"/></label>
      <label className="filter-select"><span className="mono">CATEGORY</span><select value={category} onChange={event => setCategory(event.target.value)} aria-label="Filter by category" data-testid="select-category">{categories.map(item => <option key={item}>{item}</option>)}</select><ChevronDown size={14}/></label>
      <label className="filter-select"><span className="mono">PATH</span><select value={availability} onChange={event => setAvailability(event.target.value)} aria-label="Filter by availability" data-testid="select-availability">{['All availability', 'Ready to order', 'Sourced on request', 'Special request'].map(item => <option key={item}>{item}</option>)}</select><ChevronDown size={14}/></label>
      <label className="filter-select"><span className="mono">SORT</span><select value={sort} onChange={event => setSort(event.target.value)} aria-label="Sort products" data-testid="select-sort">{['Featured', 'Price: low to high', 'Price: high to low'].map(item => <option key={item}>{item}</option>)}</select><ChevronDown size={14}/></label>
    </div>
    <div className="results-line"><span>{visible.length} {visible.length === 1 ? 'piece' : 'pieces'} in this view</span><span>ALL LISTINGS / PRICES ARE DEMONSTRATION CONTENT</span></div>
    {visible.length ? <div className="product-grid shop-grid">{visible.map((product, index) => <ProductTile product={product} index={index} key={product.id}/>)}</div> : <div className="empty-state"><span className="mono">NO MATCHES / 00</span><h2 className="serif">Nothing in this edit.</h2><p>Try another search or reset the filters to see all demo pieces.</p><button className="text-link button-link" onClick={() => { setQuery(''); setCategory('All pieces'); setAvailability('All availability'); setSort('Featured'); }}>Reset filters <ArrowRight size={14}/></button></div>}
    <div className="catalogue-note"><span className="mono">A SMALL BUT IMPORTANT DISTINCTION</span><p>“Sourced on request” and “Special request” begin as an enquiry only. No payment is taken and no order is placed through those paths.</p></div>
  </div>;
}
