// src/components/InquiryForm.jsx
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addInquiry } from '../redux/slices/inquirySlice';
import { showToast } from '../redux/slices/uiSlice';
import { inquirySchema } from '../schemas/validationSchemas';
import { generateId } from '../utils/formatters';
import AnimatedSubmitButton from './AnimatedSubmitButton';
import { Send, CheckCircle2, MessageSquare } from 'lucide-react';

const InquiryForm = ({ propertyId, propertyTitle }) => {
  const [submitted, setSubmitted] = useState(false);
  const [btnStatus, setBtnStatus] = useState('idle'); // 'idle' | 'loading' | 'success'
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      message: ''
    },
    enableReinitialize: true,
    validationSchema: inquirySchema,
    onSubmit: async (values, { resetForm }) => {
      // 1. Buffering state
      setBtnStatus('loading');

      setTimeout(() => {
        // 2. End / Success state
        setBtnStatus('success');

        const newInquiry = {
          id: generateId('INQ'),
          propertyId: propertyId || 'GENERAL',
          propertyTitle: propertyTitle || 'General Property Inquiry',
          customerName: values.name,
          customerEmail: values.email,
          customerPhone: values.phone,
          message: values.message,
          date: new Date().toISOString(),
          status: 'New'
        };

        dispatch(addInquiry(newInquiry));
        dispatch(showToast({
          type: 'success',
          title: 'Inquiry Submitted',
          message: 'Thank you. Your inquiry has been received. Our property specialist will contact you shortly.'
        }));

        setTimeout(() => {
          setSubmitted(true);
          setBtnStatus('idle');
          resetForm();
        }, 600);
      }, 700);
    }
  });

  return (
    <div 
      style={{
        padding: '24px',
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderRadius: '12px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <MessageSquare size={18} color="#111418" />
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111418', margin: 0 }}>
          Send an Inquiry
        </h3>
      </div>

      {submitted ? (
        <div 
          className="animate-fade-in"
          style={{
            textAlign: 'center',
            padding: '30px 16px',
            background: '#F0FDF4',
            border: '1px solid #DCFCE7',
            borderRadius: '8px'
          }}
        >
          <CheckCircle2 size={36} color="#16A34A" style={{ marginBottom: '10px' }} className="pop-icon" />
          <h4 style={{ color: '#111418', margin: '0 0 6px', fontSize: '1rem', fontWeight: 700 }}>Inquiry Received</h4>
          <p style={{ color: '#4B5563', fontSize: '0.85rem', margin: '0 0 16px' }}>
            Our property advisor will get in touch with you shortly.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="btn-secondary"
            style={{ padding: '6px 14px', fontSize: '0.8rem' }}
          >
            Send Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Name */}
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px', display: 'block' }}>
              Full Name *
            </label>
            <input 
              type="text"
              name="name"
              placeholder="Your full name"
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

          {/* Email */}
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px', display: 'block' }}>
              Email Address *
            </label>
            <input 
              type="email"
              name="email"
              placeholder="you@example.com"
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

          {/* Phone */}
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px', display: 'block' }}>
              Phone Number *
            </label>
            <input 
              type="tel"
              name="phone"
              placeholder="+91 98000 00000"
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

          {/* Message */}
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px', display: 'block' }}>
              Message & Inquiries *
            </label>
            <textarea 
              name="message"
              rows={3}
              placeholder="I am interested in this property. Please send details..."
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

          <AnimatedSubmitButton 
            type="submit"
            status={btnStatus}
            idleText="Send Inquiry"
            loadingText="Sending Inquiry"
            successText="Inquiry Sent!"
            icon={<Send size={15} />}
            style={{ width: '100%', marginTop: '4px' }}
          />
        </form>
      )}
    </div>
  );
};

export default InquiryForm;
