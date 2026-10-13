// src/pages/public/PropertiesPage.jsx
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../redux/slices/propertySlice';
import { usePropertyFilter } from '../../hooks/usePropertyFilter';
import PropertyFilters from '../../components/PropertyFilters';
import PropertyGrid from '../../components/PropertyGrid';
import { Search, X } from 'lucide-react';

const PropertiesPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const properties = useSelector((state) => state.properties.items);
  const filters = useSelector((state) => state.properties.filters);
  const sortBy = useSelector((state) => state.properties.sortBy);
  const loading = useSelector((state) => state.properties.loading);

  const [isBuffering, setIsBuffering] = React.useState(false);

  // Sync URL search params with Redux state on mount / query change
  useEffect(() => {
    const loc = searchParams.get('location');
    const cat = searchParams.get('category');
    const type = searchParams.get('type');
    const q = searchParams.get('q');

    const updates = {};
    if (loc) updates.location = loc;
    if (cat) updates.category = cat;
    if (type) updates.propertyType = type;
    if (q) updates.searchQuery = q;

    if (Object.keys(updates).length > 0) {
      dispatch(setFilter(updates));
    }
  }, [searchParams, dispatch]);

  const filteredProperties = usePropertyFilter(properties, filters, sortBy);

  const handleSearchInputChange = (e) => {
    setIsBuffering(true);
    dispatch(setFilter({ searchQuery: e.target.value }));
    setTimeout(() => setIsBuffering(false), 220);
  };

  const clearSearch = () => {
    setIsBuffering(true);
    dispatch(setFilter({ searchQuery: '' }));
    setTimeout(() => setIsBuffering(false), 200);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FBFBFA', paddingBottom: '90px' }}>
      {/* Header Banner */}
      <div 
        style={{
          background: 'linear-gradient(180deg, #F4F5F7 0%, #FBFBFA 100%)',
          borderBottom: '1px solid #E5E7EB',
          padding: '60px 24px 40px',
          textAlign: 'center'
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div 
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#6B7280',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '8px'
            }}
          >
            Property Directory
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
            Find your next place.
          </h1>
          <p style={{ color: '#4B5563', maxWidth: '540px', margin: '0 auto 28px', fontSize: '0.95rem' }}>
            Browse modern apartments, standalone villas, and premier commercial spaces.
          </p>

          {/* Quick Real-Time Search Bar */}
          <div 
            style={{
              maxWidth: '560px',
              margin: '0 auto',
              position: 'relative'
            }}
          >
            <div 
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9CA3AF',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Search size={18} />
            </div>

            <input 
              type="text"
              value={filters.searchQuery || ''}
              onChange={handleSearchInputChange}
              placeholder="Search by city (e.g. Ahmedabad, Mumbai), title, keyword..."
              className="input-luxury"
              style={{
                paddingLeft: '44px',
                paddingRight: filters.searchQuery ? '40px' : '16px',
                height: '48px',
                fontSize: '0.92rem',
                borderRadius: '10px',
                background: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}
            />

            {filters.searchQuery && (
              <button
                onClick={clearSearch}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: '#9CA3AF',
                  cursor: 'pointer'
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Filter & Listing Grid Layout */}
      <div 
        style={{
          maxWidth: '1360px',
          margin: '36px auto 0',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: '32px',
          alignItems: 'start'
        }}
        className="properties-layout"
      >
        {/* Left Sidebar: Filters */}
        <aside>
          <PropertyFilters />
        </aside>

        {/* Right Stage: Property Grid */}
        <main>
          <PropertyGrid properties={filteredProperties} loading={loading || isBuffering} />
        </main>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .properties-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PropertiesPage;
