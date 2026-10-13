// src/pages/auth/AdminLoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../components/Logo';
import { loginUser } from '../../redux/slices/authSlice';
import { showToast } from '../../redux/slices/uiSlice';
import { loginSchema } from '../../schemas/validationSchemas';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react';

const AdminLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: true
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const user = await dispatch(loginUser(values));
        if (user.role === 'admin') {
          dispatch(
            showToast({
              type: 'success',
              title: 'Access Granted',
              message: `Welcome to Admin Console, ${user.name}`
            })
          );
          navigate('/admin', { replace: true });
        } else {
          dispatch(
            showToast({
              type: 'error',
              title: 'Access Denied',
              message: 'This account does not have administrator privileges.'
            })
          );
        }
      } catch (err) {
        dispatch(
          showToast({
            type: 'error',
            title: 'Authentication Failed',
            message: err.message || 'Invalid administrator email or password.'
          })
        );
      }
    }
  });

  // Quick Demo Admin Login Helper
  const handleQuickLogin = (email, password) => {
    formik.setValues({
      email,
      password,
      rememberMe: true
    });
    setTimeout(() => {
      formik.submitForm();
    }, 100);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#FFFFFF', width: '100%', overflowX: 'hidden' }}>
      {/* LEFT COLUMN: Editorial Architecture Imagery */}
      <div 
        style={{
          flex: '1 1 50%',
          position: 'relative',
          background: '#111418',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '48px',
          color: '#FFFFFF',
          overflow: 'hidden'
        }}
        className="admin-image-column"
      >
        <img 
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80" 
          alt="Executive Architecture"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.45
          }}
        />

        {/* Brand Crest */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Logo variant="light" size="lg" taglineText="ADMINISTRATION" />
        </div>

        {/* Narrative Quote */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '480px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', color: '#FFFFFF', margin: '0 0 16px', lineHeight: 1.25, fontWeight: 500 }}>
            Executive management console.
          </h2>
          <p style={{ color: '#D1D5DB', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
            Centralized administrative control for real estate listings, client portfolios, luxury advisors, and transactions.
          </p>
        </div>

        {/* Footer info */}
        <div style={{ position: 'relative', zIndex: 2, fontSize: '0.8rem', color: '#9CA3AF' }}>
          © {new Date().getFullYear()} Aurelia Estates. Confidential Administration.
        </div>
      </div>

      {/* RIGHT COLUMN: Modern Clean Auth Form */}
      <div 
        style={{
          flex: '1 1 50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '48px clamp(24px, 5vw, 70px)',
          background: '#FFFFFF',
          overflowY: 'auto'
        }}
        className="admin-form-column"
      >
        <div style={{ maxWidth: '420px', width: '100%', margin: '0 auto' }}>
          {/* Back Link */}
          <Link 
            to="/" 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#6B7280',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 500,
              marginBottom: '28px'
            }}
          >
            <ArrowLeft size={16} /> Return to homepage
          </Link>

          {/* Form Header */}
          <div style={{ marginBottom: '24px' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111418', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
              Admin Sign In
            </h1>
            <p style={{ color: '#6B7280', fontSize: '0.9rem', margin: 0 }}>
              Sign in with authorized administrator credentials to manage portal operations.
            </p>
          </div>

          {/* Quick 1-Click Demo Admin Login */}
          <div 
            style={{
              padding: '14px',
              background: '#F9FAFB',
              borderRadius: '10px',
              border: '1px solid #E5E7EB',
              marginBottom: '24px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Quick Demo Access
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6B7280', fontFamily: 'monospace' }}>
                admin1@gmail.com
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin1@gmail.com', '17122007')}
              style={{
                width: '100%',
                padding: '9px 14px',
                borderRadius: '6px',
                border: '1px solid #D1D5DB',
                background: '#FFFFFF',
                color: '#111418',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              className="admin-demo-btn"
            >
              <ShieldCheck size={15} color="#111418" /> 1-Click Demo Admin Login
            </button>
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit}>
            {/* Email Field */}
            <div style={{ marginBottom: '18px' }}>
              <label 
                htmlFor="admin-email" 
                style={{ 
                  display: 'block', 
                  fontSize: '0.85rem', 
                  fontWeight: 600, 
                  color: '#374151', 
                  marginBottom: '6px' 
                }}
              >
                Administrator Email
              </label>
              <div style={{ position: 'relative', width: '100%' }}>
                <Mail 
                  size={18} 
                  color="#9CA3AF" 
                  style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} 
                />
                <input 
                  id="admin-email"
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="admin1@gmail.com"
                  className="input-modern"
                  style={{ 
                    width: '100%',
                    height: '46px',
                    boxSizing: 'border-box',
                    paddingLeft: '44px',
                    paddingRight: '14px',
                    borderColor: formik.touched.email && formik.errors.email ? '#EF4444' : undefined
                  }}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <div style={{ color: '#EF4444', fontSize: '0.78rem', marginTop: '4px' }}>
                  {formik.errors.email}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '20px' }}>
              <label 
                htmlFor="admin-password" 
                style={{ 
                  display: 'block', 
                  fontSize: '0.85rem', 
                  fontWeight: 600, 
                  color: '#374151', 
                  marginBottom: '6px' 
                }}
              >
                Security Password
              </label>
              <div style={{ position: 'relative', width: '100%' }}>
                <Lock 
                  size={18} 
                  color="#9CA3AF" 
                  style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} 
                />
                <input 
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="••••••••••••"
                  className="input-modern"
                  style={{ 
                    width: '100%',
                    height: '46px',
                    boxSizing: 'border-box',
                    paddingLeft: '44px', 
                    paddingRight: '44px',
                    borderColor: formik.touched.password && formik.errors.password ? '#EF4444' : undefined
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#9CA3AF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '6px',
                    borderRadius: '4px'
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div style={{ color: '#EF4444', fontSize: '0.78rem', marginTop: '4px' }}>
                  {formik.errors.password}
                </div>
              )}
            </div>

            {/* Remember Me */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', color: '#4B5563' }}>
                <input 
                  type="checkbox"
                  name="rememberMe"
                  checked={formik.values.rememberMe}
                  onChange={formik.handleChange}
                  style={{ accentColor: '#111418', width: '16px', height: '16px' }}
                />
                Keep me signed in on this device
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '13px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '0.95rem',
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Authenticating...' : (
                <>
                  Sign In to Admin Console <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .admin-image-column {
            display: none !important;
          }
          .admin-form-column {
            flex: 1 1 100% !important;
            padding: 36px 20px !important;
          }
        }
        .admin-demo-btn:hover {
          background-color: #F3F4F6 !important;
          border-color: #9CA3AF !important;
        }
      `}</style>
    </div>
  );
};

export default AdminLoginPage;
