import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Public pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Quote from './pages/Quote';
import TermsOfService from './pages/TermsOfService';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import ScrollToTop from './components/ScrollToTop';

// Admin pages
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import HeroAdmin from './admin/pages/HeroAdmin';
import PortfolioAdmin from './admin/pages/PortfolioAdmin';
import FAQAdmin from './admin/pages/FAQAdmin';
import ServicesAdmin from './admin/pages/ServicesAdmin';
import TestimonialsAdmin from './admin/pages/TestimonialsAdmin';
import BlogAdmin from './admin/pages/BlogAdmin';
import AboutAdmin from './admin/pages/AboutAdmin';
import ProtectedRoute from './admin/components/ProtectedRoute';

// Contexts
import { AuthProvider } from './contexts/AuthContext';
import { ContentProvider } from './contexts/ContentContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ContentProvider>
        <Router>
          <ScrollToTop />
          {/* ... existing routes ... */}
          <Routes>
            {/* ── Admin routes (no public header/footer) ── */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/hero" element={<ProtectedRoute><HeroAdmin /></ProtectedRoute>} />
            <Route path="/admin/portfolio" element={<ProtectedRoute><PortfolioAdmin /></ProtectedRoute>} />
            <Route path="/admin/faq" element={<ProtectedRoute><FAQAdmin /></ProtectedRoute>} />
            <Route path="/admin/services" element={<ProtectedRoute><ServicesAdmin /></ProtectedRoute>} />
            <Route path="/admin/testimonials" element={<ProtectedRoute><TestimonialsAdmin /></ProtectedRoute>} />
            <Route path="/admin/blog" element={<ProtectedRoute><BlogAdmin /></ProtectedRoute>} />
            <Route path="/admin/about" element={<ProtectedRoute><AboutAdmin /></ProtectedRoute>} />

            {/* ── Public routes ── */}
            <Route path="/*" element={
              <div className="app-container">
                <Header />
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/quote" element={<Quote />} />
                    <Route path="/terms-of-service" element={<TermsOfService />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:id" element={<BlogPost />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            } />
          </Routes>
        </Router>
      </ContentProvider>
    </AuthProvider>
  );
};

export default App;
