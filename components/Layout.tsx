import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, signOut } = useAuth();
  const { itemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? "text-primary font-bold" : "text-gray-600 hover:text-primary";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                <i className="fa-solid fa-leaf text-primary text-2xl"></i>
                <span className="font-bold text-xl tracking-tight text-secondary">FreshCity</span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link to="/" className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${isActive('/')}`}>
                  Home
                </Link>
                <Link to="/products" className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${isActive('/products')}`}>
                  Aisles
                </Link>
              </div>
            </div>
            
            <div className="hidden sm:flex items-center space-x-4">
              <Link to="/cart" className="relative p-2 text-gray-600 hover:text-primary transition">
                <i className="fa-solid fa-cart-shopping text-xl"></i>
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
                    {itemCount}
                  </span>
                )}
              </Link>
              
              {user ? (
                <div className="flex items-center gap-4 ml-4">
                  <Link to="/profile" className={`text-sm font-medium ${isActive('/profile')}`}>
                    <i className="fa-regular fa-user mr-1"></i> Account
                  </Link>
                  <button 
                    onClick={() => signOut()}
                    className="text-sm font-medium text-red-500 hover:text-red-600"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/auth" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-emerald-700 transition">
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
               <Link to="/cart" className="relative p-2 mr-4 text-gray-600 hover:text-primary">
                <i className="fa-solid fa-cart-shopping text-xl"></i>
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
                    {itemCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              >
                <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden bg-white border-b border-gray-200">
            <div className="pt-2 pb-3 space-y-1">
              <Link to="/" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary hover:text-primary">Home</Link>
              <Link to="/products" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary hover:text-primary">Aisles</Link>
              <Link to="/order-tracking" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary hover:text-primary">Track Order</Link>
              {user ? (
                <>
                  <Link to="/profile" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary hover:text-primary">My Profile</Link>
                  <button onClick={() => signOut()} className="w-full text-left block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-red-500 hover:bg-gray-50 hover:text-red-700">Logout</button>
                </>
              ) : (
                 <Link to="/auth" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-primary hover:bg-gray-50 font-bold">Sign In / Register</Link>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start space-x-6 items-center">
               <div className="flex space-x-6">
                <span className="text-gray-400 hover:text-gray-500 cursor-pointer"><i className="fa-brands fa-facebook"></i></span>
                <span className="text-gray-400 hover:text-gray-500 cursor-pointer"><i className="fa-brands fa-instagram"></i></span>
                <span className="text-gray-400 hover:text-gray-500 cursor-pointer"><i className="fa-brands fa-twitter"></i></span>
               </div>
               <div className="h-4 w-px bg-gray-300 mx-2 hidden md:block"></div>
               <Link to="/order-tracking" className="text-sm text-gray-500 hover:text-primary hidden md:block">Track Order</Link>
            </div>
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-center text-base text-gray-400">
                &copy; 2024 FreshCity Market. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;