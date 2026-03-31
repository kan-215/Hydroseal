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

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className={`${styles.layout} ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.brand}>
            <span className={styles.brandIcon}>💧</span>
            {sidebarOpen && <span className={styles.brandName}>Hydroseal Admin</span>}
          </div>
          <button className={styles.toggleBtn} onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`${styles.navItem} ${location.pathname === item.to ? styles.active : ''}`}
              title={!sidebarOpen ? item.label : undefined}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {sidebarOpen && <span className={styles.navLabel}>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          {sidebarOpen && (
            <p className={styles.userEmail}>{user?.email}</p>
          )}
          <button className={styles.logoutBtn} onClick={handleLogout} title="Logout">
            <FiLogOut />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.topBar}>
          <Link to="/" className={styles.viewSite} target="_blank">
            ↗ View Live Site
          </Link>
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
