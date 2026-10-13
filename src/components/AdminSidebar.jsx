// src/components/AdminSidebar.jsx
import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Logo from './Logo';
import { logout } from '../redux/slices/authSlice';
import { showToast } from '../redux/slices/uiSlice';
import { 
  LayoutDashboard, 
  Building, 
  Grid, 
  Users, 
  UserCheck, 
  MessageSquare, 
  Calendar, 
  CreditCard, 
  Settings, 
  LogOut, 
  ExternalLink
} from 'lucide-react';

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const pendingInquiriesCount = useSelector((state) => 
    state.inquiries.items.filter((i) => i.status === 'New').length
  );
  const pendingAppointmentsCount = useSelector((state) => 
    state.appointments.items.filter((a) => a.status === 'Pending').length
  );

  const handleLogout = () => {
    dispatch(logout());
    dispatch(showToast({ type: 'info', title: 'Signed Out', message: 'Administrator session ended.' }));
    navigate('/login');
  };

  const navItems = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Properties', path: '/admin/properties', icon: Building },
    { name: 'Categories', path: '/admin/categories', icon: Grid },
    { name: 'Advisors', path: '/admin/agents', icon: UserCheck },
    { name: 'Clients', path: '/admin/customers', icon: Users },
    { name: 'Inquiries', path: '/admin/inquiries', icon: MessageSquare, badge: pendingInquiriesCount },
    { name: 'Appointments', path: '/admin/appointments', icon: Calendar, badge: pendingAppointmentsCount },
    { name: 'Transactions', path: '/admin/transactions', icon: CreditCard },
    { name: 'Settings', path: '/admin/settings', icon: Settings }
  ];

  return (
    <aside
      style={{
        width: '260px',
        minHeight: '100vh',
        background: '#FFFFFF',
        borderRight: '1px solid #E5E7EB',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexShrink: 0
      }}
    >
      <div>
        {/* Brand Header */}
        <div 
          style={{
            padding: '20px 20px',
            borderBottom: '1px solid #F3F4F6'
          }}
        >
          <Logo size="sm" taglineText="ADMIN CONSOLE" to="/admin" />
        </div>

        {/* User Card */}
        <div 
          style={{
            margin: '16px 14px',
            padding: '10px 12px',
            background: '#F9FAFB',
            borderRadius: '8px',
            border: '1px solid #E5E7EB',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <img 
            src={user?.avatar || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80"}
            alt="Admin"
            style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '0.84rem', fontWeight: 600, color: '#111418', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {user?.name || 'Administrator'}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#6B7280' }}>
              Super Admin
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav style={{ padding: '6px 10px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '9px 12px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '0.86rem',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#111418' : '#4B5563',
                background: isActive ? '#F3F4F6' : 'transparent',
                transition: 'all 0.15s ease'
              })}
            >
              {({ isActive }) => (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <item.icon size={16} color={isActive ? '#111418' : '#6B7280'} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge > 0 && (
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
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Actions: View Live Website & Sign Out */}
      <div style={{ padding: '16px', borderTop: '1px solid #F3F4F6' }}>
        <Link
          to="/"
          target="_blank"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#6B7280',
            textDecoration: 'none',
            fontSize: '0.82rem',
            fontWeight: 500,
            padding: '8px 10px',
            marginBottom: '4px',
            borderRadius: '6px',
            transition: 'color 0.2s'
          }}
        >
          <ExternalLink size={15} /> View Public Portal
        </Link>

        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            width: '100%',
            padding: '8px 10px',
            borderRadius: '6px',
            background: 'transparent',
            border: 'none',
            color: '#DC2626',
            cursor: 'pointer',
            fontSize: '0.84rem',
            fontWeight: 500,
            transition: 'background 0.15s'
          }}
        >
          <LogOut size={15} /> Sign Out
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
