// src/pages/public/PropertyDetailsPage.jsx
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../../redux/slices/favoriteSlice';
import { showToast } from '../../redux/slices/uiSlice';
import { formatCurrency, formatArea } from '../../utils/formatters';
import PropertyGallery from '../../components/PropertyGallery';
import PropertyAmenities from '../../components/PropertyAmenities';
import PropertyMap from '../../components/PropertyMap';
import InquiryForm from '../../components/InquiryForm';
import AppointmentForm from '../../components/AppointmentForm';
import { 
  Heart, 
  Share2, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar, 
  CreditCard, 
  ArrowLeft, 
  Phone, 
  Mail, 
  Building, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const properties = useSelector((state) => state.properties.items);
  const agents = useSelector((state) => state.agents.items);
  const favoriteIds = useSelector((state) => state.favorites.propertyIds);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState('inquiry'); // 'inquiry' | 'appointment'

  const property = properties.find((p) => p.id === id || p.slug === id);
  const agent = agents.find((a) => a.id === property?.agentId) || agents[0];
  const isFavorite = property ? favoriteIds.includes(property.id) : false;

  const handlePurchaseClick = () => {
    const purchaseTarget = `/book/${property?.id || id}`;
    if (!isAuthenticated) {
      sessionStorage.setItem('pending_purchase_url', purchaseTarget);
      dispatch(showToast({
        type: 'info',
        title: 'Sign In Required',
        message: 'Please sign in or register to proceed directly to property purchase.'
      }));
      navigate('/login', { state: { from: purchaseTarget } });
    } else {
      navigate(purchaseTarget);
    }
  };

  if (!property) {
    return (
      <div 
        style={{
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
          textAlign: 'center',
          background: '#FBFBFA'
        }}
      >
        <div 
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: '#FEE2E2',
            color: '#DC2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px'
          }}
        >
          <AlertTriangle size={32} />
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#111418', margin: '0 0 12px' }}>
          Property Not Found
        </h2>
        <p style={{ color: '#6B7280', maxWidth: '440px', marginBottom: '24px' }}>
          The property you are looking for may have been removed or is no longer available.
        </p>
        <Link to="/properties" className="btn-primary">
          <ArrowLeft size={16} /> Return to Properties
        </Link>
      </div>
    );
  }

  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite(property.id));
    dispatch(showToast({
      type: isFavorite ? 'info' : 'success',
      title: isFavorite ? 'Removed from saved' : 'Saved to favourites',
      message: `${property.title} saved to your portfolio.`
    }));
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      dispatch(showToast({
        type: 'info',
        title: 'Link Copied',
        message: 'Property listing link copied to clipboard.'
      }));
    }
  };

  const statusClass = 
    property.status === 'Sold' ? 'badge-sold' :
    property.status === 'For Rent' ? 'badge-rent' :
    property.status === 'Available' ? 'badge-available' : 'badge-sale';

  return (
    <div style={{ minHeight: '100vh', background: '#FBFBFA', paddingBottom: '90px' }}>
      {/* Top Breadcrumb & Action Bar */}
      <div 
        style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #E5E7EB',
          padding: '16px 24px'
        }}
      >
        <div 
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <Link 
            to="/properties" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#4B5563',
              textDecoration: 'none',
              fontSize: '0.88rem',
              fontWeight: 500
            }}
          >
            <ArrowLeft size={16} /> Back to all properties
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handleFavoriteToggle}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                background: '#FFFFFF',
                color: isFavorite ? '#DC2626' : '#111418',
                fontSize: '0.84rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Heart size={16} fill={isFavorite ? '#DC2626' : 'none'} />
              {isFavorite ? 'Saved' : 'Save Property'}
            </button>

            <button
              onClick={handleShare}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                background: '#FFFFFF',
                color: '#111418',
                fontSize: '0.84rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Share2 size={15} /> Share
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Stage */}
      <div 
        style={{
          maxWidth: '1360px',
          margin: '36px auto 0',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: '40px',
          alignItems: 'start'
        }}
        className="details-grid-layout"
      >
        {/* Left Column: Media Gallery, Specs, Amenities, Map, Agent */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
          {/* Header Title & Pricing */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className={`badge-luxury ${statusClass}`}>
                {property.status}
              </span>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase' }}>
                {property.propertyType} • ID: {property.id}
              </span>
            </div>

            <h1 
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                color: '#111418',
                margin: '0 0 8px',
                fontWeight: 600,
                lineHeight: 1.2
              }}
            >
              {property.title}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6B7280', fontSize: '0.95rem' }}>
              <MapPin size={16} color="#9CA3AF" />
              <span>{property.address || `${property.location}, India`}</span>
            </div>
          </div>

          {/* Image Gallery */}
          <PropertyGallery images={property.images || [property.image]} />

          {/* Architectural Specs Bar */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '14px',
              padding: '20px',
              background: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E5E7EB'
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase' }}>Price</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#111418' }}>{formatCurrency(property.price)}</div>
            </div>
            {property.bedrooms > 0 && (
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase' }}>Bedrooms</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#111418' }}>{property.bedrooms} Beds</div>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase' }}>Bathrooms</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#111418' }}>{property.bathrooms} Baths</div>
              </div>
            )}
            {property.area && (
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase' }}>Carpet Area</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#111418' }}>{formatArea(property.area)}</div>
              </div>
            )}
          </div>

          {/* Description */}
          <div 
            style={{
              padding: '28px',
              background: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E5E7EB'
            }}
          >
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#111418', margin: '0 0 16px' }}>
              About this property
            </h2>
            <p style={{ color: '#4B5563', fontSize: '0.95rem', lineHeight: '1.7', margin: 0, whiteSpace: 'pre-line' }}>
              {property.description}
            </p>
          </div>

          {/* Amenities */}
          <div 
            style={{
              padding: '28px',
              background: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E5E7EB'
            }}
          >
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#111418', margin: '0 0 20px' }}>
              Key Amenities & Features
            </h2>
            <PropertyAmenities amenities={property.amenities} />
          </div>

          {/* Location & Map Section */}
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#111418', margin: '0 0 16px' }}>
              Property Location & Accessibility
            </h2>
            <PropertyMap 
              coordinates={{ lat: property.latitude, lng: property.longitude }} 
              address={property.address}
              location={property.location}
              title={property.title}
            />
          </div>

          {/* Assigned Agent Profile Card */}
          <div 
            style={{
              padding: '24px',
              background: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E5E7EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img 
                src={agent.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80"}
                alt={agent.name}
                style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase' }}>
                  Managing Property Advisor
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111418', margin: '2px 0 4px' }}>
                  {agent.name}
                </h3>
                <div style={{ fontSize: '0.85rem', color: '#4B5563' }}>
                  {agent.experience || '12+ Years'} Experience • {agent.location || property.location}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <a 
                href={`tel:${agent.phone || '+919825000000'}`}
                className="btn-secondary"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
              >
                <Phone size={15} /> Call Advisor
              </a>
              <Link
                to={`/agents/${agent.id}`}
                className="btn-primary"
                style={{ fontSize: '0.85rem' }}
              >
                View Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Right Sticky Column: Booking & Inquiries */}
        <div style={{ position: 'sticky', top: '96px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Reservation Card */}
          <div 
            className="card-luxury"
            style={{
              padding: '28px',
              background: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E5E7EB'
            }}
          >
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', marginBottom: '4px' }}>
              Offered at
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#111418', letterSpacing: '-0.02em', marginBottom: '8px' }}>
              {formatCurrency(property.price)}
            </div>

            <div 
              style={{
                padding: '12px 14px',
                background: '#F9FAFB',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                marginBottom: '20px',
                fontSize: '0.84rem',
                color: '#4B5563',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>Token Deposit:</span>
              <strong style={{ color: '#111418', fontWeight: 700 }}>
                {formatCurrency(property.bookingAmount || 100000)}
              </strong>
            </div>

            <button 
              onClick={handlePurchaseClick}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '0.95rem',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <CreditCard size={16} /> Reserve & Purchase Property <ArrowRight size={16} />
            </button>

            <div style={{ fontSize: '0.75rem', color: '#9CA3AF', textAlign: 'center' }}>
              Secure sandbox reservation with instant receipt
            </div>
          </div>

          {/* Tabs: Inquiry vs Appointment */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              background: '#F3F4F6',
              padding: '4px',
              borderRadius: '10px'
            }}
          >
            <button
              onClick={() => setActiveTab('inquiry')}
              style={{
                padding: '8px',
                borderRadius: '6px',
                border: 'none',
                background: activeTab === 'inquiry' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'inquiry' ? '#111418' : '#6B7280',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow: activeTab === 'inquiry' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              Send Inquiry
            </button>
            <button
              onClick={() => setActiveTab('appointment')}
              style={{
                padding: '8px',
                borderRadius: '6px',
                border: 'none',
                background: activeTab === 'appointment' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'appointment' ? '#111418' : '#6B7280',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow: activeTab === 'appointment' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              Schedule Visit
            </button>
          </div>

          {/* Form Container */}
          {activeTab === 'inquiry' ? (
            <InquiryForm propertyId={property.id} propertyTitle={property.title} />
          ) : (
            <AppointmentForm propertyId={property.id} propertyTitle={property.title} agentName={agent.name} />
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 1040px) {
          .details-grid-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PropertyDetailsPage;
