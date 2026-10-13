// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import propertyReducer from './slices/propertySlice';
import favoriteReducer from './slices/favoriteSlice';
import agentReducer from './slices/agentSlice';
import customerReducer from './slices/customerSlice';
import categoryReducer from './slices/categorySlice';
import inquiryReducer from './slices/inquirySlice';
import appointmentReducer from './slices/appointmentSlice';
import transactionReducer from './slices/transactionSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    properties: propertyReducer,
    favorites: favoriteReducer,
    agents: agentReducer,
    customers: customerReducer,
    categories: categoryReducer,
    inquiries: inquiryReducer,
    appointments: appointmentReducer,
    transactions: transactionReducer,
    ui: uiReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
