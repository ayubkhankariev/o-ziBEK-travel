import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-screen min-h-[600px] bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/images/Tashkent-2-1920x720_tcm8-148116.png')" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up text-shadow-lg">
            {t('welcome')}
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl animate-fade-in-up delay-100 text-shadow">
            {t('subtitle')}
          </p>
          <div className="space-x-4 animate-fade-in-up delay-200">
            <Link to="/stays" className="bg-primary px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-600 transition transform hover:scale-105 shadow-lg inline-block">
              {t('book_stay')}
            </Link>
            <Link to="/attractions" className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition transform hover:scale-105 shadow-lg inline-block">
              {t('explore_attractions')}
            </Link>
          </div>
          
          <div className="absolute bottom-10 animate-bounce">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Why Visit Section - Enhanced */}
      <div className="container mx-auto px-4 py-24">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 relative inline-block left-1/2 transform -translate-x-1/2">
          {t('why_visit')}
          <span className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-full"></span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              title: t('history_culture'), 
              icon: '🕌', 
              desc: 'Погрузитесь в тысячелетнюю историю Великого Шелкового пути. Посетите древние города Самарканд, Бухара и Хива.' 
            },
            { 
              title: t('hospitality'), 
              icon: '🍲', 
              desc: 'Насладитесь всемирно известным узбекским пловом и почувствуйте теплоту восточного гостеприимства.' 
            },
            { 
              title: t('nature'), 
              icon: '🏔️', 
              desc: 'Откройте для себя величественные горы Тянь-Шаня, пустыню Кызылкум и живописные озера.' 
            },
            { 
              title: t('modern_cities'), 
              icon: '🏙️', 
              desc: 'Увидьте современный Ташкент с его парками, музеями и развитой инфраструктурой.' 
            }
          ].map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="text-6xl mb-6 animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* New Section: Tour Types */}
      <div className="bg-gray-900 text-white py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Виды Туризма</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="relative group overflow-hidden rounded-2xl h-80 cursor-pointer">
                <img src="/images/Samarkand.jpg" alt="Historical" className="w-full h-full object-cover transition duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40" />
                <div className="absolute inset-0 flex flex-col justify-center items-center p-6">
                  <h3 className="text-3xl font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition duration-500">Исторический</h3>
                  <p className="text-center opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 transition duration-500 delay-100">
                    Путешествие сквозь века по следам древних цивилизаций.
                  </p>
                </div>
             </div>
             <div className="relative group overflow-hidden rounded-2xl h-80 cursor-pointer">
                <img src="/images/Bukhara.jpg" alt="Gastronomic" className="w-full h-full object-cover transition duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40" />
                <div className="absolute inset-0 flex flex-col justify-center items-center p-6">
                  <h3 className="text-3xl font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition duration-500">Гастрономический</h3>
                  <p className="text-center opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 transition duration-500 delay-100">
                    Вкуснейшие блюда национальной кухни в каждом регионе.
                  </p>
                </div>
             </div>
             <div className="relative group overflow-hidden rounded-2xl h-80 cursor-pointer">
                <img src="/images/Khiva.jpg" alt="Eco" className="w-full h-full object-cover transition duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40" />
                <div className="absolute inset-0 flex flex-col justify-center items-center p-6">
                  <h3 className="text-3xl font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition duration-500">Эко-туризм</h3>
                  <p className="text-center opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 transition duration-500 delay-100">
                    Единение с природой в горах и пустынях.
                  </p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Popular Cities */}
      <div className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">{t('popular_cities')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: 'Tashkent', image: '/images/Tashkent.png', desc: t('tashkent_desc') },
              { name: 'Samarkand', image: '/images/Samarkand.jpg', desc: t('samarkand_desc') },
              { name: 'Bukhara', image: '/images/Bukhara.jpg', desc: t('bukhara_desc') },
              { name: 'Khiva', image: '/images/Khiva.jpg', desc: t('khiva_desc') }
            ].map((city) => (
              <Link to={`/stays?city=${city.name}`} key={city.name} className="relative h-96 rounded-2xl overflow-hidden group cursor-pointer shadow-lg">
                <img 
                  src={city.image} 
                  alt={city.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  onError={(e) => {e.target.src = 'https://via.placeholder.com/400x600?text=' + city.name}}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-2xl font-bold mb-1 transform translate-y-2 group-hover:translate-y-0 transition duration-300">{t(city.name.toLowerCase())}</h3>
                  <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition duration-300 delay-75">
                    {city.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-primary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-blue-100">{t('ancient_cities')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">{t('hotels_count')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">{t('attractions_count')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">{t('support')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
