// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer 
      style={{
        background: '#FFFFFF',
        borderTop: '1px solid #E5E7EB',
        padding: '70px 0 36px',
        marginTop: 'auto'
      }}
    >
      <div 
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '0 24px'
        }}
      >
        {/* Main 4-Column Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
            gap: '48px',
            marginBottom: '56px'
          }}
          className="footer-grid"
        >
          {/* Brand Info */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <Logo size="md" />
            </div>

            <p style={{ color: '#6B7280', fontSize: '0.9rem', lineHeight: '1.6', maxWidth: '320px', margin: '0 0 24px' }}>
              Exceptional homes and luxury real estate in premier destinations across India.
            </p>

            <div style={{ fontSize: '0.82rem', color: '#9CA3AF' }}>
              Mumbai • Ahmedabad • Bengaluru • Delhi
            </div>
          </div>

          {/* Properties Column */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111418', margin: '0 0 18px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Properties
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'All Properties', path: '/properties' },
                { name: 'Modern Apartments', path: '/apartments' },
                { name: 'Luxury Villas & Houses', path: '/houses' },
                { name: 'Commercial Spaces', path: '/commercial' }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    style={{ color: '#4B5563', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }}
                    className="footer-link"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations Column */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111418', margin: '0 0 18px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Locations
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Ahmedabad', 'Mumbai', 'Surat', 'Vadodara', 'Bengaluru', 'Delhi'].map((loc) => (
                <li key={loc}>
                  <Link 
                    to={`/properties?location=${loc}`} 
                    style={{ color: '#4B5563', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }}
                    className="footer-link"
                  >
                    {loc}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111418', margin: '0 0 18px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Advisory Team', path: '/agents' },
                { name: 'Contact Desk', path: '/contact' },
                { name: 'Client Portal', path: '/dashboard' }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    style={{ color: '#4B5563', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }}
                    className="footer-link"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          style={{
            paddingTop: '28px',
            borderTop: '1px solid #F3F4F6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.84rem',
            color: '#9CA3AF'
          }}
        >
          <div>
            © {new Date().getFullYear()} Aurelia Estates. All rights reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a 
              href="https://github.com/Om1120/realestate" 
              target="_blank" 
              rel="noreferrer" 
              className="footer-social-icon"
              aria-label="GitHub"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              className="footer-social-icon"
              aria-label="Instagram"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer" 
              className="footer-social-icon"
              aria-label="LinkedIn"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer" 
              className="footer-social-icon"
              aria-label="Facebook"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noreferrer" 
              className="footer-social-icon"
              aria-label="Twitter / X"
            >
              <i className="fa-brands fa-x-twitter"></i>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-social-icon {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid #E5E7EB;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #4B5563;
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.2s ease;
        }
        .footer-social-icon:hover {
          color: #FFFFFF;
          background: #111418;
          border-color: #111418;
          transform: translateY(-2px);
        }
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 36px !important;
          }
        }
        @media (max-width: 560px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .footer-link:hover {
          color: #111418 !important;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
