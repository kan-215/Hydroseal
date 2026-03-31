import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import * as Defaults from '../../data/migrationDefaults';
import { blogPosts as defaultBlogPosts } from '../../data/blogData';
import { FiUploadCloud, FiCheckCircle, FiAlertCircle, FiLoader } from 'react-icons/fi';

const MigrationTool: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'migrating' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);

  const migrate = async () => {
    setStatus('migrating');
    setProgress(0);
    setMessage('Starting migration...');

    try {
      // 1. Hero Slides
      setMessage('Migrating Hero Slides...');
      await supabase.from('hero_slides').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      for (const slide of Defaults.defaultHeroSlides) {

        const { error } = await supabase.from('hero_slides').upsert({
          src: slide.src,
          title: slide.title,
          desc_text: slide.desc,
          link: slide.link
        });



        if (error) throw error;
      }
      setProgress(15);

      // 2. Portfolio
      setMessage('Migrating Portfolio Projects...');
      for (const project of Defaults.defaultPortfolioProjects) {
        const { error } = await supabase.from('portfolio_projects').upsert({
          title: project.title,
          description: project.description,
          image: project.image,
          tags: project.tags
        }, { onConflict: 'title' });
        if (error) throw error;
      }
      setProgress(30);

      // 3. FAQ
      setMessage('Migrating FAQ Items...');
      for (const item of Defaults.defaultFAQItems) {
        const { error } = await supabase.from('faq_items').upsert({
          question: item.question,
          answer: item.answer
        }, { onConflict: 'question' });
        if (error) throw error;
      }
      setProgress(45);

      // 4. Testimonials
      setMessage('Migrating Testimonials...');
      for (const t of Defaults.defaultTestimonials) {
        const { error } = await supabase.from('testimonials').upsert({
          text_content: t.text,
          name: t.name,
          role: t.role
        }, { onConflict: 'name' });

        if (error) throw error;
      }
      setProgress(60);

      // ... (existing services migration) ...
      setMessage('Migrating Services...');
      for (const s of Defaults.defaultServices) {
        const { error } = await supabase.from('services').upsert({
          slug: s.slug,
          title: s.title,
          description: s.description,
          icon_name: s.icon_name,
          keywords: s.keywords
        }, { onConflict: 'slug' });
        if (error) throw error;
      }
      setProgress(75);

      // 6. Blog Posts
      setMessage('Migrating Blog Posts...');
      for (const p of defaultBlogPosts) {
        const { error } = await supabase.from('blog_posts').upsert({
          slug: p.id,
          title: p.title,
          image: p.image,
          images: p.images,
          excerpt: p.excerpt,
          content: p.content,
          date_text: p.date,
          author: p.author
        }, { onConflict: 'slug' });
        if (error) throw error;
      }


      setProgress(90);

      // 7. Site Settings (About Content)
      setMessage('Migrating Site Settings...');
      const { error: settingsError } = await supabase.from('site_settings').upsert({
        setting_key: 'about_content',
        setting_value: Defaults.defaultAboutContent as any
      }, { onConflict: 'setting_key' });
      if (settingsError) throw settingsError;


      setProgress(100);
      setStatus('success');
      setMessage('Migration completed successfully! All data is now in Supabase.');
    } catch (error: any) {
      console.error('Migration error:', error);
      setStatus('error');
      setMessage(`Migration failed: ${error.message}`);
    }
  };

  return (
    <div style={{
      padding: '2rem',
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      marginBottom: '2rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <FiUploadCloud size={24} color="#2563eb" />
        <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#1e293b' }}>Content Migration Tool</h2>
      </div>
      
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
        This tool will copy all hardcoded website content (Hero, Portfolio, Services, Blog, etc.) into your Supabase database. 
        Use this to initialize your database or restore default content.
      </p>

      {status === 'idle' && (
        <button 
          onClick={migrate}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 600
          }}
        >
          Start Migration
        </button>
      )}

      {status === 'migrating' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2563eb' }}>
            <FiLoader className="spin" />
            <span>{message}</span>
          </div>
          <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px' }}>
            <div style={{ 
              width: `${progress}%`, 
              height: '100%', 
              backgroundColor: '#2563eb', 
              borderRadius: '4px',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
      )}

      {status === 'success' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#16a34a', fontWeight: 600 }}>
          <FiCheckCircle />
          <span>{message}</span>
        </div>
      )}

      {status === 'error' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#dc2626', fontWeight: 600 }}>
          <FiAlertCircle />
          <span>{message}</span>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}} />
    </div>
  );
};

export default MigrationTool;
