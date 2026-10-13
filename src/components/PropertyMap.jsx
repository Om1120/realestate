// src/components/PropertyMap.jsx
import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Layers, Plane, Coffee, Building } from 'lucide-react';

const PropertyMap = ({ coordinates, address, location, title }) => {
  const [mapMode, setMapMode] = useState('light'); // 'light' | 'satellite'

  const lat = coordinates?.lat || 23.0336;
  const lng = coordinates?.lng || 72.4862;

  const landmarks = [
    { name: 'City Center & Commercial Hub', distance: '2.5 km', icon: Building, duration: '6 mins' },
    { name: 'International Airport', distance: '12.0 km', icon: Plane, duration: '20 mins' },
    { name: 'Gourmet Dining & Cafes', distance: '1.2 km', icon: Coffee, duration: '3 mins' },
    { name: 'Express Highway Arterial', distance: '3.0 km', icon: Navigation, duration: '5 mins' }
  ];

  return (
    <div 
      className="card-luxury"
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #E5E7EB',
        background: '#FFFFFF'
      }}
    >
      {/* Map Header Toolbar */}
      <div 
        style={{
          padding: '16px 20px',
          background: '#FFFFFF',
          borderBottom: '1px solid #E5E7EB',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MapPin size={18} color="#111418" />
          <span style={{ fontSize: '0.9rem', color: '#111418', fontWeight: 600 }}>
            {address || `${location}, India`} ({lat.toFixed(4)}° N, {lng.toFixed(4)}° E)
          </span>
        </div>

        <button
          onClick={() => setMapMode(mapMode === 'light' ? 'satellite' : 'light')}
          className="btn-secondary"
          style={{ padding: '6px 12px', fontSize: '0.78rem' }}
        >
          <Layers size={14} />
          {mapMode === 'light' ? 'Satellite View' : 'Map View'}
        </button>
      </div>

      {/* Simulated Map Visualizer Stage */}
      <div 
        style={{
          position: 'relative',
          height: '320px',
          background: mapMode === 'light' 
            ? 'radial-gradient(circle at 50% 50%, #F3F4F6 0%, #E5E7EB 100%)' 
            : 'radial-gradient(circle at 50% 50%, #1F2937 0%, #111827 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Subtle grid lines */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Pulse radius circles */}
        <div 
          style={{
            position: 'absolute',
            width: '220px',
            height: '220px',
            borderRadius: '50%',
            border: '1px dashed rgba(17, 20, 24, 0.2)'
          }}
        />

        {/* Center Property Pin */}
        <div 
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <div 
            style={{
              background: '#111418',
              color: '#FFFFFF',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              marginBottom: '6px',
              whiteSpace: 'nowrap'
            }}
          >
            {title}
          </div>
          <div 
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#111418',
              border: '2px solid #FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
            }}
          >
            <MapPin size={18} />
          </div>
        </div>

        {/* Compass Needle */}
        <div 
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid #E5E7EB',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#111418'
          }}
        >
          <Compass size={18} />
        </div>
      </div>

      {/* Vicinity Landmarks */}
      <div style={{ padding: '20px', background: '#FAFAF9', borderTop: '1px solid #E5E7EB' }}>
        <h4 
          style={{
            fontSize: '0.82rem',
            fontWeight: 700,
            color: '#6B7280',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '12px'
          }}
        >
          Nearby Accessibility & Transit
        </h4>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '10px'
          }}
        >
          {landmarks.map((item, idx) => (
            <div 
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                background: '#FFFFFF',
                borderRadius: '8px',
                border: '1px solid #E5E7EB'
              }}
            >
              <item.icon size={16} color="#111418" style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.82rem', color: '#111418', fontWeight: 600 }}>{item.name}</div>
                <div style={{ fontSize: '0.72rem', color: '#6B7280' }}>{item.distance} • ~{item.duration}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;
