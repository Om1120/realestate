// src/pages/booking/ReceiptPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from '../../components/Logo';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { 
  Printer, 
  Download, 
  CheckCircle2, 
  ArrowLeft, 
  ShieldCheck, 
  LayoutDashboard
} from 'lucide-react';

const ReceiptPage = () => {
  const { transactionId } = useParams();
  const transactions = useSelector((state) => state.transactions.items);

  const txn = transactions.find((t) => t.id === transactionId) || transactions[0] || {
    id: transactionId || 'TXN-99881',
    receiptNumber: 'AUR-REC-2026-9988',
    propertyTitle: 'Modern Villa at Ambli',
    customerName: 'Siddharth Patel',
    customerEmail: 'user@example.com',
    amount: 118000,
    propertyPrice: 85000000,
    paymentMethod: 'Credit Card (Visa Signature)',
    date: new Date().toISOString(),
    status: 'Successful'
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FBFBFA', padding: '40px 24px 90px' }}>
      {/* Top Toolbar */}
      <div 
        className="no-print"
        style={{
          maxWidth: '800px',
          margin: '0 auto 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <Link 
          to="/dashboard/transactions"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: '#4B5563',
            textDecoration: 'none',
            fontSize: '0.88rem',
            fontWeight: 500
          }}
        >
          <ArrowLeft size={16} /> Back to My Transactions
        </Link>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handlePrint}
            className="btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <Printer size={15} /> Print Receipt
          </button>

          <Link
            to="/dashboard"
            className="btn-primary"
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <LayoutDashboard size={15} /> Go to Dashboard
          </Link>
        </div>
      </div>

      {/* Official Deed Receipt Stage */}
      <div 
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          background: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E5E7EB',
          padding: '48px',
          boxShadow: '0 4px 25px -4px rgba(0, 0, 0, 0.06)'
        }}
      >
        {/* Receipt Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #E5E7EB', paddingBottom: '28px', marginBottom: '28px' }}>
          <div>
            <div style={{ marginBottom: '8px' }}>
              <Logo size="sm" to={null} taglineText="OFFICIAL RECEIPT" />
            </div>
            <div style={{ color: '#6B7280', fontSize: '0.82rem' }}>
              Aurelia Estates India Private Limited
            </div>
            <div style={{ color: '#9CA3AF', fontSize: '0.78rem' }}>
              Worli Sea Face, Mumbai • GSTIN: 27AABCA1234F1Z8
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 10px',
                background: '#ECFDF5',
                color: '#059669',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 700,
                marginBottom: '8px'
              }}
            >
              <CheckCircle2 size={13} /> {txn.status?.toUpperCase() || 'SUCCESSFUL'}
            </span>
            <div style={{ fontSize: '0.82rem', color: '#6B7280' }}>Receipt #{txn.receiptNumber || txn.id}</div>
            <div style={{ fontSize: '0.82rem', color: '#6B7280' }}>Date: {formatDate(txn.date)}</div>
          </div>
        </div>

        {/* Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px', fontSize: '0.88rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase' }}>
              Purchaser / Reserved By:
            </span>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#111418', marginTop: '2px' }}>
              {txn.customerName}
            </div>
            <div style={{ color: '#6B7280', fontSize: '0.82rem' }}>{txn.customerEmail}</div>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase' }}>
              Payment Method:
            </span>
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#111418', marginTop: '2px' }}>
              {txn.paymentMethod}
            </div>
            <div style={{ color: '#6B7280', fontSize: '0.82rem' }}>Transaction Ref: {txn.id}</div>
          </div>
        </div>

        {/* Property Particulars Table */}
        <div style={{ border: '1px solid #E5E7EB', borderRadius: '10px', overflow: 'hidden', marginBottom: '28px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                <th style={{ padding: '12px 16px', color: '#4B5563', fontWeight: 600 }}>Description</th>
                <th style={{ padding: '12px 16px', color: '#4B5563', fontWeight: 600, textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ fontWeight: 600, color: '#111418' }}>{txn.propertyTitle}</div>
                  <div style={{ color: '#6B7280', fontSize: '0.78rem' }}>Token earnest deposit towards asset reservation</div>
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'right', fontWeight: 600, color: '#111418' }}>
                  {formatCurrency(Math.round(txn.amount / 1.18))}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', color: '#6B7280' }}>Integrated GST (18%)</td>
                <td style={{ padding: '12px 16px', textAlign: 'right', color: '#4B5563' }}>
                  {formatCurrency(txn.amount - Math.round(txn.amount / 1.18))}
                </td>
              </tr>
              <tr style={{ background: '#F9FAFB', borderTop: '2px solid #E5E7EB' }}>
                <td style={{ padding: '14px 16px', fontWeight: 700, color: '#111418' }}>Total Settlement Received:</td>
                <td style={{ padding: '14px 16px', textAlign: 'right', fontSize: '1.2rem', fontWeight: 800, color: '#111418' }}>
                  {formatCurrency(txn.amount)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Note */}
        <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: '#9CA3AF' }}>
          <div>
            Authorized electronically by Aurelia Estates Governance Protocol.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#059669', fontWeight: 600 }}>
            <ShieldCheck size={14} /> Digitally Verified Deed
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ReceiptPage;
