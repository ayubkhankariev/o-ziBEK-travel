import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[500px] bg-cover bg-center" style={{ backgroundImage: "url('/images/Tashkent-2-1920x720_tcm8-148116.png')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-5xl font-bold mb-4">{t('welcome')}</h1>
          <p className="text-xl mb-8">{t('subtitle')}</p>
          <div className="space-x-4">
            <Link to="/stays" className="bg-primary px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition">{t('book_stay')}</Link>
            <Link to="/attractions" className="bg-secondary px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition">{t('explore_attractions')}</Link>
          </div>
        </div>
      </div>

      {/* Why Visit Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">{t('why_visit')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: t('history_culture'), icon: /*'/images/star-struck_1f929.png'*/'' },
            { title: t('hospitality'), icon: '' },
            { title: t('nature'), icon: '' },
            { title: t('modern_cities'), icon: '' }
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition">
              <div className="text-4xl mb-4 flex justify-center items-center h-12">
                {item.icon.startsWith('/') ? (
                  <img src={item.icon} alt={item.title} className="h-full w-auto" />
                ) : (
                  item.icon
                )}
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Cities */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('popular_cities')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: 'Tashkent', image: '/images/Tashkent.png' },
              { name: 'Samarkand', image: '/images/Samarkand.jpg' },
              { name: 'Bukhara', image: '/images/Bukhara.jpg' },
              { name: 'Khiva', image: '/images/Khiva.jpg' }
            ].map((city) => (
              <Link to={`/stays?city=${city.name}`} key={city.name} className="relative h-64 rounded-lg overflow-hidden group cursor-pointer">
                <img 
                  src={city.image} 
                  alt={city.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  onError={(e) => {e.target.src = 'https://via.placeholder.com/400x300?text=' + city.name}}
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-40 transition">
                  <h3 className="text-white text-2xl font-bold">{city.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
