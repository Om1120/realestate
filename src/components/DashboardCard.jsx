// src/components/DashboardCard.jsx
import React from 'react';

const DashboardCard = ({ title, value, subtitle, icon: Icon, trend, color = '#111418' }) => {
  return (
    <div 
      className="card-luxury"
      style={{
        padding: '24px',
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E5E7EB',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <span style={{ fontSize: '0.84rem', fontWeight: 600, color: '#6B7280' }}>
          {title}
        </span>
        {Icon && (
          <div 
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              background: '#F4F5F7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#111418'
            }}
          >
            <Icon size={18} />
          </div>
        )}
      </div>

      <div>
        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111418', letterSpacing: '-0.02em', marginBottom: '4px' }}>
          {value}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#6B7280' }}>
          {trend && (
            <span style={{ color: '#059669', fontWeight: 600 }}>{trend}</span>
          )}
          {subtitle && <span>{subtitle}</span>}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
