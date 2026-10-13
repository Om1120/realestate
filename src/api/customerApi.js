// src/api/customerApi.js
import { getStoredItem, setStoredItem, KEYS } from '../utils/storage';

export const customerApi = {
  getAll: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: getStoredItem(KEYS.CUSTOMERS, []) });
      }, 150);
    });
  },

  create: async (customerData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const customers = getStoredItem(KEYS.CUSTOMERS, []);
        const updated = [customerData, ...customers];
        setStoredItem(KEYS.CUSTOMERS, updated);
        resolve({ data: customerData });
      }, 200);
    });
  },

  update: async (id, updateData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const customers = getStoredItem(KEYS.CUSTOMERS, []);
        const index = customers.findIndex((c) => c.id === id);
        if (index !== -1) {
          customers[index] = { ...customers[index], ...updateData };
          setStoredItem(KEYS.CUSTOMERS, customers);
          resolve({ data: customers[index] });
        } else {
          reject(new Error('Customer not found for update'));
        }
      }, 200);
    });
  },

  delete: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const customers = getStoredItem(KEYS.CUSTOMERS, []);
        const filtered = customers.filter((c) => c.id !== id);
        setStoredItem(KEYS.CUSTOMERS, filtered);
        resolve({ data: { success: true, id } });
      }, 200);
    });
  }
};
