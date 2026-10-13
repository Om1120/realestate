// src/pages/public/AboutPage.jsx
import React from 'react';
import { ShieldCheck, Award, Users, Building, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#FBFBFA', paddingBottom: '90px' }}>
      {/* Editorial Header */}
      <section 
        style={{
          padding: '80px 24px 60px',
          background: 'linear-gradient(180deg, #F4F5F7 0%, #FBFBFA 100%)',
          textAlign: 'center',
          borderBottom: '1px solid #E5E7EB'
        }}
      >
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
            About Aurelia
          </div>
          <h1 
            style={{ 
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', 
              color: '#111418', 
              margin: '0 0 20px', 
              lineHeight: 1.15,
              fontWeight: 500
            }}
          >
            Spaces worth coming home to.
          </h1>
          <p style={{ color: '#4B5563', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '640px', margin: '0 auto' }}>
            Aurelia Estates is a modern real estate platform connecting discerning buyers with exceptional residential and commercial architecture across India.
          </p>
        </div>
      </section>

      {/* Large Numbers / Statistics Bar */}
      <section style={{ maxWidth: '1200px', margin: '48px auto', padding: '0 24px' }}>
        <div 
          style={{
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '16px',
            padding: '40px 24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px',
            textAlign: 'center',
            boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.04)'
          }}
        >
          {[
            { value: '500+', label: 'Curated Properties' },
            { value: '120+', label: 'Property Advisors' },
            { value: '10+', label: 'Major Cities' },
            { value: '5,000+', label: 'Happy Clients' }
          ].map((stat, idx) => (
            <div key={idx}>
              <div 
                style={{ 
                  fontFamily: 'var(--font-sans)', 
                  fontSize: '2.4rem', 
                  fontWeight: 800, 
                  color: '#111418',
                  letterSpacing: '-0.02em',
                  marginBottom: '4px'
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: '0.86rem', color: '#6B7280', fontWeight: 500 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Alternating Narrative Sections */}
      <section style={{ maxWidth: '1200px', margin: '80px auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '80px' }}>
        {/* Story Section 1 */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '56px',
            alignItems: 'center'
          }}
          className="about-story-grid"
        >
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
              Our Story
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#111418', margin: '0 0 16px', fontWeight: 500 }}>
              Architecture, elevated living, and trust.
            </h2>
            <p style={{ color: '#4B5563', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '16px' }}>
              Founded with the belief that finding a home should be an inspiring and seamless journey, Aurelia Estates curates properties that excel in architectural integrity, prime location, and everyday comfort.
            </p>
            <p style={{ color: '#4B5563', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
              Whether you are acquiring a contemporary penthouse in Worli, a garden villa in Ahmedabad, or an executive workspace in Bengaluru, our team is committed to transparency and clarity.
            </p>
          </div>

          <div style={{ height: '380px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.08)' }}>
            <img 
              src="/properties/villa_sovereign.jpg" 
              alt="Luxury Architecture"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/properties/manor_estate.jpg';
              }}
            />
          </div>
        </div>

        {/* Story Section 2 (Reversed) */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '56px',
            alignItems: 'center'
          }}
          className="about-story-grid"
        >
          <div style={{ height: '380px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.08)', order: 1 }} className="story-img-order">
            <img 
              src="/properties/penthouse_sky.jpg" 
              alt="Modern Living Space"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/properties/apartment_regency.jpg';
              }}
            />
          </div>

          <div style={{ order: 2 }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
              Our Mission
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#111418', margin: '0 0 16px', fontWeight: 500 }}>
              Setting a modern benchmark for real estate.
            </h2>
            <p style={{ color: '#4B5563', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '16px' }}>
              We eliminate traditional friction through verified listing documentation, high-resolution photography, dedicated advisors, and an intuitive digital experience.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['100% Legal & Title Clearances', 'Transparent Valuation & Fee Structure', 'Personalized Walkthrough Tours'].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#111418', fontWeight: 600 }}>
                  <CheckCircle size={16} color="#16A34A" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div 
          style={{
            background: '#111418',
            borderRadius: '16px',
            padding: '50px 36px',
            textAlign: 'center',
            color: '#FFFFFF'
          }}
        >
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#FFFFFF', margin: '0 0 12px', fontWeight: 500 }}>
            Ready to find your ideal property?
          </h2>
          <p style={{ color: '#9CA3AF', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto 28px' }}>
            Connect with our advisory desk or browse active listings today.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/properties" className="btn-secondary">
              Browse Properties
            </Link>
            <Link to="/contact" className="btn-primary" style={{ background: '#FFFFFF', color: '#111418', border: 'none' }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 840px) {
          .about-story-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .story-img-order {
            order: 2 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
