import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Auth Components
import { AuthProvider } from './features/auth/AuthContext';
import Login from './features/auth/components/Login';
import Register from './features/auth/components/Register';
import ProtectedRoute from './features/auth/components/ProtectedRoute';

// Layout Components
import AdminLayout from './shared/layouts/AdminLayout';
import OrganizerLayout from './shared/layouts/OrganizerLayout';
import CustomerLayout from './shared/layouts/CustomerLayout';
import PublicLayout from './shared/layouts/PublicLayout';

// Feature Pages
import HomePage from './pages/home/HomePage';
import Dashboard from './pages/dashboard/Dashboard';

// Admin Pages
import AdminUsers from './pages/admin/users/AdminUsers';
import AdminEvents from './pages/admin/events/AdminEvents';
import AdminVenues from './pages/admin/venues/AdminVenues';

// Organizer Pages
import EventDashboard from './pages/organizer/events/EventDashboard';
import EventCreate from './pages/organizer/events/EventCreate';
import EventEdit from './pages/organizer/events/EventEdit';
import EventParticipants from './pages/organizer/events/EventParticipants';
import ScoringManagement from './pages/organizer/scoring/ScoringManagement';

// Customer Pages
import Events from './pages/customer/events/Events';
import EventDetail from './pages/customer/events/EventDetail';
import MyEvents from './pages/customer/myEvents/MyEvents';
import Equipment from './pages/customer/equipment/Equipment';
import Training from './pages/customer/training/Training';
import Community from './pages/customer/community/Community';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="events/:id" element={<EventDetail />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard role="admin" />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="venues" element={<AdminVenues />} />
          </Route>

          {/* Organizer Routes */}
          <Route
            path="/organizer"
            element={
              <ProtectedRoute requiredRole="organizer">
                <OrganizerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/organizer/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard role="organizer" />} />
            <Route path="events" element={<EventDashboard />} />
            <Route path="events/create" element={<EventCreate />} />
            <Route path="events/:id/edit" element={<EventEdit />} />
            <Route path="events/:id/participants" element={<EventParticipants />} />
            <Route path="events/:id/scoring" element={<ScoringManagement />} />
          </Route>

          {/* Customer (Archer) Routes */}
          <Route
            path="/archer"
            element={
              <ProtectedRoute requiredRole="customer">
                <CustomerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/archer/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard role="customer" />} />
            <Route path="events" element={<Events />} />
            <Route path="my-events" element={<MyEvents />} />
            <Route path="equipment" element={<Equipment />} />
            <Route path="training" element={<Training />} />
            <Route path="community" element={<Community />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </AuthProvider>
  );
}

export default App;