import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';

export function NotFoundPage() {
  return <div className="not-found section-wrap"><span className="mono">N&N / 404</span><h1 className="serif">This page took<br/><em>another turn.</em></h1><p>That address isn’t part of this edit.</p><Link className="button button-dark" href="/">Return to the beginning <ArrowRight size={15}/></Link></div>;
}
