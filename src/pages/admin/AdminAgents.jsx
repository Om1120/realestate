// src/pages/admin/AdminAgents.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addAgent, updateAgent, deleteAgent } from '../../redux/slices/agentSlice';
import { showToast } from '../../redux/slices/uiSlice';
import ConfirmationModal from '../../components/ConfirmationModal';
import { Plus, Search, Edit3, Trash2, Mail, Phone, MapPin, X } from 'lucide-react';

const INITIAL_AGENT_FORM = {
  name: '',
  role: 'Senior Property Consultant',
  email: '',
  phone: '',
  image: '/Images/Cus1.webp',
  experience: '10 Years',
  location: 'Mumbai',
  address: '',
  bio: 'Specialist in luxury residential properties, penthouses, and high-value acquisitions.',
  specialization: 'Luxury Residences & Penthouses',
  propertiesCount: 12,
  status: 'Active'
};

const AdminAgents = () => {
  const dispatch = useDispatch();
  const agents = useSelector((state) => state.agents.items);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(INITIAL_AGENT_FORM);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const filteredAgents = agents.filter((ag) => {
    const matchesSearch = 
      ag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ag.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ag.specialization?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'All' || ag.location?.includes(selectedCity);
    return matchesSearch && matchesCity;
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(INITIAL_AGENT_FORM);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (agent) => {
    setEditingId(agent.id);
    setFormData(agent);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      dispatch(showToast({ type: 'error', title: 'Validation Error', message: 'Name, email, and phone are mandatory.' }));
      return;
    }

    if (editingId) {
      dispatch(updateAgent(formData));
      dispatch(showToast({ type: 'success', title: 'Agent Updated', message: `Profile for ${formData.name} was updated.` }));
    } else {
      const newAgent = {
        ...formData,
        id: `agt-${Date.now()}`
      };
      dispatch(addAgent(newAgent));
      dispatch(showToast({ type: 'success', title: 'Agent Added', message: `${formData.name} added to agents directory.` }));
    }

    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      dispatch(deleteAgent(deleteTargetId));
      dispatch(showToast({ type: 'info', title: 'Agent Removed', message: 'Agent removed from team roster.' }));
      setDeleteTargetId(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
            Agents
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            Manage the team of licensed real estate consultants, brokers, and partners.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={16} /> Add Agent
        </button>
      </div>

      {/* Toolbar */}
      <div 
        style={{
          padding: '16px 20px',
          background: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', gap: '12px', flex: '1 1 300px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '360px' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text"
              placeholder="Search agents by name, email, specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-modern"
              style={{ width: '100%', paddingLeft: '38px', height: '40px', fontSize: '0.88rem' }}
            />
          </div>

          <select 
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="input-modern"
            style={{ height: '40px', fontSize: '0.88rem' }}
          >
            <option value="All">All Locations</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Surat">Surat</option>
            <option value="Vadodara">Vadodara</option>
            <option value="Pune">Pune</option>
            <option value="Delhi">Delhi</option>
            <option value="Bengaluru">Bengaluru</option>
          </select>
        </div>

        <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          Active Agents: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{agents.length}</span>
        </div>
      </div>

      {/* Agents Table */}
      <div 
        style={{
          background: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)',
          overflow: 'hidden'
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-warm)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Agent Name & Role</th>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Location & Specialization</th>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Contact Info</th>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Experience</th>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAgents.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: '48px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No agents found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredAgents.map((ag) => (
                  <tr 
                    key={ag.id}
                    style={{
                      borderBottom: '1px solid var(--border-color)',
                      transition: 'background 0.2s'
                    }}
                  >
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <img 
                          src={ag.image} 
                          alt={ag.name}
                          style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-color)' }}
                        />
                        <div>
                          <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{ag.name}</div>
                          <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>{ag.role}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ color: 'var(--text-primary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={13} color="var(--text-muted)" /> {ag.location}
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{ag.specialization}</div>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Mail size={13} color="var(--text-muted)" /> {ag.email}
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                        <Phone size={13} color="var(--text-muted)" /> {ag.phone}
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.85rem' }}>
                        {ag.experience}
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                        {ag.propertiesCount || 10} Properties
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <button 
                          onClick={() => handleOpenEdit(ag)}
                          style={{
                            padding: '6px 10px',
                            background: 'var(--bg-warm)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '6px',
                            color: 'var(--text-primary)',
                            cursor: 'pointer'
                          }}
                        >
                          <Edit3 size={14} />
                        </button>
                        <button 
                          onClick={() => setDeleteTargetId(ag.id)}
                          style={{
                            padding: '6px 10px',
                            background: 'var(--bg-warm)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '6px',
                            color: '#EF4444',
                            cursor: 'pointer'
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Agent Modal */}
      {isModalOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
        >
          <div 
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              width: '100%',
              maxWidth: '600px',
              padding: '24px',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: 'var(--shadow-xl)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                {editingId ? 'Edit Agent Profile' : 'Add New Agent'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Full Name *</label>
                <input 
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-modern"
                  placeholder="e.g., Rahul Shah"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Email Address *</label>
                  <input 
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-modern"
                    placeholder="agent@aurelia.com"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Phone Number *</label>
                  <input 
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input-modern"
                    placeholder="+91 98250 00000"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Role / Title</label>
                  <input 
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="input-modern"
                    placeholder="Senior Property Consultant"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Experience</label>
                  <input 
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="input-modern"
                    placeholder="10 Years"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>City / Region</label>
                  <input 
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="input-modern"
                    placeholder="Mumbai"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Specialization</label>
                  <input 
                    type="text"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    className="input-modern"
                    placeholder="Luxury Apartments & Penthouses"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Office / Desk Address</label>
                <input 
                  type="text"
                  value={formData.address || ''}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="input-modern"
                  placeholder="e.g., Level 18, One BKC, Bandra Kurla Complex, Mumbai"
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Photo (Select Preset or Enter URL)</label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                  {['/Images/Cus1.webp', '/Images/Cus2.webp', '/Images/Cus3.webp', '/Images/Cus4.webp', '/Images/Cus5.webp', '/Images/Cus6.webp', '/Images/Cus7.webp'].map((imgUrl, i) => (
                    <button
                      key={imgUrl}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: imgUrl })}
                      style={{
                        border: formData.image === imgUrl ? '2px solid #C5A880' : '1px solid #E5E7EB',
                        borderRadius: '8px',
                        padding: '2px',
                        background: '#FFFFFF',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        flexShrink: 0
                      }}
                      title={`Photo ${i + 1}`}
                    >
                      <img 
                        src={imgUrl} 
                        alt={`Preset ${i + 1}`} 
                        style={{ width: '38px', height: '38px', borderRadius: '6px', objectFit: 'cover', display: 'block' }}
                      />
                    </button>
                  ))}
                </div>
                <input 
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="input-modern"
                  placeholder="/Images/Cus1.webp"
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Biography</label>
                <textarea 
                  rows="3"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="input-modern"
                  placeholder="Professional background and expertise..."
                ></textarea>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingId ? 'Save Changes' : 'Add Agent'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={Boolean(deleteTargetId)}
        title="Remove Agent"
        message="Are you sure you want to remove this agent from the team directory?"
        confirmText="Confirm Removal"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};

export default AdminAgents;
