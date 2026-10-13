// src/redux/slices/agentSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getStoredItem, setStoredItem, KEYS } from '../../utils/storage';
import { INITIAL_AGENTS } from '../../data/mockData';

const loadInitialAgents = () => {
  const stored = getStoredItem(KEYS.AGENTS, null);
  if (!stored || !Array.isArray(stored) || stored.length === 0) {
    return INITIAL_AGENTS;
  }
  // Sync image paths and names for default seed items
  const updated = stored.map((agent) => {
    const match = INITIAL_AGENTS.find((a) => a.id === agent.id);
    if (match) {
      return { ...agent, name: match.name, image: match.image, role: match.role, address: match.address || agent.address };
    }
    return agent;
  });
  setStoredItem(KEYS.AGENTS, updated);
  return updated;
};

const initialAgents = loadInitialAgents();

const agentSlice = createSlice({
  name: 'agents',
  initialState: {
    items: initialAgents,
    selectedAgent: null,
    loading: false
  },
  reducers: {
    setAgents: (state, action) => {
      state.items = action.payload;
      setStoredItem(KEYS.AGENTS, action.payload);
    },
    setSelectedAgent: (state, action) => {
      state.selectedAgent = action.payload;
    },
    addAgent: (state, action) => {
      state.items.unshift(action.payload);
      setStoredItem(KEYS.AGENTS, state.items);
    },
    updateAgent: (state, action) => {
      const index = state.items.findIndex((a) => a.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
        setStoredItem(KEYS.AGENTS, state.items);
      }
    },
    deleteAgent: (state, action) => {
      state.items = state.items.filter((a) => a.id !== action.payload);
      setStoredItem(KEYS.AGENTS, state.items);
    }
  }
});

export const { setAgents, setSelectedAgent, addAgent, updateAgent, deleteAgent } = agentSlice.actions;
export default agentSlice.reducer;
