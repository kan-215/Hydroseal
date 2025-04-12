'use client';
import { useEffect, useState } from 'react';
import styles from '../styles/backToTop.module.scss';
import { FaArrowUp } from 'react-icons/fa';

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <button
      className={`${styles.backToTop} ${visible ? styles.show : ''}`}
      onClick={scrollToTop}
      aria-label="Back to Top"
    >
      <FaArrowUp />
    </button>
  );
};

export default BackToTopButton;
