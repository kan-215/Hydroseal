import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { supabase } from '../../lib/supabase';
import styles from './Editor.module.scss';
import { FiPlus, FiTrash2, FiSave, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import Modal from '../components/Modal';

interface FAQItem { 
  id?: string; 
  question: string; 
  answer: string; 
  sort_order: number; 
}

const FAQAdmin: React.FC = () => {
  const [items, setItems] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [savingAll, setSavingAll] = useState(false);
  const [savingId, setSavingId] = useState<string | number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<Omit<FAQItem, 'id' | 'sort_order'>>({
    question: '', answer: ''
  });

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type }); setTimeout(() => setToast(null), 3000);
  };

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabase.from('faq_items').select('*').order('sort_order');
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const update = (idx: number, field: keyof FAQItem, val: string) =>
    setItems(prev => prev.map((it, i) => i === idx ? { ...it, [field]: val } : it));

  const handleAdd = async () => {
    setSavingAll(true);
    const { error } = await supabase.from('faq_items').insert({
      ...newItem,
      sort_order: items.length
    });
    setSavingAll(false);
    
    if (error) showToast('Failed to add FAQ: ' + error.message, 'error');
    else {
      showToast('New FAQ added!');
      setIsModalOpen(false);
      setNewItem({ question: '', answer: '' });
      fetchData();
    }
  };

  const remove = async (id: string | undefined, idx: number) => {
    if (!id) {
      setItems(prev => prev.filter((_, i) => i !== idx));
      return;
    }
    const { error } = await supabase.from('faq_items').delete().eq('id', id);
    if (error) showToast('Delete failed: ' + error.message, 'error');
    else { showToast('FAQ removed!'); fetchData(); }
  };

  const move = (idx: number, dir: -1 | 1) => {
    const arr = [...items]; const swap = idx + dir;
    if (swap < 0 || swap >= arr.length) return;
    [arr[idx], arr[swap]] = [arr[swap], arr[idx]];
    setItems(arr.map((it, i) => ({ ...it, sort_order: i })));
  };

  const saveOne = async (item: FAQItem, idx: number) => {
    setSavingId(item.id || idx);
    const payload = {
      question: item.question,
      answer: item.answer,
      sort_order: idx
    };

    let error;
    if (item.id) {
      ({ error } = await supabase.from('faq_items').update(payload).eq('id', item.id));
    } else {
      ({ error } = await supabase.from('faq_items').insert(payload));
    }

    setSavingId(null);
    if (error) showToast('Save failed: ' + error.message, 'error');
    else showToast('FAQ saved!');
  };

  const saveAll = async () => {
    setSavingAll(true);
    await supabase.from('faq_items').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    const toInsert = items.map((it, i) => ({ ...it, sort_order: i, id: undefined }));
    const { error } = await supabase.from('faq_items').insert(toInsert);
    setSavingAll(false);
    if (error) showToast('Save failed: ' + error.message, 'error');
    else { showToast('Order saved!'); fetchData(); }
  };

  if (loading) return <AdminLayout><p style={{ color: '#64748b' }}>Loading…</p></AdminLayout>;

  return (
    <AdminLayout>
      <div className={styles.pageHeader}>
        <div>
          <h1 className="admin-page-title">FAQs</h1>
          <p className="admin-page-subtitle">Manage frequently asked questions.</p>
        </div>
        <div className={styles.actions}>
          <button className="admin-btn-primary" onClick={() => setIsModalOpen(true)}><FiPlus /> Add New FAQ</button>
          <button className="admin-btn-primary" onClick={saveAll} disabled={savingAll}>
            <FiSave /> {savingAll ? 'Saving Order…' : 'Save Order'}
          </button>
        </div>
      </div>

      <div className={styles.itemList}>
        {items.map((item, idx) => (
          <div key={item.id || idx} className="admin-card">
            <div className={styles.itemHeader}>
              <span className={styles.itemIndex}>FAQ {idx + 1}</span>
              <div className={styles.itemControls}>
                <button className="admin-btn-ghost" onClick={() => move(idx, -1)}><FiArrowUp /></button>
                <button className="admin-btn-ghost" onClick={() => move(idx, 1)}><FiArrowDown /></button>
                <button className="admin-btn-danger" onClick={() => remove(item.id, idx)}><FiTrash2 /></button>
              </div>
            </div>
            <div className="admin-field">
              <label className="admin-label">Question</label>
              <input className="admin-input" value={item.question} onChange={e => update(idx, 'question', e.target.value)} />
            </div>
            <div className="admin-field">
              <label className="admin-label">Answer</label>
              <textarea className="admin-textarea" rows={3} value={item.answer} onChange={e => update(idx, 'answer', e.target.value)} />
            </div>
            <div style={{ marginTop: '1rem' }}>
              <button className="admin-btn-primary" style={{ backgroundColor: '#10b981', border: 'none' }} onClick={() => saveOne(item, idx)} disabled={savingId === (item.id || idx)}>
                <FiSave /> {savingId === (item.id || idx) ? 'Saving...' : 'Save this FAQ'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New FAQ">
        <div className="admin-field">
          <label className="admin-label">Question</label>
          <input className="admin-input" value={newItem.question} onChange={e => setNewItem({ ...newItem, question: e.target.value })} placeholder="E.g. Do you offer emergency repairs?" />
        </div>
        <div className="admin-field">
          <label className="admin-label">Answer</label>
          <textarea className="admin-textarea" rows={4} value={newItem.answer} onChange={e => setNewItem({ ...newItem, answer: e.target.value })} placeholder="Provide a detailed answer..." />
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button className="admin-btn-primary" style={{ flex: 1 }} onClick={handleAdd} disabled={savingAll}>
            {savingAll ? 'Adding...' : 'Add FAQ'}
          </button>
          <button className="admin-btn-ghost" style={{ flex: 1 }} onClick={() => setIsModalOpen(false)}>Cancel</button>
        </div>
      </Modal>

      {toast && <div className={toast.type === 'success' ? 'admin-toast-success' : 'admin-toast-error'}>{toast.msg}</div>}
    </AdminLayout>
  );
};

export default FAQAdmin;
