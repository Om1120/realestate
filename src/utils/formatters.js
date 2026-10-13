// src/utils/formatters.js

/**
 * Format price in Indian Rupee format (e.g. ₹ 4.50 Cr, ₹ 85.00 Lakh, ₹ 45,000)
 */
export const formatCurrency = (amount, isRent = false) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹ 0';
  const num = Number(amount);
  
  if (isRent) {
    return `₹ ${num.toLocaleString('en-IN')}/mo`;
  }

  if (num >= 10000000) {
    const cr = (num / 10000000).toFixed(2);
    return `₹ ${cr.replace(/\.00$/, '')} Cr`;
  } else if (num >= 100000) {
    const lakh = (num / 100000).toFixed(2);
    return `₹ ${lakh.replace(/\.00$/, '')} Lakh`;
  }
  return `₹ ${num.toLocaleString('en-IN')}`;
};

/**
 * Format Area in Sq.Ft.
 */
export const formatArea = (sqft) => {
  if (!sqft) return '0 sq.ft';
  return `${Number(sqft).toLocaleString('en-IN')} sq.ft`;
};

/**
 * Format ISO Date string to readable Royal British/Indian format
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
};

/**
 * Generate unique IDs with prefix
 */
export const generateId = (prefix = 'AUR') => {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${Date.now().toString().slice(-4)}${randomNum}`;
};
