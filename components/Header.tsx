'use client';
import styles from '../styles/header.module.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiMenu, FiX, FiPhone, FiMail, FiFacebook, FiInstagram, FiArrowRight } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';

const Header = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (newState) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  const NavigationContent = ({ isMobile = false }) => (
    <>
      <div className={styles.mobileNavHeader}>
        <img src="/logo.jpg" alt="Logo" width={60} height={60} />
        <h3>Hydroseal</h3>
      </div>

      <div className={styles.navLinks}>
        <Link to="/" className={styles.navLink} onClick={closeMenu}>Home</Link>
        <Link to="/services" className={styles.navLink} onClick={closeMenu}>Services</Link>
        <Link to="/about" className={styles.navLink} onClick={closeMenu}>About</Link>
        <Link to="/blog" className={styles.navLink} onClick={closeMenu}>Blog</Link>
        <Link to="/contact" className={styles.navLink} onClick={closeMenu}>Contact</Link>
      </div>

      <Link to="/quote" className={styles.quoteButton} onClick={closeMenu}>Get Free Quote</Link>

      <div className={styles.mobileNavFooter}>
        <div className={styles.contactInfo}>
          <a href="tel:+254700000000"><FiPhone /> +254 700 000 000</a>
          <a href="mailto:info@hydroseal.co.ke"><FiMail /> info@hydroseal.co.ke</a>
        </div>
        <div className={styles.socials}>
          <a href="#"><FiFacebook /></a>
          <a href="#"><FaXTwitter /></a>
          <a href="#"><FiInstagram /></a>
        </div>

      </div>
    </>
  );

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          <Link to="/" className={styles.logoLink} onClick={closeMenu}>
            <div className={styles.logoInner}>
              <img
                src="/logo.jpg"
                alt="Logo"
                width={45}
                height={45}
                className={styles.logoImage}
              />
              <div className={styles.logoText}>
                <span className={styles.logoMain}>Hydroseal Innovations</span>
                <span className={styles.logoSub}>Effective Concrete and Steel Water Tank Repair, Cleaning &amp; Disinfection</span>
              </div>
            </div>
          </Link>

          <button 
            className={styles.menuToggle}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>

          {/* Desktop Navigation - Always in Header */}
          <nav className={styles.nav}>
            <NavigationContent />
          </nav>
        </div>
      </header>

      {/* Mobile Navigation Portal - Isolated from Header Blurs */}
      {mounted && isOpen && createPortal(
        <>
          <div className={styles.menuBackdrop} onClick={closeMenu} />
          <nav className={`${styles.navMobile} ${isOpen ? styles.navOpen : ''}`}>
            <button 
              className={styles.mobileCloseToggle} 
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <FiX size={32} />
            </button>
            <NavigationContent isMobile />
          </nav>
        </>,
        document.body
      )}
    </>
  );
};

export default Header;