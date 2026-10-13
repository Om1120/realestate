// src/components/PropertyFilters.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, resetFilters, setSortBy } from '../redux/slices/propertySlice';
import { Search, X, RotateCcw, SlidersHorizontal } from 'lucide-react';

const CITIES = ['All', 'Ahmedabad', 'Surat', 'Vadodara', 'Mumbai', 'Pune', 'Delhi', 'Bengaluru'];
const TYPES = ['All', 'Apartment', 'Villa', 'Penthouse', 'Mansion', 'Commercial'];
const STATUSES = ['All', 'For Sale', 'For Rent', 'Available', 'Sold'];
const BEDROOM_OPTIONS = ['All', '1', '2', '3', '4', '5+'];

const PropertyFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.properties.filters);
  const sortBy = useSelector((state) => state.properties.sortBy);

  const handleFilterChange = (key, value) => {
    dispatch(setFilter({ [key]: value }));
  };

  const handleClearFilter = (key) => {
    if (key === 'searchQuery') dispatch(setFilter({ searchQuery: '' }));
    else if (key === 'minPrice' || key === 'maxPrice') dispatch(setFilter({ minPrice: '', maxPrice: '' }));
    else dispatch(setFilter({ [key]: 'All' }));
  };

  // Determine active filter chips
  const activeChips = [];
  if (filters.searchQuery) activeChips.push({ label: `"${filters.searchQuery}"`, key: 'searchQuery' });
  if (filters.location && filters.location !== 'All') activeChips.push({ label: filters.location, key: 'location' });
  if (filters.propertyType && filters.propertyType !== 'All') activeChips.push({ label: filters.propertyType, key: 'propertyType' });
  if (filters.bedrooms && filters.bedrooms !== 'All') activeChips.push({ label: `${filters.bedrooms} Beds`, key: 'bedrooms' });
  if (filters.status && filters.status !== 'All') activeChips.push({ label: filters.status, key: 'status' });
  if (filters.maxPrice) activeChips.push({ label: `Up to ₹${(Number(filters.maxPrice) / 10000000).toFixed(1)}Cr`, key: 'maxPrice' });

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
        gap: '20px'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '0.95rem', color: '#111418' }}>
          <SlidersHorizontal size={16} /> Filters
        </div>
        {activeChips.length > 0 && (
          <button
            onClick={() => dispatch(resetFilters())}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#4B5563',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <RotateCcw size={12} /> Clear all
          </button>
        )}
      </div>

      {/* Keyword Search Input */}
      <div>
        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
          Search Keywords
        </label>
        <div style={{ position: 'relative' }}>
          <Search size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text"
            placeholder="Property name, address..."
            value={filters.searchQuery || ''}
            onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
            className="input-luxury"
            style={{ paddingLeft: '38px', height: '42px' }}
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
          Location
        </label>
        <select
          value={filters.location || 'All'}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          className="input-luxury"
          style={{ height: '42px' }}
        >
          {CITIES.map((city) => (
            <option key={city} value={city}>{city === 'All' ? 'All Locations' : city}</option>
          ))}
        </select>
      </div>

      {/* Property Type */}
      <div>
        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
          Property Type
        </label>
        <select
          value={filters.propertyType || 'All'}
          onChange={(e) => handleFilterChange('propertyType', e.target.value)}
          className="input-luxury"
          style={{ height: '42px' }}
        >
          {TYPES.map((t) => (
            <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>
          ))}
        </select>
      </div>

      {/* Bedrooms Pill Selection */}
      <div>
        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
          Bedrooms
        </label>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {BEDROOM_OPTIONS.map((bed) => {
            const isSelected = (filters.bedrooms || 'All') === bed;
            return (
              <button
                key={bed}
                type="button"
                onClick={() => handleFilterChange('bedrooms', bed)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  border: isSelected ? '1px solid #111418' : '1px solid #E5E7EB',
                  background: isSelected ? '#111418' : '#F9FAFB',
                  color: isSelected ? '#FFFFFF' : '#374151',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                {bed}
              </button>
            );
          })}
        </div>
      </div>

      {/* Property Status */}
      <div>
        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
          Status
        </label>
        <select
          value={filters.status || 'All'}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="input-luxury"
          style={{ height: '42px' }}
        >
          {STATUSES.map((st) => (
            <option key={st} value={st}>{st === 'All' ? 'All Statuses' : st}</option>
          ))}
        </select>
      </div>

      {/* Sort By */}
      <div>
        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
          Sort Results
        </label>
        <select
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          className="input-luxury"
          style={{ height: '42px' }}
        >
          <option value="default">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="newest">Newest First</option>
          <option value="area-large">Area: Largest First</option>
        </select>
      </div>

      {/* Active Filter Chips */}
      {activeChips.length > 0 && (
        <div style={{ paddingTop: '14px', borderTop: '1px solid #F3F4F6' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px' }}>
            Active Filters
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {activeChips.map((chip) => (
              <span
                key={chip.key}
                onClick={() => handleClearFilter(chip.key)}
                className="filter-chip"
                style={{ fontSize: '0.75rem' }}
              >
                {chip.label}
                <X size={12} />
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyFilters;
