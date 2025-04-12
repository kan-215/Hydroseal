'use client';

import { useState } from 'react'; // Import useState from React
import styles from '../../../styles/quote.module.scss';

const QuotePage = () => {
  // form state variables
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [services, setServices] = useState<string[]>([]);
  const [showServices, setShowServices] = useState(false); // State to control service dropdown visibility

  const serviceOptions = [
    'Tank Repair',
    'Tank Cleaning',
    'Tank Construction',
    'Tank Platform Building',
    'Waterproofing',
  ];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const emailBody = `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Services: ${services.join(', ')}
    `;

    const mailtoLink = `mailto:hydrosealinnovations@gmail.com?subject=Free Quote Request&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Request a Free Quote</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.formLabel}>Full Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.formLabel}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.formLabel}>Phone:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="services" className={styles.formLabel}>Select Services:</label>
          <button
            type="button"
            onClick={() => setShowServices(!showServices)}
            className={styles.toggleButton}
          >
            {showServices ? 'Hide Services' : 'Show Services'}
          </button>
          {showServices && (
            <select
              id="services"
              multiple
              value={services}
              onChange={(e) => setServices(Array.from(e.target.selectedOptions, (option) => option.value))}
              required
              className={styles.servicesSelect}
            >
              {serviceOptions.map((service, index) => (
                <option key={index} value={service}>
                  {service}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className={styles.formGroup}>
          <button type="submit" className={styles.submitButton}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default QuotePage;
