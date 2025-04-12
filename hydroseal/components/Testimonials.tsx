import styles from '../styles/testimonials.module.scss';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Hydroseal repaired our leaking concrete tank in a day! We've saved so much water since. Highly recommended!",
      author: "Miriam K.",
      location: "Nairobi",
      service: "Tank Repair"
    },
    {
      quote: "Professional service and solid construction. Our elevated steel platform was built in just 3 days.",
      author: "Peter M.",
      location: "Kisumu",
      service: "Platform Construction"
    },
    {
      quote: "Our company tanks were disinfected and sealed perfectly. Reliable and knowledgeable team.",
      author: "Diana O.",
      location: "Eldoret",
      service: "Cleaning & Disinfection"
    }
  ];

  return (
    <section className={styles.testimonials}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>What Our Clients Say</h2>
          <p className={styles.sectionSubtitle}>Trusted by homeowners and businesses across Kenya</p>
        </div>
        
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.testimonialCard}>
              <div className={styles.quoteIcon}>"</div>
              <p className={styles.testimonialText}>{testimonial.quote}</p>
              <div className={styles.testimonialMeta}>
                <span className={styles.author}>{testimonial.author}</span>
                <span className={styles.location}>{testimonial.location}</span>
                <span className={styles.service}>{testimonial.service}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;