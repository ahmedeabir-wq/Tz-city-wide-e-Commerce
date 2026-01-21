import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SmartChef from '../components/SmartChef';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
            <i className="fa-solid fa-basket-shopping text-4xl"></i>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your basket is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-700 transition">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Basket</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden mb-6">
            <ul className="divide-y divide-gray-200">
              {cart.map((item) => (
                <li key={item.id} className="p-4 sm:p-6 flex items-center">
                  <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-4 flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900"><Link to={`/products/${item.id}`}>{item.name}</Link></h3>
                        <p className="text-sm text-gray-500">${item.price.toFixed(2)} / {item.unit}</p>
                    </div>
                    
                    <div className="mt-4 sm:mt-0 flex items-center gap-4">
                        <div className="flex items-center border border-gray-300 rounded-md">
                            <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-50"
                            >-</button>
                            <span className="px-3 py-1 text-gray-900 font-medium">{item.quantity}</span>
                            <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-50"
                            >+</button>
                        </div>
                        <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                            Remove
                        </button>
                    </div>
                    
                    <div className="mt-4 sm:mt-0 text-right w-24">
                        <p className="text-lg font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* AI Feature Injection */}
          <div className="mt-8">
            <SmartChef />
          </div>
        </div>

        <div className="lg:col-span-4 mt-8 lg:mt-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            
            <div className="flow-root">
              <dl className="-my-4 text-sm divide-y divide-gray-200">
                <div className="py-4 flex items-center justify-between">
                  <dt className="text-gray-600">Subtotal</dt>
                  <dd className="font-medium text-gray-900">${cartTotal.toFixed(2)}</dd>
                </div>
                <div className="py-4 flex items-center justify-between">
                  <dt className="text-gray-600">Delivery</dt>
                  <dd className="font-medium text-gray-900">Calculated at Checkout</dd>
                </div>
                <div className="py-4 flex items-center justify-between border-t border-gray-200">
                  <dt className="text-base font-bold text-gray-900">Total</dt>
                  <dd className="text-base font-bold text-gray-900">${cartTotal.toFixed(2)}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-6">
              <Link
                to="/checkout"
                className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-emerald-700 transition"
              >
                Proceed to Checkout
              </Link>
            </div>
            <div className="mt-4 text-center text-sm text-gray-500">
                <i className="fa-solid fa-lock mr-1"></i> Secure Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;