// src/pages/public/FavoritesPage.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropertyCard from '../../components/PropertyCard';
import { clearFavorites } from '../../redux/slices/favoriteSlice';
import { showToast } from '../../redux/slices/uiSlice';
import { Heart, Trash2, ArrowRight, Home } from 'lucide-react';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favoriteIds = useSelector((state) => state.favorites.propertyIds);
  const properties = useSelector((state) => state.properties.items);

  const favoriteProperties = properties.filter((p) => favoriteIds.includes(p.id));

  const handleClearAll = () => {
    dispatch(clearFavorites());
    dispatch(
      showToast({
        type: 'info',
        title: 'Favorites Cleared',
        message: 'All saved properties have been removed.'
      })
    );
  };

  return (
    <div style={{ minHeight: '80vh', padding: '40px 24px 80px', background: '#FBFBFA' }}>
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Breadcrumb Navigation */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            fontSize: '0.85rem', 
            color: '#6B7280', 
            marginBottom: '20px' 
          }}
        >
          <Link to="/" style={{ color: '#6B7280', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Home size={14} /> Home
          </Link>
          <span>/</span>
          <span style={{ color: '#111418', fontWeight: 600 }}>Liked Properties</span>
        </div>

        {/* Page Header */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end', 
            marginBottom: '36px', 
            flexWrap: 'wrap', 
            gap: '16px' 
          }}
        >
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
              Your Wishlist
            </div>
            <h1 
              style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', 
                color: '#111418', 
                margin: '0 0 6px', 
                fontWeight: 500 
              }}
            >
              Liked Properties ({favoriteProperties.length})
            </h1>
            <p style={{ color: '#6B7280', fontSize: '0.95rem', margin: 0 }}>
              Curated architectural homes and exclusive estates you have saved for later review.
            </p>
          </div>

          {favoriteProperties.length > 0 && (
            <button 
              onClick={handleClearAll} 
              className="btn-secondary" 
              style={{ fontSize: '0.85rem', padding: '9px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Trash2 size={15} color="#EF4444" /> Clear All Saved
            </button>
          )}
        </div>

        {/* Property Grid or Empty State */}
        {favoriteProperties.length === 0 ? (
          <div 
            style={{
              padding: '80px 24px',
              textAlign: 'center',
              background: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
              maxWidth: '600px',
              margin: '20px auto'
            }}
          >
            <div 
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: '#F9FAFB',
                border: '1px solid #E5E7EB',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9CA3AF',
                marginBottom: '20px'
              }}
            >
              <Heart size={32} />
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#111418', margin: '0 0 10px' }}>
              No Liked Properties Yet
            </h2>
            <p style={{ color: '#6B7280', margin: '0 auto 28px', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Browse our prime luxury collections and click the heart icon on any estate or villa to bookmark it here.
            </p>
            <Link to="/properties" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Explore Properties <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '28px'
            }}
          >
            {favoriteProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
