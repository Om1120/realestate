// src/api/inquiryApi.js
import { getStoredItem, setStoredItem, KEYS } from '../utils/storage';

export const inquiryApi = {
  getAll: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: getStoredItem(KEYS.INQUIRIES, []) });
      }, 150);
    });
  },

  create: async (inquiryData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const inquiries = getStoredItem(KEYS.INQUIRIES, []);
        const updated = [inquiryData, ...inquiries];
        setStoredItem(KEYS.INQUIRIES, updated);
        resolve({ data: inquiryData });
      }, 200);
    });
  },

  updateStatus: async (id, status) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const inquiries = getStoredItem(KEYS.INQUIRIES, []);
        const index = inquiries.findIndex((i) => i.id === id);
        if (index !== -1) {
          inquiries[index].status = status;
          setStoredItem(KEYS.INQUIRIES, inquiries);
          resolve({ data: inquiries[index] });
        } else {
          reject(new Error('Inquiry not found'));
        }
      }, 150);
    });
  },

  delete: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const inquiries = getStoredItem(KEYS.INQUIRIES, []);
        const filtered = inquiries.filter((i) => i.id !== id);
        setStoredItem(KEYS.INQUIRIES, filtered);
        resolve({ data: { success: true, id } });
      }, 150);
    });
  }
};
