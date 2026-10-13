// src/pages/admin/AdminDashboardLayout.jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import { useSelector } from 'react-redux';
import { ExternalLink } from 'lucide-react';

const AdminDashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-warm)' }}>
      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Admin Stage */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Navbar */}
        <header
          style={{
            height: '68px',
            background: '#FFFFFF',
            borderBottom: '1px solid var(--border-color)',
            padding: '0 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 30
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Aurelia Workspace
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 500
              }}
            >
              <ExternalLink size={14} /> View Website
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img 
                src={user?.avatar || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80"}
                alt="Admin Profile"
                style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-color)' }}
              />
              <span style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                {user?.name || 'Administrator'}
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Nested Content */}
        <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
