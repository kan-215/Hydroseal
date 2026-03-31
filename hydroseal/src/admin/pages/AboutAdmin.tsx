import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { supabase } from '../../lib/supabase';
import styles from './Editor.module.scss';
import { FiSave, FiPlus, FiTrash2 } from 'react-icons/fi';

interface AboutContent {
  hero_title: string;
  mission_title: string;
  mission_text: string;
  what_we_do_title: string;
  what_we_do_text: string;
  promise_title: string;
  promise_items: string[];
  cta_text: string;
}

const defaultContent: AboutContent = {
  hero_title: 'About Hydroseal Innovations',
  mission_title: 'Our Mission',
  mission_text: "At Hydroseal Innovations, we're transforming water storage in Kenya. From designing custom tanks and building solid platforms to repairing and maintaining existing systems, we ensure safe, efficient water access for all.",
  what_we_do_title: 'What We Do',
  what_we_do_text: 'Based in Kenya, we provide end-to-end services for concrete and steel water tanks and platforms: innovative designs, new construction, stable foundations, and maintenance to address water loss, contamination, and infrastructure needs.',
  promise_title: 'Our Promise',
  promise_items: [
    'Cutting-edge tank design and platform construction',
    'Compliance with Kenyan water safety and building standards',
    'Customer-focused service with a satisfaction guarantee',
  ],
  cta_text: 'Learn More About Our Process',
};

const ABOUT_KEY = 'about_content';

const AboutAdmin: React.FC = () => {
  const [content, setContent] = useState<AboutContent>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type }); setTimeout(() => setToast(null), 3000);
  };

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabase.from('site_settings').select('value').eq('key', ABOUT_KEY).maybeSingle();
    if (data?.value) {
      try { setContent(JSON.parse(data.value)); } catch { setContent(defaultContent); }
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const set = (field: keyof AboutContent, val: string | string[]) =>
    setContent(prev => ({ ...prev, [field]: val }));

  const updatePromise = (idx: number, val: string) =>
    setContent(prev => ({ ...prev, promise_items: prev.promise_items.map((it, i) => i === idx ? val : it) }));

  const addPromise = () => setContent(prev => ({ ...prev, promise_items: [...prev.promise_items, ''] }));
  const removePromise = (idx: number) => setContent(prev => ({ ...prev, promise_items: prev.promise_items.filter((_, i) => i !== idx) }));

  const save = async () => {
    setSaving(true);
    const { data: existing } = await supabase.from('site_settings').select('id').eq('key', ABOUT_KEY).maybeSingle();
    let error;
    ({ error } = await supabase.from('site_settings').upsert({
      setting_key: ABOUT_KEY,
      setting_value: JSON.stringify(content)
    }, { onConflict: 'setting_key' }));


    setSaving(false);
    if (error) showToast('Save failed: ' + error.message, 'error');
    else showToast('About page saved!');
  };

  if (loading) return <AdminLayout><p style={{ color: '#64748b' }}>Loading…</p></AdminLayout>;

  return (
    <AdminLayout>
      <div className={styles.pageHeader}>
        <div>
          <h1 className="admin-page-title">About Page</h1>
          <p className="admin-page-subtitle">Edit all text content shown on the About page</p>
        </div>
        <button className="admin-btn-primary" onClick={save} disabled={saving}><FiSave /> {saving ? 'Saving…' : 'Save Changes'}</button>
      </div>

      <div className="admin-card">
        <div className="admin-field">
          <label className="admin-label">Page Hero Title</label>
          <input className="admin-input" value={content.hero_title} onChange={e => set('hero_title', e.target.value)} />
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-field">
          <label className="admin-label">Mission Section Title</label>
          <input className="admin-input" value={content.mission_title} onChange={e => set('mission_title', e.target.value)} />
        </div>
        <div className="admin-field">
          <label className="admin-label">Mission Text</label>
          <textarea className="admin-textarea" rows={4} value={content.mission_text} onChange={e => set('mission_text', e.target.value)} />
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-field">
          <label className="admin-label">What We Do Title</label>
          <input className="admin-input" value={content.what_we_do_title} onChange={e => set('what_we_do_title', e.target.value)} />
        </div>
        <div className="admin-field">
          <label className="admin-label">What We Do Text</label>
          <textarea className="admin-textarea" rows={4} value={content.what_we_do_text} onChange={e => set('what_we_do_text', e.target.value)} />
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-field">
          <label className="admin-label">Promise Section Title</label>
          <input className="admin-input" value={content.promise_title} onChange={e => set('promise_title', e.target.value)} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <label className="admin-label" style={{ margin: 0 }}>Promise Items</label>
          <button className="admin-btn-ghost" style={{ fontSize: '0.75rem' }} onClick={addPromise}><FiPlus /> Add Item</button>
        </div>
        {content.promise_items.map((item, idx) => (
          <div key={idx} className={styles.contentItem}>
            <span className={styles.contentIndex}>{idx + 1}</span>
            <input className="admin-input" value={item} onChange={e => updatePromise(idx, e.target.value)} style={{ marginBottom: '0.5rem' }} />
            <button className="admin-btn-danger" style={{ marginLeft: '0.5rem' }} onClick={() => removePromise(idx)}><FiTrash2 /></button>
          </div>
        ))}
      </div>

      <div className="admin-card">
        <div className="admin-field">
          <label className="admin-label">CTA Button Text</label>
          <input className="admin-input" value={content.cta_text} onChange={e => set('cta_text', e.target.value)} />
        </div>
      </div>

      {toast && <div className={toast.type === 'success' ? 'admin-toast-success' : 'admin-toast-error'}>{toast.msg}</div>}
    </AdminLayout>
  );
};

export default AboutAdmin;
