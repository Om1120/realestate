// src/components/AppointmentForm.jsx
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addAppointment } from '../redux/slices/appointmentSlice';
import { showToast } from '../redux/slices/uiSlice';
import { appointmentSchema } from '../schemas/validationSchemas';
import { generateId } from '../utils/formatters';
import AnimatedSubmitButton from './AnimatedSubmitButton';
import { Calendar, CheckCircle2 } from 'lucide-react';

const AppointmentForm = ({ propertyId, propertyTitle, agentName = 'Property Advisor' }) => {
  const [scheduled, setScheduled] = useState(false);
  const [btnStatus, setBtnStatus] = useState('idle'); // 'idle' | 'loading' | 'success'
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      date: '',
      time: '11:00 AM',
      message: ''
    },
    enableReinitialize: true,
    validationSchema: appointmentSchema,
    onSubmit: async (values, { resetForm }) => {
      // 1. Buffering / Loading
      setBtnStatus('loading');

      setTimeout(() => {
        // 2. End / Success
        setBtnStatus('success');

        const newAppointment = {
          id: generateId('APT'),
          propertyId: propertyId || 'GENERAL',
          propertyTitle: propertyTitle || 'Exclusive Viewing Tour',
          customerName: values.name,
          customerEmail: values.email,
          customerPhone: values.phone,
          agentName: agentName,
          date: values.date,
          time: values.time,
          status: 'Pending',
          message: values.message
        };

        dispatch(addAppointment(newAppointment));
        dispatch(showToast({
          type: 'success',
          title: 'Viewing Tour Requested',
          message: `Your visit request for ${values.date} at ${values.time} has been submitted.`
        }));

        setTimeout(() => {
          setScheduled(true);
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
        <Calendar size={18} color="#111418" />
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111418', margin: 0 }}>
          Schedule a Private Visit
        </h3>
      </div>

      {scheduled ? (
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
          <h4 style={{ color: '#111418', margin: '0 0 6px', fontSize: '1rem', fontWeight: 700 }}>Tour Requested</h4>
          <p style={{ color: '#4B5563', fontSize: '0.85rem', margin: '0 0 16px' }}>
            Our team will contact you to confirm the schedule and arrival details.
          </p>
          <button
            onClick={() => setScheduled(false)}
            className="btn-secondary"
            style={{ padding: '6px 14px', fontSize: '0.8rem' }}
          >
            Schedule Another Visit
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

          {/* Email & Phone Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px', display: 'block' }}>
                Email *
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
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px', display: 'block' }}>
                Phone *
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

          {/* Date & Time Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px', display: 'block' }}>
                Preferred Date *
              </label>
              <input 
                type="date"
                name="date"
                min={new Date().toISOString().split('T')[0]}
                className="input-luxury"
                value={formik.values.date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.date && formik.errors.date && (
                <span style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: '3px', display: 'block' }}>
                  {formik.errors.date}
                </span>
              )}
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px', display: 'block' }}>
                Preferred Time *
              </label>
              <select
                name="time"
                className="input-luxury"
                value={formik.values.time}
                onChange={formik.handleChange}
              >
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="04:30 PM">04:30 PM</option>
                <option value="06:00 PM">06:00 PM</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px', display: 'block' }}>
              Special Requests (Optional)
            </label>
            <input 
              type="text"
              name="message"
              placeholder="e.g. Bringing family members, weekend slot"
              className="input-luxury"
              value={formik.values.message}
              onChange={formik.handleChange}
            />
          </div>

          <AnimatedSubmitButton 
            type="submit"
            status={btnStatus}
            idleText="Request Viewing Tour"
            loadingText="Booking Tour"
            successText="Tour Requested!"
            icon={<Calendar size={15} />}
            style={{ width: '100%', marginTop: '4px' }}
          />
        </form>
      )}
    </div>
  );
};

export default AppointmentForm;
