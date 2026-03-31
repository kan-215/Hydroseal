import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing! Check your .env file and restart the dev server.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');


export type Database = {
  public: {
    Tables: {
      hero_slides: {
        Row: {
          id: string;
          title: string;
          desc: string;
          desc_text: string;
          src: string;
          alt: string;
          link: string;
          sort_order: number;
          created_at: string;
        };

        Insert: Omit<Database['public']['Tables']['hero_slides']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['hero_slides']['Insert']>;
      };
      portfolio_projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          image: string;
          tags: string[];
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['portfolio_projects']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['portfolio_projects']['Insert']>;
      };
      faq_items: {
        Row: {
          id: string;
          question: string;
          answer: string;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['faq_items']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['faq_items']['Insert']>;
      };
      services: {
        Row: {
          id: string;
          title: string;
          description: string;
          icon_name: string;
          slug: string;
          keywords: string[];
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['services']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['services']['Insert']>;
      };
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          image: string;
          images: string[];
          excerpt: string;
          content: string[];
          author: string;
          date: string;
          date_text: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['blog_posts']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['blog_posts']['Insert']>;
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          role: string;
          text: string;
          text_content: string;
          avatar: string;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['testimonials']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['testimonials']['Insert']>;
      };
      site_settings: {
        Row: {
          id: string;
          key: string;
          setting_key: string;
          value: string;
          setting_value: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['site_settings']['Row'], 'id' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['site_settings']['Insert']>;
      };
    };
  };
};
