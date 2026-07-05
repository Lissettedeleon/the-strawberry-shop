import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import BrandedLoader from './components/BrandedLoader';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminRoute from '@/components/AdminRoute';
import MobileOrderBar from '@/components/MobileOrderBar';

import Home from '@/pages/Home';
import Menu from '@/pages/Menu';
import About from '@/pages/About';
import Location from '@/pages/Location';
import Hours from '@/pages/Hours';
import GiftCards from '@/pages/GiftCards';
import Contact from '@/pages/Contact';
import FAQ from '@/pages/FAQ';
import Checkout from '@/pages/Checkout';
import OrderConfirmation from '@/pages/OrderConfirmation';
import AdminDashboard from '@/pages/AdminDashboard';
import Login from '@/pages/Login';

import { CartProvider, useCart } from '@/lib/CartContext';
import CartDrawer from '@/components/CartDrawer';
import OrderChoiceModal from '@/components/OrderChoiceModal';

const PublicRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/menu" element={<Menu />} />
    <Route path="/order" element={<Navigate to="/menu" replace />} />
    <Route path="/about" element={<About />} />
    <Route path="/location" element={<Location />} />
    <Route path="/hours" element={<Hours />} />
    <Route path="/gift-cards" element={<GiftCards />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/order-confirmation" element={<OrderConfirmation />} />
    {/* Admin login (for staff only) — customers never need to authenticate */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Navigate to="/login" replace />} />
    <Route path="/forgot-password" element={<Navigate to="/login" replace />} />
    <Route path="/reset-password" element={<Navigate to="/login" replace />} />
    {/* Admin dashboard — admin-only, guarded at the route level + RLS server-side */}
    <Route element={<AdminRoute />}>
      <Route path="/admin" element={<AdminDashboard />} />
    </Route>
    <Route path="*" element={<PageNotFound />} />
  </Routes>
);

const GlobalOverlays = () => {
  const { orderChoiceOpen, setOrderChoiceOpen } = useCart();
  return (
    <>
      <CartDrawer />
      <MobileOrderBar />
      <OrderChoiceModal open={orderChoiceOpen} onClose={() => setOrderChoiceOpen(false)} />
    </>
  );
};

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return <BrandedLoader text="loading something sweet..." />;
  }

  // Site is publicly accessible — only block for critical non-auth errors
  if (authError && authError.type !== 'auth_required') {
    return (
      <CartProvider>
        <PublicRoutes />
        <GlobalOverlays />
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      <PublicRoutes />
      <GlobalOverlays />
    </CartProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
