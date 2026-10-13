// src/redux/slices/inquirySlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getStoredItem, setStoredItem, KEYS } from '../../utils/storage';
import { INITIAL_INQUIRIES } from '../../data/mockData';

const initialInquiries = getStoredItem(KEYS.INQUIRIES, INITIAL_INQUIRIES);

const inquirySlice = createSlice({
  name: 'inquiries',
  initialState: {
    items: initialInquiries,
    loading: false
  },
  reducers: {
    setInquiries: (state, action) => {
      state.items = action.payload;
      setStoredItem(KEYS.INQUIRIES, action.payload);
    },
    addInquiry: (state, action) => {
      state.items.unshift(action.payload);
      setStoredItem(KEYS.INQUIRIES, state.items);
    },
    updateInquiryStatus: (state, action) => {
      const { id, status } = action.payload;
      const index = state.items.findIndex((i) => i.id === id);
      if (index !== -1) {
        state.items[index].status = status;
        setStoredItem(KEYS.INQUIRIES, state.items);
      }
    },
    deleteInquiry: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      setStoredItem(KEYS.INQUIRIES, state.items);
    }
  }
});

export const { setInquiries, addInquiry, updateInquiryStatus, deleteInquiry } = inquirySlice.actions;
export default inquirySlice.reducer;
