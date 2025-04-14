'use client';
import styles from '../../../styles/contact.module.scss';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

const ContactPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className={styles.contact}>
      <div className={styles.hero}>
        <h1 data-aos="fade-up">Get In Touch</h1>
        <p data-aos="fade-up" data-aos-delay="100">
          We&apos;re ready to help with all your water tank needs. Reach out today.
        </p>
      </div>
      
      <div className={styles.grid}>
        <form data-aos="fade-right" className={styles.form}>
          <div className={styles.formGroup}>
            <input type="text" placeholder="Full Name" required />
          </div>
          <div className={styles.formGroup}>
            <input type="email" placeholder="Email Address" required />
          </div>
          <div className={styles.formGroup}>
            <input type="tel" placeholder="Phone Number" />
          </div>
          <div className={styles.formGroup}>
            <select>
              <option value="">Select Service</option>
              <option value="repair">Tank Repair</option>
              <option value="construction">Tank Construction</option>
              <option value="cleaning">Cleaning &amp; Disinfection</option>
              <option value="waterproofing">Waterproofing</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <textarea placeholder="Your Message" required rows={5} />
          </div>
          <button type="submit" className={styles.submitButton}>
            <FaPaperPlane className={styles.icon} />
            Send Message
          </button>
        </form>

        <div className={styles.info} data-aos="fade-left">
          <div className={styles.contactCard}>
            <h3>Our Office</h3>
            <div className={styles.contactItem}>
              <FaMapMarkerAlt className={styles.contactIcon} />
              <div>
                <p className={styles.contactLabel}>Address</p>
                <p>Gatakaini House 2, Tom Mboya Street<br />Nairobi, Kenya</p>
              </div>
            </div>
            <div className={styles.contactItem}>
              <FaPhone className={styles.contactIcon} />
              <div>
                <p className={styles.contactLabel}>Phone</p>
                <p><a href="tel:+254799087048">+254 799 087 048</a></p>
              </div>
            </div>
            <div className={styles.contactItem}>
              <FaEnvelope className={styles.contactIcon} />
              <div>
                <p className={styles.contactLabel}>Email</p>
                <p><a href="mailto:hydrosealinnovations@gmail.com">hydrosealinnovations@gmail.com</a></p>
              </div>
            </div>
          </div>

          <div className={styles.mapContainer}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8135999999996!2d36.8219!3d-1.2916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnMjkuOCJTIDM2wrA0OScxOS4xIkU!5e0!3m2!1sen!2ske!4v1620000000000!5m2!1sen!2ske"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;