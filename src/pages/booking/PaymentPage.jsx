// src/pages/booking/PaymentPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import confetti from 'canvas-confetti';
import { addTransaction } from '../../redux/slices/transactionSlice';
import { showToast } from '../../redux/slices/uiSlice';
import { formatCurrency, generateId } from '../../utils/formatters';
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  Banknote,
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft,
  Loader2,
  ArrowRight
} from 'lucide-react';

const PaymentPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [bookingData, setBookingData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'upi' | 'netbanking' | 'cash_token'
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedTxnId, setGeneratedTxnId] = useState('');

  // Card details state
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  // UPI state
  const [upiId, setUpiId] = useState('');

  // Net banking state
  const [selectedBank, setSelectedBank] = useState('');

  // Cash by Token state
  const [depositorName, setDepositorName] = useState('');
  const [cashDeskBranch, setCashDeskBranch] = useState('');
  const [cashVoucherRef, setCashVoucherRef] = useState('');

  const properties = useSelector((state) => state.properties.items);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const raw = sessionStorage.getItem(`booking_${bookingId}`);
    if (raw) {
      setBookingData(JSON.parse(raw));
    } else {
      const prop = properties.find((p) => p.id === bookingId);
      if (prop) {
        const token = prop.bookingAmount || 100000;
        const gst = Math.round(token * 0.18);
        setBookingData({
          propertyId: prop.id,
          propertyTitle: prop.title,
          propertyLocation: prop.location,
          propertyPrice: prop.price,
          propertyImage: prop.image,
          buyerName: user?.name || 'Purchaser',
          buyerEmail: user?.email || '',
          buyerPhone: user?.phone || '',
          tokenAmount: token,
          gstAmount: gst,
          totalPayable: token + gst
        });
      }
    }
  }, [bookingId, properties, user]);

  const handleSimulatePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const newTxnId = generateId('TXN');
      setGeneratedTxnId(newTxnId);
      setIsSuccess(true);

      const transactionRecord = {
        id: newTxnId,
        propertyId: bookingData?.propertyId || bookingId,
        propertyTitle: bookingData?.propertyTitle || 'Luxury Property',
        customerName: depositorName || cardHolder || bookingData?.buyerName || 'Purchaser',
        customerEmail: bookingData?.buyerEmail || 'user@example.com',
        amount: bookingData?.totalPayable || 118000,
        propertyPrice: bookingData?.propertyPrice || 85000000,
        paymentMethod: paymentMethod === 'card' 
          ? `Credit Card (${cardNumber ? '•••• ' + cardNumber.replace(/\s+/g, '').slice(-4) : 'Visa'})` 
          : paymentMethod === 'upi' 
          ? `UPI (${upiId || 'Direct'})` 
          : paymentMethod === 'netbanking'
          ? `Net Banking (${selectedBank || 'Online'})`
          : `Cash by Token (${cashDeskBranch || 'Sales Desk Counter'})`,
        date: new Date().toISOString(),
        status: 'Successful',
        receiptNumber: `AUR-REC-${newTxnId.replace('TXN-', '')}`
      };

      dispatch(addTransaction(transactionRecord));
      dispatch(showToast({
        type: 'success',
        title: 'Payment Confirmed',
        message: `Token deposit of ${formatCurrency(transactionRecord.amount)} authorized successfully.`
      }));

      // Confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Safe fallback
      }
    }, 1500);
  };

  if (!bookingData) {
    return (
      <div style={{ minHeight: '60vh', textAlign: 'center', padding: '60px 24px', background: '#FBFBFA' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111418' }}>Loading Payment Session...</h2>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FBFBFA', paddingBottom: '90px' }}>
      {/* Top Header */}
      <div 
        style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #E5E7EB',
          padding: '16px 24px'
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'transparent',
              border: 'none',
              color: '#4B5563',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 500
            }}
          >
            <ArrowLeft size={16} /> Return to checkout
          </button>

          <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={16} /> Safe Sandbox Simulation
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '36px auto 0', padding: '0 24px' }}>
        {isSuccess ? (
          /* SUCCESS STAGE */
          <div 
            className="card-luxury animate-fade-in"
            style={{
              padding: '60px 30px',
              textAlign: 'center',
              background: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 20px -2px rgba(0,0,0,0.06)'
            }}
          >
            <div 
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#ECFDF5',
                color: '#059669',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}
            >
              <CheckCircle2 size={36} />
            </div>

            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#111418', margin: '0 0 8px', fontWeight: 600 }}>
              Payment Successful
            </h2>
            <div style={{ color: '#111418', fontSize: '1.2rem', fontWeight: 800, marginBottom: '12px' }}>
              Amount Paid: {formatCurrency(bookingData.totalPayable)}
            </div>
            <p style={{ color: '#6B7280', maxWidth: '440px', margin: '0 auto 28px', fontSize: '0.9rem' }}>
              Transaction ID: <strong style={{ color: '#111418' }}>{generatedTxnId}</strong>. Your token reservation has been recorded in the platform ledger.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button
                onClick={() => navigate(`/receipt/${generatedTxnId}`)}
                className="btn-primary"
                style={{ padding: '12px 28px' }}
              >
                View Digital Deed Receipt <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          /* PAYMENT FORM */
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: '36px',
              alignItems: 'start'
            }}
            className="payment-grid-layout"
          >
            {/* Form */}
            <div 
              className="card-luxury"
              style={{
                padding: '30px',
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E5E7EB'
              }}
            >
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#111418', margin: '0 0 20px' }}>
                Select Payment Method
              </h3>

              {/* Tabs */}
              <div 
                className="payment-method-tabs"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '8px',
                  marginBottom: '24px'
                }}
              >
                {[
                  { id: 'card', name: 'Credit Card', icon: CreditCard },
                  { id: 'upi', name: 'Instant UPI', icon: Smartphone },
                  { id: 'netbanking', name: 'Net Banking', icon: Building2 },
                  { id: 'cash_token', name: 'Cash by Token', icon: Banknote }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPaymentMethod(item.id)}
                    style={{
                      padding: '12px 6px',
                      background: paymentMethod === item.id ? '#111418' : '#F9FAFB',
                      border: `1px solid ${paymentMethod === item.id ? '#111418' : '#E5E7EB'}`,
                      borderRadius: '8px',
                      color: paymentMethod === item.id ? '#FFFFFF' : '#4B5563',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    <item.icon size={18} color={paymentMethod === item.id ? '#FFFFFF' : '#6B7280'} />
                    {item.name}
                  </button>
                ))}
              </div>

              {/* Method Inputs */}
              <form onSubmit={handleSimulatePayment} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {paymentMethod === 'card' && (
                  <>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                        Cardholder Name
                      </label>
                      <input 
                        type="text"
                        required
                        placeholder="e.g. Siddharth Patel"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="input-luxury"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                        Card Number
                      </label>
                      <input 
                        type="text"
                        required
                        placeholder="4532 8900 1234 5678"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="input-luxury"
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                          Expiry (MM/YY)
                        </label>
                        <input 
                          type="text"
                          required
                          placeholder="MM/YY"
                          maxLength={5}
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          className="input-luxury"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                          CVV
                        </label>
                        <input 
                          type="password"
                          required
                          maxLength={4}
                          placeholder="•••"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          className="input-luxury"
                        />
                      </div>
                    </div>
                  </>
                )}

                {paymentMethod === 'upi' && (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                      Virtual Payment Address (UPI ID)
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. username@okhdfcbank"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="input-luxury"
                    />
                    <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '4px' }}>
                      Simulate instant UPI authorization (GPay / PhonePe / Paytm)
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                      Select Institution
                    </label>
                    <select
                      value={selectedBank}
                      required
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="input-luxury"
                    >
                      <option value="">-- Select Bank --</option>
                      <option value="HDFC Bank">HDFC Bank</option>
                      <option value="ICICI Bank">ICICI Bank</option>
                      <option value="State Bank of India">State Bank of India (SBI)</option>
                      <option value="Axis Bank">Axis Bank</option>
                      <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                    </select>
                  </div>
                )}

                {paymentMethod === 'cash_token' && (
                  <>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                        Depositor / Payer Name
                      </label>
                      <input 
                        type="text"
                        required
                        placeholder="e.g. Siddharth Patel"
                        value={depositorName}
                        onChange={(e) => setDepositorName(e.target.value)}
                        className="input-luxury"
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                        Deposit Collection Desk / Office
                      </label>
                      <select
                        value={cashDeskBranch}
                        required
                        onChange={(e) => setCashDeskBranch(e.target.value)}
                        className="input-luxury"
                      >
                        <option value="">-- Select Cashier / Collection Desk --</option>
                        <option value="Head Office Sales Lounge (Corporate HQ)">Head Office Sales Lounge (Corporate HQ)</option>
                        <option value="On-Site Sales Gallery & Experience Center">On-Site Sales Gallery & Experience Center</option>
                        <option value="Authorized Developer Escrow Cashier">Authorized Developer Escrow Cashier</option>
                        <option value="Verified Real Estate Partner Desk">Verified Real Estate Partner Desk</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                        Cash Voucher / Slip Reference (Optional)
                      </label>
                      <input 
                        type="text"
                        placeholder="e.g. SLIP-2026-0889 or In-Person Note"
                        value={cashVoucherRef}
                        onChange={(e) => setCashVoucherRef(e.target.value)}
                        className="input-luxury"
                      />
                    </div>

                    <div 
                      style={{ 
                        padding: '12px 14px', 
                        background: '#F3F4F6', 
                        borderRadius: '8px', 
                        border: '1px dashed #D1D5DB',
                        fontSize: '0.78rem',
                        color: '#4B5563',
                        lineHeight: '1.4'
                      }}
                    >
                      <strong>Cash by Token Notice:</strong> Reserving property via cash token creates an immediate provisional reservation deed. The token cash deposit of <strong>{formatCurrency(bookingData.totalPayable)}</strong> will be verified at the selected desk to finalize lock-in.
                    </div>
                  </>
                )}

                <button 
                  type="submit"
                  disabled={isProcessing}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '14px',
                    fontSize: '0.95rem',
                    marginTop: '8px'
                  }}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> {paymentMethod === 'cash_token' ? 'Recording Cash Token...' : 'Processing authorization...'}
                    </>
                  ) : (
                    <>
                      {paymentMethod === 'cash_token' ? `Confirm Cash Token Deposit (${formatCurrency(bookingData.totalPayable)})` : `Pay ${formatCurrency(bookingData.totalPayable)}`}
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Summary */}
            <div 
              className="card-luxury"
              style={{
                padding: '24px',
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E5E7EB'
              }}
            >
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#111418', margin: '0 0 14px' }}>
                Order Summary
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B7280' }}>
                  <span>Property:</span>
                  <strong style={{ color: '#111418' }}>{bookingData.propertyTitle}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B7280' }}>
                  <span>Purchaser:</span>
                  <span style={{ color: '#111418' }}>{bookingData.buyerName}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B7280' }}>
                  <span>Token Amount:</span>
                  <span style={{ color: '#111418' }}>{formatCurrency(bookingData.tokenAmount)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B7280' }}>
                  <span>GST (18%):</span>
                  <span style={{ color: '#111418' }}>{formatCurrency(bookingData.gstAmount)}</span>
                </div>
              </div>

              <div 
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  paddingTop: '14px',
                  borderTop: '1px solid #E5E7EB'
                }}
              >
                <span style={{ fontWeight: 700, color: '#111418' }}>Total:</span>
                <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#111418' }}>
                  {formatCurrency(bookingData.totalPayable)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 860px) {
          .payment-grid-layout {
            grid-template-columns: 1fr !important;
          }
          .payment-method-tabs {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PaymentPage;
