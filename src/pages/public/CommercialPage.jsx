// src/pages/public/CommercialPage.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import PropertyCard from '../../components/PropertyCard';
import { Building2 } from 'lucide-react';

const CommercialPage = () => {
  const properties = useSelector((state) => state.properties.items);
  const commercialListings = properties.filter(
    (p) => p.category === 'Commercial' || p.propertyType === 'Commercial' || p.propertyType === 'Office' || p.propertyType === 'Retail'
  );

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
            Commercial Portfolio
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
            Prime Commercial Spaces & Offices
          </h1>
          <p style={{ color: '#4B5563', maxWidth: '540px', margin: '0 auto', fontSize: '0.95rem' }}>
            Grade-A corporate floor-plates, luxury retail showrooms, and modern business towers.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1360px', margin: '36px auto 0', padding: '0 24px' }}>
        <div style={{ marginBottom: '24px', color: '#4B5563', fontSize: '0.88rem' }}>
          Showing <span style={{ color: '#111418', fontWeight: 700 }}>{commercialListings.length}</span> commercial listings
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '28px'
          }}
        >
          {commercialListings.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommercialPage;
