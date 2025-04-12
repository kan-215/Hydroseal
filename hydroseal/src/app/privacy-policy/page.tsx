import styles from '../../../styles/privacy.module.scss';

const PrivacyPolicyPage = () => {
  return (
    <main className={styles.privacyPage}>
      <div className={styles.container}>
        <h1>Privacy Policy</h1>
        <div className={styles.content}>
          <section>
            <h2>Information We Collect</h2>
            <p>We collect information when you contact us through forms, including your name, email, and phone number.</p>
          </section>
          
          <section>
            <h2>How We Use Your Information</h2>
            <p>Your information is used solely to respond to your inquiries and provide our services.</p>
          </section>
          
          <section>
            <h2>Data Protection</h2>
            <p>We implement security measures to protect your personal information.</p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicyPage; // Make sure to export as default