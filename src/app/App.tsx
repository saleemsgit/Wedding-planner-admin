import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import LandingPage from './components/LandingPage';
import PlannerDashboard from './components/PlannerDashboard';
import ServiceListing from './components/ServiceListing';
import ServiceDetail from './components/ServiceDetail';
import BookingFlow from './components/BookingFlow';
import GiftExchangePlanner from './components/GiftExchangePlanner';
import MehndiEventPlanner from './components/MehndiEventPlanner';
import ProfilePage from './components/ProfilePage';

// Vendor Portal Components
import VendorDashboard from './vendor-components/VendorDashboard';
import DealManagement from './vendor-components/DealManagement';
import BookingManagement from './vendor-components/BookingManagement';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer-facing routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/planner" element={<PlannerDashboard />} />
        <Route path="/services/:category" element={<ServiceListing />} />
        <Route path="/service/:id" element={<ServiceDetail />} />
        <Route path="/booking/:id" element={<BookingFlow />} />
        <Route path="/gift-exchange" element={<GiftExchangePlanner />} />
        <Route path="/mehndi" element={<MehndiEventPlanner />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Vendor Portal routes - Separate application */}
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        <Route path="/vendor/deals" element={<DealManagement />} />
        <Route path="/vendor/bookings" element={<BookingManagement />} />
        <Route path="/vendor" element={<Navigate to="/vendor/dashboard" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
