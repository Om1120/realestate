// src/pages/public/AgentDetailsPage.jsx
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropertyCard from '../../components/PropertyCard';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowLeft
} from 'lucide-react';

const AgentDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const agents = useSelector((state) => state.agents.items);
  const properties = useSelector((state) => state.properties.items);

  const agent = agents.find((a) => a.id === id);
  const agentProperties = properties.filter((p) => p.agentId === id || p.agent === agent?.name);

  if (!agent) {
    return (
      <div style={{ minHeight: '60vh', textAlign: 'center', padding: '60px 24px', background: '#FBFBFA' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111418' }}>Advisor Profile Not Found</h2>
        <Link to="/agents" className="btn-primary" style={{ marginTop: '20px' }}>
          Back to Agents Directory
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FBFBFA', paddingBottom: '90px' }}>
      {/* Top Back Link */}
      <div 
        style={{
          borderBottom: '1px solid #E5E7EB',
          background: '#FFFFFF',
          padding: '16px 24px'
        }}
      >
        <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
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
            <ArrowLeft size={16} /> Back to all advisors
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1360px', margin: '36px auto 0', padding: '0 24px' }}>
        {/* Agent Profile Hero Card */}
        <div 
          className="card-luxury agent-hero-card"
          style={{
            padding: '36px',
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            display: 'grid',
            gridTemplateColumns: '260px 1fr',
            gap: '36px',
            alignItems: 'center',
            marginBottom: '48px'
          }}
        >
          <img 
            src={agent.image} 
            alt={agent.name}
            style={{
              width: '100%',
              height: '280px',
              borderRadius: '10px',
              objectFit: 'cover'
            }}
          />

          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
              Property Advisor
            </div>

            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#111418', margin: '0 0 4px', fontWeight: 600 }}>
              {agent.name}
            </h1>
            <div style={{ fontSize: '0.95rem', color: '#4B5563', marginBottom: '16px' }}>
              {agent.role}
            </div>

            <p style={{ color: '#4B5563', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '24px' }}>
              {agent.bio}
            </p>

            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '12px',
                padding: '16px',
                background: '#F9FAFB',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                marginBottom: '14px',
                fontSize: '0.85rem'
              }}
            >
              <div>
                <span style={{ color: '#6B7280', display: 'block', fontSize: '0.75rem' }}>Experience</span>
                <strong style={{ color: '#111418' }}>{agent.experience}</strong>
              </div>
              <div>
                <span style={{ color: '#6B7280', display: 'block', fontSize: '0.75rem' }}>Location Focus</span>
                <strong style={{ color: '#111418' }}>{agent.location}</strong>
              </div>
              <div>
                <span style={{ color: '#6B7280', display: 'block', fontSize: '0.75rem' }}>Specialization</span>
                <strong style={{ color: '#111418' }}>{agent.specialization}</strong>
              </div>
            </div>

            {/* Office / Desk Address */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '14px 16px',
                background: '#F9FAFB',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                marginBottom: '24px',
                fontSize: '0.85rem'
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  background: '#FEE2E2',
                  color: '#DC2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px'
                }}
              >
                <MapPin size={16} />
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ color: '#6B7280', display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '2px' }}>
                  Office / Desk Address
                </span>
                <div style={{ color: '#111418', fontWeight: 600, lineHeight: 1.5 }}>
                  {agent.address || `${agent.location} Regional Office, Aurelia Real Estate Gallery`}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <a href={`tel:${agent.phone}`} className="btn-primary">
                <Phone size={15} /> {agent.phone}
              </a>
              <a href={`mailto:${agent.email}`} className="btn-secondary">
                <Mail size={15} /> {agent.email}
              </a>
              <a 
                href={`https://wa.me/${agent.phone.replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-secondary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#16A34A', borderColor: '#BBF7D0' }}
              >
                <i className="fa-brands fa-whatsapp" style={{ fontSize: '1rem' }}></i> WhatsApp
              </a>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((agent.address || agent.location) + ' Aurelia Estates')}`} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-secondary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                title="View Office Address on Google Maps"
              >
                <MapPin size={15} color="#DC2626" /> View on Map
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="btn-secondary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                aria-label="LinkedIn Profile"
              >
                <i className="fa-brands fa-linkedin-in" style={{ fontSize: '0.95rem' }}></i>
              </a>
            </div>
          </div>
        </div>

        {/* Managed Active Listings */}
        <div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#111418', margin: '0 0 24px', fontWeight: 500 }}>
            Listings represented by {agent.name.split(' ')[0]} ({agentProperties.length})
          </h2>

          {agentProperties.length === 0 ? (
            <div style={{ padding: '40px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', textAlign: 'center', color: '#6B7280' }}>
              No current public listings for this advisor.
            </div>
          ) : (
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '24px'
              }}
            >
              {agentProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .agent-hero-card {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AgentDetailsPage;
