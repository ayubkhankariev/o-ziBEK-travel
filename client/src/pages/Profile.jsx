import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const { user, loading } = useAuth();
  const { t } = useTranslation();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('profile')}</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-500">{user.country || 'Uzbekistan'}</p>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-xl font-bold mb-4">My Bookings</h3>
          <p className="text-gray-500 italic">No bookings yet.</p>
        </div>

        <div className="border-t pt-6 mt-6">
          <h3 className="text-xl font-bold mb-4">My Favorites</h3>
          <p className="text-gray-500 italic">No favorites yet.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
