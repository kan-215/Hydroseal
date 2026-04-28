import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { blogPosts as localBlogPosts } from '../data/blogData';
import styles from '../../styles/blog.module.scss';
import { FaCalendarAlt, FaUser, FaArrowRight } from 'react-icons/fa';
import { useContent } from '../contexts/ContentContext';


const Blog: React.FC = () => {
  const { blogPosts, loading } = useContent();
  const posts = blogPosts.length > 0 ? blogPosts : localBlogPosts;

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className={styles.blogPage}>
      <header className={styles.header} data-aos="fade-down">
        <h1>Hydroseal Innovations Blog</h1>
        <p>Insights, updates, and expert advice on water storage solutions, maintenance, and community projects across Kenya.</p>
      </header>

      <div className={styles.blogGrid}>
        {posts.map((post, index) => (
          <Link 
            to={`/blog/${post.id}`} 
            key={post.id} 
            className={styles.blogCard}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className={styles.imageContainer}>
              <img src={post.image || '/blog-placeholder.jpg'} alt={post.title} />
            </div>
            <div className={styles.content}>
              <div className={styles.date}>
                <FaCalendarAlt /> {post.date}
              </div>
              <h2>{post.title}</h2>
              <p className={styles.excerpt}>
                {(() => {
                  const parts = (post.excerpt || '').split(/(\*\*.*?\*\*|\*.*?\*)/g);
                  return parts.map((part, i) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return <strong key={i}>{part.slice(2, -2)}</strong>;
                    }
                    if (part.startsWith('*') && part.endsWith('*')) {
                      return <em key={i}>{part.slice(1, -1)}</em>;
                    }
                    return part;
                  });
                })()}
              </p>
              <div className={styles.readMore}>
                Read Full Article <FaArrowRight />
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
};

export default Blog;
