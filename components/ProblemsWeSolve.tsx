import styles from '../styles/problemsWeSolve.module.scss';

const ProblemsWeSolve = () => {
  return (
    <section className={styles.problemsSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Key Problems We Solve</h2>
        </div>
        
        <div className={styles.problemsList}>
          <ul>
            <li>Leaking tanks wasting precious water?</li>
            <li>Contaminated water risking your health?</li>
            <li>Need a custom tank or stable platform?</li>
          </ul>
          <p className={styles.solutionStatement}>
            Hydroseal Innovations delivers expert solutions tailored to Kenya&apos;s water storage challenges.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemsWeSolve;
