import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/portfolio.module.scss';
import { useContent } from '../src/contexts/ContentContext';

const defaultProjects = [
  {
    id: '1',
    title: "Concrete Tank",
    description: "Fixed cracks and leaks in residential water tanks using advanced injection techniques",
    image: "/concreate1.jpg",
    tags: ["Repair", "Concrete"]
  },
  {
    id: '2',
    title: "Steel Tank Installation",
    description: "Installed durable steel water tanks for industrial clients",
    image: "/steel1.jpg",
    tags: ["Installation", "Steel"]
  },
  {
    id: '3',
    title: "Waterproofing Solution",
    description: "Applied protective coatings to prevent future leaks",
    image: "/waterproofing1.jpeg",
    tags: ["Waterproofing", "Maintenance"]
  },
  {
    id: '4',
    title: "Tank Cleaning",
    description: "Professional cleaning and disinfection services",
    image: "/cleaning.jpg",
    tags: ["cleaning", "Disinfection"]
  },
  {
    id: '5',
    title: "Custom Tank Design",
    description: "Built tailored water storage solutions",
    image: "/installation.jpg",
    tags: ["Construction", "Design"]
  },
  {
    id: '6',
    title: "Platform Construction",
    description: "Built stable elevated platforms for water tanks",
    image: "/platform.jpeg",
    tags: ["Platform", "Construction"]
  }
];

const Portfolio = () => {
  const { projects: supabaseProjects, loading } = useContent();
  const projects = supabaseProjects.length > 0 ? supabaseProjects : defaultProjects;
  
  const [filter, setFilter] = useState("All Projects");

  const serviceTypes = [
    "All Projects",
    "Repair",
    "Installation",
    "Waterproofing",
    "Cleaning",
    "Construction"
  ];

  const filteredProjects = filter === "All Projects" 
    ? projects 
    : projects.filter(project => project.tags?.includes(filter));


  return (
    <section className={styles.portfolio}>
      <div className={styles.container}>
        <h2 className={styles.title}>Our Work</h2>
        <p className={styles.subtitle}>Quality water tank solutions</p>

        <div className={styles.filterButtons}>
          {serviceTypes.map((type) => (
            <button
              key={type}
              className={`${styles.filterButton} ${filter === type ? styles.active : ''}`}
              onClick={() => setFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <div className={styles.projectsGrid}>
          {filteredProjects.map((project, index) => (
            <div key={project.id} className={styles.projectCard}>
              <div className={styles.imageContainer}>
                <img
                  src={project.image}
                  alt={project.title}
                  className={styles.projectImage}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              
              <div className={styles.projectInfo}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className={styles.tags}>
                  {project.tags.map(tag => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link to="/contact" className={styles.ctaButton}>
          Get Your Free Estimate
        </Link>
      </div>
    </section>
  );
};

export default Portfolio;