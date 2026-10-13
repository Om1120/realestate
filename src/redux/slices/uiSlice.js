// src/redux/slices/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    toast: null, // { type: 'success' | 'error' | 'info', message: string, title?: string }
    isMobileMenuOpen: false,
    activeModal: null // string identifier or null
  },
  reducers: {
    showToast: (state, action) => {
      state.toast = {
        id: Date.now(),
        type: action.payload.type || 'info',
        title: action.payload.title || '',
        message: action.payload.message
      };
    },
    hideToast: (state) => {
      state.toast = null;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setMobileMenu: (state, action) => {
      state.isMobileMenuOpen = action.payload;
    },
    openModal: (state, action) => {
      state.activeModal = action.payload;
    },
    closeModal: (state) => {
      state.activeModal = null;
    }
  }
});

export const { showToast, hideToast, toggleMobileMenu, setMobileMenu, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
