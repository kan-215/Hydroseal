import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import styles from './Dashboard.module.scss';
import MigrationTool from '../components/MigrationTool';
import {
  FiImage, FiBriefcase, FiSettings, FiHelpCircle,
  FiStar, FiBook, FiInfo, FiArrowRight
} from 'react-icons/fi';


const sections = [
  { to: '/admin/hero',         label: 'Hero Slides',    icon: <FiImage />,     desc: 'Edit carousel images, titles and descriptions' },
  { to: '/admin/portfolio',    label: 'Portfolio',      icon: <FiBriefcase />, desc: 'Add, edit or remove portfolio projects' },
  { to: '/admin/services',     label: 'Services',       icon: <FiSettings />,  desc: 'Manage service cards shown on the Services page' },
  { to: '/admin/faq',          label: 'FAQ',            icon: <FiHelpCircle />,desc: 'Update frequently asked questions' },
  { to: '/admin/testimonials', label: 'Testimonials',   icon: <FiStar />,      desc: 'Edit customer testimonials and reviews' },
  { to: '/admin/blog',         label: 'Blog Posts',     icon: <FiBook />,      desc: 'Create, edit and delete blog articles' },
  { to: '/admin/about',        label: 'About Page',     icon: <FiInfo />,      desc: 'Update the About page text and content' },
];

const Dashboard: React.FC = () => {
  return (
    <AdminLayout>
      <h1 className="admin-page-title">Dashboard</h1>
      <p className="admin-page-subtitle">Choose a section below to start editing your site content.</p>

      <MigrationTool />

      <div className={styles.grid}>

        {sections.map(s => (
          <Link key={s.to} to={s.to} className={styles.card}>
            <div className={styles.cardIcon}>{s.icon}</div>
            <div className={styles.cardBody}>
              <h3>{s.label}</h3>
              <p>{s.desc}</p>
            </div>
            <FiArrowRight className={styles.arrow} />
          </Link>
        ))}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
