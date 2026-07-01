import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import BrandedLoader from './components/BrandedLoader';

import Home from '@/pages/Home';
import Menu from '@/pages/Menu';
import About from '@/pages/About';
import Location from '@/pages/Location';
import Hours from '@/pages/Hours';
import Contact from '@/pages/Contact';
import FAQ from '@/pages/FAQ';
import Checkout from '@/pages/Checkout';
import OrderConfirmation from '@/pages/OrderConfirmation';
import AdminDashboard from '@/pages/AdminDashboard';

import { CartProvider } from '@/lib/CartContext';
import CartDrawer from '@/components/CartDrawer';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return <BrandedLoader text="loading something sweet..." />;
  }

  // Site is publicly accessible — only block for critical non-auth errors
  if (authError && authError.type !== 'auth_required') {
    return (
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/order" element={<Navigate to="/menu" replace />} />
          <Route path="/about" element={<About />} />
          <Route path="/location" element={<Location />} />
          <Route path="/hours" element={<Hours />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/register" element={<Navigate to="/" replace />} />
          <Route path="/forgot-password" element={<Navigate to="/" replace />} />
          <Route path="/reset-password" element={<Navigate to="/" replace />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <CartDrawer />
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/order" element={<Navigate to="/menu" replace />} />
        <Route path="/about" element={<About />} />
        <Route path="/location" element={<Location />} />
        <Route path="/hours" element={<Hours />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/register" element={<Navigate to="/" replace />} />
        <Route path="/forgot-password" element={<Navigate to="/" replace />} />
        <Route path="/reset-password" element={<Navigate to="/" replace />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <CartDrawer />
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