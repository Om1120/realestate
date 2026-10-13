// src/pages/user/UserFavorites.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropertyCard from '../../components/PropertyCard';
import { clearFavorites } from '../../redux/slices/favoriteSlice';
import { showToast } from '../../redux/slices/uiSlice';
import { Heart, Trash2, ArrowRight } from 'lucide-react';

const UserFavorites = () => {
  const dispatch = useDispatch();
  const favoriteIds = useSelector((state) => state.favorites.propertyIds);
  const properties = useSelector((state) => state.properties.items);

  const favoriteProperties = properties.filter((p) => favoriteIds.includes(p.id));

  const handleClearAll = () => {
    dispatch(clearFavorites());
    dispatch(showToast({ type: 'info', title: 'Favorites Cleared', message: 'All saved properties have been removed.' }));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
            Saved Properties ({favoriteProperties.length})
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0 }}>
            Properties you have marked as favorites for future reference.
          </p>
        </div>

        {favoriteProperties.length > 0 && (
          <button onClick={handleClearAll} className="btn-secondary" style={{ fontSize: '0.82rem', padding: '8px 14px' }}>
            <Trash2 size={14} color="#EF4444" /> Clear All Favorites
          </button>
        )}
      </div>

      {favoriteProperties.length === 0 ? (
        <div 
          style={{
            padding: '70px 24px',
            textAlign: 'center',
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div 
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--bg-warm)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              marginBottom: '18px'
            }}
          >
            <Heart size={28} />
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 8px' }}>
            No Saved Properties Yet
          </h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 24px', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Browse our curated properties and click the heart icon on any listing to save it here.
          </p>
          <Link to="/properties" className="btn-primary">
            Explore Properties <ArrowRight size={15} />
          </Link>
        </div>
      ) : (
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {favoriteProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserFavorites;
