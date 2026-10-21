import { Toaster } from "@/components/ui/toaster"
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgressBar from './components/ScrollProgressBar';
import { EASE_OUT_STRONG } from '@/lib/motion';

import Home from '@/pages/Home';
import Menu from '@/pages/Menu';
import About from '@/pages/About';
import VisitUs from '@/pages/VisitUs';
import Reviews from '@/pages/Reviews';
import GiftCards from '@/pages/GiftCards';
import Catering from '@/pages/Catering';
import Rewards from '@/pages/Rewards';
import Privacy from '@/pages/Privacy';
import UnderConstruction from '@/pages/UnderConstruction';
import Checkout from '@/pages/Checkout';

import { CartProvider, useCart } from '@/lib/CartContext';
import CartDrawer from '@/components/CartDrawer';
import OrderChoiceModal from '@/components/OrderChoiceModal';
import AppDownloadPopup from '@/components/AppDownloadPopup';

const PublicRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.22, ease: EASE_OUT_STRONG }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/order" element={<Navigate to="/menu" replace />} />
          <Route path="/about" element={<About />} />
          <Route path="/visit-us" element={<VisitUs />} />
          <Route path="/location" element={<Navigate to="/visit-us" replace />} />
          <Route path="/hours" element={<Navigate to="/visit-us" replace />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/gift-cards" element={<GiftCards />} />
          <Route path="/catering" element={<Catering />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Navigate to="/catering" replace />} />
          <Route path="/faq" element={<Navigate to="/" replace />} />
          <Route path="/app" element={<UnderConstruction />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const GlobalOverlays = () => {
  const { orderChoiceOpen, setOrderChoiceOpen } = useCart();
  return (
    <>
      <CartDrawer />
      <OrderChoiceModal open={orderChoiceOpen} onClose={() => setOrderChoiceOpen(false)} />
      <AppDownloadPopup />
    </>
  );
};

function App() {
  return (
    <>
      <Router>
        <ScrollProgressBar />
        <ScrollToTop />
        <CartProvider>
          <PublicRoutes />
          <GlobalOverlays />
        </CartProvider>
      </Router>
      <Toaster />
    </>
  )
}

export default App
