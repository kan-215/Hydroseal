'use client';
import { motion } from 'framer-motion';
import { FaArrowRight, FaArrowLeft, FaChevronDown } from 'react-icons/fa';
import styles from '../styles/hero.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

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
    src: '/platform1.jpg', 
    alt: 'Tank Platform Construction', 
    title: 'Platform Construction',
    desc: 'Sturdy elevated tank platforms',
    link: '/services#platforms'
  },
  { 
    id: 4, 
    src: '/steel2.jpg', 
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
  const galleryRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Duplicate projects for seamless looping
  const duplicatedProjects = [...projects, ...projects];

  // Handle navigation
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

  // Auto-scroll gallery
  useEffect(() => {
    if (!isAutoScrolling) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev === projects.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  // Scroll down functionality
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className={styles.hero} ref={heroRef}>
      <div className={styles.overlay}>
        <div className={styles.container}>
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span>Welcome to</span>
            <span>Hydroseal Innovations</span>
          </motion.h1>
          
          <motion.p 
            className={styles.description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Kenya's premier experts in concrete and steel water tank solutions since 2015
          </motion.p>
          
          <motion.div 
            className={styles.ctaGroup}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/quote" className={styles.ctaPrimary}>
              Get a Free Quote
            </Link>
            <Link href="/services" className={styles.ctaSecondary}>
              View Services
            </Link>
          </motion.div>
        </div>
      </div>

      <div className={styles.projectGallery}>
        <div 
          className={styles.galleryTrack}
          ref={galleryRef}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          onMouseEnter={() => setIsAutoScrolling(false)}
          onMouseLeave={() => setIsAutoScrolling(true)}
        >
          {duplicatedProjects.map((project, index) => (
            <motion.div 
              key={`${project.id}-${index}`}
              className={styles.projectCard}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.6,
                type: 'spring',
                stiffness: 100
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={project.src}
                  alt={project.alt}
                  fill
                  className={styles.projectImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
              <div className={styles.projectOverlay}>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <Link 
                  href={project.link} 
                  className={styles.projectLink}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click from interfering
                  }}
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        <button 
          className={styles.navButton} 
          style={{ left: '1rem' }}
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          aria-label="Previous project"
        >
          <FaArrowLeft />
        </button>
        <button 
          className={styles.navButton} 
          style={{ right: '1rem' }}
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          aria-label="Next project"
        >
          <FaArrowRight />
        </button>
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
        <span>Scroll Down</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <FaChevronDown className={styles.arrow} />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;