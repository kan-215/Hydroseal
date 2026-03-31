import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import ImageUpload from '../components/ImageUpload';
import { supabase } from '../../lib/supabase';
import styles from './Editor.module.scss';
import { FiPlus, FiTrash2, FiSave, FiArrowUp, FiArrowDown } from 'react-icons/fi';

interface Project {
  id?: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  sort_order: number;
}

const defaultProjects: Project[] = [
  { title: 'Concrete Tank', description: 'Fixed cracks and leaks in residential water tanks using advanced injection techniques', image: '/concreate1.jpg', tags: ['Repair', 'Concrete'], sort_order: 0 },
  { title: 'Steel Tank Installation', description: 'Installed durable steel water tanks for industrial clients', image: '/steel1.jpg', tags: ['Installation', 'Steel'], sort_order: 1 },
  { title: 'Waterproofing Solution', description: 'Applied protective coatings to prevent future leaks', image: '/waterproofing1.jpeg', tags: ['Waterproofing', 'Maintenance'], sort_order: 2 },
  { title: 'Tank Cleaning', description: 'Professional cleaning and disinfection services', image: '/cleaning.jpg', tags: ['Cleaning', 'Disinfection'], sort_order: 3 },
  { title: 'Custom Tank Design', description: 'Built tailored water storage solutions', image: '/installation.jpg', tags: ['Construction', 'Design'], sort_order: 4 },
  { title: 'Platform Construction', description: 'Built stable elevated platforms for water tanks', image: '/platform.jpeg', tags: ['Platform', 'Construction'], sort_order: 5 },
];

const PortfolioAdmin: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [saving, setSaving] = useState(false);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from('portfolio_projects').select('*').order('sort_order');
    setProjects(data && data.length > 0 ? data : defaultProjects);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const update = (idx: number, field: keyof Project, value: string | string[]) => {
    setProjects(prev => prev.map((p, i) => i === idx ? { ...p, [field]: value } : p));
  };

  const addProject = () => setProjects(prev => [
    ...prev, { title: '', description: '', image: '', tags: [], sort_order: prev.length }
  ]);

  const remove = (idx: number) => setProjects(prev => prev.filter((_, i) => i !== idx));

  const move = (idx: number, dir: -1 | 1) => {
    const arr = [...projects];
    const swap = idx + dir;
    if (swap < 0 || swap >= arr.length) return;
    [arr[idx], arr[swap]] = [arr[swap], arr[idx]];
    setProjects(arr.map((p, i) => ({ ...p, sort_order: i })));
  };

  const saveAll = async () => {
    setSaving(true);
    await supabase.from('portfolio_projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    const { error } = await supabase.from('portfolio_projects').insert(
      projects.map((p, i) => ({ ...p, sort_order: i, id: undefined }))
    );
    setSaving(false);
    if (error) showToast('Save failed: ' + error.message, 'error');
    else { showToast('Portfolio saved!'); fetch(); }
  };

  if (loading) return <AdminLayout><p style={{ color: '#64748b' }}>Loading…</p></AdminLayout>;

  return (
    <AdminLayout>
      <div className={styles.pageHeader}>
        <div>
          <h1 className="admin-page-title">Portfolio Projects</h1>
          <p className="admin-page-subtitle">Manage project cards shown on the homepage</p>
        </div>
        <div className={styles.actions}>
          <button className="admin-btn-primary" onClick={addProject}><FiPlus /> Add Project</button>
          <button className="admin-btn-primary" onClick={saveAll} disabled={saving}><FiSave /> {saving ? 'Saving…' : 'Save All'}</button>
        </div>
      </div>

      <div className={styles.itemList}>
        {projects.map((project, idx) => (
          <div key={idx} className="admin-card">
            <div className={styles.itemHeader}>
              <span className={styles.itemIndex}>Project {idx + 1}</span>
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
                  <input className="admin-input" value={project.title} onChange={e => update(idx, 'title', e.target.value)} />
                </div>
                <div className="admin-field">
                  <label className="admin-label">Description</label>
                  <textarea className="admin-textarea" value={project.description} onChange={e => update(idx, 'description', e.target.value)} />
                </div>
                <div className="admin-field">
                  <label className="admin-label">Tags (comma-separated)</label>
                  <input className="admin-input" value={project.tags.join(', ')} onChange={e => update(idx, 'tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))} />
                </div>
              </div>
              <div>
                <label className="admin-label">Project Image</label>
                <ImageUpload currentUrl={project.image} folder="portfolio" onUploaded={url => update(idx, 'image', url)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {toast && <div className={toast.type === 'success' ? 'admin-toast-success' : 'admin-toast-error'}>{toast.msg}</div>}
    </AdminLayout>
  );
};

export default PortfolioAdmin;
