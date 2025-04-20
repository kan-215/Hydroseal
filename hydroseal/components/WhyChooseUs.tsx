import styles from '../styles/whyChooseUs.module.scss';
import Link from 'next/link';

const WhyChooseUs = () => {
  return (
    <section className={styles.whyChooseUs}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Why Choose Us?</h2>
        </div>
        
        <div className={styles.benefitsList}>
          <ul>
            <li>Expertise in tank design, construction, and platforms</li>
            <li>Advanced repair and waterproofing techniques</li>
            <li>Commitment to water safety and quality</li>
            <li>Fast, reliable service nationwide</li>
          </ul>
        </div>

        <div className={styles.ctaContainer}>
          <Link href="/services" className={styles.primaryButton}>
            Explore Our Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;