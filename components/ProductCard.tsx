import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      <Link to={`/products/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-100 group">
        <img 
          src={product.image_url} 
          alt={product.name} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        {product.stock < 10 && product.stock > 0 && (
          <span className="absolute top-2 left-2 bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded-full">
            Low Stock
          </span>
        )}
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-xs text-primary font-medium uppercase tracking-wider">{product.category}</span>
          <Link to={`/products/${product.id}`}>
            <h3 className="text-lg font-semibold text-gray-900 leading-tight hover:text-primary transition">{product.name}</h3>
          </Link>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
        </div>
        
        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
            <span className="text-xs text-gray-500 ml-1">/{product.unit}</span>
          </div>
          
          <button 
            onClick={() => addToCart(product)}
            className="inline-flex items-center justify-center p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            aria-label="Add to cart"
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;