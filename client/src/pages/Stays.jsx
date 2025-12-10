import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';

const Stays = () => {
  const [stays, setStays] = useState([]);
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const cityParam = searchParams.get('city');

  const [filters, setFilters] = useState({
    city: cityParam || '',
    type: '',
    minPrice: '',
    maxPrice: ''
  });

  useEffect(() => {
    fetchStays();
  }, [filters]); // Re-fetch when filters change

  const fetchStays = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.city) params.append('city', filters.city);
      if (filters.type) params.append('type', filters.type);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

      const res = await axios.get(`/api/stays?${params.toString()}`);
      setStays(res.data);
    } catch (error) {
      console.error('Error fetching stays:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('stays')}</h1>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-8 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <select name="city" value={filters.city} onChange={handleFilterChange} className="border rounded p-2 w-40">
            <option value="">All</option>
            <option value="Tashkent">Tashkent</option>
            <option value="Samarkand">Samarkand</option>
            <option value="Bukhara">Bukhara</option>
            <option value="Khiva">Khiva</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select name="type" value={filters.type} onChange={handleFilterChange} className="border rounded p-2 w-40">
            <option value="">All</option>
            <option value="hotel">Hotel</option>
            <option value="hostel">Hostel</option>
            <option value="guesthouse">Guesthouse</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Min Price</label>
          <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} className="border rounded p-2 w-24" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Max Price</label>
          <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} className="border rounded p-2 w-24" />
        </div>
        <button onClick={fetchStays} className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600">{t('filter')}</button>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stays.map(stay => (
          <div key={stay.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img 
              src={JSON.parse(stay.images)[0]} 
              alt={stay.name} 
              className="w-full h-48 object-cover"
              onError={(e) => {e.target.src = 'https://via.placeholder.com/400x300'}}
            />
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold mb-2">{stay.name}</h3>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">{stay.rating} ★</span>
              </div>
              <p className="text-gray-600 mb-2">{stay.city}</p>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">{stay.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-primary">${stay.price_per_night} <span className="text-sm text-gray-500">/ night</span></span>
                <Link to={`/stays/${stay.id}`} className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 transition">{t('view_details')}</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stays;
