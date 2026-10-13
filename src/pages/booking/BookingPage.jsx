// src/pages/booking/BookingPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { formatCurrency, formatArea } from '../../utils/formatters';
import { showToast } from '../../redux/slices/uiSlice';
import { 
  CreditCard, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  ArrowLeft, 
  CheckSquare, 
  Square as SquareIcon,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

const BookingPage = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const properties = useSelector((state) => state.properties.items);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const property = properties.find((p) => p.id === propertyId || p.slug === propertyId);

  // Purchaser Details initialized empty
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleUseAccountDetails = () => {
    if (user) {
      setBuyerName(user.name || '');
      setBuyerEmail(user.email || '');
      setBuyerPhone(user.phone || '');
      dispatch(showToast({ type: 'info', title: 'Details Applied', message: 'Loaded details from your account.' }));
    }
  };

  const handleClearDetails = () => {
    setBuyerName('');
    setBuyerEmail('');
    setBuyerPhone('');
    setPanNumber('');
  };

  if (!property) {
    return (
      <div style={{ minHeight: '60vh', textAlign: 'center', padding: '60px 24px', background: '#FBFBFA' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111418' }}>Property Not Found</h2>
        <Link to="/properties" className="btn-primary" style={{ marginTop: '20px' }}>
          Back to Properties
        </Link>
      </div>
    );
  }

  const tokenAmount = property.bookingAmount || 100000;
  const gstAmount = Math.round(tokenAmount * 0.18);
  const totalPayable = tokenAmount + gstAmount;

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!buyerName || !buyerEmail || !buyerPhone) {
      dispatch(showToast({ type: 'error', title: 'Missing Details', message: 'Please complete all buyer fields.' }));
      return;
    }
    if (!agreedToTerms) {
      dispatch(showToast({ type: 'error', title: 'Terms Required', message: 'Please accept the token booking terms.' }));
      return;
    }

    const bookingPayload = {
      propertyId: property.id,
      propertyTitle: property.title,
      propertyLocation: property.location,
      propertyPrice: property.price,
      propertyImage: property.image,
      buyerName,
      buyerEmail,
      buyerPhone,
      panNumber,
      tokenAmount,
      gstAmount,
      totalPayable,
      timestamp: new Date().toISOString()
    };

    sessionStorage.setItem(`booking_${property.id}`, JSON.stringify(bookingPayload));
    navigate(`/payment/${property.id}`);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FBFBFA', paddingBottom: '90px' }}>
      {/* Top Breadcrumb */}
      <div 
        style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #E5E7EB',
          padding: '16px 24px'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'transparent',
              border: 'none',
              color: '#4B5563',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 500
            }}
          >
            <ArrowLeft size={16} /> Back to property listing
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '36px auto 0', padding: '0 24px' }}>
        <div style={{ marginBottom: '28px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
            Reservation Checkout
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#111418', margin: 0, fontWeight: 500 }}>
            Reserve your property online
          </h1>
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '40px',
            alignItems: 'start'
          }}
          className="booking-grid-layout"
        >
          {/* Left Form: Buyer Details */}
          <form 
            onSubmit={handleProceedToPayment}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}
          >
            <div 
              className="card-luxury"
              style={{
                padding: '28px',
                background: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E5E7EB'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '8px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111418', margin: 0 }}>
                  1. Purchaser Details
                </h3>
                
                {user && (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={handleUseAccountDetails}
                      style={{
                        background: 'transparent',
                        border: '1px solid #E5E7EB',
                        borderRadius: '6px',
                        padding: '4px 10px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: '#111418',
                        cursor: 'pointer'
                      }}
                    >
                      Autofill from Account
                    </button>
                    <button
                      type="button"
                      onClick={handleClearDetails}
                      style={{
                        background: 'transparent',
                        border: '1px solid #E5E7EB',
                        borderRadius: '6px',
                        padding: '4px 10px',
                        fontSize: '0.75rem',
                        color: '#6B7280',
                        cursor: 'pointer'
                      }}
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                    Full Legal Name *
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="Enter purchaser's legal name"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="input-luxury"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                      Email Address *
                    </label>
                    <input 
                      type="email"
                      required
                      placeholder="e.g. purchaser@example.com"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      className="input-luxury"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                      Phone Number *
                    </label>
                    <input 
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      className="input-luxury"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                    PAN Number (Verification)
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g. ABCDE1234F"
                    value={panNumber}
                    onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                    className="input-luxury"
                  />
                </div>
              </div>
            </div>

            {/* Terms and Proceed Button */}
            <div 
              className="card-luxury"
              style={{
                padding: '24px',
                background: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E5E7EB'
              }}
            >
              <label 
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  cursor: 'pointer',
                  marginBottom: '20px'
                }}
              >
                <input 
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  style={{ marginTop: '3px', width: '16px', height: '16px', accentColor: '#111418' }}
                />
                <span style={{ fontSize: '0.82rem', color: '#4B5563', lineHeight: '1.5' }}>
                  I understand this is a demonstration sandbox reservation. The earnest deposit simulates an official reservation and will produce an official deed receipt.
                </span>
              </label>

              <button 
                type="submit" 
                className="btn-primary"
                style={{ width: '100%', padding: '14px', fontSize: '0.95rem' }}
              >
                Proceed to Payment Simulation <ArrowRight size={16} />
              </button>
            </div>
          </form>

          {/* Right Summary: Property Particulars */}
          <div 
            className="card-luxury"
            style={{
              padding: '28px',
              background: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E5E7EB'
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111418', margin: '0 0 18px' }}>
              Booking Summary
            </h3>

            {/* Property Card Snippet */}
            <div style={{ display: 'flex', gap: '14px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #F3F4F6' }}>
              <img 
                src={property.image || (property.images && property.images[0]) || '/properties/villa_sovereign.jpg'} 
                alt={property.title}
                style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/properties/villa_sovereign.jpg';
                }}
              />
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase' }}>{property.propertyType}</div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111418', margin: '2px 0 4px' }}>{property.title}</h4>
                <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>{property.location}</div>
              </div>
            </div>

            {/* Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B7280' }}>
                <span>Asset Valuation:</span>
                <span style={{ color: '#111418', fontWeight: 600 }}>{formatCurrency(property.price)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B7280' }}>
                <span>Earnest Token Deposit:</span>
                <span style={{ color: '#111418', fontWeight: 600 }}>{formatCurrency(tokenAmount)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B7280' }}>
                <span>GST (18% Statutory):</span>
                <span style={{ color: '#111418' }}>{formatCurrency(gstAmount)}</span>
              </div>
            </div>

            <div 
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                paddingTop: '16px',
                borderTop: '1px solid #E5E7EB',
                marginBottom: '20px'
              }}
            >
              <span style={{ fontWeight: 700, color: '#111418' }}>Total Payable Now:</span>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111418' }}>
                {formatCurrency(totalPayable)}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#059669', background: '#ECFDF5', padding: '10px 12px', borderRadius: '8px' }}>
              <ShieldCheck size={16} /> Instant booking confirmation & verified receipt
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .booking-grid-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default BookingPage;
