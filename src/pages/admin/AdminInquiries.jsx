// src/pages/admin/AdminInquiries.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateInquiryStatus, deleteInquiry } from '../../redux/slices/inquirySlice';
import { showToast } from '../../redux/slices/uiSlice';
import ConfirmationModal from '../../components/ConfirmationModal';
import { formatDate } from '../../utils/formatters';
import { Search, Trash2, Clock, X, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const STATUS_OPTIONS = ['New', 'Contacted', 'In Progress', 'Resolved', 'Closed'];

const AdminInquiries = () => {
  const dispatch = useDispatch();
  const inquiries = useSelector((state) => state.inquiries.items);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.propertyTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.message?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || inq.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateInquiryStatus({ id, status: newStatus }));
    dispatch(showToast({ type: 'success', title: 'Status Updated', message: `Inquiry marked as ${newStatus}.` }));
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      dispatch(deleteInquiry(deleteTargetId));
      dispatch(showToast({ type: 'info', title: 'Inquiry Deleted', message: 'Inquiry removed from list.' }));
      setDeleteTargetId(null);
      if (selectedInquiry?.id === deleteTargetId) {
        setSelectedInquiry(null);
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
            Inquiries
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            Manage client property inquiries and requests.
          </p>
        </div>
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
              placeholder="Search by client, property, message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-modern"
              style={{ width: '100%', paddingLeft: '38px', height: '40px', fontSize: '0.88rem' }}
            />
          </div>

          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="input-modern"
            style={{ height: '40px', fontSize: '0.88rem' }}
          >
            <option value="All">All Inquiries</option>
            {STATUS_OPTIONS.map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>

        <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          Total Inquiries: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{inquiries.length}</span>
        </div>
      </div>

      {/* Inquiries Table */}
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
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Inquiry ID & Date</th>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Client Contact</th>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Property</th>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: '48px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No inquiries found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => (
                  <tr 
                    key={inq.id}
                    style={{
                      borderBottom: '1px solid var(--border-color)',
                      transition: 'background 0.2s'
                    }}
                  >
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.85rem' }}>{inq.id}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={11} /> {formatDate(inq.date)}
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{inq.customerName}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{inq.customerEmail} • {inq.customerPhone}</div>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ color: 'var(--text-primary)', fontSize: '0.88rem' }}>{inq.propertyTitle}</div>
                      {inq.propertyId !== 'GENERAL' && (
                        <Link 
                          to={`/property/${inq.propertyId}`} 
                          target="_blank"
                          style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', textDecoration: 'none', fontWeight: 500 }}
                        >
                          View property →
                        </Link>
                      )}
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <select 
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                        className="input-modern"
                        style={{
                          padding: '4px 8px',
                          fontSize: '0.8rem',
                          height: '32px'
                        }}
                      >
                        {STATUS_OPTIONS.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </td>
                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <button 
                          onClick={() => setSelectedInquiry(inq)}
                          title="View Message"
                          style={{
                            padding: '6px 10px',
                            background: 'var(--bg-warm)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '6px',
                            color: 'var(--text-primary)',
                            cursor: 'pointer'
                          }}
                        >
                          <Eye size={14} />
                        </button>
                        <button 
                          onClick={() => setDeleteTargetId(inq.id)}
                          title="Delete Inquiry"
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

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
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
              maxWidth: '560px',
              padding: '28px',
              boxShadow: 'var(--shadow-xl)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 600 }}>{selectedInquiry.id}</span>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', margin: '2px 0 0' }}>
                  Inquiry from {selectedInquiry.customerName}
                </h2>
              </div>
              <button onClick={() => setSelectedInquiry(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.88rem' }}>
              <div style={{ padding: '14px', background: 'var(--bg-warm)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '2px' }}>Property Inquired:</div>
                <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{selectedInquiry.propertyTitle}</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ padding: '12px', background: 'var(--bg-warm)', borderRadius: '8px' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Email</div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '0.85rem' }}>{selectedInquiry.customerEmail}</div>
                </div>
                <div style={{ padding: '12px', background: 'var(--bg-warm)', borderRadius: '8px' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Phone</div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '0.85rem' }}>{selectedInquiry.customerPhone}</div>
                </div>
              </div>

              <div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>Message:</div>
                <div 
                  style={{
                    padding: '16px',
                    background: 'var(--bg-warm)',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    lineHeight: '1.6'
                  }}
                >
                  "{selectedInquiry.message}"
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>Status:</span>
                  <select 
                    value={selectedInquiry.status}
                    onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value)}
                    className="input-modern"
                    style={{ height: '34px', fontSize: '0.82rem' }}
                  >
                    {STATUS_OPTIONS.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <button onClick={() => setSelectedInquiry(null)} className="btn-secondary" style={{ fontSize: '0.82rem' }}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Inquiry Record"
        message="Are you sure you wish to delete this customer inquiry?"
        confirmText="Confirm Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};

export default AdminInquiries;
