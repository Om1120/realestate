// src/components/PropertyCard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/slices/favoriteSlice';
import { showToast } from '../redux/slices/uiSlice';
import { formatCurrency } from '../utils/formatters';
import { Heart, MapPin, Bed, Bath, Square, ArrowUpRight } from 'lucide-react';

const PropertyCard = ({ property, viewMode = 'grid', index = 0 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favorites = useSelector((state) => state.favorites.propertyIds);
  const isFavorite = favorites.includes(property.id);
  const [isPopping, setIsPopping] = useState(false);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPopping(true);
    setTimeout(() => setIsPopping(false), 450);

    dispatch(toggleFavorite(property.id));
    dispatch(
      showToast({
        type: isFavorite ? 'info' : 'success',
        title: isFavorite ? 'Removed from saved' : 'Saved to favourites',
        message: property.title
      })
    );
  };

  const statusClass = 
    property.status === 'Sold' ? 'badge-sold' :
    property.status === 'For Rent' ? 'badge-rent' :
    property.status === 'Available' ? 'badge-available' : 'badge-sale';

  if (viewMode === 'list') {
    return (
      <div 
        className="card-property-modern card-stagger-enter"
        style={{
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          background: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E5E7EB',
          overflow: 'hidden',
          cursor: 'pointer',
          animationDelay: `${index * 45}ms`
        }}
        onClick={() => navigate(`/property/${property.id}`)}
      >
        <div className="property-img-container" style={{ height: '100%', minHeight: '220px', position: 'relative' }}>
          <img 
            src={property.image || (property.images && property.images[0]) || '/properties/villa_sovereign.jpg'} 
            alt={property.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/properties/villa_sovereign.jpg';
            }}
          />
          <span 
            className={`badge-luxury ${statusClass}`}
            style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2 }}
          >
            {property.status}
          </span>
          <button
            onClick={handleFavoriteClick}
            className={isPopping ? 'heart-popping' : ''}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(6px)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 2,
              boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
              transition: 'transform 0.15s ease'
            }}
            aria-label="Save property"
          >
            <Heart size={16} color={isFavorite ? '#DC2626' : '#111418'} fill={isFavorite ? '#DC2626' : 'none'} />
          </button>
        </div>

        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
              <div style={{ fontSize: '0.8rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                {property.propertyType}
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111418' }}>
                {formatCurrency(property.price)}
              </div>
            </div>

            <h3 style={{ fontSize: '1.15rem', color: '#111418', fontWeight: 700, margin: '0 0 6px' }}>
              {property.title}
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6B7280', fontSize: '0.85rem', marginBottom: '14px' }}>
              <MapPin size={14} color="#9CA3AF" />
              <span>{property.address || `${property.location}, India`}</span>
            </div>

            <p style={{ color: '#4B5563', fontSize: '0.85rem', lineHeight: '1.5', margin: '0 0 16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {property.description}
            </p>
          </div>

          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '16px',
              borderTop: '1px solid #F3F4F6'
            }}
          >
            <div style={{ display: 'flex', gap: '16px', color: '#4B5563', fontSize: '0.85rem', fontWeight: 500 }}>
              {property.bedrooms > 0 && <span>{property.bedrooms} Beds</span>}
              {property.bathrooms > 0 && <span>{property.bathrooms} Baths</span>}
              {property.area && <span>{property.area.toLocaleString()} sq.ft</span>}
            </div>

            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#111418', display: 'flex', alignItems: 'center', gap: '4px' }}>
              View details <ArrowUpRight size={15} />
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Grid View (Default)
  return (
    <div 
      className="card-property-modern card-stagger-enter"
      onClick={() => navigate(`/property/${property.id}`)}
      style={{ 
        cursor: 'pointer', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: '12px',
        animationDelay: `${index * 45}ms`
      }}
    >
      {/* Property Image */}
      <div className="property-img-container" style={{ height: '240px', position: 'relative' }}>
        <img 
          src={property.image || (property.images && property.images[0]) || '/properties/villa_sovereign.jpg'} 
          alt={property.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/properties/villa_sovereign.jpg';
          }}
        />

        {/* Status Pill Badge */}
        <span 
          className={`badge-luxury ${statusClass}`}
          style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2 }}
        >
          {property.status}
        </span>

        {/* Favorite Heart Button */}
        <button
          onClick={handleFavoriteClick}
          className={isPopping ? 'heart-popping' : ''}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(6px)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 2,
            boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
            transition: 'transform 0.15s ease'
          }}
          aria-label="Save property"
        >
          <Heart 
            size={16} 
            color={isFavorite ? '#DC2626' : '#111418'} 
            fill={isFavorite ? '#DC2626' : 'none'} 
          />
        </button>
      </div>

      {/* Content Area */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          {/* Price & Property Type */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111418', letterSpacing: '-0.01em' }}>
              {formatCurrency(property.price)}
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {property.propertyType}
            </span>
          </div>

          {/* Title */}
          <h3 
            style={{ 
              fontSize: '1rem', 
              color: '#111418', 
              fontWeight: 700, 
              margin: '0 0 4px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {property.title}
          </h3>

          {/* Location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6B7280', fontSize: '0.82rem', marginBottom: '14px' }}>
            <MapPin size={13} color="#9CA3AF" />
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {property.location}, India
            </span>
          </div>
        </div>

        {/* Specs Footer */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            paddingTop: '12px',
            borderTop: '1px solid #F3F4F6',
            color: '#6B7280',
            fontSize: '0.8rem',
            fontWeight: 500
          }}
        >
          {property.bedrooms > 0 && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Bed size={14} color="#9CA3AF" /> {property.bedrooms} Beds
            </span>
          )}
          {property.bathrooms > 0 && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Bath size={14} color="#9CA3AF" /> {property.bathrooms} Baths
            </span>
          )}
          {property.area && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Square size={13} color="#9CA3AF" /> {property.area.toLocaleString()} sq.ft
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
