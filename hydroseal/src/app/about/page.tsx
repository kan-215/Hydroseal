'use client';
import styles from '../../../styles/about.module.scss';
import AOS from 'aos';
import { useEffect } from 'react';
import 'aos/dist/aos.css';

const AboutPage = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <main className={styles.aboutPage}>
      <section className={styles.hero} data-aos="fade-down">
        <h1>About Hydroseal Innovations</h1>
      </section>

      <div className={styles.contentContainer}>
        <section className={styles.content}>
          <div className={styles.mission} data-aos="fade-up">
            <h2>Our Mission</h2>
            <p>
              At Hydroseal Innovations, we're transforming water storage in Kenya. From designing custom tanks and building solid platforms to repairing and maintaining existing systems, we ensure safe, efficient water access for all. Water is life, and we make it last with expert solutions.
            </p>
          </div>

          <div className={styles.whatWeDo} data-aos="fade-up" data-aos-delay="100">
            <h2>What We Do</h2>
            <p>
              Based in Kenya, we provide end-to-end services for concrete and steel water tanks and platforms: innovative designs, new construction, stable foundations, and maintenance to address water loss, contamination, and infrastructure needs. Our skilled team serves homes, businesses, and industries nationwide.
            </p>
          </div>

          <div className={styles.promise} data-aos="fade-up" data-aos-delay="200">
            <h2>Our Promise</h2>
            <ul>
              <li>Cutting-edge tank design and platform construction</li>
              <li>Compliance with Kenyan water safety and building standards</li>
              <li>Customer-focused service with a satisfaction guarantee</li>
            </ul>
          </div>
        </section>
      </div>

      <section className={styles.cta} data-aos="fade-up">
        <a href="/services" className={styles.ctaButton}>Learn More About Our Process</a>
      </section>
    </main>
  );
};

export default AboutPage;