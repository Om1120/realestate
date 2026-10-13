// src/api/propertyApi.js
import { getStoredItem, setStoredItem, KEYS } from '../utils/storage';

export const propertyApi = {
  getAll: async () => {
    // Return local stored properties
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: getStoredItem(KEYS.PROPERTIES, []) });
      }, 150);
    });
  },

  getById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const properties = getStoredItem(KEYS.PROPERTIES, []);
        const found = properties.find((p) => p.id === id || p.slug === id);
        if (found) {
          resolve({ data: found });
        } else {
          reject(new Error('Property not found'));
        }
      }, 150);
    });
  },

  create: async (propertyData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const properties = getStoredItem(KEYS.PROPERTIES, []);
        const updated = [propertyData, ...properties];
        setStoredItem(KEYS.PROPERTIES, updated);
        resolve({ data: propertyData });
      }, 200);
    });
  },

  update: async (id, updateData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const properties = getStoredItem(KEYS.PROPERTIES, []);
        const index = properties.findIndex((p) => p.id === id);
        if (index !== -1) {
          properties[index] = { ...properties[index], ...updateData };
          setStoredItem(KEYS.PROPERTIES, properties);
          resolve({ data: properties[index] });
        } else {
          reject(new Error('Property not found for update'));
        }
      }, 200);
    });
  },

  delete: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const properties = getStoredItem(KEYS.PROPERTIES, []);
        const filtered = properties.filter((p) => p.id !== id);
        setStoredItem(KEYS.PROPERTIES, filtered);
        resolve({ data: { success: true, id } });
      }, 200);
    });
  }
};
