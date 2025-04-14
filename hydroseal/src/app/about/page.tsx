'use client';
import styles from '../../../styles/about.module.scss';
import AOS from 'aos';
import { useEffect } from 'react';
import 'aos/dist/aos.css';
import Values from '../../../components/Values';

const AboutPage = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <main className={styles.aboutPage}>
      <section className={styles.hero} data-aos="fade-down">
        <h1>About Hydroseal Innovations</h1>
        <p>Transforming water storage in Kenya through innovative solutions</p>
      </section>

      <div className={styles.contentContainer}>
        <section className={styles.content}>
          <div className={styles.history} data-aos="fade-up">
            <h2>Our Story</h2>
            <p>
              Founded in 2015 in Nairobi, Hydroseal Innovations began as a small team of water tank specialists 
              with a vision to improve water storage solutions across Kenya. Today, we serve clients nationwide, 
              from residential homes to large industrial facilities.
            </p>
            <p>
              Our journey has been marked by continuous innovation in concrete and steel tank technologies, 
              establishing us as leaders in the water infrastructure sector.
            </p>
          </div>

          <div className={styles.mission} data-aos="fade-up" data-aos-delay="100">
            <h2>Our Mission</h2>
            <p>
              To provide reliable, sustainable, and affordable water storage solutions that meet the diverse 
              needs of our clients while adhering to the highest quality standards.
            </p>
          </div>

          <div className={styles.vision} data-aos="fade-up" data-aos-delay="200">
            <h2>Our Vision</h2>
            <p>
              To be East Africa&apos;s premier water storage solutions provider, recognized for innovation, 
              quality craftsmanship, and exceptional customer service.
            </p>
          </div>
        </section>
      </div>

      <Values />

      <section className={styles.cta} data-aos="fade-up">
        <h2>Want to learn more about our work?</h2>
        <a href="/contact" className={styles.ctaButton}>Contact Us Today</a>
      </section>
    </main>
  );
};

export default AboutPage;