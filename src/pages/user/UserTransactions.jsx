// src/pages/user/UserTransactions.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { FileText, ArrowRight } from 'lucide-react';

const UserTransactions = () => {
  const { user } = useSelector((state) => state.auth);
  const transactions = useSelector((state) => state.transactions.items);

  const userTransactions = transactions.filter(
    (t) => t.customerEmail === user?.email || t.customerName === user?.name
  );
  const displayTransactions = userTransactions.length > 0 ? userTransactions : transactions;

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
          Transactions & Receipts ({displayTransactions.length})
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0 }}>
          View and download reservation confirmations and booking receipts.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {displayTransactions.map((txn) => (
          <div 
            key={txn.id}
            style={{
              padding: '24px',
              background: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  ID: {txn.id}
                </span>
                <span className="badge-modern badge-available" style={{ fontSize: '0.7rem' }}>
                  {txn.status}
                </span>
              </div>

              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: '0 0 6px', fontWeight: 600 }}>
                {txn.propertyTitle}
              </h3>

              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Paid via {txn.paymentMethod} • Settled on {formatDate(txn.date)}
              </div>
            </div>

            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 500 }}>Amount Paid</div>
                <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                  {formatCurrency(txn.amount)}
                </div>
              </div>

              <Link
                to={`/receipt/${txn.id}`}
                className="btn-secondary"
                style={{ padding: '8px 14px', fontSize: '0.8rem' }}
              >
                <FileText size={14} /> View Receipt
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTransactions;
