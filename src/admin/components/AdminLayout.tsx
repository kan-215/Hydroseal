import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './AdminLayout.module.scss';
import {
  FiHome, FiImage, FiHelpCircle, FiBook, FiStar,
  FiSettings, FiLogOut, FiMenu, FiX, FiBriefcase, FiInfo
} from 'react-icons/fi';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: <FiHome /> },
  { to: '/admin/hero', label: 'Hero Slides', icon: <FiImage /> },
  { to: '/admin/portfolio', label: 'Portfolio', icon: <FiBriefcase /> },
  { to: '/admin/services', label: 'Services', icon: <FiSettings /> },
  { to: '/admin/faq', label: 'FAQ', icon: <FiHelpCircle /> },
  { to: '/admin/testimonials', label: 'Testimonials', icon: <FiStar /> },
  { to: '/admin/blog', label: 'Blog Posts', icon: <FiBook /> },
  { to: '/admin/about', label: 'About Page', icon: <FiInfo /> },
];

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const toggleSidebar = () => {
    if (window.innerWidth <= 1024) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={`
      ${styles.layout} 
      ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}
      ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}
    `}>
      {/* Backdrop for mobile */}
      {isMobileMenuOpen && (
        <div className={styles.backdrop} onClick={closeMobileMenu} />
      )}

      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.brand}>
            <span className={styles.brandIcon}>💧</span>
            <span className={styles.brandName}>Hydroseal Admin</span>
          </div>
          <button className={styles.toggleBtn} onClick={toggleSidebar}>
            <FiX className={styles.closeIcon} />
            <FiMenu className={styles.menuIcon} />
          </button>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`${styles.navItem} ${location.pathname === item.to ? styles.active : ''}`}
              title={!sidebarOpen ? item.label : undefined}
              onClick={closeMobileMenu}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <p className={styles.userName}>{user?.email?.split('@')[0]}</p>
            <p className={styles.userEmail}>{user?.email}</p>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout} title="Logout">
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.topBar}>
          <button className={styles.mobileToggle} onClick={() => setIsMobileMenuOpen(true)}>
            <FiMenu />
          </button>
          <div className={styles.topBarActions}>
            <Link to="/" className={styles.viewSite} target="_blank">
              ↗ Live Site
            </Link>
          </div>
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
};


export default AdminLayout;
