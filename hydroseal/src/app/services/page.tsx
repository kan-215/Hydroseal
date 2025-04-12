'use client';
import styles from '../../../styles/services.module.scss';
import AOS from 'aos';
import { useEffect } from 'react';
import 'aos/dist/aos.css';
import { FaWater, FaTools, FaBuilding, FaBroom, FaShieldAlt, FaClipboardCheck } from 'react-icons/fa';

const ServicesPage = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const services = [
    {
      title: 'Water Tank Construction',
      description: 'Custom designs and construction of concrete and steel tanks for residential, commercial, or industrial needs.',
      icon: <FaBuilding className={styles.serviceIcon} />,
      keywords: ['water tank design Kenya', 'custom tank construction']
    },
    {
      title: 'Tank Repair & Maintenance',
      description: 'Fix cracks, leaks, and corrosion with expert crack injection, welding, and patching.',
      icon: <FaTools className={styles.serviceIcon} />,
      keywords: ['water tank repair Kenya', 'concrete tank leak repair']
    },
    {
      title: 'Platform Building',
      description: 'Build durable, elevated platforms to support water tanks, ensuring stability and optimal water flow.',
      icon: <FaWater className={styles.serviceIcon} />,
      keywords: ['water tank platform Kenya', 'tank stand construction']
    },
    {
      title: 'Tank Cleaning Services',
      description: 'Remove sediment, algae, and biofilm to restore water quality and maintain hygiene standards.',
      icon: <FaBroom className={styles.serviceIcon} />,
      keywords: ['water tank cleaning Kenya', 'tank maintenance services']
    },
    {
      title: 'Waterproofing Solutions',
      description: 'Prevent leaks with advanced coatings and linings for lasting protection against water damage.',
      icon: <FaShieldAlt className={styles.serviceIcon} />,
      keywords: ['tank waterproofing Kenya', 'concrete tank sealing']
    },
    {
      title: 'Consultation & Inspection',
      description: 'Professional assessments and recommendations for your water storage system optimization.',
      icon: <FaClipboardCheck className={styles.serviceIcon} />,
      keywords: ['water tank inspection', 'tank expert Kenya']
    }
  ];

  return (
    <main className={styles.servicesPage}>
      <section className={styles.hero} data-aos="fade-down">
        <h1>Our Comprehensive Services</h1>
        <p>Expert solutions for all your water storage needs across Kenya</p>
      </section>

      <div className={styles.servicesContainer}>
        <section className={styles.servicesGrid}>
          {services.map((service, index) => (
            <div 
              key={index} 
              className={styles.serviceCard}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className={styles.iconContainer}>
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className={styles.keywords}>
                {service.keywords.map((keyword, i) => (
                  <span key={i}>{keyword}</span>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>

      <section className={styles.ctaSection} data-aos="fade-up">
        <a href="/contact" className={styles.ctaButton}>
          Request Service Now
          <span className={styles.buttonArrow}>→</span>
        </a>
      </section>
    </main>
  );
};

export default ServicesPage;