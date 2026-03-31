'use client';
import styles from '../styles/header.module.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiPhone, FiMail, FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

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
                <span className={styles.logoMain}>Hydroseal</span>
                <span className={styles.logoSub}>Innovations</span>
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

          <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
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
                <a href="#"><FiTwitter /></a>
                <a href="#"><FiInstagram /></a>
              </div>
            </div>
          </nav>
        </div>
      </header>
      {isOpen && <div className={styles.menuBackdrop} onClick={closeMenu} />}
    </>
  );
};


export default Header;