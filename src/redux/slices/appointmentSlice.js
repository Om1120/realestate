// src/redux/slices/appointmentSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getStoredItem, setStoredItem, KEYS } from '../../utils/storage';
import { INITIAL_APPOINTMENTS } from '../../data/mockData';

const initialAppointments = getStoredItem(KEYS.APPOINTMENTS, INITIAL_APPOINTMENTS);

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState: {
    items: initialAppointments,
    loading: false
  },
  reducers: {
    setAppointments: (state, action) => {
      state.items = action.payload;
      setStoredItem(KEYS.APPOINTMENTS, action.payload);
    },
    addAppointment: (state, action) => {
      state.items.unshift(action.payload);
      setStoredItem(KEYS.APPOINTMENTS, state.items);
    },
    updateAppointmentStatus: (state, action) => {
      const { id, status } = action.payload;
      const index = state.items.findIndex((a) => a.id === id);
      if (index !== -1) {
        state.items[index].status = status;
        setStoredItem(KEYS.APPOINTMENTS, state.items);
      }
    },
    deleteAppointment: (state, action) => {
      state.items = state.items.filter((a) => a.id !== action.payload);
      setStoredItem(KEYS.APPOINTMENTS, state.items);
    }
  }
});

export const { setAppointments, addAppointment, updateAppointmentStatus, deleteAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
