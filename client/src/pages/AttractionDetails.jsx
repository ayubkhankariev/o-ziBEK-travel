import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const AttractionDetails = () => {
  const { id } = useParams();
  const [attraction, setAttraction] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchAttraction = async () => {
      try {
        const res = await axios.get(`/api/attractions/${id}`);
        setAttraction(res.data);
      } catch (error) {
        console.error('Error fetching attraction:', error);
      }
    };
    fetchAttraction();
  }, [id]);

  if (!attraction) return <div className="container mx-auto px-4 py-8">Loading...</div>;

  const images = JSON.parse(attraction.images);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{attraction.name}</h1>
      <div className="flex items-center space-x-4 mb-6">
        <span className="bg-accent text-black px-3 py-1 rounded-full text-sm font-semibold">{attraction.category}</span>
        <span className="text-gray-600">{attraction.city}</span>
      </div>

      <div className="mb-8 rounded-lg overflow-hidden h-[500px]">
        <img src={images[0]} alt={attraction.name} className="w-full h-full object-cover" onError={(e) => {e.target.src = 'https://via.placeholder.com/1200x600'}} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">About</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{attraction.description}</p>
        </div>

        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Visiting Info</h3>
            <div className="space-y-4">
              <div>
                <span className="block text-sm text-gray-500">Recommended Time</span>
                <span className="font-semibold">{attraction.recommended_time}</span>
              </div>
              <div>
                <span className="block text-sm text-gray-500">Best Time to Visit</span>
                <span className="font-semibold">{attraction.best_time}</span>
              </div>
              <div>
                <span className="block text-sm text-gray-500">Rating</span>
                <span className="font-semibold text-yellow-500">{attraction.rating} ★</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttractionDetails;
