import styles from '../../../styles/terms.module.scss';

const TermsOfServicePage = () => {
  return (
    <main className={styles.termsPage}>
      <div className={styles.container}>
        <h1>Terms of Service</h1>
        <div className={styles.content}>
          <section>
            <h2>Service Agreement</h2>
            <p>By using our services, you agree to these terms and conditions.</p>
          </section>
          
          <section>
            <h2>Limitations</h2>
            <p>Hydroseal Innovations is not liable for damages resulting from improper tank use.</p>
          </section>
          
          <section>
            <h2>Payment Terms</h2>
            <p>All services require 50% deposit before work begins.</p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default TermsOfServicePage; // Make sure to export as default