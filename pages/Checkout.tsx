import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { DeliveryZone, DELIVERY_FEES } from '../types';

const Checkout: React.FC = () => {
  const { user, loading } = useAuth();
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [address, setAddress] = useState('');
  const [zone, setZone] = useState<DeliveryZone>(DeliveryZone.DOWNTOWN);
  const [isProcessing, setIsProcessing] = useState(false);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/auth" replace state={{ from: '/checkout' }} />;
  if (cart.length === 0) return <Navigate to="/" replace />;

  const deliveryFee = DELIVERY_FEES[zone];
  const finalTotal = cartTotal + deliveryFee;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate Supabase Insert Order
    // In a real app: await supabase.from('orders').insert({...})
    
    // Generate a random order ID
    const newOrderId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);

    setTimeout(() => {
        setIsProcessing(false);
        clearCart();
        navigate('/order-tracking', { state: { orderId: newOrderId } }); 
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <form onSubmit={handlePlaceOrder} className="p-6 space-y-6">
            
            {/* Delivery Info */}
            <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Delivery Details</h2>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                        <label className="block text-sm font-medium text-gray-700">Full Address</label>
                        <input 
                            type="text" 
                            required
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border"
                            placeholder="123 Market St, Apt 4B"
                        />
                    </div>

                    <div className="sm:col-span-3">
                         <label className="block text-sm font-medium text-gray-700">Delivery Zone</label>
                         <select 
                            value={zone}
                            onChange={e => setZone(e.target.value as DeliveryZone)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border"
                         >
                            {Object.values(DeliveryZone).map(z => (
                                <option key={z} value={z}>{z}</option>
                            ))}
                         </select>
                         <p className="mt-1 text-xs text-gray-500">Determines delivery fee.</p>
                    </div>
                </div>
            </div>

            {/* Payment (Mock) */}
             <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Payment</h2>
                <div className="space-y-4">
                    <div className="flex items-center">
                        <input id="card" name="payment" type="radio" defaultChecked className="focus:ring-primary h-4 w-4 text-primary border-gray-300" />
                        <label htmlFor="card" className="ml-3 block text-sm font-medium text-gray-700">
                            Credit Card (Stripe/Mock)
                        </label>
                    </div>
                     <div className="flex items-center">
                        <input id="cod" name="payment" type="radio" className="focus:ring-primary h-4 w-4 text-primary border-gray-300" />
                        <label htmlFor="cod" className="ml-3 block text-sm font-medium text-gray-700">
                            Cash on Delivery
                        </label>
                    </div>
                </div>
            </div>

            {/* Totals */}
            <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Delivery Fee ({zone})</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-2 mt-2">
                    <span>Order Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                </div>
            </div>

            <button 
                type="submit" 
                disabled={isProcessing}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
                {isProcessing ? 'Processing...' : 'Place Order'}
            </button>

        </form>
      </div>
    </div>
  );
};

export default Checkout;