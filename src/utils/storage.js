// src/utils/storage.js
import { 
  INITIAL_PROPERTIES, 
  INITIAL_AGENTS, 
  INITIAL_CATEGORIES, 
  INITIAL_CUSTOMERS, 
  INITIAL_INQUIRIES, 
  INITIAL_APPOINTMENTS, 
  INITIAL_TRANSACTIONS 
} from '../data/mockData';

const KEYS = {
  PROPERTIES: 'aurelia_properties',
  AGENTS: 'aurelia_agents',
  CATEGORIES: 'aurelia_categories',
  CUSTOMERS: 'aurelia_customers',
  INQUIRIES: 'aurelia_inquiries',
  APPOINTMENTS: 'aurelia_appointments',
  TRANSACTIONS: 'aurelia_transactions',
  FAVORITES: 'aurelia_favorites',
  AUTH: 'aurelia_auth_user'
};

/**
 * Initialize storage with default mock data if not already present
 */
export const initStorage = () => {
  if (!localStorage.getItem(KEYS.PROPERTIES)) {
    localStorage.setItem(KEYS.PROPERTIES, JSON.stringify(INITIAL_PROPERTIES));
  }
  if (!localStorage.getItem(KEYS.AGENTS)) {
    localStorage.setItem(KEYS.AGENTS, JSON.stringify(INITIAL_AGENTS));
  }
  if (!localStorage.getItem(KEYS.CATEGORIES)) {
    localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
  }
  if (!localStorage.getItem(KEYS.CUSTOMERS)) {
    localStorage.setItem(KEYS.CUSTOMERS, JSON.stringify(INITIAL_CUSTOMERS));
  }
  if (!localStorage.getItem(KEYS.INQUIRIES)) {
    localStorage.setItem(KEYS.INQUIRIES, JSON.stringify(INITIAL_INQUIRIES));
  }
  if (!localStorage.getItem(KEYS.APPOINTMENTS)) {
    localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS));
  }
  if (!localStorage.getItem(KEYS.TRANSACTIONS)) {
    localStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(INITIAL_TRANSACTIONS));
  }
  if (!localStorage.getItem(KEYS.FAVORITES)) {
    localStorage.setItem(KEYS.FAVORITES, JSON.stringify(['AUR-101', 'AUR-102']));
  }
};

/**
 * Reset all storage to factory demo data
 */
export const resetStorageToDefault = () => {
  localStorage.setItem(KEYS.PROPERTIES, JSON.stringify(INITIAL_PROPERTIES));
  localStorage.setItem(KEYS.AGENTS, JSON.stringify(INITIAL_AGENTS));
  localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
  localStorage.setItem(KEYS.CUSTOMERS, JSON.stringify(INITIAL_CUSTOMERS));
  localStorage.setItem(KEYS.INQUIRIES, JSON.stringify(INITIAL_INQUIRIES));
  localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS));
  localStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(INITIAL_TRANSACTIONS));
  localStorage.setItem(KEYS.FAVORITES, JSON.stringify(['AUR-101', 'AUR-102']));
};

export const resetAllStorage = resetStorageToDefault;

export const getStoredItem = (key, fallback = []) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error(`Error reading ${key} from storage:`, error);
    return fallback;
  }
};

export const setStoredItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key} to storage:`, error);
  }
};

export { KEYS };
