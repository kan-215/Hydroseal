import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import ImageUpload from '../components/ImageUpload';
import { supabase } from '../../lib/supabase';
import styles from './Editor.module.scss';
import { FiPlus, FiTrash2, FiSave, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import Modal from '../components/Modal';

interface Slide {
  id?: string;
  title: string;
  desc: string;
  src: string;
  link: string;
  sort_order: number;
}

const HeroAdmin: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [savingAll, setSavingAll] = useState(false);
  const [savingId, setSavingId] = useState<string | number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSlide, setNewSlide] = useState<Omit<Slide, 'id' | 'sort_order'>>({
    title: '', desc: '', src: '', link: '/services'
  });

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchSlides = async () => {
    setLoading(true);
    const { data } = await supabase.from('hero_slides').select('*').order('sort_order');
    setSlides(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchSlides(); }, []);

  const update = (idx: number, field: keyof Slide, value: string | number) => {
    setSlides(prev => prev.map((s, i) => i === idx ? { ...s, [field]: value } : s));
  };

  const handleAddSlide = async () => {
    setSavingAll(true);
    const { error } = await supabase.from('hero_slides').insert({
      title: newSlide.title,
      desc_text: newSlide.desc,
      src: newSlide.src,
      link: newSlide.link,
      sort_order: slides.length
    });
    setSavingAll(false);

    
    if (error) showToast('Failed to add slide: ' + error.message, 'error');
    else {
      showToast('New slide added!');
      setIsModalOpen(false);
      setNewSlide({ title: '', desc: '', src: '', link: '/services' });
      fetchSlides();
    }
  };

  const removeSlide = async (id: string | undefined, idx: number) => {
    if (!id) {
      setSlides(prev => prev.filter((_, i) => i !== idx));
      return;
    }
    const { error } = await supabase.from('hero_slides').delete().eq('id', id);
    if (error) showToast('Delete failed: ' + error.message, 'error');
    else { showToast('Slide removed!'); fetchSlides(); }
  };

  const moveSlide = (idx: number, dir: -1 | 1) => {
    const arr = [...slides];
    const swap = idx + dir;
    if (swap < 0 || swap >= arr.length) return;
    [arr[idx], arr[swap]] = [arr[swap], arr[idx]];
    setSlides(arr.map((s, i) => ({ ...s, sort_order: i })));
  };

  const saveOne = async (slide: Slide, idx: number) => {
    setSavingId(slide.id || idx);
    const payload = {
      title: slide.title,
      desc_text: slide.desc,
      src: slide.src,
      link: slide.link,
      sort_order: idx
    };

    let error;
    if (slide.id) {
      ({ error } = await supabase.from('hero_slides').update(payload).eq('id', slide.id));
    } else {
      ({ error } = await supabase.from('hero_slides').insert(payload));
    }

    setSavingId(null);
    if (error) showToast('Save failed: ' + error.message, 'error');
    else showToast('Slide saved!');
  };

  const saveAll = async () => {
    setSavingAll(true);
    await supabase.from('hero_slides').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    const toInsert = slides.map((s, i) => ({ 
      title: s.title,
      desc_text: s.desc,
      src: s.src,
      link: s.link,
      sort_order: i
    }));

    const { error } = await supabase.from('hero_slides').insert(toInsert);
    setSavingAll(false);
    if (error) showToast('Save all failed: ' + error.message, 'error');
    else { showToast('All slides saved!'); fetchSlides(); }
  };

  if (loading) return <AdminLayout><p style={{ color: '#64748b' }}>Loading…</p></AdminLayout>;

  return (
    <AdminLayout>
      <div className={styles.pageHeader}>
        <div>
          <h1 className="admin-page-title">Hero Slides</h1>
          <p className="admin-page-subtitle">Manage homepage hero carousel. Changes reflect instantly.</p>
        </div>
        <div className={styles.actions}>
          <button className="admin-btn-primary" onClick={() => setIsModalOpen(true)}><FiPlus /> Add New Slide</button>
          <button className="admin-btn-primary" onClick={saveAll} disabled={savingAll}>
            <FiSave /> {savingAll ? 'Saving All…' : 'Save Order & All'}
          </button>
        </div>
      </div>

      <div className={styles.itemList}>
        {slides.map((slide, idx) => (
          <div key={slide.id || idx} className="admin-card">
            <div className={styles.itemHeader}>
              <span className={styles.itemIndex}>Slide {idx + 1}</span>
              <div className={styles.itemControls}>
                <button className="admin-btn-ghost" onClick={() => moveSlide(idx, -1)} title="Move up"><FiArrowUp /></button>
                <button className="admin-btn-ghost" onClick={() => moveSlide(idx, 1)} title="Move down"><FiArrowDown /></button>
                <button className="admin-btn-danger" onClick={() => removeSlide(slide.id, idx)} title="Delete"><FiTrash2 /></button>
              </div>
            </div>

            <div className={styles.twoCol}>
              <div>
                <div className="admin-field">
                  <label className="admin-label">Headline</label>
                  <input className="admin-input" value={slide.title} onChange={e => update(idx, 'title', e.target.value)} placeholder="Main Title" />
                </div>
                <div className="admin-field">
                  <label className="admin-label">Description (Max 2 lines recommended)</label>
                  <textarea className="admin-textarea" rows={2} value={slide.desc} onChange={e => update(idx, 'desc', e.target.value)} placeholder="Short description..." />
                </div>
                <div className="admin-field">
                  <label className="admin-label">Button Link</label>
                  <input className="admin-input" value={slide.link} onChange={e => update(idx, 'link', e.target.value)} placeholder="/services" />
                </div>
                <div style={{ marginTop: '1.5rem' }}>
                  <button className="admin-btn-primary" style={{ backgroundColor: '#10b981', border: 'none' }} onClick={() => saveOne(slide, idx)} disabled={savingId === (slide.id || idx)}>
                    <FiSave /> {savingId === (slide.id || idx) ? 'Saving...' : 'Save this Slide'}
                  </button>
                </div>
              </div>
              <div>
                <label className="admin-label">Slide Image</label>
                <ImageUpload currentUrl={slide.src} folder="hero" onUploaded={url => update(idx, 'src', url)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Hero Slide">
        <div className="admin-field">
          <label className="admin-label">Headline</label>
          <input className="admin-input" value={newSlide.title} onChange={e => setNewSlide({ ...newSlide, title: e.target.value })} placeholder="E.g. Professional Tank Cleaning" />
        </div>
        <div className="admin-field">
          <label className="admin-label">Description</label>
          <textarea className="admin-textarea" rows={3} value={newSlide.desc} onChange={e => setNewSlide({ ...newSlide, desc: e.target.value })} placeholder="Tell users about this service..." />
        </div>
        <div className="admin-field">
          <label className="admin-label">Link URL</label>
          <input className="admin-input" value={newSlide.link} onChange={e => setNewSlide({ ...newSlide, link: e.target.value })} placeholder="/services" />
        </div>
        <div className="admin-field">
          <label className="admin-label">Slide Image</label>
          <ImageUpload currentUrl={newSlide.src} folder="hero" onUploaded={url => setNewSlide({ ...newSlide, src: url })} />
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button className="admin-btn-primary" style={{ flex: 1 }} onClick={handleAddSlide} disabled={savingAll}>
            {savingAll ? 'Adding...' : 'Add Slide'}
          </button>
          <button className="admin-btn-ghost" style={{ flex: 1 }} onClick={() => setIsModalOpen(false)}>Cancel</button>
        </div>
      </Modal>

      {toast && <div className={toast.type === 'success' ? 'admin-toast-success' : 'admin-toast-error'}>{toast.msg}</div>}
    </AdminLayout>
  );
};

export default HeroAdmin;
