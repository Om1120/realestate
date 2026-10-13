// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

// Layouts & Global Components
import PublicLayout from './layouts/PublicLayout';
import ProtectedRoute from './components/ProtectedRoute';
import ToastNotification from './components/ToastNotification';
import ScrollToTop from './components/ScrollToTop';
import TopProgressBar from './components/TopProgressBar';
import InitialLogoPreloader from './components/InitialLogoPreloader';
import AdminShortcutListener from './components/AdminShortcutListener';

// Public Pages
import HomePage from './pages/public/HomePage';
import PropertiesPage from './pages/public/PropertiesPage';
import ApartmentsPage from './pages/public/ApartmentsPage';
import HousesPage from './pages/public/HousesPage';
import CommercialPage from './pages/public/CommercialPage';
import PropertyDetailsPage from './pages/public/PropertyDetailsPage';
import LocationsPage from './pages/public/LocationsPage';
import AgentsPage from './pages/public/AgentsPage';
import AgentDetailsPage from './pages/public/AgentDetailsPage';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';
import FavoritesPage from './pages/public/FavoritesPage';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import AdminLoginPage from './pages/auth/AdminLoginPage';

// Booking & Escrow Simulation Pages
import BookingPage from './pages/booking/BookingPage';
import PaymentPage from './pages/booking/PaymentPage';
import ReceiptPage from './pages/booking/ReceiptPage';

// User Dashboard
import UserDashboardLayout from './pages/user/UserDashboardLayout';
import UserOverview from './pages/user/UserOverview';
import UserFavorites from './pages/user/UserFavorites';
import UserInquiries from './pages/user/UserInquiries';
import UserAppointments from './pages/user/UserAppointments';
import UserTransactions from './pages/user/UserTransactions';
import UserProfile from './pages/user/UserProfile';

// Admin Dashboard
import AdminDashboardLayout from './pages/admin/AdminDashboardLayout';
import AdminOverview from './pages/admin/AdminOverview';
import AdminProperties from './pages/admin/AdminProperties';
import AdminPropertyForm from './pages/admin/AdminPropertyForm';
import AdminCategories from './pages/admin/AdminCategories';
import AdminAgents from './pages/admin/AdminAgents';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminInquiries from './pages/admin/AdminInquiries';
import AdminAppointments from './pages/admin/AdminAppointments';
import AdminTransactions from './pages/admin/AdminTransactions';
import AdminSettings from './pages/admin/AdminSettings';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <InitialLogoPreloader />
        <TopProgressBar />
        <ScrollToTop />
        <ToastNotification />
        <AdminShortcutListener />

        <Routes>
          {/* Public Portal Routes (Wrapped with Royal Navbar & Footer) */}
          <Route element={<PublicLayout />}>
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
            
            {/* Booking & Checkout Flow (Protected) */}
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
          </Route>

          {/* Authentication */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* User Privileged Dashboard (Role Protected) */}
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

          {/* Admin Sovereign Management Console (Role Protected) */}
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
            <Route path="categories" element={<AdminCategories />} />
            <Route path="agents" element={<AdminAgents />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="inquiries" element={<AdminInquiries />} />
            <Route path="appointments" element={<AdminAppointments />} />
            <Route path="transactions" element={<AdminTransactions />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Fallback Catch-all Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
