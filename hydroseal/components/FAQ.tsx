import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import styles from '../styles/faq.module.scss'

const defaultQuestions = [
  {
    question: "What types of water tanks do you repair?",
    answer: "We specialize in both concrete and steel water tank repairs. Our services include fixing cracks, leaks, and corrosion in all types of water storage tanks, using techniques like crack injection, welding, and patching."
  },
  {
    question: "How long does a typical tank repair take?",
    answer: "Most standard repairs are completed within 1-3 days, depending on the extent of damage. Small leaks can often be fixed in a single day, while more extensive corrosion or structural issues may require additional time."
  },
  {
    question: "Do you offer tank cleaning and disinfection services?",
    answer: "Yes, we provide comprehensive cleaning and disinfection services to remove sediment, algae, and harmful bacteria. Our process includes thorough scrubbing, high-pressure washing, and industry-standard disinfection to ensure your water is safe for use."
  },
  {
    question: "Why should I consider building a tank platform?",
    answer: "Tank platforms elevate your water storage for better water pressure, protect against ground moisture and contamination, and provide stability. We design custom platforms tailored to your tank size and property terrain, ensuring optimal performance."
  },
  {
    question: "What areas in Kenya do you serve?",
    answer: "We provide our water tank services nationwide across Kenya, including Nairobi, Mombasa, Kisumu, Nakuru, and all surrounding regions. Our mobile teams can reach both urban and rural locations."
  }
];

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  questions?: FAQItem[];
  title?: string;
  description?: string;
  emptyMessage?: string;
}

const FAQ = ({ 
  questions = defaultQuestions, // Default questions now included
  title = "Frequently Asked Questions", 
  description = "Get answers about our water tank services in Kenya",
  emptyMessage = "We're compiling our most common questions. Check back soon or contact us directly for assistance."
}: FAQProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.faqHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        {description && <p className={styles.sectionDescription}>{description}</p>}
      </div>
      
      {questions.length > 0 ? (
        <div className={styles.faqContainer}>
          {questions.map((item, index) => (
            <div 
              key={index} 
              className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
              aria-expanded={activeIndex === index}
            >
              <button 
                className={styles.faqQuestion}
                onClick={() => toggleQuestion(index)}
                aria-controls={`faq-answer-${index}`}
              >
                <span className={styles.questionText}>{item.question}</span>
                <span className={styles.chevron}>
                  {activeIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                </span>
              </button>
              
              <div 
                id={`faq-answer-${index}`}
                className={styles.faqAnswer}
                style={{
                  maxHeight: activeIndex === index ? '500px' : '0'
                }}
              >
                <div className={styles.answerContent}>
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className={styles.emptyMessage}>{emptyMessage}</p>
          <a href="/contact" className={styles.contactLink}>Contact Us</a>
        </div>
      )}
    </section>
  );
};

export default FAQ;