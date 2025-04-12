'use client';
import { 
  FaTwitter, 
  FaFacebookF, 
  FaInstagram, 
  FaTiktok, 
  FaLinkedinIn, 
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaPaperPlane
} from 'react-icons/fa';
import styles from '../styles/footer.module.scss';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <div className={styles.brandInfo}>
            <h3 className={styles.brandName}>Hydroseal Innovations</h3>
            <p className={styles.brandTagline}>Effective Water Tank Solutions in Kenya</p>
            <div className={styles.contactInfo}>
              <p><FaMapMarkerAlt className={styles.icon} /> Gatakaini House 2, Tom Mboya Street, Nairobi</p>
              <p><FaPhone className={styles.icon} /> <a href="tel:+254799087048">+254 799087048</a></p>
              <p><FaEnvelope className={styles.icon} /> <a href="mailto:hydrosealinnovations@gmail.com">hydrosealinnovations@gmail.com</a></p>
            </div>
          </div>

          <div className={styles.links}>
            <h4 className={styles.linksTitle}>Quick Links</h4>
            <Link href="/" className={styles.link}>Home</Link>
            <Link href="/services" className={styles.link}>Services</Link>
            <Link href="/about" className={styles.link}>About Us</Link>
            <Link href="/contact" className={styles.link}>Contact</Link>
            <Link href="/quote" className={styles.link}>Get Quote</Link>
          </div>

          <div className={styles.services}>
            <h4 className={styles.linksTitle}>Our Services</h4>
            <Link href="/services#repair" className={styles.link}>Tank Repair</Link>
            <Link href="/services#construction" className={styles.link}>Tank Construction</Link>
            <Link href="/services#platforms" className={styles.link}>Platform Building</Link>
            <Link href="/services#waterproofing" className={styles.link}>Waterproofing</Link>
            <Link href="/services#cleaning" className={styles.link}>Cleaning & Disinfection</Link>
          </div>

          <div className={styles.social}>
            <h4 className={styles.linksTitle}>Follow Us</h4>
            <div className={styles.socialIcons}>
              <a href="https://x.com/hydrosealinno" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Twitter">
                <FaTwitter className={styles.socialIconSvg} />
              </a>
              <a href="https://facebook.com/hydrosealinnovations" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
                <FaFacebookF className={styles.socialIconSvg} />
              </a>
              <a href="https://instagram.com/hydro.sealinnovations" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
                <FaInstagram className={styles.socialIconSvg} />
              </a>
              <a href="https://tiktok.com/@hydrosealinnovati" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="TikTok">
                <FaTiktok className={styles.socialIconSvg} />
              </a>
              <a href="https://linkedin.com/company/hydroseal-innovations" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
                <FaLinkedinIn className={styles.socialIconSvg} />
              </a>
              <a href="https://wa.me/254799087048" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="WhatsApp">
                <FaWhatsapp className={styles.socialIconSvg} />
              </a>
            </div>
            <div className={styles.newsletter}>
              <p>Subscribe to our newsletter</p>
              <form className={styles.newsletterForm}>
                <input type="email" placeholder="Your email address" required />
                <button type="submit">
                  <FaPaperPlane className={styles.newsletterIcon} />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} Hydroseal Innovations. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <Link href="/privacy-policy" className={styles.legalLink}>Privacy Policy</Link>
            <Link href="/terms-of-service" className={styles.legalLink}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;