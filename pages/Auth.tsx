import React, { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate, useLocation } from 'react-router-dom';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from || '/';

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate(from, { replace: true });
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert("Registration successful! Please check your email or log in.");
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">
            <i className="fa-solid fa-leaf text-primary text-4xl mb-4"></i>
            <h2 className="text-3xl font-extrabold text-gray-900">
                {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
                {isLogin ? 'Sign in to access your orders' : 'Join FreshCity for smart shopping'}
            </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleAuth}>
            {error && <div className="bg-red-50 text-red-600 p-3 rounded text-sm">{error}</div>}
            
            <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <input 
                        type="email" 
                        required 
                        className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                        placeholder="Email address"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input 
                        type="password" 
                        required 
                        className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
            </div>

            <div>
                <button 
                    type="submit" 
                    disabled={loading}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70"
                >
                    {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Register')}
                </button>
            </div>
        </form>

        <div className="text-center">
            <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm font-medium text-primary hover:text-emerald-500"
            >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;