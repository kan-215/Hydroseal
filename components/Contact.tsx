'use client';
import styles from '../styles/contact.module.scss';

const Contact = () => {
  return (
    <section className={styles.contact}>
      <div className={styles.container}>
        <h2>Get in Touch with Hydroseal Innovations</h2>
        <p>Ready to design a new water tank or fix an existing one? Contact us today for expert advice and fast service anywhere in Kenya.</p>

        <div className={styles.infoForm}>
          <div className={styles.details}>
            <p><strong>Phone:</strong> <a href="tel:+254799087048">+254 799087048</a></p>
            <p><strong>Email:</strong> <a href="mailto:hydrosealinnovations@gmail.com">hydrosealinnovations@gmail.com</a></p>
            <p><strong>Address:</strong> Gatakaini House 2, Tom Mboya Street, Nairobi, Kenya</p>
            <p><strong>Hours:</strong> Mon - Sat, 8:00 AM - 6:00 PM</p>

            <iframe
              className={styles.map}
              src="https://www.openstreetmap.org/export/embed.html?bbox=36.8172%2C-1.2921%2C36.8272%2C-1.2821&amp;layer=mapnik"
              title="Hydroseal Map"
              loading="lazy"
            ></iframe>
          </div>

          <form className={styles.form}>
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <input type="tel" placeholder="Phone" required />
            <select required>
              <option value="">Select Service</option>
              <option value="Repair">Repair</option>
              <option value="Design & Construction">Design & Construction</option>
              <option value="Waterproofing">Waterproofing</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Disinfecting">Disinfecting</option>
              <option value="Neutralizing">Neutralizing</option>
            </select>
            <textarea placeholder="Message" rows={4} required />
            <button type="submit">Submit Inquiry</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
