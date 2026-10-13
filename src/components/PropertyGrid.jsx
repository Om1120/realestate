// src/components/PropertyGrid.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy, setViewMode, resetFilters } from '../redux/slices/propertySlice';
import PropertyCard from './PropertyCard';
import PropertyCardSkeleton from './PropertyCardSkeleton';
import { 
  LayoutGrid, 
  List, 
  ArrowUpDown, 
  SearchX, 
  RotateCcw
} from 'lucide-react';

const PropertyGrid = ({ properties, loading = false }) => {
  const dispatch = useDispatch();
  const { sortBy, viewMode } = useSelector((state) => state.properties);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalProperties = properties.length;
  const totalPages = Math.ceil(totalProperties / itemsPerPage);

  const paginatedProperties = properties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      {/* Top Controls Bar */}
      <div 
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '24px',
          background: '#FFFFFF',
          padding: '12px 18px',
          borderRadius: '10px',
          border: '1px solid #E5E7EB'
        }}
      >
        {/* Count */}
        <div style={{ fontSize: '0.88rem', color: '#4B5563' }}>
          {loading ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span className="buffering-dots">Finding properties<span className="dot-1">.</span><span className="dot-2">.</span><span className="dot-3">.</span></span>
            </span>
          ) : (
            <>Showing <span style={{ color: '#111418', fontWeight: 700 }}>{totalProperties}</span> properties</>
          )}
        </div>

        {/* Sort & View Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ArrowUpDown size={14} color="#6B7280" />
            <select
              value={sortBy}
              onChange={(e) => {
                dispatch(setSortBy(e.target.value));
                setCurrentPage(1);
              }}
              className="input-luxury"
              style={{ padding: '6px 12px', fontSize: '0.82rem', height: '36px', width: 'auto' }}
            >
              <option value="default">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="area-high">Largest Area</option>
              <option value="bedrooms">Most Bedrooms</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div 
            style={{
              display: 'flex',
              background: '#F3F4F6',
              borderRadius: '6px',
              padding: '2px'
            }}
          >
            <button
              onClick={() => dispatch(setViewMode('grid'))}
              style={{
                background: viewMode === 'grid' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'grid' ? '#111418' : '#6B7280',
                border: 'none',
                padding: '6px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                boxShadow: viewMode === 'grid' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.15s ease'
              }}
              title="Grid View"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => dispatch(setViewMode('list'))}
              style={{
                background: viewMode === 'list' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'list' ? '#111418' : '#6B7280',
                border: 'none',
                padding: '6px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                boxShadow: viewMode === 'list' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.15s ease'
              }}
              title="List View"
            >
              <List size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Buffering Skeleton Loading State */}
      {loading ? (
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(320px, 1fr))' : '1fr',
            gap: '24px'
          }}
        >
          {Array.from({ length: 6 }).map((_, idx) => (
            <PropertyCardSkeleton key={idx} viewMode={viewMode} />
          ))}
        </div>
      ) : totalProperties === 0 ? (
        /* Empty State */
        <div 
          className="card-luxury animate-fade-in"
          style={{
            padding: '70px 24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E5E7EB'
          }}
        >
          <div 
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#F3F4F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6B7280'
            }}
          >
            <SearchX size={26} />
          </div>

          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#111418', margin: 0 }}>
            No properties found
          </h3>
          <p style={{ color: '#6B7280', maxWidth: '400px', fontSize: '0.88rem', margin: 0 }}>
            No properties match your current filter criteria. Try adjusting your search or clearing active filters.
          </p>

          <button
            onClick={() => {
              dispatch(resetFilters());
              setCurrentPage(1);
            }}
            className="btn-primary"
            style={{ marginTop: '6px' }}
          >
            <RotateCcw size={14} /> Clear all filters
          </button>
        </div>
      ) : (
        /* Resolved Cards Layout with Stagger Animation */
        <>
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(320px, 1fr))' : '1fr',
              gap: '24px'
            }}
          >
            {paginatedProperties.map((property, index) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                viewMode={viewMode} 
                index={index}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div 
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '6px',
                marginTop: '40px'
              }}
            >
              <button
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage((prev) => Math.max(prev - 1, 1));
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                className="btn-secondary"
                style={{ padding: '6px 14px', fontSize: '0.82rem', opacity: currentPage === 1 ? 0.4 : 1 }}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => {
                    setCurrentPage(pageNum);
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    background: currentPage === pageNum ? '#111418' : '#FFFFFF',
                    color: currentPage === pageNum ? '#FFFFFF' : '#374151',
                    border: '1px solid #E5E7EB',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {pageNum}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                className="btn-secondary"
                style={{ padding: '6px 14px', fontSize: '0.82rem', opacity: currentPage === totalPages ? 0.4 : 1 }}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PropertyGrid;
