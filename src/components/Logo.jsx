// src/components/Logo.jsx
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Minimalist & Elegant Architectural Logo for Aurelia Real Estate.
 * Simple, balanced, and perfectly harmonious with the clean UI theme.
 */
export const LogoIcon = ({ size = 32, variant = 'dark' }) => {
  const isLight = variant === 'light';
  
  const bgFill = isLight ? '#FFFFFF' : '#111418';
  const strokeColor = isLight ? '#111418' : '#FFFFFF';
  const accentDot = isLight ? '#111418' : '#E5E7EB';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, transition: 'transform 0.2s ease' }}
      aria-hidden="true"
      className="logo-icon-svg"
    >
      {/* Sleek Minimalist Rounded Box */}
      <rect
        width="36"
        height="36"
        rx="8"
        fill={bgFill}
      />

      {/* Clean Architectural Pavilion / Stylized 'A' */}
      <path
        d="M18 7.5L27.5 27H22.8L18 16.5L13.2 27H8.5L18 7.5Z"
        fill={strokeColor}
      />

      {/* Modern Minimalist Crossline */}
      <rect
        x="13.5"
        y="21.5"
        width="9"
        height="2"
        rx="1"
        fill={bgFill}
      />

      {/* Subtle Keystone Pivot */}
      <circle
        cx="18"
        cy="12"
        r="1.2"
        fill={accentDot}
      />
    </svg>
  );
};

const Logo = ({
  variant = 'dark',
  size = 'md',
  showTagline = true,
  taglineText = 'REAL ESTATE',
  symbolOnly = false,
  to = '/',
  className = '',
  style = {}
}) => {
  const isLight = variant === 'light';

  // Proportional sizing matching website typography
  const sizeMap = {
    sm: { iconSize: 28, titleSize: '1.05rem', taglineSize: '0.52rem', gap: '8px' },
    md: { iconSize: 32, titleSize: '1.2rem', taglineSize: '0.58rem', gap: '10px' },
    lg: { iconSize: 40, titleSize: '1.45rem', taglineSize: '0.68rem', gap: '12px' },
    xl: { iconSize: 48, titleSize: '1.85rem', taglineSize: '0.78rem', gap: '14px' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const textColor = isLight ? '#FFFFFF' : '#111418';
  const taglineColor = isLight ? 'rgba(255, 255, 255, 0.65)' : '#6B7280';

  const content = (
    <div
      className={`aurelia-logo-wrap ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: currentSize.gap,
        textDecoration: 'none',
        userSelect: 'none',
        cursor: to ? 'pointer' : 'default',
        ...style
      }}
    >
      <LogoIcon size={currentSize.iconSize} variant={variant} />

      {!symbolOnly && (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
              fontSize: currentSize.titleSize,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: textColor,
              lineHeight: 1.1,
              transition: 'color 0.2s ease'
            }}
          >
            AURELIA
          </span>

          {showTagline && (
            <span
              style={{
                fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                fontSize: currentSize.taglineSize,
                fontWeight: 600,
                letterSpacing: '0.22em',
                color: taglineColor,
                textTransform: 'uppercase',
                marginTop: '2px',
                lineHeight: 1
              }}
            >
              {taglineText}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (to) {
    return (
      <Link to={to} style={{ textDecoration: 'none', display: 'inline-flex' }}>
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;

