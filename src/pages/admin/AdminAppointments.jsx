// src/pages/admin/AdminAppointments.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateAppointmentStatus, deleteAppointment } from '../../redux/slices/appointmentSlice';
import { showToast } from '../../redux/slices/uiSlice';
import ConfirmationModal from '../../components/ConfirmationModal';
import { Calendar, Search, Trash2, Eye, X } from 'lucide-react';

const STATUS_LIST = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];

const AdminAppointments = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments.items);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.propertyTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.agentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || apt.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateAppointmentStatus({ id, status: newStatus }));
    dispatch(showToast({ type: 'success', title: 'Schedule Updated', message: `Appointment marked as ${newStatus}.` }));
    if (selectedAppointment && selectedAppointment.id === id) {
      setSelectedAppointment((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      dispatch(deleteAppointment(deleteTargetId));
      dispatch(showToast({ type: 'info', title: 'Appointment Cancelled', message: 'Viewing appointment removed from schedule.' }));
      setDeleteTargetId(null);
      if (selectedAppointment?.id === deleteTargetId) {
        setSelectedAppointment(null);
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
            Appointments
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            Manage scheduled property viewing tours and client walkthroughs.
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
              placeholder="Search by client, property, agent..."
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
            <option value="All">All Schedules</option>
            {STATUS_LIST.map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>

        <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          Total Appointments: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{appointments.length}</span>
        </div>
      </div>

      {/* Appointments Table */}
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
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Schedule ID & Date</th>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Client</th>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Property</th>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Assigned Agent</th>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '48px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No viewing appointments found.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((apt) => (
                  <tr 
                    key={apt.id}
                    style={{
                      borderBottom: '1px solid var(--border-color)',
                      transition: 'background 0.2s'
                    }}
                  >
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.85rem' }}>{apt.id}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={12} color="var(--text-muted)" /> {apt.date} • {apt.time}
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{apt.customerName}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{apt.customerPhone || apt.customerEmail}</div>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ color: 'var(--text-primary)', fontSize: '0.88rem' }}>{apt.propertyTitle}</div>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ color: 'var(--text-primary)', fontSize: '0.85rem' }}>{apt.agentName || 'Assigned Consultant'}</div>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <select 
                        value={apt.status}
                        onChange={(e) => handleStatusChange(apt.id, e.target.value)}
                        className="input-modern"
                        style={{
                          padding: '4px 8px',
                          fontSize: '0.8rem',
                          height: '32px'
                        }}
                      >
                        {STATUS_LIST.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </td>
                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <button 
                          onClick={() => setSelectedAppointment(apt)}
                          title="View Details"
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
                          onClick={() => setDeleteTargetId(apt.id)}
                          title="Cancel Tour"
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

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
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
                <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 600 }}>{selectedAppointment.id}</span>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', margin: '2px 0 0' }}>
                  Tour Appointment Details
                </h2>
              </div>
              <button onClick={() => setSelectedAppointment(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.88rem' }}>
              <div style={{ padding: '14px', background: 'var(--bg-warm)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '2px' }}>Property:</div>
                <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{selectedAppointment.propertyTitle}</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ padding: '12px', background: 'var(--bg-warm)', borderRadius: '8px' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Client</div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>{selectedAppointment.customerName}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{selectedAppointment.customerPhone}</div>
                </div>
                <div style={{ padding: '12px', background: 'var(--bg-warm)', borderRadius: '8px' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Assigned Agent</div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>{selectedAppointment.agentName || 'Alexander Sterling'}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ padding: '12px', background: 'var(--bg-warm)', borderRadius: '8px' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Date</div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>{selectedAppointment.date}</div>
                </div>
                <div style={{ padding: '12px', background: 'var(--bg-warm)', borderRadius: '8px' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Time</div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>{selectedAppointment.time}</div>
                </div>
              </div>

              {selectedAppointment.message && (
                <div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>Client Notes:</div>
                  <div 
                    style={{
                      padding: '14px',
                      background: 'var(--bg-warm)',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      lineHeight: '1.5'
                    }}
                  >
                    "{selectedAppointment.message}"
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>Status:</span>
                  <select 
                    value={selectedAppointment.status}
                    onChange={(e) => handleStatusChange(selectedAppointment.id, e.target.value)}
                    className="input-modern"
                    style={{ height: '34px', fontSize: '0.82rem' }}
                  >
                    {STATUS_LIST.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <button onClick={() => setSelectedAppointment(null)} className="btn-secondary" style={{ fontSize: '0.82rem' }}>
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
        title="Cancel Appointment"
        message="Are you sure you want to remove this appointment from the schedule?"
        confirmText="Confirm Removal"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};

export default AdminAppointments;
