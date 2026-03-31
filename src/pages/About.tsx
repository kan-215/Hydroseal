import { Link } from 'react-router-dom';
import styles from '../../styles/about.module.scss';
import AOS from 'aos';
import { useEffect } from 'react';
import 'aos/dist/aos.css';
import { useContent } from '../contexts/ContentContext';

const defaultAbout = {
  hero_title: 'About Hydroseal Innovations',
  mission_title: 'Our Mission',
  mission_text: "At Hydroseal Innovations, we're transforming water storage in Kenya. From designing custom tanks and building solid platforms to repairing and maintaining existing systems, we ensure safe, efficient water access for all. Water is life, and we make it last with expert solutions.",
  what_we_do_title: 'What We Do',
  what_we_do_text: 'Based in Kenya, we provide end-to-end services for concrete and steel water tanks and platforms: innovative designs, new construction, stable foundations, and maintenance to address water loss, contamination, and infrastructure needs. Our skilled team serves homes, businesses, and industries nationwide.',
  promise_title: 'Our Promise',
  promise_items: [
    'Cutting-edge tank design and platform construction',
    'Compliance with Kenyan water safety and building standards',
    'Customer-focused service with a satisfaction guarantee',
  ],
  cta_text: 'Learn More About Our Process',
};

const AboutPage = () => {
  const { siteSettings, loading } = useContent();
  const content = siteSettings['about_content'] || defaultAbout;

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);


  return (
    <main className={styles.aboutPage}>
      <section className={styles.hero} data-aos="fade-down">
        <h1>{content.hero_title}</h1>
      </section>

      <div className={styles.contentContainer}>
        <section className={styles.content}>
          <div className={styles.mission} data-aos="fade-up">
            <h2>{content.mission_title}</h2>
            <p>{content.mission_text}</p>
          </div>

          <div className={styles.whatWeDo} data-aos="fade-up" data-aos-delay="100">
            <h2>{content.what_we_do_title}</h2>
            <p>{content.what_we_do_text}</p>
          </div>

          <div className={styles.promise} data-aos="fade-up" data-aos-delay="200">
            <h2>{content.promise_title}</h2>
            <ul>
              {content.promise_items.map((item: string, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <section className={styles.cta} data-aos="fade-up">
        <Link to="/services" className={styles.ctaButton}>{content.cta_text}</Link>
      </section>
    </main>

  );
};

export default AboutPage;
