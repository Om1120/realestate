// src/components/LocationCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFilter } from '../redux/slices/propertySlice';
import { ArrowUpRight } from 'lucide-react';

const LocationCard = ({ location }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleExploreLocation = () => {
    dispatch(setFilter({ location: location.name }));
    navigate(`/properties?location=${location.name}`);
  };

  return (
    <div 
      onClick={handleExploreLocation}
      style={{
        position: 'relative',
        height: '320px',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)'
      }}
      className="location-card-modern"
    >
      <img 
        src={location.image || '/properties/villa_sovereign.jpg'} 
        alt={location.name}
        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = '/properties/villa_sovereign.jpg';
        }}
      />

      {/* Gradient Overlay */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(17, 20, 24, 0.1) 0%, rgba(17, 20, 24, 0.75) 100%)',
          transition: 'background 0.3s ease'
        }}
      />

      {/* Text Info */}
      <div 
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          right: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          color: '#FFFFFF'
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#FFFFFF', margin: '0 0 2px' }}>
            {location.name}
          </h3>
          <span style={{ fontSize: '0.82rem', color: '#D1D5DB' }}>
            {location.propertiesCount || 12} Properties
          </span>
        </div>

        <div 
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            transition: 'all 0.2s'
          }}
          className="location-arrow"
        >
          <ArrowUpRight size={18} />
        </div>
      </div>

      <style>{`
        .location-card-modern:hover img {
          transform: scale(1.05);
        }
        .location-card-modern:hover .location-arrow {
          background: #FFFFFF !important;
          color: #111418 !important;
          transform: translate(2px, -2px);
        }
      `}</style>
    </div>
  );
};

export default LocationCard;
