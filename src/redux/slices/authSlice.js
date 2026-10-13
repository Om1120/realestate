// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getStoredItem, setStoredItem, KEYS } from '../../utils/storage';

// Default Demo Accounts
const DEMO_USERS = [
  {
    id: 'usr-admin-1',
    name: 'Administrator',
    email: 'om17@gmail.com',
    password: '17122007',
    role: 'admin',
    avatar: '/Images/Cus1.webp',
    title: 'Chief Real Estate Curator & Administrator'
  },
  {
    id: 'usr-admin-legacy',
    name: 'Administrator',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    avatar: '/Images/Cus1.webp',
    title: 'Chief Real Estate Curator & Administrator'
  },
  {
    id: 'usr-client-1',
    name: 'Siddharth Singhania',
    email: 'user@example.com',
    password: 'user123',
    role: 'user',
    phone: '+91 98200 77665',
    avatar: '/Images/Cus1.webp',
    title: 'HNW Private Collector & Member'
  }
];

const initialUser = getStoredItem(KEYS.AUTH, null);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialUser,
    isAuthenticated: !!initialUser,
    error: null,
    loading: false
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      setStoredItem(KEYS.AUTH, action.payload);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem(KEYS.AUTH);
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      setStoredItem(KEYS.AUTH, state.user);
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, logout, updateProfile } = authSlice.actions;

// Demo login thunk with realistic check
export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const match = DEMO_USERS.find(
        (u) => u.email.toLowerCase() === credentials.email.toLowerCase() && u.password === credentials.password
      );

      if (match) {
        const userObj = {
          id: match.id,
          name: match.name,
          email: match.email,
          role: match.role,
          avatar: match.avatar,
          title: match.title,
          phone: match.phone || '+91 98765 43210',
          token: `aurelia_jwt_${Date.now()}`
        };
        dispatch(loginSuccess(userObj));
        resolve(userObj);
      } else {
        const errorMsg = 'Invalid email or password.';
        dispatch(loginFailure(errorMsg));
        reject(new Error(errorMsg));
      }
    }, 400);
  });
};

export default authSlice.reducer;
