// src/components/PropertyGallery.jsx
import React, { useState } from 'react';
import { Maximize, ChevronLeft, ChevronRight, X } from 'lucide-react';

const PropertyGallery = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div 
        style={{
          height: '450px',
          background: '#F3F4F6',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#9CA3AF'
        }}
      >
        No Images Available
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Main Image Stage */}
      <div 
        style={{
          position: 'relative',
          height: '480px',
          borderRadius: '12px',
          overflow: 'hidden',
          background: '#F3F4F6',
          border: '1px solid #E5E7EB',
          boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)'
        }}
        className="main-gallery-stage"
      >
        <img 
          src={images[currentIndex]} 
          alt={`Property View ${currentIndex + 1}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.25s ease'
          }}
        />

        {/* Fullscreen Trigger */}
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(6px)',
            border: '1px solid #E5E7EB',
            color: '#111418',
            padding: '8px 14px',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <Maximize size={14} /> View Fullscreen ({images.length} photos)
        </button>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.92)',
                border: '1px solid #E5E7EB',
                color: '#111418',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={nextImage}
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.92)',
                border: '1px solid #E5E7EB',
                color: '#111418',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div 
          style={{
            display: 'flex',
            gap: '10px',
            marginTop: '12px',
            overflowX: 'auto',
            paddingBottom: '4px'
          }}
        >
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: '90px',
                height: '65px',
                borderRadius: '8px',
                overflow: 'hidden',
                border: currentIndex === idx ? '2px solid #111418' : '1px solid #E5E7EB',
                padding: 0,
                background: '#FFFFFF',
                cursor: 'pointer',
                opacity: currentIndex === idx ? 1 : 0.6,
                transition: 'all 0.2s',
                flexShrink: 0
              }}
            >
              <img src={img} alt={`Thumb ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {isModalOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(17, 20, 24, 0.92)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3000,
            padding: '24px'
          }}
        >
          <button
            onClick={() => setIsModalOpen(false)}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: '#FFFFFF',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={22} />
          </button>

          <img 
            src={images[currentIndex]} 
            alt="Fullscreen view" 
            style={{
              maxWidth: '90vw',
              maxHeight: '80vh',
              borderRadius: '8px',
              objectFit: 'contain'
            }}
          />

          <div style={{ color: '#D1D5DB', marginTop: '16px', fontSize: '0.9rem' }}>
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyGallery;
