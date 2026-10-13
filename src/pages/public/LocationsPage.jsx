// src/pages/public/LocationsPage.jsx
import React from 'react';
import LocationCard from '../../components/LocationCard';
import { POPULAR_LOCATIONS } from '../../data/mockData';
import { MapPin } from 'lucide-react';

const LocationsPage = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#FBFBFA', paddingBottom: '90px' }}>
      <div 
        style={{
          background: 'linear-gradient(180deg, #F4F5F7 0%, #FBFBFA 100%)',
          borderBottom: '1px solid #E5E7EB',
          padding: '60px 24px 40px',
          textAlign: 'center'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
            Destinations
          </div>
          <h1 
            style={{ 
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3rem)', 
              color: '#111418', 
              margin: '0 0 12px',
              fontWeight: 500
            }}
          >
            Explore by city & region
          </h1>
          <p style={{ color: '#4B5563', maxWidth: '540px', margin: '0 auto', fontSize: '0.95rem' }}>
            Discover prime properties across Ahmedabad, Mumbai, Surat, Vadodara, Bengaluru, Pune, and Delhi.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1360px', margin: '36px auto 0', padding: '0 24px' }}>
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px'
          }}
        >
          {POPULAR_LOCATIONS.map((loc) => (
            <LocationCard key={loc.id} location={loc} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationsPage;
