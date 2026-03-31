import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { supabase } from '../../lib/supabase';
import styles from './Editor.module.scss';
import { FiPlus, FiTrash2, FiSave, FiArrowUp, FiArrowDown } from 'react-icons/fi';

interface Service { id?: string; title: string; description: string; icon_name: string; slug: string; keywords: string[]; sort_order: number; }

const defaultServices: Service[] = [
  { title: 'Tank Repair', description: 'Fix cracks, leaks, and corrosion with expert crack injection, welding, and patching.', icon_name: 'FaTools', slug: 'repair', keywords: ['water tank repair Kenya', 'concrete tank leak repair'], sort_order: 0 },
  { title: 'Tank Design & Construction', description: 'Custom designs and construction of concrete and steel tanks to meet your specific needs.', icon_name: 'FaBuilding', slug: 'construction', keywords: ['water tank design Kenya', 'custom tank construction'], sort_order: 1 },
  { title: 'Water Tank Platform Construction', description: 'Build durable, elevated platforms to support water tanks.', icon_name: 'FaWater', slug: 'platforms', keywords: ['water tank platform Kenya'], sort_order: 2 },
  { title: 'Waterproofing', description: 'Prevent leaks with advanced coatings and linings for lasting protection.', icon_name: 'FaShieldAlt', slug: 'waterproofing', keywords: ['tank waterproofing Kenya'], sort_order: 3 },
  { title: 'Cleaning', description: 'Remove sediment, algae, and biofilm to restore water quality.', icon_name: 'FaBroom', slug: 'cleaning', keywords: ['water tank cleaning Kenya'], sort_order: 4 },
  { title: 'Disinfecting', description: 'Eliminate pathogens for safe, potable water with industry-standard disinfection.', icon_name: 'FaFlask', slug: 'disinfecting', keywords: ['tank disinfection Kenya'], sort_order: 5 },
  { title: 'Neutralizing', description: 'Protect water purity by treating tank surfaces against chemical leaching.', icon_name: 'FaFilter', slug: 'neutralizing', keywords: ['tank neutralizing Kenya'], sort_order: 6 },
];

const ServicesAdmin: React.FC = () => {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [saving, setSaving] = useState(false);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type }); setTimeout(() => setToast(null), 3000);
  };

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabase.from('services').select('*').order('sort_order');
    setItems(data && data.length > 0 ? data : defaultServices);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const update = (idx: number, field: keyof Service, val: string | string[]) =>
    setItems(prev => prev.map((it, i) => i === idx ? { ...it, [field]: val } : it));

  const add = () => setItems(prev => [...prev, { title: '', description: '', icon_name: 'FaTools', slug: '', keywords: [], sort_order: prev.length }]);
  const remove = (idx: number) => setItems(prev => prev.filter((_, i) => i !== idx));
  const move = (idx: number, dir: -1 | 1) => {
    const arr = [...items]; const swap = idx + dir;
    if (swap < 0 || swap >= arr.length) return;
    [arr[idx], arr[swap]] = [arr[swap], arr[idx]];
    setItems(arr.map((it, i) => ({ ...it, sort_order: i })));
  };

  const saveAll = async () => {
    setSaving(true);
    await supabase.from('services').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    const { error } = await supabase.from('services').insert(items.map((it, i) => ({ ...it, sort_order: i, id: undefined })));
    setSaving(false);
    if (error) showToast('Save failed: ' + error.message, 'error');
    else { showToast('Services saved!'); fetchData(); }
  };

  if (loading) return <AdminLayout><p style={{ color: '#64748b' }}>Loading…</p></AdminLayout>;

  return (
    <AdminLayout>
      <div className={styles.pageHeader}>
        <div>
          <h1 className="admin-page-title">Services</h1>
          <p className="admin-page-subtitle">Manage service cards displayed on the Services page</p>
        </div>
        <div className={styles.actions}>
          <button className="admin-btn-primary" onClick={add}><FiPlus /> Add Service</button>
          <button className="admin-btn-primary" onClick={saveAll} disabled={saving}><FiSave /> {saving ? 'Saving…' : 'Save All'}</button>
        </div>
      </div>

      <div className={styles.itemList}>
        {items.map((item, idx) => (
          <div key={idx} className="admin-card">
            <div className={styles.itemHeader}>
              <span className={styles.itemIndex}>Service {idx + 1}</span>
              <div className={styles.itemControls}>
                <button className="admin-btn-ghost" onClick={() => move(idx, -1)}><FiArrowUp /></button>
                <button className="admin-btn-ghost" onClick={() => move(idx, 1)}><FiArrowDown /></button>
                <button className="admin-btn-danger" onClick={() => remove(idx)}><FiTrash2 /></button>
              </div>
            </div>
            <div className={styles.twoCol}>
              <div>
                <div className="admin-field">
                  <label className="admin-label">Title</label>
                  <input className="admin-input" value={item.title} onChange={e => update(idx, 'title', e.target.value)} />
                </div>
                <div className="admin-field">
                  <label className="admin-label">Slug (URL ID)</label>
                  <input className="admin-input" value={item.slug} onChange={e => update(idx, 'slug', e.target.value)} placeholder="e.g. tank-repair" />
                </div>
                <div className="admin-field">
                  <label className="admin-label">Description</label>
                  <textarea className="admin-textarea" value={item.description} onChange={e => update(idx, 'description', e.target.value)} />
                </div>
              </div>
              <div>
                <div className="admin-field">
                  <label className="admin-label">Icon Name (react-icons/fa)</label>
                  <input className="admin-input" value={item.icon_name} onChange={e => update(idx, 'icon_name', e.target.value)} placeholder="FaTools" />
                </div>
                <div className="admin-field">
                  <label className="admin-label">Keywords (comma-separated)</label>
                  <textarea className="admin-textarea" rows={3} value={item.keywords.join(', ')} onChange={e => update(idx, 'keywords', e.target.value.split(',').map(k => k.trim()).filter(Boolean))} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {toast && <div className={toast.type === 'success' ? 'admin-toast-success' : 'admin-toast-error'}>{toast.msg}</div>}
    </AdminLayout>
  );
};

export default ServicesAdmin;
