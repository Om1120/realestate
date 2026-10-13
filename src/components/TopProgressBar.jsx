// src/components/TopProgressBar.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * 21st.dev-inspired Top Route Buffering Bar
 * Smoothly animates from 0% -> 75% -> 100% on route changes or search updates,
 * then fades away with a subtle glowing edge.
 */
const TopProgressBar = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Start buffering on route change
    setVisible(true);
    setProgress(25);

    const step1 = setTimeout(() => {
      setProgress(75);
    }, 120);

    const step2 = setTimeout(() => {
      setProgress(100);
    }, 320);

    const step3 = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 550);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
    };
  }, [location.pathname, location.search]);

  if (!visible && progress === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        zIndex: 99999,
        pointerEvents: 'none',
        background: 'transparent'
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #111418 0%, #966A48 50%, #B85D3B 100%)',
          boxShadow: '0 0 10px rgba(184, 93, 59, 0.6), 0 0 5px rgba(150, 106, 72, 0.4)',
          transition: 'width 250ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease-out',
          opacity: visible ? 1 : 0
        }}
      />
    </div>
  );
};

export default TopProgressBar;
