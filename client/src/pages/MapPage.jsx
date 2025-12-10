import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapPage = () => {
  const [items, setItems] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [staysRes, attractionsRes] = await Promise.all([
          axios.get('/api/stays'),
          axios.get('/api/attractions')
        ]);
        
        const stays = staysRes.data.map(s => ({ ...s, type: 'stay' }));
        const attractions = attractionsRes.data.map(a => ({ ...a, type: 'attraction' }));
        
        setItems([...stays, ...attractions]);
      } catch (error) {
        console.error('Error fetching map data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-[calc(100vh-64px)] w-full">
      <MapContainer center={[41.3111, 69.2797]} zoom={6} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {items.map(item => (
          <Marker key={`${item.type}-${item.id}`} position={[item.latitude, item.longitude]}>
            <Popup>
              <div className="w-48">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-600 capitalize">{item.type === 'stay' ? item.type : item.category}</p>
                <p className="text-sm mt-1">{item.city}</p>
                <a href={`/${item.type === 'stay' ? 'stays' : 'attractions'}`} className="text-primary text-sm mt-2 block hover:underline">
                  {t('view_details')}
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapPage;
