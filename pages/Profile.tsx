import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/auth" />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* User Info */}
            <div className="lg:col-span-1">
                <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl">
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">User Profile</h2>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                    </div>
                    <div className="border-t pt-4">
                         <p className="text-sm text-gray-600 mb-2">Member since: {new Date(user.created_at || Date.now()).toLocaleDateString()}</p>
                         <button className="text-sm text-primary hover:text-emerald-700 font-medium">Edit Profile</button>
                    </div>
                </div>
            </div>

            {/* Order History */}
            <div className="lg:col-span-2">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h2>
                <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-hidden">
                    {/* Mock Orders List */}
                    <div className="p-6 text-center text-gray-500">
                        <i className="fa-solid fa-box-open text-4xl mb-4 text-gray-300"></i>
                        <p>No recent orders found.</p>
                        <p className="text-xs mt-2">Placed orders will appear here (Simulated in this demo).</p>
                    </div>
                    
                    {/* 
                      Note: In a real app, we would fetch orders from Supabase here:
                      supabase.from('orders').select('*').eq('user_id', user.id)
                    */}
                </div>
            </div>
        </div>
    </div>
  );
};

export default Profile;