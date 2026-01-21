import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const OrderTracking: React.FC = () => {
  const location = useLocation();
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState<'idle' | 'searching' | 'found' | 'error'>('idle');
  const [currentStep, setCurrentStep] = useState(0);

  // Mock order steps
  const steps = [
    { title: 'Order Placed', date: 'Today, 10:30 AM', icon: 'fa-clipboard-check' },
    { title: 'Processing', date: 'Today, 10:45 AM', icon: 'fa-box-open' },
    { title: 'Out for Delivery', date: 'Expected 2:00 PM', icon: 'fa-truck-fast' },
    { title: 'Delivered', date: 'Expected 3:30 PM', icon: 'fa-house-chimney' },
  ];

  useEffect(() => {
    // If navigated from checkout with a new order
    if (location.state?.orderId) {
      setOrderId(location.state.orderId);
      setStatus('found');
      setCurrentStep(1); // Simulate it's in processing
    }
  }, [location.state]);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;
    
    setStatus('searching');
    // Simulate API call
    setTimeout(() => {
      setStatus('found');
      setCurrentStep(Math.floor(Math.random() * 3)); // Random status for demo
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Track Your Order</h1>
        <p className="mt-2 text-gray-500">Enter your order ID to check delivery status.</p>
      </div>

      {/* Search Box */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-10">
        <form onSubmit={handleTrack} className="flex gap-4">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="e.g., ORD-8392"
            className="flex-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:ring-primary focus:border-primary sm:text-sm"
          />
          <button
            type="submit"
            className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Track
          </button>
        </form>
      </div>

      {/* Status View */}
      {status === 'searching' && (
        <div className="text-center py-12">
          <i className="fa-solid fa-circle-notch fa-spin text-3xl text-primary"></i>
          <p className="mt-4 text-gray-500">Locating your fresh groceries...</p>
        </div>
      )}

      {status === 'found' && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-primary/5 p-4 border-b border-primary/10 flex justify-between items-center">
            <span className="font-bold text-primary">Order #{orderId}</span>
            <span className="text-sm text-primary bg-white px-2 py-1 rounded-full border border-primary/20">
              {steps[currentStep].title}
            </span>
          </div>
          
          <div className="p-8">
            <div className="relative">
              {/* Vertical line for mobile, horizontal for desktop could be done but vertical is safer for lists */}
              <div className="absolute left-8 top-0 h-full w-0.5 bg-gray-200" aria-hidden="true"></div>
              
              <ul className="relative space-y-8">
                {steps.map((step, stepIdx) => (
                  <li key={step.title} className="relative flex items-start group">
                    <span className="h-16 flex items-center">
                      <span className={`relative z-10 w-16 h-16 flex items-center justify-center rounded-full border-4 ${
                        stepIdx <= currentStep ? 'bg-primary border-emerald-100 text-white' : 'bg-white border-gray-200 text-gray-400'
                      }`}>
                        <i className={`fa-solid ${step.icon} text-xl`}></i>
                      </span>
                    </span>
                    <div className="ml-6 min-w-0 flex flex-col justify-center h-16">
                      <h3 className={`text-lg font-bold ${stepIdx <= currentStep ? 'text-gray-900' : 'text-gray-400'}`}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-500">{step.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            {currentStep === 3 && (
               <div className="mt-8 bg-green-50 p-4 rounded-lg text-center text-green-800">
                  <i className="fa-solid fa-check-circle mr-2"></i> Order delivered successfully!
               </div>
            )}
          </div>
          
          <div className="bg-gray-50 p-4 text-center">
             <Link to="/" className="text-primary font-medium hover:text-emerald-700">Continue Shopping</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;