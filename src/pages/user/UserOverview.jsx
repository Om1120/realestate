// src/pages/user/UserOverview.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashboardCard from '../../components/DashboardCard';
import PropertyCard from '../../components/PropertyCard';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Heart, MessageSquare, Calendar, CreditCard, ArrowRight, Home } from 'lucide-react';

const UserOverview = () => {
  const { user } = useSelector((state) => state.auth);
  const favoriteIds = useSelector((state) => state.favorites.propertyIds);
  const properties = useSelector((state) => state.properties.items);
  const inquiries = useSelector((state) => state.inquiries.items);
  const appointments = useSelector((state) => state.appointments.items);
  const transactions = useSelector((state) => state.transactions.items);

  const favoriteProperties = properties.filter((p) => favoriteIds.includes(p.id));
  const userInquiries = inquiries.filter((i) => i.customerEmail === user?.email || i.customerName === user?.name);
  const userAppointments = appointments.filter((a) => a.customerEmail === user?.email || a.customerName === user?.name);
  const userTransactions = transactions.filter((t) => t.customerEmail === user?.email || t.customerName === user?.name);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Welcome Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
            Good morning, {user?.name || 'Om'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            Here is an overview of your saved properties, inquiries, and scheduled visits.
          </p>
        </div>
        <Link to="/properties" className="btn-primary" style={{ fontSize: '0.85rem', padding: '10px 18px' }}>
          Explore Properties <ArrowRight size={15} />
        </Link>
      </div>

      {/* Metric Cards Row */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}
      >
        <DashboardCard 
          title="Saved Homes" 
          value={favoriteIds.length} 
          subtitle="In your wishlist" 
          icon={Heart} 
        />
        <DashboardCard 
          title="Active Inquiries" 
          value={userInquiries.length || 2} 
          subtitle="Advisor responses pending" 
          icon={MessageSquare} 
        />
        <DashboardCard 
          title="Visits Scheduled" 
          value={userAppointments.length || 1} 
          subtitle="Confirmed appointments" 
          icon={Calendar} 
        />
        <DashboardCard 
          title="Transactions" 
          value={userTransactions.length || 1} 
          subtitle="Simulated bookings settled" 
          icon={CreditCard} 
        />
      </div>

      {/* Featured Saved Properties */}
      {favoriteProperties.length > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
              Recently Saved Properties
            </h3>
            <Link to="/dashboard/favorites" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              View All ({favoriteProperties.length}) <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {favoriteProperties.slice(0, 2).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      )}

      {/* Recent Inquiries & Appointments Split */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px'
        }}
        className="overview-split"
      >
        {/* Recent Inquiries */}
        <div 
          className="card-modern"
          style={{
            padding: '24px',
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
              Recent Inquiries
            </h4>
            <Link to="/dashboard/inquiries" style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', textDecoration: 'none', fontWeight: 500 }}>
              View All
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {(userInquiries.length > 0 ? userInquiries : inquiries.slice(0, 2)).map((inq) => (
              <div 
                key={inq.id}
                style={{
                  padding: '14px',
                  background: 'var(--bg-warm)',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>{inq.propertyTitle}</span>
                  <span className="badge-modern badge-sale" style={{ fontSize: '0.7rem' }}>{inq.status}</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{formatDate(inq.date)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Appointments */}
        <div 
          className="card-modern"
          style={{
            padding: '24px',
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
              Upcoming Scheduled Visits
            </h4>
            <Link to="/dashboard/appointments" style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', textDecoration: 'none', fontWeight: 500 }}>
              View All
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {(userAppointments.length > 0 ? userAppointments : appointments.slice(0, 2)).map((apt) => (
              <div 
                key={apt.id}
                style={{
                  padding: '14px',
                  background: 'var(--bg-warm)',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>{apt.propertyTitle}</span>
                  <span className="badge-modern badge-available" style={{ fontSize: '0.7rem' }}>{apt.status}</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  {apt.date} at {apt.time} • Agent: {apt.agentName}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .overview-split {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default UserOverview;
