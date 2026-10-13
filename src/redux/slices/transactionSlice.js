// src/redux/slices/transactionSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getStoredItem, setStoredItem, KEYS } from '../../utils/storage';
import { INITIAL_TRANSACTIONS } from '../../data/mockData';

const initialTransactions = getStoredItem(KEYS.TRANSACTIONS, INITIAL_TRANSACTIONS);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: {
    items: initialTransactions,
    currentTransaction: null,
    loading: false
  },
  reducers: {
    setTransactions: (state, action) => {
      state.items = action.payload;
      setStoredItem(KEYS.TRANSACTIONS, action.payload);
    },
    addTransaction: (state, action) => {
      state.items.unshift(action.payload);
      state.currentTransaction = action.payload;
      setStoredItem(KEYS.TRANSACTIONS, state.items);
    },
    setCurrentTransaction: (state, action) => {
      state.currentTransaction = action.payload;
    },
    updateTransactionStatus: (state, action) => {
      const { id, status } = action.payload;
      const index = state.items.findIndex((t) => t.id === id);
      if (index !== -1) {
        state.items[index].status = status;
        setStoredItem(KEYS.TRANSACTIONS, state.items);
      }
    }
  }
});

export const { setTransactions, addTransaction, setCurrentTransaction, updateTransactionStatus } = transactionSlice.actions;
export default transactionSlice.reducer;
