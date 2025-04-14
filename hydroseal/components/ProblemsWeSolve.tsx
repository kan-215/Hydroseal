import styles from '../styles/problemsWeSolve.module.scss';

const ProblemsWeSolve = () => {
  const problems = [
    {
      icon: '💧',
      title: 'Water Waste',
      description: 'Leaking tanks wasting precious water resources',
      solution: 'Our advanced repair techniques stop leaks permanently'
    },
    {
      icon: '⚠️',
      title: 'Health Risks',
      description: 'Contaminated water risking your family&apos;s health',
      solution: 'Professional cleaning & disinfection for safe drinking water'
    },
    {
      icon: '🏗️',
      title: 'Custom Solutions',
      description: 'Need a custom tank or stable platform?',
      solution: 'Tailored designs built to your specifications and local conditions'
    }
  ];

  return (
    <section className={styles.problemsSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Key Problems We Solve</h2>
          <p className={styles.sectionSubtitle}>
            Hydroseal Innovations delivers expert solutions tailored to Kenya&apos;s water storage challenges
          </p>
        </div>
        
        <div className={styles.problemsGrid}>
          {problems.map((problem, index) => (
            <div key={index} className={styles.problemCard}>
              <div className={styles.problemIcon}>{problem.icon}</div>
              <h3 className={styles.problemTitle}>{problem.title}</h3>
              <p className={styles.problemDescription}>{problem.description}</p>
              <div className={styles.solution}>
                <span className={styles.solutionLabel}>Our Solution:</span>
                <p>{problem.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemsWeSolve;