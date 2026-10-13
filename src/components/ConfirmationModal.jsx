// src/components/ConfirmationModal.jsx
import React from 'react';
import { AlertCircle, X } from 'lucide-react';

const ConfirmationModal = ({
  isOpen,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed? This action cannot be undone.',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(17, 20, 24, 0.4)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '20px'
      }}
      className="animate-fade-in"
    >
      <div 
        style={{
          background: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E5E7EB',
          width: '100%',
          maxWidth: '440px',
          padding: '28px',
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '20px' }}>
          <div 
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#FEE2E2',
              color: '#DC2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <AlertCircle size={20} />
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111418', margin: '0 0 6px' }}>
              {title}
            </h3>
            <p style={{ color: '#6B7280', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
              {message}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button 
            type="button" 
            onClick={onCancel}
            className="btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            {cancelText}
          </button>
          <button 
            type="button" 
            onClick={onConfirm}
            style={{
              padding: '8px 18px',
              background: '#DC2626',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
