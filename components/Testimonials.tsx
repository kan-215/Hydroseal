import styles from '../styles/testimonials.module.scss';
import { useContent } from '../src/contexts/ContentContext';

const defaultTestimonials = [
  {
    text: "Hydroseal repaired our leaking concrete tank in a day! We've saved so much water since. Highly recommended!",
    name: "Miriam K.",
    role: "Nairobi",
  },
  {
    text: "Professional service and solid construction. Our elevated steel platform was built in just 3 days.",
    name: "Peter M.",
    role: "Kisumu",
  },
  {
    text: "Our company tanks were disinfected and sealed perfectly. Reliable and knowledgeable team.",
    name: "Diana O.",
    role: "Eldoret",
  }
];

const Testimonials = () => {
  const { testimonials: supabaseTestimonials, loading } = useContent();
  const testimonials = supabaseTestimonials.length > 0 ? supabaseTestimonials : defaultTestimonials;

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
              <div className={styles.quoteIcon}>&ldquo;</div>
              <p className={styles.testimonialText}>{testimonial.text}</p>
              <div className={styles.testimonialMeta}>
                <span className={styles.author}>{testimonial.name}</span>
                <span className={styles.location}>{testimonial.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default Testimonials;
