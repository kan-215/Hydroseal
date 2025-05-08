'use client';
import styles from '../../../styles/contact.module.scss';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaPaperPlane, 
  FaClock,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaLinkedinIn,
  FaWhatsapp
} from 'react-icons/fa';

const ContactPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Multi-select functionality
    const select = document.getElementById('services') as HTMLSelectElement;
    const selectedContainer = document.getElementById('selectedServices');

    const updateSelected = () => {
      if (!selectedContainer) return;
      
      selectedContainer.innerHTML = '';
      Array.from(select.selectedOptions).forEach(option => {
        const tag = document.createElement('span');
        tag.textContent = option.text;
        
        const removeBtn = document.createElement('button');
        removeBtn.textContent = '×';
        removeBtn.onclick = (e) => {
          e.preventDefault();
          option.selected = false;
          updateSelected();
        };
        
        tag.appendChild(removeBtn);
        selectedContainer.appendChild(tag);
      });
    };

    select?.addEventListener('change', updateSelected);
    return () => select?.removeEventListener('change', updateSelected);
  }, []);

  return (
    <div className={styles.contact}>
      <div className={styles.hero}>
        <h1 data-aos="fade-up">Get in Touch with Hydroseal Innovations</h1>
        <p data-aos="fade-up" data-aos-delay="100">
          Ready to design a new water tank or fix an existing one? Contact Hydroseal Innovations today for expert advice and fast service anywhere in Kenya.
        </p>
      </div>
      
      <div className={styles.grid}>
        <form data-aos="fade-right" className={styles.form}>
          <div className={styles.formGroup}>
            <input type="text" placeholder="Name" required />
          </div>
          <div className={styles.formGroup}>
            <input type="email" placeholder="Email" required />
          </div>
          <div className={styles.formGroup}>
            <input type="tel" placeholder="Phone" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="services">Services Needed (Select multiple)</label>
            <div className={styles.multiSelectContainer}>
              <select 
                id="services"
                multiple 
                required
                className={styles.multiSelect}
              >
                <option value="repair">Repair</option>
                <option value="design">Design & Construction</option>
                <option value="waterproofing">Waterproofing</option>
                <option value="cleaning">Cleaning</option>
                <option value="platform">Platform Construction</option>
                <option value="disinfecting">Disinfecting</option>
                <option value="neutralizing">Neutralizing</option>
              </select>
              <div className={styles.selectedItems} id="selectedServices"></div>
            </div>
          </div>
          <div className={styles.formGroup}>
            <textarea placeholder="Message" required rows={5} />
          </div>
          <button type="submit" className={styles.submitButton}>
            <FaPaperPlane className={styles.icon} />
            Submit Inquiry
          </button>
        </form>

        <div className={styles.info} data-aos="fade-left">
          <div className={styles.contactCard}>
            <h3>Contact Details</h3>
            <div className={styles.contactItem}>
              <FaPhone className={styles.contactIcon} />
              <div>
                <p>+254 799087048</p>
              </div>
            </div>
            <div className={styles.contactItem}>
              <FaEnvelope className={styles.contactIcon} />
              <div>
                <p>hydrosealinnovations@gmail.com</p>
              </div>
            </div>
            <div className={styles.contactItem}>
              <FaMapMarkerAlt className={styles.contactIcon} />
              <div>
                <p>Gatakaini House 2, Tom Mboya street<br />Nairobi, Kenya</p>
              </div>
            </div>
            <div className={styles.contactItem}>
              <FaClock className={styles.contactIcon} />
              <div>
                <p>Monday - Saturday<br />8:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>

          <div className={styles.socialLinks}>
            <h3>Follow Us</h3>
            <div className={styles.socialIcons}>
              <a href="https://twitter.com/hydrosealinno" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://facebook.com/HydrosealInnovations" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://instagram.com/hydro.sealinnovations" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://tiktok.com/@hydrosealinnovati" target="_blank" rel="noopener noreferrer">
                <FaTiktok />
              </a>
              <a href="https://linkedin.com/company/HydrosealInnovations" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
              </a>
              <a href="https://wa.me/254799087048" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          <div className={styles.mapContainer}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8135999999996!2d36.8219!3d-1.2916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnMjkuOCJTIDM2wrA0OScxOS4xIkU!5e0!3m2!1sen!2ske!4v1620000000000!5m2!1sen!2ske"
              width="100%"
              height="300"
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