'use client';
import styles from '../styles/header.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

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
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <div className={styles.logoInner}>
              <Image
                src="/logo.jpg"
                alt="Hydroseal Innovations Logo"
                width={50}
                height={50}
                className={styles.logoImage}
              />
              <div className={styles.logoText}>
                <span className={styles.logoMain}>Hydroseal Innovations</span>
                <span className={styles.logoSub}>Effective Concrete and Steel Water Tank Repair, Cleaning & Disinfection</span>
              </div>
            </div>
          </Link>
        </div>

        <button 
          className={styles.menuToggle}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
          <Link href="/" className={styles.navLink} onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/services" className={styles.navLink} onClick={() => setIsOpen(false)}>Services</Link>
          <Link href="/about" className={styles.navLink} onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/contact" className={styles.navLink} onClick={() => setIsOpen(false)}>Contact</Link>
          <Link href="/quote" className={styles.quoteButton} onClick={() => setIsOpen(false)}>Get Free Quote</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;