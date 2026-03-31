import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import ImageUpload from '../components/ImageUpload';
import { supabase } from '../../lib/supabase';
import styles from './Editor.module.scss';
import { FiPlus, FiTrash2, FiSave, FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  image: string;
  images: string[];
  excerpt: string;
  content: string[];
  author: string;
  date: string;
}

const emptyPost = (): BlogPost => ({
  id: Date.now().toString(),
  slug: '',
  title: '',
  image: '',
  images: [],
  excerpt: '',
  content: [''],
  author: 'Hydroseal Team',
  date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
});

const BlogAdmin: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type }); setTimeout(() => setToast(null), 3000);
  };

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    setPosts(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const updatePost = (id: string, field: keyof BlogPost, val: string | string[]) =>
    setPosts(prev => prev.map(p => p.id === id ? { ...p, [field]: val } : p));

  const updateContent = (id: string, idx: number, val: string) =>
    setPosts(prev => prev.map(p => p.id === id
      ? { ...p, content: p.content.map((c, i) => i === idx ? val : c) }
      : p
    ));

  const addContentParagraph = (id: string) =>
    setPosts(prev => prev.map(p => p.id === id ? { ...p, content: [...p.content, ''] } : p));

  const removeContentParagraph = (id: string, idx: number) =>
    setPosts(prev => prev.map(p => p.id === id
      ? { ...p, content: p.content.filter((_, i) => i !== idx) }
      : p
    ));

  const addPost = () => {
    const np = emptyPost();
    setPosts(prev => [np, ...prev]);
    setExpanded(np.id);
  };

  const savePost = async (post: BlogPost) => {
    setSaving(post.id);
    const payload = {
      slug: post.slug || post.id,
      title: post.title,
      image: post.image,
      images: post.images,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      date_text: post.date,
    };


    // Check if exists
    const { data: existing } = await supabase.from('blog_posts').select('id').eq('id', post.id).maybeSingle();
    let error;
    if (existing) {
      ({ error } = await supabase.from('blog_posts').update(payload).eq('id', post.id));
    } else {
      ({ error } = await supabase.from('blog_posts').insert({ ...payload, id: post.id }));
    }
    setSaving(null);
    if (error) showToast('Save failed: ' + error.message, 'error');
    else { showToast('Post saved!'); fetchPosts(); }
  };

  const deletePost = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    setDeleting(id);
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    setDeleting(null);
    if (error) showToast('Delete failed: ' + error.message, 'error');
    else { showToast('Post deleted!'); fetchPosts(); }
  };

  if (loading) return <AdminLayout><p style={{ color: '#64748b' }}>Loading…</p></AdminLayout>;

  return (
    <AdminLayout>
      <div className={styles.pageHeader}>
        <div>
          <h1 className="admin-page-title">Blog Posts</h1>
          <p className="admin-page-subtitle">Create, edit and delete blog articles</p>
        </div>
        <button className="admin-btn-primary" onClick={addPost}><FiPlus /> New Post</button>
      </div>

      <div className={styles.itemList}>
        {posts.length === 0 && (
          <div className="admin-card" style={{ textAlign: 'center', color: '#64748b' }}>
            No posts yet. Click "New Post" to create one.
          </div>
        )}
        {posts.map(post => (
          <div key={post.id} className="admin-card">
            <div className={styles.itemHeader}>
              <span className={styles.itemIndex} style={{ fontSize: '0.9rem', textTransform: 'none', color: '#f1f5f9' }}>
                {post.title || 'Untitled Post'}
              </span>
              <div className={styles.itemControls}>
                <button className="admin-btn-ghost" onClick={() => setExpanded(expanded === post.id ? null : post.id)}>
                  {expanded === post.id ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                <button className="admin-btn-primary" onClick={() => savePost(post)} disabled={saving === post.id}>
                  <FiSave /> {saving === post.id ? 'Saving…' : 'Save'}
                </button>
                <button className="admin-btn-danger" onClick={() => deletePost(post.id)} disabled={deleting === post.id}>
                  <FiTrash2 />
                </button>
              </div>
            </div>

            {expanded === post.id && (
              <>
                <div className={styles.twoCol}>
                  <div>
                    <div className="admin-field">
                      <label className="admin-label">Title</label>
                      <input className="admin-input" value={post.title} onChange={e => updatePost(post.id, 'title', e.target.value)} />
                    </div>
                    <div className="admin-field">
                      <label className="admin-label">Slug (URL)</label>
                      <input className="admin-input" value={post.slug} onChange={e => updatePost(post.id, 'slug', e.target.value)} placeholder="my-post-title" />
                    </div>
                    <div className="admin-field">
                      <label className="admin-label">Author</label>
                      <input className="admin-input" value={post.author} onChange={e => updatePost(post.id, 'author', e.target.value)} />
                    </div>
                    <div className="admin-field">
                      <label className="admin-label">Date</label>
                      <input className="admin-input" value={post.date} onChange={e => updatePost(post.id, 'date', e.target.value)} />
                    </div>
                    <div className="admin-field">
                      <label className="admin-label">Excerpt</label>
                      <textarea className="admin-textarea" rows={3} value={post.excerpt} onChange={e => updatePost(post.id, 'excerpt', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="admin-label">Main Cover Image</label>
                    <ImageUpload currentUrl={post.image} folder="blog" onUploaded={url => updatePost(post.id, 'image', url)} />
                  </div>
                </div>

                <div className="admin-field" style={{ marginTop: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <label className="admin-label" style={{ margin: 0 }}>Content Paragraphs</label>
                    <button className="admin-btn-ghost" style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem' }} onClick={() => addContentParagraph(post.id)}>
                      <FiPlus /> Add Paragraph
                    </button>
                  </div>
                  {post.content.map((para, pIdx) => (
                    <div key={pIdx} className={styles.contentItem}>
                      <span className={styles.contentIndex}>{pIdx + 1}</span>
                      <textarea
                        className="admin-textarea"
                        rows={3}
                        value={para}
                        onChange={e => updateContent(post.id, pIdx, e.target.value)}
                        style={{ marginBottom: '0.5rem' }}
                      />
                      <button className="admin-btn-danger" style={{ marginLeft: '0.5rem', alignSelf: 'center' }} onClick={() => removeContentParagraph(post.id, pIdx)}>
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="admin-field">
                  <label className="admin-label">Gallery Image URLs (one per line)</label>
                  <textarea
                    className="admin-textarea"
                    rows={3}
                    value={post.images.join('\n')}
                    onChange={e => updatePost(post.id, 'images', e.target.value.split('\n').map(s => s.trim()).filter(Boolean))}
                    placeholder="https://... or /public-path.jpg"
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {toast && <div className={toast.type === 'success' ? 'admin-toast-success' : 'admin-toast-error'}>{toast.msg}</div>}
    </AdminLayout>
  );
};

export default BlogAdmin;
