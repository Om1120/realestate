// src/components/AnimatedSubmitButton.jsx
import React from 'react';
import { Loader2, Check, ArrowRight } from 'lucide-react';

/**
 * 21st.dev-inspired Action Button with State Transitions (Idle -> Buffering -> End/Success)
 * 
 * @param {string} status - 'idle' | 'loading' | 'success'
 * @param {string} idleText - text to show in normal state
 * @param {string} loadingText - text to show while buffering
 * @param {string} successText - text to show on completion
 * @param {React.ReactNode} icon - optional default icon
 * @param {function} onClick - click handler
 * @param {string} className - optional css class
 * @param {object} style - optional inline style
 * @param {string} variant - 'primary' | 'secondary' | 'gold'
 */
const AnimatedSubmitButton = ({
  status = 'idle', // 'idle' | 'loading' | 'success'
  idleText = 'Submit',
  loadingText = 'Processing...',
  successText = 'Completed!',
  icon = null,
  disabled = false,
  type = 'submit',
  onClick,
  className = '',
  style = {},
  variant = 'primary',
  ...props
}) => {
  const isLoading = status === 'loading';
  const isSuccess = status === 'success';

  let baseClass = variant === 'secondary' ? 'btn-secondary' : 'btn-primary';
  if (variant === 'gold') baseClass = 'btn-gold';

  const successStyle = isSuccess ? {
    backgroundColor: '#059669',
    borderColor: '#059669',
    color: '#FFFFFF',
    transform: 'scale(1.02)'
  } : {};

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClass} btn-animated-interactive ${isLoading ? 'btn-buffering' : ''} ${isSuccess ? 'btn-end-success' : ''} ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        ...style,
        ...successStyle
      }}
      {...props}
    >
      {/* State: Buffering / Loading */}
      {isLoading && (
        <>
          <Loader2 size={16} className="spin-slow" />
          <span>{loadingText}</span>
          <span className="buffering-dots">
            <span className="dot-1">.</span>
            <span className="dot-2">.</span>
            <span className="dot-3">.</span>
          </span>
        </>
      )}

      {/* State: End / Success */}
      {isSuccess && (
        <>
          <span className="pop-icon">
            <Check size={17} strokeWidth={2.5} />
          </span>
          <span>{successText}</span>
        </>
      )}

      {/* State: Idle */}
      {!isLoading && !isSuccess && (
        <>
          {icon}
          <span>{idleText}</span>
        </>
      )}
    </button>
  );
};

export default AnimatedSubmitButton;
