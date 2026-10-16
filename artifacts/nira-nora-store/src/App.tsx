import { useState } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import './index.css';
import { Footer, Header } from './components/store-ui';
import { useDemoCart } from './hooks/use-demo-cart';
import type { CheckoutPreview } from './lib/store';
import { CartPage } from './pages/cart';
import { CataloguePage } from './pages/catalogue';
import { CheckoutPage } from './pages/checkout';
import { ConfirmationPage } from './pages/confirmation';
import { FAQPage } from './pages/faq';
import { HomePage } from './pages/home';
import { InformationPage } from './pages/information';
import { NotFoundPage } from './pages/not-found';
import { ProductDetailPage } from './pages/product-detail';
import { RequestPage } from './pages/request';

function App() {
  const cart = useDemoCart();
  const [checkoutPreview, setCheckoutPreview] = useState<CheckoutPreview>(null);
  const [location] = useLocation();

  return <div className="grain min-h-[100dvh]">
    <Header count={cart.count} current={location}/>
    <main className="page-enter">
      <Switch>
        <Route path="/" component={HomePage}/>
        <Route path="/shop" component={CataloguePage}/>
        <Route path="/product/:id" component={() => <ProductDetailPage onAdd={cart.add}/>}/>
        <Route path="/request" component={RequestPage}/>
        <Route path="/cart" component={() => <CartPage lines={cart.lines} onEdit={cart.update}/>}/>
        <Route path="/checkout" component={() => <CheckoutPage
          lines={cart.lines}
          onClear={cart.clear}
          onComplete={(lines, amount) => setCheckoutPreview({ lines, total: amount })}
        />}/>
        <Route path="/confirmation" component={() => <ConfirmationPage data={checkoutPreview}/>}/>
        <Route path="/about" component={() => <InformationPage page="about"/>}/>
        <Route path="/delivery" component={() => <InformationPage page="delivery"/>}/>
        <Route path="/faq" component={FAQPage}/>
        <Route path="/contact" component={() => <InformationPage page="contact"/>}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </main>
    <Footer/>
  </div>;
}

export default App;
