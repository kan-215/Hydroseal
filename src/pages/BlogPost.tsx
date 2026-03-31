import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts as localBlogPosts } from '../data/blogData';
import styles from '../../styles/blog.module.scss';
import { FaCalendarAlt, FaUser, FaArrowLeft, FaPhone, FaWhatsapp } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useContent } from '../contexts/ContentContext';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { blogPosts, loading } = useContent();
  const post = blogPosts.find(p => p.id === id) || localBlogPosts.find(p => p.id === id);


  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return (
      <div className={styles.postContainer}>
        <h1>Post Not Found</h1>
        <Link to="/blog" className={styles.backBtn}><FaArrowLeft /> Back to Blog</Link>
      </div>
    );
  }

  return (
    <article className={styles.postContainer}>
      <Link to="/blog" className={styles.backBtn} data-aos="fade-right">
        <FaArrowLeft /> Back to Blog
      </Link>

      <header className={styles.postHeader} data-aos="fade-up">
        <h1>{post.title}</h1>
        <div className={styles.meta}>
          <span className={styles.date}><FaCalendarAlt /> {post.date}</span>
          <span className={styles.author}><FaUser /> {post.author}</span>
        </div>
      </header>

      <div className={styles.featuredImage} data-aos="zoom-in">
        <img src={post.image} alt={post.title} />
      </div>

      <div className={styles.postContent} data-aos="fade-up">
        {post.content.map((paragraph, index) => {
          // If the paragraph is a numbered list item
          if (/^\d\./.test(paragraph)) {
            return (
              <div key={index} className={styles.listItem}>
                <strong>{paragraph.substring(0, 2)}</strong> {paragraph.substring(2)}
              </div>
            );
          }
          return <p key={index}>{paragraph}</p>;
        })}
      </div>

      {post.images && post.images.length > 1 && (
        <div className={styles.imageGallery} data-aos="fade-up">
          {post.images.slice(1).map((img, idx) => (
            <div key={idx} className={styles.galleryItem}>
              <img src={img} alt={`${post.title} gallery ${idx + 1}`} />
            </div>
          ))}
        </div>
      )}

      <div className={styles.ctaBanner} data-aos="fade-up">
        <h3>Need Professional Water Tank Solutions?</h3>
        <p>Whether it's cleaning, repair, or construction, Hydroseal Innovations is here to help you secure your water future across Kenya.</p>
        <div className={styles.ctaButtons}>
          <a href="tel:+254799087048" className={styles.ctaButton}>
            <FaPhone /> Call Now
          </a>
          <a href="https://wa.me/254799087048" className={styles.ctaButton + ' ' + styles.whatsapp}>
            <FaWhatsapp /> WhatsApp Us
          </a>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
