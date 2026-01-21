import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/data';
import { Product } from '../types';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchProducts();
      setFeaturedProducts(data.slice(0, 4)); // Show top 4
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="flex flex-col gap-10 pb-10">
      {/* Hero Section */}
      <section className="relative bg-secondary text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
            <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop" className="w-full h-full object-cover" alt="Market background" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Freshness Delivered <br className="hidden sm:block" />
            <span className="text-primary">City-Wide.</span>
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl">
            From farm to your front door in hours. Experience the modern way to shop for groceries with distance-based delivery.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link to="/products" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-emerald-700 md:text-lg transition">
              Start Shopping
            </Link>
            <Link to="/auth" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-secondary md:text-lg transition">
              Join Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fa-solid fa-truck-fast text-xl"></i>
                </div>
                <h3 className="text-lg font-bold text-gray-900">City-Wide Delivery</h3>
                <p className="mt-2 text-gray-500">We cover every district. Delivery fees calculated by distance.</p>
            </div>
             <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fa-solid fa-carrot text-xl"></i>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Fresh Guarantee</h3>
                <p className="mt-2 text-gray-500">If it's not fresh, we'll replace it. No questions asked.</p>
            </div>
             <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fa-solid fa-mobile-screen text-xl"></i>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Easy Ordering</h3>
                <p className="mt-2 text-gray-500">Shop on the go with our mobile-first optimized store.</p>
            </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Weekly Specials</h2>
          <Link to="/products" className="text-primary hover:text-emerald-700 font-medium flex items-center gap-1">
            View All <i className="fa-solid fa-arrow-right text-sm"></i>
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;