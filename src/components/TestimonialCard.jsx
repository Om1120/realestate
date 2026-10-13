// src/components/TestimonialCard.jsx
import React from 'react';
import { Star } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div 
      className="card-luxury"
      style={{
        padding: '30px',
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E5E7EB',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%'
      }}
    >
      <div>
        {/* Star Rating */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
          {[...Array(testimonial.rating || 5)].map((_, i) => (
            <Star key={i} size={15} fill="#111418" color="#111418" />
          ))}
        </div>

        {/* Quote */}
        <p style={{ color: '#374151', fontSize: '0.95rem', lineHeight: '1.6', margin: '0 0 20px', fontStyle: 'normal' }}>
          "{testimonial.quote}"
        </p>
      </div>

      {/* Author Info */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          paddingTop: '16px',
          borderTop: '1px solid #F3F4F6'
        }}
      >
        <img 
          src={testimonial.image} 
          alt={testimonial.name}
          style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
          loading="lazy"
        />
        <div>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111418' }}>
            {testimonial.name}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>
            {testimonial.designation} • {testimonial.city}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
