// src/pages/admin/AdminTransactions.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTransactionStatus } from '../../redux/slices/transactionSlice';
import { showToast } from '../../redux/slices/uiSlice';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Search, Clock, Eye, Printer, X, CheckCircle } from 'lucide-react';

const STATUS_LIST = ['Successful', 'Pending', 'Failed', 'Refunded'];

const AdminTransactions = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.items);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedTxn, setSelectedTxn] = useState(null);

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.propertyTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.paymentMethod?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || txn.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateTransactionStatus({ id, status: newStatus }));
    dispatch(showToast({ type: 'success', title: 'Status Updated', message: `Transaction marked as ${newStatus}.` }));
    if (selectedTxn && selectedTxn.id === id) {
      setSelectedTxn((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const totalVolume = transactions.reduce((acc, t) => acc + (Number(t.amount) || 0), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
            Transactions
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            Simulated transaction ledger, booking deposits, and digital receipt generation.
          </p>
        </div>

        <div style={{ padding: '10px 18px', background: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Total Simulated Volume: </span>
          <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {formatCurrency(totalVolume)}
          </span>
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
              placeholder="Search by ID, client, property, method..."
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
            <option value="All">All Transactions</option>
            {STATUS_LIST.map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>

        <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          Total Records: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{transactions.length}</span>
        </div>
      </div>

      {/* Transactions Table */}
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
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Transaction ID & Date</th>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Customer</th>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Property</th>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Deposit Paid</th>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '48px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No transactions found.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((txn) => (
                  <tr 
                    key={txn.id}
                    style={{
                      borderBottom: '1px solid var(--border-color)',
                      transition: 'background 0.2s'
                    }}
                  >
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.85rem' }}>{txn.id}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={11} /> {formatDate(txn.date)}
                      </div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '2px' }}>{txn.paymentMethod}</div>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{txn.customerName}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{txn.customerEmail}</div>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ color: 'var(--text-primary)', fontSize: '0.88rem' }}>{txn.propertyTitle}</div>
                      {txn.propertyPrice && (
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                          Price: {formatCurrency(txn.propertyPrice)}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                        {formatCurrency(txn.amount)}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <select 
                        value={txn.status}
                        onChange={(e) => handleStatusChange(txn.id, e.target.value)}
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
                      <button 
                        onClick={() => setSelectedTxn(txn)}
                        title="View Receipt"
                        style={{
                          padding: '6px 12px',
                          background: 'var(--bg-warm)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '6px',
                          color: 'var(--text-primary)',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 500
                        }}
                      >
                        <Eye size={14} /> Receipt
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Receipt Modal */}
      {selectedTxn && (
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
              maxWidth: '620px',
              padding: '32px',
              boxShadow: 'var(--shadow-xl)',
              position: 'relative'
            }}
          >
            <button 
              onClick={() => setSelectedTxn(null)}
              style={{ position: 'absolute', right: '20px', top: '20px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            {/* Receipt Brand */}
            <div style={{ textAlign: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px', marginBottom: '24px' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '0.04em', color: 'var(--text-primary)', marginBottom: '4px' }}>
                AURELIA
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Booking Reservation Receipt
              </div>
            </div>

            {/* Receipt Summary Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px', fontSize: '0.88rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block', marginBottom: '2px' }}>Transaction ID</span>
                <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{selectedTxn.id}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block', marginBottom: '2px' }}>Date</span>
                <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{formatDate(selectedTxn.date)}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block', marginBottom: '2px' }}>Customer</span>
                <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{selectedTxn.customerName}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{selectedTxn.customerEmail}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block', marginBottom: '2px' }}>Payment Method</span>
                <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{selectedTxn.paymentMethod}</div>
              </div>
            </div>

            {/* Property Details */}
            <div style={{ padding: '16px', background: 'var(--bg-warm)', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Property Reserved</span>
              <div style={{ color: 'var(--text-primary)', fontSize: '1.05rem', fontWeight: 600, margin: '2px 0 6px' }}>{selectedTxn.propertyTitle}</div>
              {selectedTxn.propertyPrice && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  <span>Property Price:</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{formatCurrency(selectedTxn.propertyPrice)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '6px', paddingTop: '6px', borderTop: '1px solid var(--border-color)' }}>
                <span>Booking Deposit Paid:</span>
                <span style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                  {formatCurrency(selectedTxn.amount)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#10B981', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
                <CheckCircle size={15} /> Payment Confirmed
              </span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => window.print()}
                  className="btn-secondary"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem' }}
                >
                  <Printer size={14} /> Print Receipt
                </button>
                <button 
                  onClick={() => setSelectedTxn(null)}
                  className="btn-primary"
                  style={{ fontSize: '0.82rem' }}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTransactions;
