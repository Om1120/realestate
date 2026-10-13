// src/pages/public/ContactPage.jsx
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { showToast } from '../../redux/slices/uiSlice';
import { contactSchema } from '../../schemas/validationSchemas';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2
} from 'lucide-react';

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    },
    validationSchema: contactSchema,
    onSubmit: async (values, { resetForm }) => {
      dispatch(showToast({
        type: 'success',
        title: 'Message Sent',
        message: 'Thank you. Our advisory team will contact you shortly.'
      }));
      setSubmitted(true);
      resetForm();
    }
  });

  const faqs = [
    {
      q: 'How does Aurelia verify property documentation and legal compliance?',
      a: 'Each property listed on our platform undergoes rigorous title verification, encumbrance checks, and RERA compliance audits before going live.'
    },
    {
      q: 'How does the online token reservation simulation work?',
      a: 'You can test our digital reservation journey by selecting any property, reviewing the required earnest deposit, simulating payment via card or UPI, and instantly generating an official receipt.'
    },
    {
      q: 'Can I schedule in-person walkthroughs for properties in multiple cities?',
      a: 'Yes. Simply use our "Schedule Visit" feature on any property page to select your preferred date and time, and our local advisor will confirm access.'
    },
    {
      q: 'How can I list my property with Aurelia Estates?',
      a: 'You can submit your property details directly through our portal or reach out to our listing desk at concierge@aureliaestates.com.'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#FBFBFA', paddingBottom: '90px' }}>
      {/* Header */}
      <section 
        style={{
          padding: '70px 24px 50px',
          background: 'linear-gradient(180deg, #F4F5F7 0%, #FBFBFA 100%)',
          textAlign: 'center',
          borderBottom: '1px solid #E5E7EB'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
            Get in Touch
          </div>
          <h1 
            style={{ 
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', 
              color: '#111418', 
              margin: '0 0 12px',
              fontWeight: 500
            }}
          >
            Let's find your next address.
          </h1>
          <p style={{ color: '#4B5563', fontSize: '1rem', maxWidth: '520px', margin: '0 auto' }}>
            Have a question or looking for a specific property? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Main Split Grid */}
      <section style={{ maxWidth: '1200px', margin: '48px auto', padding: '0 24px' }}>
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '48px',
            alignItems: 'start'
          }}
          className="contact-split-grid"
        >
          {/* Left Column: Office Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#111418', margin: '0 0 12px' }}>
                Contact our offices
              </h2>
              <p style={{ color: '#4B5563', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                Our advisors are available across major metropolitan hubs to assist with your property search and asset acquisitions.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  padding: '18px',
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB'
                }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111418', flexShrink: 0 }}>
                  <Mail size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase' }}>Email Us</div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#111418' }}>concierge@aureliaestates.com</div>
                  <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>Response time: within 2 hours</div>
                </div>
              </div>

              <div 
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  padding: '18px',
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB'
                }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111418', flexShrink: 0 }}>
                  <Phone size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase' }}>Call Direct</div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#111418' }}>+91 98250 11223</div>
                  <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>Mon - Sat: 9:00 AM - 7:00 PM</div>
                </div>
              </div>

              <div 
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  padding: '18px',
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB'
                }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111418', flexShrink: 0 }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase' }}>Headquarters</div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#111418' }}>Worli Sea Face, Mumbai</div>
                  <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>Branch: Sindhu Bhavan Road, Ahmedabad</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div 
            className="card-luxury"
            style={{
              padding: '36px',
              background: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)'
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111418', margin: '0 0 6px' }}>
              Send us a message
            </h3>
            <p style={{ color: '#6B7280', fontSize: '0.88rem', margin: '0 0 24px' }}>
              Fill in the form below and one of our specialists will get back to you promptly.
            </p>

            {submitted ? (
              <div 
                style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  background: '#F0FDF4',
                  border: '1px solid #DCFCE7',
                  borderRadius: '12px'
                }}
              >
                <CheckCircle2 size={40} color="#16A34A" style={{ marginBottom: '12px' }} />
                <h4 style={{ color: '#111418', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 8px' }}>
                  Thank You!
                </h4>
                <p style={{ color: '#4B5563', fontSize: '0.9rem', margin: '0 0 20px' }}>
                  Your inquiry has been received. We will be in touch shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '4px', display: 'block' }}>
                    Full Name *
                  </label>
                  <input 
                    type="text"
                    name="name"
                    placeholder="e.g. Siddharth Patel"
                    className="input-luxury"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <span style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: '3px', display: 'block' }}>
                      {formik.errors.name}
                    </span>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '4px', display: 'block' }}>
                      Email Address *
                    </label>
                    <input 
                      type="email"
                      name="email"
                      placeholder="you@domain.com"
                      className="input-luxury"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <span style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: '3px', display: 'block' }}>
                        {formik.errors.email}
                      </span>
                    )}
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '4px', display: 'block' }}>
                      Phone Number *
                    </label>
                    <input 
                      type="tel"
                      name="phone"
                      placeholder="+91 98000..."
                      className="input-luxury"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <span style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: '3px', display: 'block' }}>
                        {formik.errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '4px', display: 'block' }}>
                    Subject *
                  </label>
                  <input 
                    type="text"
                    name="subject"
                    placeholder="e.g. Inquiring about luxury villas in Ahmedabad"
                    className="input-luxury"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.subject && formik.errors.subject && (
                    <span style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: '3px', display: 'block' }}>
                      {formik.errors.subject}
                    </span>
                  )}
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '4px', display: 'block' }}>
                    Message *
                  </label>
                  <textarea 
                    name="message"
                    rows={4}
                    placeholder="Tell us what you are looking for..."
                    className="input-luxury"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.message && formik.errors.message && (
                    <span style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: '3px', display: 'block' }}>
                      {formik.errors.message}
                    </span>
                  )}
                </div>

                <button 
                  type="submit" 
                  className="btn-primary"
                  style={{ width: '100%', padding: '14px', fontSize: '0.92rem', marginTop: '6px' }}
                >
                  <Send size={16} /> Submit Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section style={{ maxWidth: '900px', margin: '60px auto 0', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#111418', margin: '0 0 8px', fontWeight: 500 }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: '#6B7280', fontSize: '0.92rem', margin: 0 }}>
            Common questions regarding our listings, viewing tours, and verification standards.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                overflow: 'hidden'
              }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                style={{
                  width: '100%',
                  padding: '18px 20px',
                  background: 'transparent',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#111418'
                }}
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <ChevronUp size={18} color="#6B7280" /> : <ChevronDown size={18} color="#6B7280" />}
              </button>

              {openFaq === idx && (
                <div style={{ padding: '0 20px 20px', color: '#4B5563', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 880px) {
          .contact-split-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
