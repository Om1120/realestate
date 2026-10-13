// src/routes/AppRoutes.jsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

// Public Pages
import HomePage from '../pages/public/HomePage';
import PropertiesPage from '../pages/public/PropertiesPage';
import ApartmentsPage from '../pages/public/ApartmentsPage';
import HousesPage from '../pages/public/HousesPage';
import CommercialPage from '../pages/public/CommercialPage';
import PropertyDetailsPage from '../pages/public/PropertyDetailsPage';
import LocationsPage from '../pages/public/LocationsPage';
import AgentsPage from '../pages/public/AgentsPage';
import AgentDetailsPage from '../pages/public/AgentDetailsPage';
import AboutPage from '../pages/public/AboutPage';
import ContactPage from '../pages/public/ContactPage';
import FavoritesPage from '../pages/public/FavoritesPage';
import LoginPage from '../pages/auth/LoginPage';
import AdminLoginPage from '../pages/auth/AdminLoginPage';

// Booking & Payment
import BookingPage from '../pages/booking/BookingPage';
import PaymentPage from '../pages/booking/PaymentPage';
import ReceiptPage from '../pages/booking/ReceiptPage';

// User Dashboard
import UserDashboardLayout from '../pages/user/UserDashboardLayout';
import UserOverview from '../pages/user/UserOverview';
import UserFavorites from '../pages/user/UserFavorites';
import UserInquiries from '../pages/user/UserInquiries';
import UserAppointments from '../pages/user/UserAppointments';
import UserTransactions from '../pages/user/UserTransactions';
import UserProfile from '../pages/user/UserProfile';

// Admin Dashboard
import AdminDashboardLayout from '../pages/admin/AdminDashboardLayout';
import AdminOverview from '../pages/admin/AdminOverview';
import AdminProperties from '../pages/admin/AdminProperties';
import AdminPropertyForm from '../pages/admin/AdminPropertyForm';
import AdminAgents from '../pages/admin/AdminAgents';
import AdminCustomers from '../pages/admin/AdminCustomers';
import AdminCategories from '../pages/admin/AdminCategories';
import AdminInquiries from '../pages/admin/AdminInquiries';
import AdminAppointments from '../pages/admin/AdminAppointments';
import AdminTransactions from '../pages/admin/AdminTransactions';
import AdminSettings from '../pages/admin/AdminSettings';

const LoadingFallback = () => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4AF37' }}>
    <div style={{ fontFamily: 'var(--font-royal)', fontSize: '1.1rem', letterSpacing: '0.1em' }}>
      Loading Sovereign Experience...
    </div>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/apartments" element={<ApartmentsPage />} />
        <Route path="/houses" element={<HousesPage />} />
        <Route path="/commercial" element={<CommercialPage />} />
        <Route path="/property/:id" element={<PropertyDetailsPage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/agents" element={<AgentsPage />} />
        <Route path="/agents/:id" element={<AgentDetailsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Booking & Purchase Flow (Protected) */}
        <Route 
          path="/book/:propertyId" 
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/booking/:propertyId" 
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/payment/:bookingId" 
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          } 
        />
        <Route path="/receipt/:transactionId" element={<ReceiptPage />} />

        {/* User Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRole="user">
              <UserDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserOverview />} />
          <Route path="favorites" element={<UserFavorites />} />
          <Route path="inquiries" element={<UserInquiries />} />
          <Route path="appointments" element={<UserAppointments />} />
          <Route path="transactions" element={<UserTransactions />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>

        {/* Admin Protected Dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminOverview />} />
          <Route path="properties" element={<AdminProperties />} />
          <Route path="properties/add" element={<AdminPropertyForm />} />
          <Route path="properties/edit/:id" element={<AdminPropertyForm />} />
          <Route path="agents" element={<AdminAgents />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="inquiries" element={<AdminInquiries />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="transactions" element={<AdminTransactions />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
