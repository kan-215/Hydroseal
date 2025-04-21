'use client';
import { motion } from 'framer-motion';
import { FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from '../styles/hero.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const projects = [
  { 
    id: 1, 
    src: '/concreate.jpg', 
    alt: 'Concrete Water Tank Construction', 
    title: 'Concrete Tank Solutions',
    desc: 'Professional concrete water tank services',
    link: '/services#concrete-tanks'
  },
  { 
    id: 2, 
    src: '/construction1.jpg', 
    alt: 'Water Tank Installation', 
    title: 'New Tank Installation',
    desc: 'Custom tank design and installation',
    link: '/services#installation'
  },
  { 
    id: 3, 
    src: '/plat.jpeg', 
    alt: 'Tank Platform Construction', 
    title: 'Platform Construction',
    desc: 'Sturdy elevated tank platforms',
    link: '/services#platforms'
  },
  { 
    id: 4, 
    src: '/steel4.jpeg', 
    alt: 'Steel Water Tanks', 
    title: 'Steel Tank Solutions',
    desc: 'Durable steel water tanks',
    link: '/services#steel-tanks'
  },
  { 
    id: 5, 
    src: '/waterproofing.jpg', 
    alt: 'Tank Waterproofing', 
    title: 'Waterproofing Services',
    desc: 'Leak-proof tank solutions',
    link: '/services#waterproofing'
  },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(80);

  useEffect(() => {
    const header = document.querySelector('header');
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }
  }, []);

  const handlePrev = () => {
    setIsAutoScrolling(false);
    setCurrentIndex(prev => (prev === 0 ? projects.length - 1 : prev - 1));
    setTimeout(() => setIsAutoScrolling(true), 5000);
  };

  const handleNext = () => {
    setIsAutoScrolling(false);
    setCurrentIndex(prev => (prev === projects.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAutoScrolling(true), 5000);
  };

  useEffect(() => {
    if (!isAutoScrolling) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev === projects.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight - headerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section 
      className={styles.hero}
      style={{ 
        paddingTop: `${headerHeight}px`,
        minHeight: `calc(100vh - ${headerHeight}px)`
      }}
    >
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <motion.div 
            className={styles.textContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className={styles.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              Welcome to <span className={styles.highlight}>Hydroseal Innovations</span>
            </motion.h1>
            
            <motion.p 
              className={styles.description}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Secure your water supply with Kenya&apos;s premier experts in concrete and steel water tank design, 
              construction, platform building, repair, and maintenance.
            </motion.p>
            
            <motion.div 
              className={styles.ctaGroup}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className={styles.buttons}>
                <Link href="/quote" className={styles.primaryButton}>
                  Get a Free Quote
                </Link>
                <Link href="/services" className={styles.secondaryButton}>
                  Our Services
                </Link>
              </div>
              <p className={styles.subtext}>
                Serving residential, commercial, and industrial clients across Kenya.
              </p>
            </motion.div>
          </motion.div>

          <div className={styles.gallerySection}>
            <div className={styles.galleryWrapper}>
              <motion.div 
                className={styles.gallery}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className={styles.slideContainer}>
                  <motion.div
                    key={projects[currentIndex].id}
                    className={styles.slide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className={styles.imageWrapper}>
                      <Image
                        src={projects[currentIndex].src}
                        alt={projects[currentIndex].alt}
                        fill
                        className={styles.image}
                        priority
                      />
                      <div className={styles.imageContent}>
                        <h3>{projects[currentIndex].title}</h3>
                        <p>{projects[currentIndex].desc}</p>
                        <Link 
                          href={projects[currentIndex].link} 
                          className={styles.detailsButton}
                        >
                          View Details <FaChevronRight className={styles.linkIcon} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className={styles.controls}>
                  <button 
                    onClick={handlePrev} 
                    className={styles.navButton}
                    aria-label="Previous project"
                  >
                    <FaChevronLeft />
                  </button>
                  
                  <div className={styles.dots}>
                    {projects.map((_, index) => (
                      <button
                        key={index}
                        className={`${styles.dot} ${currentIndex === index ? styles.active : ''}`}
                        onClick={() => setCurrentIndex(index)}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  <button 
                    onClick={handleNext} 
                    className={styles.navButton}
                    aria-label="Next project"
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </motion.div>
            </div>

            <motion.button 
              className={styles.scrollIndicator}
              onClick={handleScrollDown}
              aria-label="Scroll down"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Explore More</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FaChevronDown />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
