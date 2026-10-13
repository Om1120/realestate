// src/pages/user/UserProfile.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/slices/authSlice';
import { showToast } from '../../redux/slices/uiSlice';
import { User, Mail, Phone, MapPin, Save, Check } from 'lucide-react';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '+91 98200 77665');
  const [address, setAddress] = useState('Bungalow 7, Altamount Road, Mumbai, Maharashtra');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ name, email, phone, address }));
    dispatch(showToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your personal information has been saved.'
    }));
  };

  return (
    <div 
      style={{
        padding: '36px',
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)',
        maxWidth: '680px'
      }}
    >
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
          Personal Profile
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0 }}>
          Update your contact details and default correspondence address.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
          <img 
            src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80"} 
            alt="Profile Avatar"
            style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-color)' }}
          />
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>{user?.name || 'Om T'}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Verified Member</div>
          </div>
        </div>

        <div>
          <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px', display: 'block' }}>
            Full Name
          </label>
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-modern"
            required
          />
        </div>

        <div>
          <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px', display: 'block' }}>
            Email Address
          </label>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-modern"
            required
          />
        </div>

        <div>
          <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px', display: 'block' }}>
            Phone Number
          </label>
          <input 
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input-modern"
            required
          />
        </div>

        <div>
          <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px', display: 'block' }}>
            Residential Address
          </label>
          <textarea 
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="input-modern"
            style={{ resize: 'vertical' }}
          />
        </div>

        <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '6px' }}>
          <Save size={15} /> Save Changes
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
