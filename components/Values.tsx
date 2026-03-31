'use client';
import styles from '../styles/Values.module.scss';
import AOS from 'aos';
import { useEffect } from 'react';
import 'aos/dist/aos.css';

const Values = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const values = [
    {
      title: 'Quality Craftsmanship',
      description: 'We never compromise on materials or workmanship, using only the highest quality products for lasting results',
      icon: '🏆',
      aosDelay: 100
    },
    {
      title: 'Customer Focus',
      description: 'Your satisfaction drives every decision we make, with personalized solutions for each client',
      icon: '🤝',
      aosDelay: 200
    },
    {
      title: 'Innovation',
      description: 'We continually improve our techniques to provide cutting-edge water storage solutions',
      icon: '💡',
      aosDelay: 300
    },
    {
      title: 'Reliability',
      description: 'Consistent, dependable service with guaranteed results you can count on',
      icon: '⏱️',
      aosDelay: 400
    }
  ];

  return (
    <section className={styles.valuesSection} data-aos="fade-up">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Core Values</h2>
          <p className={styles.sectionSubtitle}>The principles that guide everything we do at Hydroseal Innovations</p>
        </div>
        
        <div className={styles.valuesGrid}>
          {values.map((value, index) => (
            <div 
              key={index} 
              className={styles.valueCard}
              data-aos="fade-up"
              data-aos-delay={value.aosDelay}
            >
              <div className={styles.cardContent}>
                <div className={styles.iconContainer}>
                  <span className={styles.icon}>{value.icon}</span>
                </div>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueDescription}>{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;