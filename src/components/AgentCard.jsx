// src/components/AgentCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';

const AgentCard = ({ agent }) => {
  return (
    <div 
      className="card-luxury"
      style={{
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E5E7EB',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.25s ease'
      }}
    >
      <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
        <img 
          src={agent.image} 
          alt={agent.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
        <div 
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(4px)',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#111418'
          }}
        >
          {agent.propertiesCount || 12} Listings
        </div>
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111418', margin: '0 0 4px' }}>
            {agent.name}
          </h3>

          <div style={{ fontSize: '0.82rem', color: '#6B7280', marginBottom: '8px' }}>
            {agent.role}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#9CA3AF', fontSize: '0.8rem', marginBottom: '16px' }}>
            <MapPin size={13} color="#9CA3AF" />
            <span>{agent.location}</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', paddingTop: '12px', borderTop: '1px solid #F3F4F6' }}>
          <Link 
            to={`/agents/${agent.id}`}
            className="btn-secondary"
            style={{
              flex: 1,
              padding: '8px 12px',
              fontSize: '0.82rem',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px'
            }}
          >
            Profile <ArrowUpRight size={14} />
          </Link>

          <a 
            href={`tel:${agent.phone}`}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#111418',
              textDecoration: 'none',
              transition: 'background 0.2s'
            }}
            aria-label="Call Agent"
          >
            <Phone size={15} />
          </a>

          <a 
            href={`mailto:${agent.email}`}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#111418',
              textDecoration: 'none',
              transition: 'background 0.2s'
            }}
            aria-label="Email Agent"
          >
            <Mail size={15} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
