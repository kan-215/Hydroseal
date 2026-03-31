import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, Database } from '../lib/supabase';

type HeroSlide = Database['public']['Tables']['hero_slides']['Row'];
type Project = Database['public']['Tables']['portfolio_projects']['Row'];
type Service = Database['public']['Tables']['services']['Row'];
type FAQItem = Database['public']['Tables']['faq_items']['Row'];
type Testimonial = Database['public']['Tables']['testimonials']['Row'];
type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

interface ContentContextType {
  heroSlides: HeroSlide[];
  projects: Project[];
  services: Service[];
  faqItems: FAQItem[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
  siteSettings: Record<string, any>;
  loading: boolean;
  refreshContent: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const defaultHero = [
  { id: '1', src: '/concreate.jpg', alt: 'Concrete Water Tank Construction', title: 'Concrete Tank Solutions', desc: 'Professional concrete water tank services', link: '/services#concrete-tanks' },
  { id: '2', src: '/construction1.jpg', alt: 'Water Tank Installation', title: 'New Tank Installation', desc: 'Custom tank design and installation', link: '/services#installation' },
  { id: '3', src: '/plat.jpeg', alt: 'Tank Platform Construction', title: 'Platform Construction', desc: 'Sturdy elevated tank platforms', link: '/services#platforms' },
  { id: '4', src: '/steel4.jpeg', alt: 'Steel Water Tanks', title: 'Steel Tank Solutions', desc: 'Durable steel water tanks', link: '/services#steel-tanks' },
  { id: '5', src: '/waterproofing.jpg', alt: 'Tank Waterproofing', title: 'Waterproofing Services', desc: 'Leak-proof tank solutions', link: '/services#waterproofing' },
];

const defaultProjects = [
  { id: '1', title: "Concrete Tank", description: "Fixed cracks and leaks in residential water tanks using advanced injection techniques", image: "/concreate1.jpg", tags: ["Repair", "Concrete"] },
  { id: '2', title: "Steel Tank Installation", description: "Installed durable steel water tanks for industrial clients", image: "/steel1.jpg", tags: ["Installation", "Steel"] },
  { id: '3', title: "Waterproofing Solution", description: "Applied protective coatings to prevent future leaks", image: "/waterproofing1.jpeg", tags: ["Waterproofing", "Maintenance"] },
  { id: '4', title: "Tank Cleaning", description: "Professional cleaning and disinfection services", image: "/cleaning.jpg", tags: ["cleaning", "Disinfection"] },
  { id: '5', title: "Custom Tank Design", description: "Built tailored water storage solutions", image: "/installation.jpg", tags: ["Construction", "Design"] },
  { id: '6', title: "Platform Construction", description: "Built stable elevated platforms for water tanks", image: "/platform.jpeg", tags: ["Platform", "Construction"] }
];

const defaultServices = [
  { slug: 'repair', title: 'Tank Repair', description: 'Fix cracks, leaks, and corrosion with expert crack injection, welding, and patching.', icon_name: 'FaTools', keywords: ['water tank repair Kenya', 'concrete tank leak repair'] },
  { slug: 'construction', title: 'Tank Design & Construction', description: 'Custom designs and construction of concrete and steel tanks to meet your specific needs.', icon_name: 'FaBuilding', keywords: ['water tank design Kenya', 'custom tank construction'] },
  { slug: 'platforms', title: 'Water Tank Platform Construction', description: 'Build durable, elevated platforms to support water tanks.', icon_name: 'FaWater', slug: 'platforms', keywords: ['water tank platform Kenya'] },
  { slug: 'waterproofing', title: 'Waterproofing', description: 'Prevent leaks with advanced coatings and linings for lasting protection.', icon_name: 'FaShieldAlt', slug: 'waterproofing', keywords: ['tank waterproofing Kenya'] },
];

const defaultFAQ = [
  { question: "What types of water tanks do you repair?", answer: "We specialize in both concrete and steel water tank repairs. Our services include fixing cracks, leaks, and corrosion in all types of water storage tanks." },
  { question: "How long does a typical tank repair take?", answer: "Most standard repairs are completed within 1-3 days, depending on the extent of damage." }
];

const defaultTestimonials = [
  { text: "Hydroseal repaired our leaking concrete tank in a day! We've saved so much water since. Highly recommended!", name: "Miriam K.", role: "Nairobi" },
  { text: "Professional service and solid construction. Our elevated steel platform was built in just 3 days.", name: "Peter M.", role: "Kisumu" }
];

const defaultAbout = {
  hero_title: 'About Hydroseal Innovations',
  mission_title: 'Our Mission',
  mission_text: "At Hydroseal Innovations, we're transforming water storage in Kenya. From designing custom tanks and building solid platforms to repairing and maintaining existing systems, we ensure safe, efficient water access for all.",
  what_we_do_title: 'What We Do',
  what_we_do_text: 'Based in Kenya, we provide end-to-end services for concrete and steel water tanks and platforms: innovative designs, new construction, stable foundations, and maintenance.',
  promise_title: 'Our Promise',
  promise_items: [
    'Cutting-edge tank design and platform construction',
    'Compliance with Kenyan water safety and building standards',
    'Customer-focused service with a satisfaction guarantee',
  ],
  cta_text: 'Learn More About Our Process',
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(defaultHero as any);
  const [projects, setProjects] = useState<Project[]>(defaultProjects as any);
  const [services, setServices] = useState<Service[]>(defaultServices as any);
  const [faqItems, setFaqItems] = useState<FAQItem[]>(defaultFAQ as any);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials as any);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [siteSettings, setSiteSettings] = useState<Record<string, any>>({ about_content: defaultAbout });
  const [loading, setLoading] = useState(true);



  const fetchAll = async () => {
    setLoading(true);
    try {
      const [
        { data: hero },
        { data: proj },
        { data: serv },
        { data: faq },
        { data: test },
        { data: blog },
        { data: settings }
      ] = await Promise.all([
        supabase.from('hero_slides').select('*').order('sort_order'),
        supabase.from('portfolio_projects').select('*').order('sort_order'),
        supabase.from('services').select('*').order('sort_order'),
        supabase.from('faq_items').select('*').order('sort_order'),
        supabase.from('testimonials').select('*').order('sort_order'),
        supabase.from('blog_posts').select('*').order('created_at', { ascending: false }),
        supabase.from('site_settings').select('*')
      ]);

      if (hero) setHeroSlides(hero);
      if (proj) setProjects(proj);
      if (serv) setServices(serv);
      if (faq) setFaqItems(faq);
      if (test) setTestimonials(test.map(t => ({ ...t, text: t.text || t.text_content })));
      if (blog) setBlogPosts(blog.map(p => ({ ...p, date: p.date || p.date_text })));

      
      if (settings) {
        const settingsMap: Record<string, any> = {};
        settings.forEach(s => {
          const k = s.key || s.setting_key;
          const v = s.value || s.setting_value;
          if (k) {
            try {
              settingsMap[k] = typeof v === 'string' ? JSON.parse(v) : v;
            } catch {
              settingsMap[k] = v;
            }
          }
        });
        setSiteSettings(settingsMap);
      }

    } catch (err) {
      console.error('Error fetching content:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();

    // Subscribe to all changes in the public schema
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public' },
        () => {
          console.log('Change detected, refreshing content...');
          fetchAll();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);


  return (
    <ContentContext.Provider value={{
      heroSlides,
      projects,
      services,
      faqItems,
      testimonials,
      blogPosts,
      siteSettings,
      loading,
      refreshContent: fetchAll
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within a ContentProvider');
  return context;
};
