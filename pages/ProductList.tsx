import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts, fetchCategories } from '../services/data';
import { Product } from '../types';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [prodData, catData] = await Promise.all([fetchProducts(), fetchCategories()]);
      setProducts(prodData);
      setCategories(['All', ...catData]);
      setLoading(false);
    };
    loadData();
  }, []);

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shop Aisles</h1>
      
      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="animate-pulse bg-gray-200 h-80 rounded-lg"></div>
            ))}
        </div>
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;