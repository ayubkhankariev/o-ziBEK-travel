import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">O‘ziBEK</Link>
        
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-primary">{t('home')}</Link>
          <Link to="/stays" className="hover:text-primary">{t('stays')}</Link>
          <Link to="/attractions" className="hover:text-primary">{t('attractions')}</Link>
          <Link to="/map" className="hover:text-primary">{t('map')}</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <select 
            onChange={(e) => changeLanguage(e.target.value)} 
            className="border rounded p-1 text-sm"
            defaultValue={i18n.language}
          >
            <option value="en">EN</option>
            <option value="ru">RU</option>
            <option value="uz">UZ</option>
          </select>

          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="font-semibold">{user.name}</Link>
              <button onClick={logout} className="text-red-500 hover:text-red-700">{t('logout')}</button>
            </div>
          ) : (
            <div className="space-x-2">
              <Link to="/login" className="text-primary hover:underline">{t('login')}</Link>
              <Link to="/register" className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600">{t('register')}</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
