// src/pages/user/UserInquiries.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatters';
import { MessageSquare, ArrowRight, Clock } from 'lucide-react';

const UserInquiries = () => {
  const { user } = useSelector((state) => state.auth);
  const inquiries = useSelector((state) => state.inquiries.items);

  const userInquiries = inquiries.filter(
    (i) => i.customerEmail === user?.email || i.customerName === user?.name
  );
  const displayInquiries = userInquiries.length > 0 ? userInquiries : inquiries;

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
          My Inquiries ({displayInquiries.length})
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0 }}>
          Track communications and advisor responses for your submitted requests.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {displayInquiries.map((inq) => (
          <div 
            key={inq.id}
            style={{
              padding: '24px',
              background: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  ID: {inq.id}
                </span>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', margin: '2px 0 0', fontWeight: 600 }}>
                  {inq.propertyTitle}
                </h3>
              </div>

              <span className="badge-modern badge-sale" style={{ textTransform: 'capitalize' }}>
                {inq.status}
              </span>
            </div>

            <div 
              style={{
                padding: '14px 16px',
                background: 'var(--bg-warm)',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                lineHeight: 1.5
              }}
            >
              "{inq.message}"
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={14} /> Submitted on {formatDate(inq.date)}
              </div>
              {inq.propertyId !== 'GENERAL' && (
                <Link to={`/property/${inq.propertyId}`} style={{ color: 'var(--text-primary)', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  View Property <ArrowRight size={14} />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserInquiries;
