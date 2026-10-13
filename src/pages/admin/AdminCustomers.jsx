// src/pages/admin/AdminCustomers.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCustomer, updateCustomer, deleteCustomer } from '../../redux/slices/customerSlice';
import { showToast } from '../../redux/slices/uiSlice';
import ConfirmationModal from '../../components/ConfirmationModal';
import { Plus, Search, Edit3, Trash2, Mail, Phone, MapPin, Calendar, X } from 'lucide-react';

const INITIAL_CUSTOMER_FORM = {
  name: '',
  email: '',
  phone: '',
  address: '',
  registrationDate: new Date().toISOString().split('T')[0],
  status: 'Active',
  avatar: '/Images/Cus4.webp'
};

const AdminCustomers = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers.items);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(INITIAL_CUSTOMER_FORM);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(INITIAL_CUSTOMER_FORM);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (customer) => {
    setEditingId(customer.id);
    setFormData(customer);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      dispatch(showToast({ type: 'error', title: 'Validation Error', message: 'Name and email are required.' }));
      return;
    }

    if (editingId) {
      dispatch(updateCustomer(formData));
      dispatch(showToast({ type: 'success', title: 'Customer Updated', message: `Details for ${formData.name} were updated.` }));
    } else {
      const newCustomer = {
        ...formData,
        id: `cust-${Date.now()}`
      };
      dispatch(addCustomer(newCustomer));
      dispatch(showToast({ type: 'success', title: 'Customer Registered', message: `${formData.name} added to directory.` }));
    }

    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      dispatch(deleteCustomer(deleteTargetId));
      dispatch(showToast({ type: 'info', title: 'Customer Removed', message: 'Customer record removed successfully.' }));
      setDeleteTargetId(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
            Customers
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            Manage verified client accounts, prospective buyers, and investors.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={16} /> Add Customer
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
          alignItems: 'center'
        }}
      >
        <div style={{ position: 'relative', width: '360px' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text"
            placeholder="Search customers by name, email, location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-modern"
            style={{ width: '100%', paddingLeft: '38px', height: '40px', fontSize: '0.88rem' }}
          />
        </div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          Total Customers: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{customers.length}</span>
        </div>
      </div>

      {/* Customers Table */}
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
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Customer</th>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Contact Info</th>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Address</th>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: '48px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No customer records found matching search.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => (
                  <tr 
                    key={cust.id}
                    style={{
                      borderBottom: '1px solid var(--border-color)',
                      transition: 'background 0.2s'
                    }}
                  >
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <img 
                          src={cust.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"} 
                          alt={cust.name}
                          style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-color)' }}
                        />
                        <div>
                          <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{cust.name}</div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Joined {cust.registrationDate}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Mail size={13} color="var(--text-muted)" /> {cust.email}
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                        <Phone size={13} color="var(--text-muted)" /> {cust.phone}
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={13} color="var(--text-muted)" /> {cust.address || 'Not specified'}
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <span 
                        className={`badge-modern ${cust.status === 'Active' ? 'badge-available' : 'badge-sold'}`}
                      >
                        {cust.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <button 
                          onClick={() => handleOpenEdit(cust)}
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
                          onClick={() => setDeleteTargetId(cust.id)}
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

      {/* Add / Edit Customer Modal */}
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
              maxWidth: '540px',
              padding: '24px',
              boxShadow: 'var(--shadow-xl)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                {editingId ? 'Edit Customer' : 'Add New Customer'}
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
                  placeholder="e.g., Siddhartha Singhania"
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
                    placeholder="client@domain.com"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Phone Number</label>
                  <input 
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input-modern"
                    placeholder="+91 98000 00000"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Address</label>
                <input 
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="input-modern"
                  placeholder="e.g., Altamount Road, Mumbai"
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Status</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="input-modern"
                >
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingId ? 'Save Changes' : 'Add Customer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={Boolean(deleteTargetId)}
        title="Remove Customer"
        message="Are you sure you want to delete this customer record?"
        confirmText="Confirm Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};

export default AdminCustomers;
