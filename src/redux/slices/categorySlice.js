// src/redux/slices/categorySlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getStoredItem, setStoredItem, KEYS } from '../../utils/storage';
import { INITIAL_CATEGORIES } from '../../data/mockData';

const loadInitialCategories = () => {
  const stored = getStoredItem(KEYS.CATEGORIES, null);
  if (!stored || !Array.isArray(stored) || stored.length === 0) {
    return INITIAL_CATEGORIES;
  }
  const updated = stored.map((cat) => {
    const match = INITIAL_CATEGORIES.find((c) => c.id === cat.id);
    if (match) {
      return { ...cat, image: match.image };
    }
    return cat;
  });
  setStoredItem(KEYS.CATEGORIES, updated);
  return updated;
};

const initialCategories = loadInitialCategories();

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    items: initialCategories,
    loading: false
  },
  reducers: {
    setCategories: (state, action) => {
      state.items = action.payload;
      setStoredItem(KEYS.CATEGORIES, action.payload);
    },
    addCategory: (state, action) => {
      state.items.push(action.payload);
      setStoredItem(KEYS.CATEGORIES, state.items);
    },
    updateCategory: (state, action) => {
      const index = state.items.findIndex((cat) => cat.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
        setStoredItem(KEYS.CATEGORIES, state.items);
      }
    },
    deleteCategory: (state, action) => {
      state.items = state.items.filter((cat) => cat.id !== action.payload);
      setStoredItem(KEYS.CATEGORIES, state.items);
    }
  }
});

export const { setCategories, addCategory, updateCategory, deleteCategory } = categorySlice.actions;
export default categorySlice.reducer;
