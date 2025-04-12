import styles from '../styles/whyChooseUs.module.scss';
import Link from 'next/link';

const WhyChooseUs = () => {
  const benefits = [
    {
      icon: '🔧',
      title: 'Industry Expertise',
      description: 'Specialized knowledge in tank design, construction, and platform engineering',
      detail: 'Our team brings decades of combined experience in water storage solutions'
    },
    {
      icon: '🧱',
      title: 'Advanced Techniques',
      description: 'Cutting-edge repair and waterproofing methods',
      detail: 'Using the latest materials and technologies for lasting results'
    },
    {
      icon: '🚿',
      title: 'Quality Commitment',
      description: 'Dedicated to water safety and purity standards',
      detail: 'We follow strict protocols to ensure your water remains clean and safe'
    },
    {
      icon: '⚡',
      title: 'Reliable Service',
      description: 'Prompt nationwide coverage across Kenya',
      detail: 'Quick response times with teams available throughout the country'
    }
  ];

  return (
    <section className={styles.whyChooseUs}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Why Choose Hydroseal Innovations?</h2>
          <p className={styles.sectionSubtitle}>Kenya's trusted water tank specialists</p>
        </div>
        
        <div className={styles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <div key={index} className={styles.benefitCard}>
              <div className={styles.benefitIcon}>{benefit.icon}</div>
              <h3 className={styles.benefitTitle}>{benefit.title}</h3>
              <p className={styles.benefitDescription}>{benefit.description}</p>
              <p className={styles.benefitDetail}>{benefit.detail}</p>
            </div>
          ))}
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