// src/pages/admin/AdminSettings.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showToast } from '../../redux/slices/uiSlice';
import { resetAllStorage } from '../../utils/storage';
import ConfirmationModal from '../../components/ConfirmationModal';
import { Globe, ShieldCheck, Database, RefreshCw, Save } from 'lucide-react';

const AdminSettings = () => {
  const dispatch = useDispatch();

  const [brandSettings, setBrandSettings] = useState({
    platformName: 'Aurelia Real Estate',
    tagline: 'Exceptional properties. Better living.',
    currencySymbol: 'INR (₹)',
    contactEmail: 'contact@aureliaestates.com',
    contactPhone: '+91 98250 11223',
    headquarters: 'Worli, Mumbai & SG Highway, Ahmedabad',
    simulationMode: true,
    autoApproveAppointments: false
  });

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(showToast({ type: 'success', title: 'Settings Saved', message: 'Platform preferences have been updated.' }));
  };

  const handleResetFactory = () => {
    resetAllStorage();
    dispatch(showToast({ type: 'info', title: 'Data Reset', message: 'Demo database restored to default state. Reloading...' }));
    setIsResetModalOpen(false);
    setTimeout(() => {
      window.location.href = '/admin';
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '900px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
          Settings
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
          Manage global branding metadata, payment simulation switches, and demo state controls.
        </p>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Brand & Global Metadata Card */}
        <div 
          style={{
            padding: '28px',
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px' }}>
            <Globe size={18} color="var(--text-primary)" />
            <h2 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
              General Information
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Platform Name</label>
              <input 
                type="text"
                value={brandSettings.platformName}
                onChange={(e) => setBrandSettings({ ...brandSettings, platformName: e.target.value })}
                className="input-modern"
              />
            </div>
            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Currency Display</label>
              <select 
                value={brandSettings.currencySymbol}
                onChange={(e) => setBrandSettings({ ...brandSettings, currencySymbol: e.target.value })}
                className="input-modern"
              >
                <option value="INR (₹)">Indian Rupee (₹ INR - Cr & L)</option>
                <option value="USD ($)">US Dollar ($ USD - M & K)</option>
                <option value="EUR (€)">Euro (€ EUR)</option>
                <option value="GBP (£)">British Pound (£ GBP)</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Brand Tagline</label>
            <input 
              type="text"
              value={brandSettings.tagline}
              onChange={(e) => setBrandSettings({ ...brandSettings, tagline: e.target.value })}
              className="input-modern"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Contact Email</label>
              <input 
                type="email"
                value={brandSettings.contactEmail}
                onChange={(e) => setBrandSettings({ ...brandSettings, contactEmail: e.target.value })}
                className="input-modern"
              />
            </div>
            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Contact Phone</label>
              <input 
                type="text"
                value={brandSettings.contactPhone}
                onChange={(e) => setBrandSettings({ ...brandSettings, contactPhone: e.target.value })}
                className="input-modern"
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Headquarters Location</label>
            <input 
              type="text"
              value={brandSettings.headquarters}
              onChange={(e) => setBrandSettings({ ...brandSettings, headquarters: e.target.value })}
              className="input-modern"
            />
          </div>
        </div>

        {/* Operational Security & Simulation Engine */}
        <div 
          style={{
            padding: '28px',
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px' }}>
            <ShieldCheck size={18} color="var(--text-primary)" />
            <h2 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
              Simulation & Workflow Rules
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input 
                type="checkbox"
                checked={brandSettings.simulationMode}
                onChange={(e) => setBrandSettings({ ...brandSettings, simulationMode: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: '#111418' }}
              />
              <div>
                <div style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600 }}>Enable Payment Gateway Simulation</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Allows clients to complete simulated card / UPI property bookings with simulated tokens.</div>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input 
                type="checkbox"
                checked={brandSettings.autoApproveAppointments}
                onChange={(e) => setBrandSettings({ ...brandSettings, autoApproveAppointments: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: '#111418' }}
              />
              <div>
                <div style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600 }}>Auto-Confirm Viewing Tours</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Immediately confirm tour slots for logged-in members without administrative review.</div>
              </div>
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '6px' }}>
            <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Save size={16} /> Save Settings
            </button>
          </div>
        </div>

        {/* Database Reset Zone */}
        <div 
          style={{
            padding: '24px',
            background: '#FEF2F2',
            borderRadius: '12px',
            border: '1px solid #FCA5A5',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#B91C1C', fontWeight: 600, marginBottom: '4px' }}>
              <Database size={18} /> Reset Demo Data
            </div>
            <p style={{ color: '#7F1D1D', fontSize: '0.85rem', margin: 0, maxWidth: '600px' }}>
              Clears all locally stored modifications and restores the original sample property portfolio.
            </p>
          </div>

          <button 
            type="button" 
            onClick={() => setIsResetModalOpen(true)}
            style={{
              padding: '10px 18px',
              background: '#DC2626',
              border: 'none',
              color: '#FFFFFF',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <RefreshCw size={15} /> Reset Data
          </button>
        </div>
      </form>

      {/* Reset Confirmation Modal */}
      <ConfirmationModal
        isOpen={isResetModalOpen}
        title="Reset Entire Demo Database"
        message="This will reset all your created properties, appointments, inquiries, and transactions back to the initial sample state. Are you sure?"
        confirmText="Confirm Reset"
        onConfirm={handleResetFactory}
        onCancel={() => setIsResetModalOpen(false)}
      />
    </div>
  );
};

export default AdminSettings;
