// src/api/agentApi.js
import { getStoredItem, setStoredItem, KEYS } from '../utils/storage';

export const agentApi = {
  getAll: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: getStoredItem(KEYS.AGENTS, []) });
      }, 150);
    });
  },

  getById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const agents = getStoredItem(KEYS.AGENTS, []);
        const found = agents.find((a) => a.id === id);
        if (found) resolve({ data: found });
        else reject(new Error('Agent not found'));
      }, 150);
    });
  },

  create: async (agentData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const agents = getStoredItem(KEYS.AGENTS, []);
        const updated = [agentData, ...agents];
        setStoredItem(KEYS.AGENTS, updated);
        resolve({ data: agentData });
      }, 200);
    });
  },

  update: async (id, updateData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const agents = getStoredItem(KEYS.AGENTS, []);
        const index = agents.findIndex((a) => a.id === id);
        if (index !== -1) {
          agents[index] = { ...agents[index], ...updateData };
          setStoredItem(KEYS.AGENTS, agents);
          resolve({ data: agents[index] });
        } else {
          reject(new Error('Agent not found for update'));
        }
      }, 200);
    });
  },

  delete: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const agents = getStoredItem(KEYS.AGENTS, []);
        const filtered = agents.filter((a) => a.id !== id);
        setStoredItem(KEYS.AGENTS, filtered);
        resolve({ data: { success: true, id } });
      }, 200);
    });
  }
};
