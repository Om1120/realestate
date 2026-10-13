import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Logo from './Logo';
import { logout } from '../redux/slices/authSlice';
import { showToast } from '../redux/slices/uiSlice';
import { 
  Heart, 
  User, 
  Menu, 
  X, 
  LayoutDashboard, 
  LogOut, 
  ChevronDown,
  Building,
  ShieldCheck,
  Plus
} from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const favoriteCount = useSelector((state) => state.favorites.propertyIds.length);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown and mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(showToast({ type: 'info', title: 'Signed out', message: 'You have been signed out.' }));
    navigate('/');
  };

  const navLinks = [
    { name: 'Properties', path: '/properties' },
    { name: 'Locations', path: '/locations' },
    { name: 'Agents', path: '/agents' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(251, 251, 250, 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${isScrolled ? 'rgba(229, 231, 235, 0.9)' : 'rgba(229, 231, 235, 0.6)'}`,
        transition: 'all 0.25s ease',
        boxShadow: isScrolled ? '0 4px 20px -2px rgba(0, 0, 0, 0.04)' : 'none'
      }}
    >
      <div 
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '0 24px',
          height: isScrolled ? '68px' : '76px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'height 0.25s ease'
        }}
      >
        {/* Brand Logo */}
        <Logo size="md" />

        {/* Desktop Navigation Links */}
        <nav 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '28px' 
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              style={({ isActive }) => ({
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#111418' : '#525866',
                position: 'relative',
                transition: 'color 0.2s ease',
                padding: '6px 0'
              })}
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <span 
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        backgroundColor: '#111418',
                        borderRadius: '2px'
                      }} 
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right Action Icons & Auth */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Favourites Heart Button */}
          <Link 
            to="/favorites"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: 'transparent',
              border: '1px solid #E5E7EB',
              color: '#111418',
              textDecoration: 'none',
              position: 'relative',
              transition: 'all 0.2s'
            }}
            aria-label="View Saved Favourites"
          >
            <Heart size={18} />
            {favoriteCount > 0 && (
              <span 
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: '#111418',
                  color: '#FFF',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {favoriteCount}
              </span>
            )}
          </Link>

          {/* User Auth Section */}
          {isAuthenticated && user ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <img 
                  src={user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"}
                  alt={user.name}
                  style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#111418' }} className="user-name-desktop">
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown size={14} color="#6B7280" />
              </button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div 
                  className="card-luxury animate-fade-in"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: '210px',
                    background: '#FFFFFF',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)',
                    padding: '8px',
                    zIndex: 1050
                  }}
                >
                  <div style={{ padding: '8px 10px', borderBottom: '1px solid #F3F4F6', marginBottom: '6px' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#111418' }}>{user.name}</div>
                    <div style={{ fontSize: '0.72rem', color: '#6B7280' }}>{user.email}</div>
                  </div>

                  <Link 
                    to={user.role === 'admin' ? '/admin' : '/dashboard'}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 10px',
                      color: '#111418',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      textDecoration: 'none',
                      borderRadius: '6px'
                    }}
                    className="dropdown-item"
                  >
                    <LayoutDashboard size={15} color="#4B5563" />
                    {user.role === 'admin' ? 'Admin Console' : 'My Dashboard'}
                  </Link>

                  <button
                    onClick={handleLogout}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 10px',
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      color: '#DC2626',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      borderRadius: '6px',
                      textAlign: 'left'
                    }}
                    className="dropdown-item"
                  >
                    <LogOut size={15} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link 
              to="/login"
              style={{
                fontSize: '0.88rem',
                fontWeight: 600,
                color: '#111418',
                textDecoration: 'none',
                padding: '8px 14px'
              }}
              className="login-btn-desktop"
            >
              Sign In
            </Link>
          )}

          {/* Admin CTA if logged in as admin */}
          {user?.role === 'admin' && (
            <Link 
              to="/admin/properties/add" 
              className="btn-primary" 
              style={{ 
                padding: '9px 18px', 
                fontSize: '0.86rem',
                borderRadius: '8px'
              }}
            >
              <Plus size={15} /> Add Property
            </Link>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              color: '#111418',
              cursor: 'pointer',
              padding: '6px'
            }}
            className="mobile-menu-btn"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div 
          style={{
            background: '#FFFFFF',
            borderTop: '1px solid #E5E7EB',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
          }}
          className="mobile-drawer animate-fade-in"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              style={({ isActive }) => ({
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#111418' : '#4B5563',
                padding: '6px 0'
              })}
            >
              {link.name}
            </NavLink>
          ))}

          <div style={{ paddingTop: '14px', borderTop: '1px solid #F3F4F6', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {!isAuthenticated && (
              <Link 
                to="/login"
                className="btn-secondary"
                style={{ width: '100%', textAlign: 'center' }}
              >
                Sign In / Register
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link 
                to="/admin/properties/add"
                className="btn-primary"
                style={{ width: '100%', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <Plus size={15} /> Add Property
              </Link>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 960px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          .user-name-desktop, .login-btn-desktop {
            display: none !important;
          }
        }
        .dropdown-item:hover {
          background-color: #F4F5F7 !important;
        }
      `}</style>
    </header>
  );
};

export default Navbar;
