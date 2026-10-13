// src/pages/auth/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../components/Logo';
import AnimatedSubmitButton from '../../components/AnimatedSubmitButton';
import { loginUser } from '../../redux/slices/authSlice';
import { showToast } from '../../redux/slices/uiSlice';
import { loginSchema, registerSchema } from '../../schemas/validationSchemas';
import { ShieldCheck, User, Lock, Mail, Phone, ArrowRight, ArrowLeft } from 'lucide-react';

const LoginPage = () => {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  // Extract return/purchase URL safely from location state or session
  const getRedirectDestination = () => {
    if (typeof location.state?.from === 'string') {
      return location.state.from;
    }
    if (location.state?.from?.pathname) {
      return location.state.from.pathname;
    }
    const sessionUrl = sessionStorage.getItem('pending_purchase_url');
    if (sessionUrl) {
      return sessionUrl;
    }
    return null;
  };

  const from = getRedirectDestination();

  const handlePostAuthRedirect = (authUser) => {
    const destination = getRedirectDestination();
    if (destination) {
      sessionStorage.removeItem('pending_purchase_url');
      navigate(destination, { replace: true });
    } else if (authUser?.role === 'admin') {
      navigate('/admin', { replace: true });
    } else {
      navigate('/dashboard', { replace: true });
    }
  };

  // Login Formik
  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: true
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const user = await dispatch(loginUser(values));
        dispatch(showToast({
          type: 'success',
          title: 'Welcome Back',
          message: `Signed in as ${user.name}`
        }));

        handlePostAuthRedirect(user);
      } catch (err) {
        dispatch(showToast({
          type: 'error',
          title: 'Authentication Failed',
          message: err.message || 'Invalid email or password.'
        }));
      }
    }
  });

  // Register Formik
  const registerFormik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        const newUser = {
          id: 'usr-' + Date.now(),
          name: values.name,
          email: values.email,
          phone: values.phone,
          role: 'user',
          avatar: '/Images/Cus1.webp',
          title: 'Registered Member'
        };
        dispatch({ type: 'auth/loginSuccess', payload: newUser });
        dispatch(showToast({
          type: 'success',
          title: 'Account Created',
          message: `Welcome to Aurelia, ${values.name}`
        }));

        handlePostAuthRedirect(newUser);
      } catch (err) {
        dispatch(showToast({
          type: 'error',
          title: 'Registration Failed',
          message: err.message || 'Unable to register.'
        }));
      }
    }
  });

  // Quick Demo Login Helper
  const handleQuickLogin = (email, password) => {
    loginFormik.setValues({
      email,
      password,
      rememberMe: true
    });
    setTimeout(() => {
      loginFormik.submitForm();
    }, 100);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#FFFFFF' }}>
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
        className="login-image-column"
      >
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80" 
          alt="Modern Architecture"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.55
          }}
        />

        {/* Brand Crest */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Logo variant="light" size="lg" />
        </div>

        {/* Narrative Quote */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '480px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#FFFFFF', margin: '0 0 16px', lineHeight: 1.2, fontWeight: 500 }}>
            Exceptional properties. Better living.
          </h2>
          <p style={{ color: '#D1D5DB', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
            Discover curated architectural homes, modern apartments, and premier commercial spaces across India.
          </p>
        </div>

        {/* Footer info */}
        <div style={{ position: 'relative', zIndex: 2, fontSize: '0.8rem', color: '#9CA3AF' }}>
          © {new Date().getFullYear()} Aurelia Estates. Confidential Client Portal.
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

          {/* Reservation Prompt Notice if redirected from booking */}
          {from && (
            <div 
              style={{
                padding: '14px 16px',
                background: '#F0FDF4',
                border: '1px solid #BBF7D0',
                borderRadius: '8px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <ShieldCheck size={20} color="#16A34A" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '0.85rem', color: '#166534', lineHeight: 1.4 }}>
                <strong>Sign In Required:</strong> Please sign in or register to complete your property purchase reservation.
              </div>
            </div>
          )}

          {/* Form Header */}
          <div style={{ marginBottom: '28px' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111418', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
              {mode === 'login' ? 'Client Sign In' : 'Create an Account'}
            </h1>
            <p style={{ color: '#6B7280', fontSize: '0.9rem', margin: 0 }}>
              {mode === 'login' 
                ? 'Sign in to access saved homes, booked viewings, and transactions.' 
                : 'Join Aurelia to save favorite properties and schedule viewings.'}
            </p>
          </div>

          {/* 1-Click Demo Login Banner */}
          {mode === 'login' && (
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
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>
                  Demo Access
                </div>
                <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>
                  Client Portal
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleQuickLogin('user@example.com', 'user123')}
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
                className="demo-btn"
              >
                <User size={15} color="#4B5563" /> 1-Click Demo Client Login
              </button>
            </div>
          )}

          {/* Mode Switcher */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              background: '#F3F4F6',
              padding: '4px',
              borderRadius: '8px',
              marginBottom: '24px'
            }}
          >
            <button
              type="button"
              onClick={() => setMode('login')}
              style={{
                padding: '8px',
                borderRadius: '6px',
                border: 'none',
                background: mode === 'login' ? '#FFFFFF' : 'transparent',
                color: mode === 'login' ? '#111418' : '#6B7280',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow: mode === 'login' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              style={{
                padding: '8px',
                borderRadius: '6px',
                border: 'none',
                background: mode === 'register' ? '#FFFFFF' : 'transparent',
                color: mode === 'register' ? '#111418' : '#6B7280',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow: mode === 'register' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              Register
            </button>
          </div>

          {/* LOGIN FORM */}
          {mode === 'login' ? (
            <form onSubmit={loginFormik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                  Email Address
                </label>
                <input 
                  type="email"
                  name="email"
                  placeholder="admin@example.com / user@example.com"
                  className="input-luxury"
                  value={loginFormik.values.email}
                  onChange={loginFormik.handleChange}
                  onBlur={loginFormik.handleBlur}
                />
                {loginFormik.touched.email && loginFormik.errors.email && (
                  <span style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: '3px', display: 'block' }}>
                    {loginFormik.errors.email}
                  </span>
                )}
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151' }}>
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotPasswordOpen(true)}
                    style={{ background: 'transparent', border: 'none', color: '#6B7280', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 500 }}
                  >
                    Forgot password?
                  </button>
                </div>
                <input 
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="input-luxury"
                  value={loginFormik.values.password}
                  onChange={loginFormik.handleChange}
                  onBlur={loginFormik.handleBlur}
                />
                {loginFormik.touched.password && loginFormik.errors.password && (
                  <span style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: '3px', display: 'block' }}>
                    {loginFormik.errors.password}
                  </span>
                )}
              </div>

              <AnimatedSubmitButton 
                type="submit" 
                status={loading ? 'loading' : 'idle'}
                idleText="Sign In"
                loadingText="Signing In"
                successText="Authenticated!"
                icon={<ArrowRight size={16} />}
                style={{ width: '100%', padding: '13px', fontSize: '0.92rem', marginTop: '6px' }}
                disabled={loading}
              />
            </form>
          ) : (
            /* REGISTER FORM */
            <form onSubmit={registerFormik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                  Full Name *
                </label>
                <input 
                  type="text"
                  name="name"
                  placeholder="e.g. Siddharth Patel"
                  className="input-luxury"
                  value={registerFormik.values.name}
                  onChange={registerFormik.handleChange}
                  onBlur={registerFormik.handleBlur}
                />
                {registerFormik.touched.name && registerFormik.errors.name && (
                  <span style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: '2px', display: 'block' }}>
                    {registerFormik.errors.name}
                  </span>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                  Email Address *
                </label>
                <input 
                  type="email"
                  name="email"
                  placeholder="you@domain.com"
                  className="input-luxury"
                  value={registerFormik.values.email}
                  onChange={registerFormik.handleChange}
                  onBlur={registerFormik.handleBlur}
                />
                {registerFormik.touched.email && registerFormik.errors.email && (
                  <span style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: '2px', display: 'block' }}>
                    {registerFormik.errors.email}
                  </span>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                  Phone Number
                </label>
                <input 
                  type="tel"
                  name="phone"
                  placeholder="+91 98000..."
                  className="input-luxury"
                  value={registerFormik.values.phone}
                  onChange={registerFormik.handleChange}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                    Password *
                  </label>
                  <input 
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className="input-luxury"
                    value={registerFormik.values.password}
                    onChange={registerFormik.handleChange}
                    onBlur={registerFormik.handleBlur}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                    Confirm *
                  </label>
                  <input 
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    className="input-luxury"
                    value={registerFormik.values.confirmPassword}
                    onChange={registerFormik.handleChange}
                    onBlur={registerFormik.handleBlur}
                  />
                </div>
              </div>

              <AnimatedSubmitButton 
                type="submit" 
                status={loading ? 'loading' : 'idle'}
                idleText="Create Account"
                loadingText="Creating Account"
                successText="Account Created!"
                icon={<ArrowRight size={16} />}
                style={{ width: '100%', padding: '13px', fontSize: '0.92rem', marginTop: '6px' }}
                disabled={loading}
              />
            </form>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .login-image-column {
            display: none !important;
          }
        }
        .demo-btn:hover {
          background-color: #F3F4F6 !important;
          border-color: #D1D5DB !important;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
