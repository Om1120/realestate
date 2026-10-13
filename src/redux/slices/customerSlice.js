// src/redux/slices/customerSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getStoredItem, setStoredItem, KEYS } from '../../utils/storage';
import { INITIAL_CUSTOMERS } from '../../data/mockData';

const loadInitialCustomers = () => {
  const stored = getStoredItem(KEYS.CUSTOMERS, null);
  if (!stored || !Array.isArray(stored) || stored.length === 0) {
    return INITIAL_CUSTOMERS;
  }
  const updated = stored.map((cust) => {
    const match = INITIAL_CUSTOMERS.find((c) => c.id === cust.id);
    if (match) {
      return { ...cust, avatar: match.avatar, name: match.name };
    }
    return cust;
  });
  setStoredItem(KEYS.CUSTOMERS, updated);
  return updated;
};

const initialCustomers = loadInitialCustomers();

const customerSlice = createSlice({
  name: 'customers',
  initialState: {
    items: initialCustomers,
    loading: false
  },
  reducers: {
    setCustomers: (state, action) => {
      state.items = action.payload;
      setStoredItem(KEYS.CUSTOMERS, action.payload);
    },
    addCustomer: (state, action) => {
      state.items.unshift(action.payload);
      setStoredItem(KEYS.CUSTOMERS, state.items);
    },
    updateCustomer: (state, action) => {
      const index = state.items.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
        setStoredItem(KEYS.CUSTOMERS, state.items);
      }
    },
    deleteCustomer: (state, action) => {
      state.items = state.items.filter((c) => c.id !== action.payload);
      setStoredItem(KEYS.CUSTOMERS, state.items);
    }
  }
});

export const { setCustomers, addCustomer, updateCustomer, deleteCustomer } = customerSlice.actions;
export default customerSlice.reducer;
