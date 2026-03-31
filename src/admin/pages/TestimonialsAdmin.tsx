import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import ImageUpload from '../components/ImageUpload';
import { supabase } from '../../lib/supabase';
import styles from './Editor.module.scss';
import { FiPlus, FiTrash2, FiSave, FiArrowUp, FiArrowDown } from 'react-icons/fi';

import Modal from '../components/Modal';

interface Testimonial { 
  id?: string; 
  name: string; 
  role: string; 
  text: string; 
  avatar: string; 
  sort_order: number; 
}


const TestimonialsAdmin: React.FC = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [savingAll, setSavingAll] = useState(false);
  const [savingId, setSavingId] = useState<string | number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<Omit<Testimonial, 'id' | 'sort_order'>>({
    name: '', role: '', text: '', avatar: ''
  });

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type }); setTimeout(() => setToast(null), 3000);
  };

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabase.from('testimonials').select('*').order('sort_order');
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const update = (idx: number, field: keyof Testimonial, val: string) =>
    setItems(prev => prev.map((it, i) => i === idx ? { ...it, [field]: val } : it));

  const handleAdd = async () => {
    setSavingAll(true);
    const { error } = await supabase.from('testimonials').insert({
      name: newItem.name,
      role: newItem.role,
      text_content: newItem.text,
      avatar: newItem.avatar,
      sort_order: items.length
    });
    setSavingAll(false);

    
    if (error) showToast('Failed to add testimonial: ' + error.message, 'error');
    else {
      showToast('Testimonial added!');
      setIsModalOpen(false);
      setNewItem({ name: '', role: '', text: '', avatar: '' });
      fetchData();
    }
  };

  const remove = async (id: string | undefined, idx: number) => {
    if (!id) {
      setItems(prev => prev.filter((_, i) => i !== idx));
      return;
    }
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) showToast('Delete failed: ' + error.message, 'error');
    else { showToast('Testimonial removed!'); fetchData(); }
  };

  const move = (idx: number, dir: -1 | 1) => {
    const arr = [...items]; const swap = idx + dir;
    if (swap < 0 || swap >= arr.length) return;
    [arr[idx], arr[swap]] = [arr[swap], arr[idx]];
    setItems(arr.map((it, i) => ({ ...it, sort_order: i })));
  };

  const saveOne = async (item: Testimonial, idx: number) => {
    setSavingId(item.id || idx);
    const payload = {
      name: item.name,
      role: item.role,
      text_content: item.text,
      avatar: item.avatar,
      sort_order: idx
    };

    let error;
    if (item.id) {
      ({ error } = await supabase.from('testimonials').update(payload).eq('id', item.id));
    } else {
      ({ error } = await supabase.from('testimonials').insert(payload));
    }

    setSavingId(null);
    if (error) showToast('Save failed: ' + error.message, 'error');
    else showToast('Saved successfully!');
  };

  const saveAll = async () => {
    setSavingAll(true);
    await supabase.from('testimonials').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    const toInsert = items.map((it, i) => ({ 
      name: it.name,
      role: it.role,
      text_content: it.text,
      avatar: it.avatar,
      sort_order: i
    }));
    const { error } = await supabase.from('testimonials').insert(toInsert);
    setSavingAll(false);
    if (error) showToast('Save failed: ' + error.message, 'error');
    else { showToast('Testimonials order saved!'); fetchData(); }
  };

  if (loading) return <AdminLayout><p style={{ color: '#64748b' }}>Loading…</p></AdminLayout>;

  return (
    <AdminLayout>
      <div className={styles.pageHeader}>
        <div>
          <h1 className="admin-page-title">Testimonials</h1>
          <p className="admin-page-subtitle">Manage customer reviews and feedback.</p>
        </div>
        <div className={styles.actions}>
          <button className="admin-btn-primary" onClick={() => setIsModalOpen(true)}><FiPlus /> Add New Review</button>
          <button className="admin-btn-primary" onClick={saveAll} disabled={savingAll}>
            <FiSave /> {savingAll ? 'Saving Order…' : 'Save Order'}
          </button>
        </div>
      </div>

      <div className={styles.itemList}>
        {items.map((item, idx) => (
          <div key={item.id || idx} className="admin-card">
            <div className={styles.itemHeader}>
              <span className={styles.itemIndex}>Review {idx + 1}</span>
              <div className={styles.itemControls}>
                <button className="admin-btn-ghost" onClick={() => move(idx, -1)}><FiArrowUp /></button>
                <button className="admin-btn-ghost" onClick={() => move(idx, 1)}><FiArrowDown /></button>
                <button className="admin-btn-danger" onClick={() => remove(item.id, idx)}><FiTrash2 /></button>
              </div>
            </div>
            <div className={styles.twoCol}>
              <div>
                <div className="admin-field">
                  <label className="admin-label">Name</label>
                  <input className="admin-input" value={item.name} onChange={e => update(idx, 'name', e.target.value)} />
                </div>
                <div className="admin-field">
                  <label className="admin-label">Location / Subtitle</label>
                  <input className="admin-input" value={item.role} onChange={e => update(idx, 'role', e.target.value)} placeholder="Homeowner, Nairobi" />
                </div>
                <div className="admin-field">
                  <label className="admin-label">Review Text</label>
                  <textarea className="admin-textarea" rows={3} value={item.text} onChange={e => update(idx, 'text', e.target.value)} />
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <button className="admin-btn-primary" style={{ backgroundColor: '#10b981', border: 'none' }} onClick={() => saveOne(item, idx)} disabled={savingId === (item.id || idx)}>
                    <FiSave /> {savingId === (item.id || idx) ? 'Saving...' : 'Save this Review'}
                  </button>
                </div>
              </div>
              <div>
                <label className="admin-label">Reviewer Photo</label>
                <ImageUpload currentUrl={item.avatar} folder="testimonials" onUploaded={url => update(idx, 'avatar', url)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Testimonial">
        <div className="admin-field">
          <label className="admin-label">Full Name</label>
          <input className="admin-input" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} placeholder="John Doe" />
        </div>
        <div className="admin-field">
          <label className="admin-label">Location / Subtitle</label>
          <input className="admin-input" value={newItem.role} onChange={e => setNewItem({ ...newItem, role: e.target.value })} placeholder="Nairobi" />
        </div>
        <div className="admin-field">
          <label className="admin-label">Review Text</label>
          <textarea className="admin-textarea" rows={4} value={newItem.text} onChange={e => setNewItem({ ...newItem, text: e.target.value })} placeholder="What did they say?" />
        </div>
        <div className="admin-field">
          <label className="admin-label">Reviewer Photo</label>
          <ImageUpload currentUrl={newItem.avatar} folder="testimonials" onUploaded={url => setNewItem({ ...newItem, avatar: url })} />
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button className="admin-btn-primary" style={{ flex: 1 }} onClick={handleAdd} disabled={savingAll}>
            {savingAll ? 'Adding...' : 'Add Review'}
          </button>
          <button className="admin-btn-ghost" style={{ flex: 1 }} onClick={() => setIsModalOpen(false)}>Cancel</button>
        </div>
      </Modal>

      {toast && <div className={toast.type === 'success' ? 'admin-toast-success' : 'admin-toast-error'}>{toast.msg}</div>}
    </AdminLayout>
  );
};

export default TestimonialsAdmin;

