import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Attractions = () => {
  const [attractions, setAttractions] = useState([]);
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    city: '',
    category: ''
  });

  useEffect(() => {
    fetchAttractions();
  }, [filters]);

  const fetchAttractions = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.city) params.append('city', filters.city);
      if (filters.category) params.append('category', filters.category);

      const res = await axios.get(`/api/attractions?${params.toString()}`);
      setAttractions(res.data);
    } catch (error) {
      console.error('Error fetching attractions:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('attractions')}</h1>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-8 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('city')}</label>
          <select name="city" value={filters.city} onChange={handleFilterChange} className="border rounded p-2 w-40">
            <option value="">{t('all')}</option>
            <option value="Tashkent">{t('tashkent')}</option>
            <option value="Samarkand">{t('samarkand')}</option>
            <option value="Bukhara">{t('bukhara')}</option>
            <option value="Khiva">{t('khiva')}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('category')}</label>
          <select name="category" value={filters.category} onChange={handleFilterChange} className="border rounded p-2 w-40">
            <option value="">{t('all')}</option>
            <option value="Historical">{t('historical')}</option>
            <option value="Cultural">{t('cultural')}</option>
            <option value="Nature">{t('nature_only')}</option>
          </select>
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {attractions.map(attraction => (
          <div key={attraction.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img 
              src={JSON.parse(attraction.images)[0]} 
              alt={attraction.name} 
              className="w-full h-48 object-cover"
              onError={(e) => {e.target.src = 'https://via.placeholder.com/400x300'}}
            />
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold mb-2">{attraction.name}</h3>
                <span className="bg-accent text-black text-xs font-semibold px-2.5 py-0.5 rounded">
                  {attraction.category === 'Nature' ? t('nature_only') : t(attraction.category.toLowerCase())}
                </span>
              </div>
              <p className="text-gray-600 mb-2">{t(attraction.city.toLowerCase())}</p>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">{attraction.description}</p>
              <Link to={`/attractions/${attraction.id}`} className="block w-full bg-secondary text-white px-4 py-2 rounded hover:bg-green-600 transition text-center">{t('view_details')}</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attractions;
