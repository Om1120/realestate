// src/redux/slices/favoriteSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getStoredItem, setStoredItem, KEYS } from '../../utils/storage';

const initialFavorites = getStoredItem(KEYS.FAVORITES, ['AUR-101', 'AUR-102']);

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    propertyIds: initialFavorites
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const propertyId = action.payload;
      if (state.propertyIds.includes(propertyId)) {
        state.propertyIds = state.propertyIds.filter((id) => id !== propertyId);
      } else {
        state.propertyIds.push(propertyId);
      }
      setStoredItem(KEYS.FAVORITES, state.propertyIds);
    },
    removeFavorite: (state, action) => {
      state.propertyIds = state.propertyIds.filter((id) => id !== action.payload);
      setStoredItem(KEYS.FAVORITES, state.propertyIds);
    },
    clearFavorites: (state) => {
      state.propertyIds = [];
      setStoredItem(KEYS.FAVORITES, []);
    }
  }
});

export const { toggleFavorite, removeFavorite, clearFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
