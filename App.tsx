import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import OrderTracking from './pages/OrderTracking';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/order-tracking" element={<OrderTracking />} />
            </Routes>
          </Layout>
        </CartProvider>
      </AuthProvider>
    </HashRouter>
  );
};

export default App;