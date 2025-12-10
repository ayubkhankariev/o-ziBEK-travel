import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

const StayDetails = () => {
  const { id } = useParams();
  const [stay, setStay] = useState(null);
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [booking, setBooking] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    specialRequests: ''
  });

  useEffect(() => {
    const fetchStay = async () => {
      try {
        const res = await axios.get(`/api/stays/${id}`);
        setStay(res.data);
      } catch (error) {
        console.error('Error fetching stay:', error);
      }
    };
    fetchStay();
  }, [id]);

  const handleBookingChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    // In a real app, we would send this to the backend
    alert('Booking feature is simulated. Booking request sent!');
  };

  if (!stay) return <div className="container mx-auto px-4 py-8">Loading...</div>;

  const images = JSON.parse(stay.images);
  const amenities = JSON.parse(stay.amenities);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{stay.name}</h1>
          <p className="text-gray-600 mb-4">{stay.address}, {stay.city}</p>
          
          <div className="mb-6 rounded-lg overflow-hidden h-96">
            <img src={images[0]} alt={stay.name} className="w-full h-full object-cover" onError={(e) => {e.target.src = 'https://via.placeholder.com/800x600'}} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">{stay.description}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 gap-4">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center text-gray-700">
                  <span className="mr-2">✓</span> {amenity}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Booking Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-lg sticky top-24">
            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-bold text-primary">${stay.price_per_night}</span>
              <span className="text-gray-500">/ night</span>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Check-in</label>
                <input 
                  type="date" 
                  name="checkIn" 
                  value={booking.checkIn} 
                  onChange={handleBookingChange} 
                  className="mt-1 block w-full border rounded-md p-2"
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Check-out</label>
                <input 
                  type="date" 
                  name="checkOut" 
                  value={booking.checkOut} 
                  onChange={handleBookingChange} 
                  className="mt-1 block w-full border rounded-md p-2"
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Guests</label>
                <input 
                  type="number" 
                  name="guests" 
                  min="1"
                  value={booking.guests} 
                  onChange={handleBookingChange} 
                  className="mt-1 block w-full border rounded-md p-2"
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Special Requests</label>
                <textarea 
                  name="specialRequests" 
                  value={booking.specialRequests} 
                  onChange={handleBookingChange} 
                  className="mt-1 block w-full border rounded-md p-2"
                  rows="3"
                />
              </div>
              
              <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition">
                {t('book_now')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StayDetails;
