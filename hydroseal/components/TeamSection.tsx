'use client';
import styles from '../styles/TeamSection.module.scss'
import AOS from 'aos';
import { useEffect } from 'react';
import 'aos/dist/aos.css';

const TeamSection = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const teamMembers = [
    {
      name: 'John Kamau',
      role: 'Founder & CEO',
      bio: '15+ years experience in water tank engineering',
      img: '/team/john.jpg'
    },
    {
      name: 'Sarah Mwangi',
      role: 'Operations Manager',
      bio: 'Specializes in project management and quality control',
      img: '/team/sarah.jpg'
    },
    {
      name: 'David Ochieng',
      role: 'Lead Engineer',
      bio: 'Expert in concrete and steel tank construction',
      img: '/team/david.jpg'
    }
  ];

  return (
    <section className={styles.teamSection} data-aos="fade-up">
      <div className={styles.container}>
        <h2>Our Expert Team</h2>
        <p className={styles.subtitle}>Meet the professionals behind Hydroseal Innovations</p>
        
        <div className={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className={styles.teamCard}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className={styles.imageContainer}>
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className={styles.teamImage}
                />
              </div>
              <h3>{member.name}</h3>
              <p className={styles.role}>{member.role}</p>
              <p className={styles.bio}>{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;