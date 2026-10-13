// src/pages/user/UserDashboardLayout.jsx
import React from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { showToast } from '../../redux/slices/uiSlice';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { 
  LayoutDashboard, 
  Heart, 
  MessageSquare, 
  Calendar, 
  CreditCard, 
  User, 
  LogOut
} from 'lucide-react';

const UserDashboardLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const favoriteCount = useSelector((state) => state.favorites.propertyIds.length);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(showToast({ type: 'info', title: 'Signed Out', message: 'You have been signed out.' }));
    navigate('/');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, exact: true },
    { name: 'Saved Homes', path: '/dashboard/favorites', icon: Heart, badge: favoriteCount },
    { name: 'Inquiries', path: '/dashboard/inquiries', icon: MessageSquare },
    { name: 'Viewing Tours', path: '/dashboard/appointments', icon: Calendar },
    { name: 'Transactions', path: '/dashboard/transactions', icon: CreditCard },
    { name: 'Profile Settings', path: '/dashboard/profile', icon: User }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#FBFBFA', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* User Dashboard Top Banner */}
      <div 
        style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #E5E7EB',
          padding: '36px 24px'
        }}
      >
        <div 
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img 
              src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80"}
              alt={user?.name}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #E5E7EB'
              }}
            />
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase' }}>
                Client Portal
              </div>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#111418', margin: '2px 0 0' }}>
                Welcome back, {user?.name || 'Client'}
              </h1>
              <div style={{ fontSize: '0.82rem', color: '#6B7280' }}>
                {user?.email}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/properties" className="btn-secondary" style={{ fontSize: '0.82rem', padding: '8px 16px' }}>
              Explore Properties
            </Link>
            <button onClick={handleLogout} className="btn-secondary" style={{ fontSize: '0.82rem', padding: '8px 16px', color: '#DC2626' }}>
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Navigation Sidebar + Content */}
      <div 
        style={{
          maxWidth: '1360px',
          margin: '32px auto 0',
          padding: '0 24px 80px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '240px 1fr',
          gap: '32px',
          alignItems: 'start',
          flex: 1
        }}
        className="user-dashboard-layout"
      >
        {/* Navigation Sidebar */}
        <aside 
          className="card-luxury"
          style={{
            padding: '12px',
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.exact}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '0.86rem',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#111418' : '#4B5563',
                background: isActive ? '#F3F4F6' : 'transparent',
                transition: 'all 0.15s'
              })}
            >
              {({ isActive }) => (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <link.icon size={16} color={isActive ? '#111418' : '#6B7280'} />
                    <span>{link.name}</span>
                  </div>
                  {link.badge > 0 && (
                    <span 
                      style={{
                        background: '#111418',
                        color: '#FFFFFF',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: '10px'
                      }}
                    >
                      {link.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </aside>

        {/* Dynamic Nested View */}
        <main>
          <Outlet />
        </main>
      </div>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .user-dashboard-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default UserDashboardLayout;
