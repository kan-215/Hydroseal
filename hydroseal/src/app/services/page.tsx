'use client';
import styles from '../../../styles/services.module.scss';
import AOS from 'aos';
import { useEffect } from 'react';
import 'aos/dist/aos.css';
import { FaTools, FaBuilding, FaWater, FaShieldAlt, FaBroom, FaFlask, FaFilter } from 'react-icons/fa';

const ServicesPage = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const services = [
    {
      title: 'Tank Repair',
      description: 'Fix cracks, leaks, and corrosion with expert crack injection, welding, and patching.',
      icon: <FaTools className={styles.serviceIcon} />,
      keywords: ['water tank repair Kenya', 'concrete tank leak repair', 'steel tank welding']
    },
    {
      title: 'Tank Design & Construction',
      description: 'Custom designs and construction of concrete and steel tanks to meet your specific needs—residential, commercial, or industrial.',
      icon: <FaBuilding className={styles.serviceIcon} />,
      keywords: ['water tank design Kenya', 'custom tank construction', 'steel tank builders']
    },
    {
      title: 'Water Tank Platform Construction',
      description: 'Build durable, elevated platforms to support water tanks, ensuring stability and optimal water flow.',
      icon: <FaWater className={styles.serviceIcon} />,
      keywords: ['water tank platform Kenya', 'tank stand construction', 'elevated tank platforms']
    },
    {
      title: 'Waterproofing',
      description: 'Prevent leaks with advanced coatings and linings for lasting protection.',
      icon: <FaShieldAlt className={styles.serviceIcon} />,
      keywords: ['tank waterproofing Kenya', 'concrete tank sealing', 'steel tank coatings']
    },
    {
      title: 'Cleaning',
      description: 'Remove sediment, algae, and biofilm to restore water quality.',
      icon: <FaBroom className={styles.serviceIcon} />,
      keywords: ['water tank cleaning Kenya', 'tank maintenance services', 'clean water storage']
    },
    {
      title: 'Disinfecting',
      description: 'Eliminate pathogens for safe, potable water with industry-standard disinfection.',
      icon: <FaFlask className={styles.serviceIcon} />,
      keywords: ['tank disinfection Kenya', 'water safety solutions', 'potable water treatment']
    },
    {
      title: 'Neutralizing',
      description: 'Protect water purity by treating tank surfaces against chemical leaching.',
      icon: <FaFilter className={styles.serviceIcon} />,
      keywords: ['tank neutralizing Kenya', 'water quality maintenance', 'safe water storage']
    }
  ];

  return (
    <main className={styles.servicesPage}>
      <section className={styles.hero} data-aos="fade-down">
        <h1>Comprehensive Water Tank Services in Kenya</h1>
        <p>At Hydroseal Innovations, we specialize in designing, building, and maintaining concrete and steel water tanks and their platforms. Explore our full range of services to save water, ensure safety, and create robust storage solutions across Kenya.</p>
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
        <p className={styles.subtext}>Need a new tank, platform, or repair? Contact us for fast, affordable solutions.</p>
        <a href="/contact" className={styles.ctaButton}>
          Request Service Now
        </a>
      </section>
    </main>
  );
};

export default ServicesPage;