// src/components/InitialLogoPreloader.jsx
import React, { useState, useEffect } from 'react';
import { LogoIcon } from './Logo';

/**
 * Minimalist Logo Buffering Preloader
 * Displays the Logo Icon with the brand text placed directly UNDER it,
 * with a smooth breathing/buffering pulse before smoothly fading into the website.
 */
const InitialLogoPreloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Smooth buffering duration
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 950);

    const unmountTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        backgroundColor: 'var(--bg-main, #FBFBFA)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isFadingOut ? 0 : 1,
        transform: isFadingOut ? 'scale(1.04)' : 'scale(1)',
        pointerEvents: isFadingOut ? 'none' : 'all',
        transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        userSelect: 'none'
      }}
    >
      {/* Centered Logo with Text Underneath */}
      <div 
        className="logo-buffering-wrap"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
          animation: 'logoBreathe 1.6s ease-in-out infinite'
        }}
      >
        {/* Logo Icon on Top */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LogoIcon size={56} variant="dark" />
        </div>

        {/* Text Under the Logo */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
              fontSize: '1.6rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              color: '#111418',
              lineHeight: 1
            }}
          >
            AURELIA
          </span>

          <span
            style={{
              fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
              fontSize: '0.62rem',
              fontWeight: 600,
              letterSpacing: '0.28em',
              color: '#6B7280',
              textTransform: 'uppercase'
            }}
          >
            REAL ESTATE
          </span>
        </div>
      </div>

      <style>{`
        @keyframes logoBreathe {
          0%, 100% {
            transform: scale(0.96);
            opacity: 0.85;
          }
          50% {
            transform: scale(1.04);
            opacity: 1;
            filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.08));
          }
        }
      `}</style>
    </div>
  );
};

export default InitialLogoPreloader;
