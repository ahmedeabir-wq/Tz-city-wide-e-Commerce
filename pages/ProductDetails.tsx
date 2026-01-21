import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProducts } from '../services/data';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
        // In a real app, fetch single product by ID from Supabase
        const allProducts = await fetchProducts();
        const found = allProducts.find(p => p.id === Number(id));
        setProduct(found || null);
        setLoading(false);
    };
    loadProduct();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!product) return <div className="p-10 text-center">Product not found. <Link to="/products" className="text-primary">Go back</Link></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/products" className="text-gray-500 hover:text-primary mb-6 inline-block">
            <i className="fa-solid fa-arrow-left mr-2"></i> Back to Aisles
        </Link>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-96 md:h-auto bg-gray-100 relative">
                     <img 
                        src={product.image_url} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-8 flex flex-col justify-center">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2">{product.category}</span>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">{product.description}</p>
                    
                    <div className="flex items-center mb-8">
                        <span className="text-3xl font-bold text-gray-900 mr-2">${product.price.toFixed(2)}</span>
                        <span className="text-gray-500">/ {product.unit}</span>
                    </div>

                    <div className="flex gap-4">
                        <button 
                            onClick={() => addToCart(product)}
                            className="flex-1 bg-primary text-white font-bold py-4 px-8 rounded-lg hover:bg-emerald-700 transition flex items-center justify-center gap-2 text-lg"
                        >
                            <i className="fa-solid fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                    
                    <div className="mt-8 border-t border-gray-100 pt-6">
                        <div className="flex items-center text-sm text-gray-500 gap-6">
                            <span className="flex items-center gap-2"><i className="fa-solid fa-check text-green-500"></i> In Stock</span>
                            <span className="flex items-center gap-2"><i className="fa-solid fa-truck text-gray-400"></i> Next Day Delivery</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProductDetails;