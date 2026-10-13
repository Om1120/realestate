// src/pages/public/HomePage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../redux/slices/propertySlice';
import PropertyCard from '../../components/PropertyCard';
import AgentCard from '../../components/AgentCard';
import LocationCard from '../../components/LocationCard';
import TestimonialCard from '../../components/TestimonialCard';
import { POPULAR_LOCATIONS, TESTIMONIALS } from '../../data/mockData';
import { 
  Search, 
  MapPin, 
  Home, 
  DollarSign, 
  Bed, 
  ShieldCheck, 
  Award, 
  Clock, 
  ArrowRight, 
  Building,
  CheckCircle,
  ArrowUpRight
} from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const properties = useSelector((state) => state.properties.items);
  const categories = useSelector((state) => state.categories.items);
  const agents = useSelector((state) => state.agents.items);

  // Floating Search Bar State
  const [heroLocation, setHeroLocation] = useState('All');
  const [heroType, setHeroType] = useState('All');
  const [heroMaxPrice, setHeroMaxPrice] = useState('All');
  const [heroBedrooms, setHeroBedrooms] = useState('All');

  const featuredProperties = properties.slice(0, 6);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    dispatch(setFilter({
      location: heroLocation,
      propertyType: heroType,
      maxPrice: heroMaxPrice === 'All' ? '' : heroMaxPrice,
      bedrooms: heroBedrooms
    }));
    navigate('/properties');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FBFBFA' }}>
      {/* 1. MODERN HERO SECTION */}
      <section 
        style={{
          position: 'relative',
          padding: '90px 24px 130px',
          background: 'linear-gradient(180deg, #F4F5F7 0%, #FBFBFA 100%)',
          overflow: 'hidden'
        }}
      >
        <div 
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            textAlign: 'center',
            position: 'relative',
            zIndex: 2
          }}
        >

          {/* Clean Editorial Headline */}
          <h1 
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
              fontWeight: 500,
              color: '#111418',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              margin: '0 auto 20px',
              maxWidth: '850px'
            }}
          >
            Find a place you'll love.
          </h1>

          <p 
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
              color: '#4B5563',
              maxWidth: '620px',
              margin: '0 auto 36px',
              lineHeight: 1.6
            }}
          >
            Discover curated homes, modern apartments, and architectural villas in the places that matter most to you.
          </p>

          {/* Primary Action Button */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '56px' }}>
            <Link to="/properties" className="btn-primary" style={{ padding: '14px 28px', fontSize: '0.95rem' }}>
              Explore Properties <ArrowRight size={16} />
            </Link>
          </div>

          {/* FLOATING SEARCH CONTAINER */}
          <div 
            className="floating-search-bar"
            style={{
              maxWidth: '960px',
              margin: '0 auto',
              textAlign: 'left'
            }}
          >
            <form onSubmit={handleHeroSearch}>
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1fr 1fr 1fr auto',
                  gap: '12px',
                  alignItems: 'center'
                }}
                className="hero-search-grid"
              >
                {/* Field 1: Location */}
                <div style={{ padding: '4px 10px' }}>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
                    Location
                  </label>
                  <select
                    value={heroLocation}
                    onChange={(e) => setHeroLocation(e.target.value)}
                    style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '0.9rem', fontWeight: 600, color: '#111418', outline: 'none', cursor: 'pointer' }}
                  >
                    <option value="All">All Cities</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Surat">Surat</option>
                    <option value="Vadodara">Vadodara</option>
                    <option value="Pune">Pune</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bengaluru">Bengaluru</option>
                  </select>
                </div>

                {/* Field 2: Property Type */}
                <div style={{ padding: '4px 10px', borderLeft: '1px solid #E5E7EB' }} className="search-divider">
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
                    Property Type
                  </label>
                  <select
                    value={heroType}
                    onChange={(e) => setHeroType(e.target.value)}
                    style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '0.9rem', fontWeight: 600, color: '#111418', outline: 'none', cursor: 'pointer' }}
                  >
                    <option value="All">All Types</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Mansion">Mansion</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>

                {/* Field 3: Max Budget */}
                <div style={{ padding: '4px 10px', borderLeft: '1px solid #E5E7EB' }} className="search-divider">
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
                    Max Price
                  </label>
                  <select
                    value={heroMaxPrice}
                    onChange={(e) => setHeroMaxPrice(e.target.value)}
                    style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '0.9rem', fontWeight: 600, color: '#111418', outline: 'none', cursor: 'pointer' }}
                  >
                    <option value="All">Any Price</option>
                    <option value="15000000">Up to ₹1.5 Cr</option>
                    <option value="30000000">Up to ₹3.0 Cr</option>
                    <option value="50000000">Up to ₹5.0 Cr</option>
                    <option value="100000000">Up to ₹10 Cr</option>
                    <option value="250000000">Up to ₹25 Cr+</option>
                  </select>
                </div>

                {/* Field 4: Bedrooms */}
                <div style={{ padding: '4px 10px', borderLeft: '1px solid #E5E7EB' }} className="search-divider">
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
                    Bedrooms
                  </label>
                  <select
                    value={heroBedrooms}
                    onChange={(e) => setHeroBedrooms(e.target.value)}
                    style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '0.9rem', fontWeight: 600, color: '#111418', outline: 'none', cursor: 'pointer' }}
                  >
                    <option value="All">Any Beds</option>
                    <option value="2">2+ Beds</option>
                    <option value="3">3+ Beds</option>
                    <option value="4">4+ Beds</option>
                    <option value="5+">5+ Beds</option>
                  </select>
                </div>

                {/* Submit Search Button */}
                <div style={{ padding: '4px' }}>
                  <button 
                    type="submit" 
                    className="btn-primary"
                    style={{
                      height: '46px',
                      padding: '0 20px',
                      borderRadius: '10px'
                    }}
                  >
                    <Search size={16} /> Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 2. FEATURED PROPERTIES SECTION */}
      <section style={{ padding: '90px 24px' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                Featured Properties
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: '#111418', margin: 0, fontWeight: 500 }}>
                Selected homes for you
              </h2>
            </div>

            <Link to="/properties" className="btn-secondary">
              View all properties <ArrowUpRight size={15} />
            </Link>
          </div>

          {/* Property Cards Grid */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '28px'
            }}
          >
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. EXPLORE BY PROPERTY TYPE */}
      <section style={{ padding: '80px 24px', background: '#FFFFFF', borderTop: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
              Categories
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: '#111418', margin: 0, fontWeight: 500 }}>
              Explore by property type
            </h2>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px'
            }}
          >
            {[
              {
                title: 'Apartments',
                path: '/apartments',
                image: '/properties/apartment_regency.jpg',
                count: '14 Listings'
              },
              {
                title: 'Houses & Villas',
                path: '/houses',
                image: '/properties/villa_sovereign.jpg',
                count: '18 Listings'
              },
              {
                title: 'Penthouses',
                path: '/properties?type=Penthouse',
                image: '/properties/penthouse_sky.jpg',
                count: '8 Listings'
              },
              {
                title: 'Commercial',
                path: '/commercial',
                image: '/properties/corporate_tower.jpg',
                count: '10 Listings'
              }
            ].map((cat) => (
              <Link
                key={cat.title}
                to={cat.path}
                style={{
                  position: 'relative',
                  height: '300px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '24px'
                }}
                className="category-tile-modern"
              >
                <img 
                  src={cat.image} 
                  alt={cat.title}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/properties/villa_sovereign.jpg';
                  }}
                />
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(17,20,24,0.1) 0%, rgba(17,20,24,0.75) 100%)'
                  }}
                />
                <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', color: '#FFFFFF' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', margin: '0 0 2px' }}>
                      {cat.title}
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: '#D1D5DB' }}>
                      {cat.count}
                    </span>
                  </div>
                  <div 
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#111418'
                    }}
                  >
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. POPULAR LOCATIONS */}
      <section style={{ padding: '90px 24px' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                Prime Destinations
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: '#111418', margin: 0, fontWeight: 500 }}>
                Explore by location
              </h2>
            </div>

            <Link to="/locations" className="btn-secondary">
              All locations <ArrowUpRight size={15} />
            </Link>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px'
            }}
          >
            {POPULAR_LOCATIONS.slice(0, 4).map((loc) => (
              <LocationCard key={loc.id} location={loc} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US (MINIMAL & TRUSTWORTHY) */}
      <section style={{ padding: '80px 24px', background: '#FFFFFF', borderTop: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: '#111418', margin: '0 0 12px', fontWeight: 500 }}>
              The Aurelia Standard
            </h2>
            <p style={{ color: '#6B7280', fontSize: '0.95rem', maxWidth: '540px', margin: '0 auto' }}>
              We simplify the journey of discovering and securing exceptional real estate.
            </p>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '32px'
            }}
          >
            {[
              {
                title: 'Verified Properties',
                desc: 'Every home in our portfolio is thoroughly vetted for legal clearances and architectural quality.'
              },
              {
                title: 'Transparent Process',
                desc: 'Clear pricing, straightforward agreements, and direct communication at every step.'
              },
              {
                title: 'Dedicated Advisors',
                desc: 'Work with knowledgeable property consultants dedicated to understanding your requirements.'
              },
              {
                title: 'Seamless Experience',
                desc: 'From initial viewing tours to secure reservation deposits, we ensure complete peace of mind.'
              }
            ].map((item, idx) => (
              <div 
                key={item.title}
                style={{
                  padding: '24px',
                  background: '#FBFBFA',
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB'
                }}
              >
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111418', marginBottom: '8px' }}>
                  0{idx + 1}. {item.title}
                </div>
                <p style={{ color: '#4B5563', fontSize: '0.88rem', lineHeight: '1.6', margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ADVISORS / TEAM SECTION */}
      <section style={{ padding: '90px 24px' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                Expert Team
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: '#111418', margin: 0, fontWeight: 500 }}>
                Meet our property consultants
              </h2>
            </div>

            <Link to="/agents" className="btn-secondary">
              View all agents <ArrowUpRight size={15} />
            </Link>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px'
            }}
          >
            {agents.slice(0, 4).map((ag) => (
              <AgentCard key={ag.id} agent={ag} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section style={{ padding: '90px 24px', background: '#FFFFFF', borderTop: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
              Client Stories
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: '#111418', margin: 0, fontWeight: 500 }}>
              What our clients say
            </h2>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px'
            }}
          >
            {TESTIMONIALS.map((test) => (
              <TestimonialCard key={test.id} testimonial={test} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. MODERN MINIMAL CTA */}
      <section 
        style={{
          padding: '100px 24px',
          background: '#111418',
          color: '#FFFFFF',
          textAlign: 'center'
        }}
      >
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              color: '#FFFFFF',
              margin: '0 0 16px',
              fontWeight: 500
            }}
          >
            Spaces worth coming home to.
          </h2>

          <p style={{ color: '#9CA3AF', fontSize: '1.05rem', lineHeight: '1.6', margin: '0 auto 36px', maxWidth: '540px' }}>
            Let us help you discover properties that match your lifestyle and investment goals.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <Link 
              to="/properties" 
              style={{
                padding: '14px 28px',
                background: '#FFFFFF',
                color: '#111418',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '0.95rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Explore Properties <ArrowRight size={16} />
            </Link>
            <Link 
              to="/contact" 
              style={{
                padding: '14px 28px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '0.95rem',
                textDecoration: 'none'
              }}
            >
              Contact an Agent
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 840px) {
          .hero-search-grid {
            grid-template-columns: 1fr !important;
          }
          .search-divider {
            border-left: none !important;
            border-top: 1px solid #E5E7EB !important;
            padding-top: 10px !important;
          }
        }
        .category-tile-modern:hover img {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default HomePage;
