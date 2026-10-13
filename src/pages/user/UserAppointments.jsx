// src/pages/user/UserAppointments.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Calendar, Clock, UserCheck, ArrowRight } from 'lucide-react';

const UserAppointments = () => {
  const { user } = useSelector((state) => state.auth);
  const appointments = useSelector((state) => state.appointments.items);

  const userAppointments = appointments.filter(
    (a) => a.customerEmail === user?.email || a.customerName === user?.name
  );
  const displayAppointments = userAppointments.length > 0 ? userAppointments : appointments;

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
          My Scheduled Visits ({displayAppointments.length})
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0 }}>
          Manage your upcoming in-person or virtual property walkthroughs.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {displayAppointments.map((apt) => (
          <div 
            key={apt.id}
            style={{
              padding: '24px',
              background: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  BOOKING REF: {apt.id}
                </span>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: '2px 0 0', fontWeight: 600 }}>
                  {apt.propertyTitle}
                </h3>
              </div>

              <span className={`badge-modern ${apt.status === 'Confirmed' ? 'badge-available' : 'badge-sale'}`}>
                {apt.status}
              </span>
            </div>

            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '14px',
                padding: '16px',
                background: 'var(--bg-warm)',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                fontSize: '0.88rem'
              }}
            >
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', marginBottom: '2px' }}>Date</span>
                <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{apt.date}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', marginBottom: '2px' }}>Time</span>
                <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{apt.time}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', marginBottom: '2px' }}>Property Advisor</span>
                <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{apt.agentName || 'Assigned Consultant'}</strong>
              </div>
            </div>

            {apt.message && (
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Notes:</strong> {apt.message}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
              {apt.propertyId !== 'GENERAL' && (
                <Link to={`/property/${apt.propertyId}`} style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Property Details <ArrowRight size={14} />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAppointments;
