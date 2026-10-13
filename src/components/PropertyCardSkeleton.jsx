// src/components/PropertyCardSkeleton.jsx
import React from 'react';

/**
 * 21st.dev style skeleton placeholder card with refined wave shimmer
 */
export const PropertyCardSkeleton = ({ viewMode = 'grid' }) => {
  if (viewMode === 'list') {
    return (
      <div 
        className="card-property-modern skeleton-card"
        style={{
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          background: '#FFFFFF',
          borderRadius: '10px',
          border: '1px solid #E5E7EB',
          overflow: 'hidden'
        }}
      >
        {/* Image Shimmer Box */}
        <div className="skeleton-shimmer" style={{ height: '100%', minHeight: '220px' }} />

        {/* Content Shimmer Area */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div className="skeleton-shimmer" style={{ width: '80px', height: '14px', borderRadius: '4px' }} />
              <div className="skeleton-shimmer" style={{ width: '110px', height: '22px', borderRadius: '4px' }} />
            </div>

            <div className="skeleton-shimmer" style={{ width: '70%', height: '22px', borderRadius: '4px', marginBottom: '10px' }} />
            <div className="skeleton-shimmer" style={{ width: '45%', height: '14px', borderRadius: '4px', marginBottom: '18px' }} />

            <div className="skeleton-shimmer" style={{ width: '100%', height: '12px', borderRadius: '4px', marginBottom: '6px' }} />
            <div className="skeleton-shimmer" style={{ width: '85%', height: '12px', borderRadius: '4px' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid #F3F4F6' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div className="skeleton-shimmer" style={{ width: '60px', height: '14px', borderRadius: '4px' }} />
              <div className="skeleton-shimmer" style={{ width: '60px', height: '14px', borderRadius: '4px' }} />
              <div className="skeleton-shimmer" style={{ width: '80px', height: '14px', borderRadius: '4px' }} />
            </div>
            <div className="skeleton-shimmer" style={{ width: '90px', height: '16px', borderRadius: '4px' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="card-property-modern skeleton-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: '#FFFFFF',
        borderRadius: '10px',
        border: '1px solid #E5E7EB',
        overflow: 'hidden'
      }}
    >
      {/* Image box shimmer */}
      <div className="skeleton-shimmer" style={{ height: '240px', width: '100%' }} />

      {/* Body shimmer */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div className="skeleton-shimmer" style={{ width: '70px', height: '14px', borderRadius: '4px' }} />
          <div className="skeleton-shimmer" style={{ width: '90px', height: '20px', borderRadius: '4px' }} />
        </div>

        <div className="skeleton-shimmer" style={{ width: '80%', height: '20px', borderRadius: '4px', marginBottom: '10px' }} />
        <div className="skeleton-shimmer" style={{ width: '55%', height: '14px', borderRadius: '4px', marginBottom: '20px' }} />

        <div 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '16px',
            borderTop: '1px solid #F3F4F6',
            marginTop: 'auto'
          }}
        >
          <div style={{ display: 'flex', gap: '12px' }}>
            <div className="skeleton-shimmer" style={{ width: '45px', height: '14px', borderRadius: '4px' }} />
            <div className="skeleton-shimmer" style={{ width: '45px', height: '14px', borderRadius: '4px' }} />
            <div className="skeleton-shimmer" style={{ width: '60px', height: '14px', borderRadius: '4px' }} />
          </div>
          <div className="skeleton-shimmer" style={{ width: '32px', height: '16px', borderRadius: '4px' }} />
        </div>
      </div>
    </div>
  );
};

export default PropertyCardSkeleton;
