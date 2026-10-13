// src/components/ToastNotification.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideToast } from '../redux/slices/uiSlice';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastNotification = () => {
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.ui.toast);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (toast) {
      setIsExiting(false);
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          dispatch(hideToast());
        }, 220);
      }, 3800);
      return () => clearTimeout(timer);
    }
  }, [toast, dispatch]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      dispatch(hideToast());
    }, 200);
  };

  return (
    <div 
      className="toast-container"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 99999,
        maxWidth: '400px',
        width: 'calc(100% - 48px)',
        transform: isExiting ? 'translateY(16px) scale(0.96)' : 'translateY(0) scale(1)',
        opacity: isExiting ? 0 : 1,
        transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
        animation: !isExiting ? 'toastSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)' : 'none'
      }}
    >
      <div 
        style={{
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: '12px',
          padding: '16px 18px 20px',
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.12), 0 0 1px rgba(0, 0, 0, 0.08)'
        }}
      >
        <div style={{ marginTop: '2px', flexShrink: 0 }}>
          {isSuccess && (
            <div style={{ background: '#ECFDF5', padding: '6px', borderRadius: '50%', display: 'flex' }}>
              <CheckCircle2 size={18} color="#059669" />
            </div>
          )}
          {isError && (
            <div style={{ background: '#FEF2F2', padding: '6px', borderRadius: '50%', display: 'flex' }}>
              <AlertCircle size={18} color="#DC2626" />
            </div>
          )}
          {!isSuccess && !isError && (
            <div style={{ background: '#F3F4F6', padding: '6px', borderRadius: '50%', display: 'flex' }}>
              <Info size={18} color="#111418" />
            </div>
          )}
        </div>

        <div style={{ flex: 1, paddingRight: '8px' }}>
          {toast.title && (
            <h4 style={{ margin: 0, fontSize: '0.9rem', color: '#111418', fontWeight: 700, letterSpacing: '-0.01em' }}>
              {toast.title}
            </h4>
          )}
          <p style={{ margin: 0, fontSize: '0.82rem', color: '#4B5563', lineHeight: 1.45, marginTop: toast.title ? '3px' : '0' }}>
            {toast.message}
          </p>
        </div>

        <button 
          onClick={handleClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#9CA3AF',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.15s, background 0.15s'
          }}
          aria-label="Close notification"
        >
          <X size={15} />
        </button>

        {/* Animated Countdown Drain Bar */}
        <div 
          className="toast-progress-bar" 
          style={{
            background: isSuccess ? '#059669' : isError ? '#DC2626' : '#111418'
          }}
        />
      </div>

      <style>{`
        @keyframes toastSlideIn {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default ToastNotification;
