// src/redux/slices/propertySlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getStoredItem, setStoredItem, KEYS } from '../../utils/storage';
import { INITIAL_PROPERTIES } from '../../data/mockData';

const loadInitialProperties = () => {
  const stored = getStoredItem(KEYS.PROPERTIES, null);
  if (!stored || !Array.isArray(stored) || stored.length === 0) {
    return INITIAL_PROPERTIES.map(p => ({
      ...p,
      image: p.image || (p.images && p.images[0]) || '/properties/villa_sovereign.jpg'
    }));
  }
  const updated = stored.map((prop) => {
    const match = INITIAL_PROPERTIES.find((p) => p.id === prop.id);
    if (match && match.images && match.images.length > 0) {
      return { 
        ...prop, 
        images: match.images, 
        image: match.images[0] 
      };
    }
    const mainImg = prop.image || (prop.images && prop.images[0]) || '/properties/villa_sovereign.jpg';
    return {
      ...prop,
      image: mainImg,
      images: prop.images && prop.images.length > 0 ? prop.images : [mainImg]
    };
  });
  setStoredItem(KEYS.PROPERTIES, updated);
  return updated;
};

const initialProperties = loadInitialProperties();

const propertySlice = createSlice({
  name: 'properties',
  initialState: {
    items: initialProperties,
    selectedProperty: null,
    loading: false,
    error: null,
    filters: {
      location: 'All',
      propertyType: 'All',
      category: 'All',
      status: 'All',
      minPrice: 0,
      maxPrice: 800000000,
      bedrooms: 'All',
      minArea: 0,
      maxArea: 30000,
      searchQuery: ''
    },
    sortBy: 'default', // 'price-low', 'price-high', 'newest', 'area-high', 'bedrooms'
    viewMode: 'grid' // 'grid' | 'list'
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProperties: (state, action) => {
      state.items = action.payload;
      setStoredItem(KEYS.PROPERTIES, action.payload);
    },
    setSelectedProperty: (state, action) => {
      state.selectedProperty = action.payload;
    },
    addProperty: (state, action) => {
      state.items.unshift(action.payload);
      setStoredItem(KEYS.PROPERTIES, state.items);
    },
    updateProperty: (state, action) => {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
        setStoredItem(KEYS.PROPERTIES, state.items);
      }
    },
    deleteProperty: (state, action) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
      setStoredItem(KEYS.PROPERTIES, state.items);
    },
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {
        location: 'All',
        propertyType: 'All',
        category: 'All',
        status: 'All',
        minPrice: 0,
        maxPrice: 800000000,
        bedrooms: 'All',
        minArea: 0,
        maxArea: 30000,
        searchQuery: ''
      };
      state.sortBy = 'default';
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    }
  }
});

export const {
  setLoading,
  setProperties,
  setSelectedProperty,
  addProperty,
  updateProperty,
  deleteProperty,
  setFilter,
  resetFilters,
  setSortBy,
  setViewMode
} = propertySlice.actions;

export default propertySlice.reducer;
