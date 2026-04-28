import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import ImageUpload from '../components/ImageUpload';
import { supabase } from '../../lib/supabase';
import styles from './Editor.module.scss';
import { FiPlus, FiTrash2, FiSave, FiChevronDown, FiChevronUp, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

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
  id: crypto.randomUUID(),
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
  const [addingImageTo, setAddingImageTo] = useState<string | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type }); setTimeout(() => setToast(null), 3000);
  };

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    const normalized = (data ?? []).map((d: any) => ({
      ...d,
      date: d.date_text || d.date
    }));
    setPosts(normalized);
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

  const moveGalleryImage = (postId: string, idx: number, dir: -1 | 1) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const images = [...p.images];
      const newIdx = idx + dir;
      if (newIdx < 0 || newIdx >= images.length) return p;
      [images[idx], images[newIdx]] = [images[newIdx], images[idx]];
      return { ...p, images };
    }));
  };

  const removeGalleryImage = (postId: string, idx: number) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      return { ...p, images: p.images.filter((_, i) => i !== idx) };
    }));
  };

  const addGalleryImage = (postId: string, url: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      return { ...p, images: [...p.images, url] };
    }));
    setAddingImageTo(null);
  };

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

  const applyFormatting = (target: HTMLTextAreaElement, type: 'bold' | 'italic', updateFn: (val: string) => void) => {
    const start = target.selectionStart;
    const end = target.selectionEnd;
    const text = target.value;
    const marker = type === 'bold' ? '**' : '*';
    const markerLen = marker.length;
    
    const newValue = text.substring(0, start) + marker + text.substring(start, end) + marker + text.substring(end);
    updateFn(newValue);
    
    requestAnimationFrame(() => {
      target.focus();
      target.setSelectionRange(start + markerLen, end + markerLen);
    });
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
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <label className="admin-label" style={{ margin: 0 }}>Excerpt</label>
                        <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Shortcuts: <b>Ctrl+B</b> (Bold), <b>Ctrl+I</b> (Italic)</span>
                      </div>
                      <textarea 
                        className="admin-textarea" 
                        rows={3} 
                        value={post.excerpt} 
                        onChange={e => updatePost(post.id, 'excerpt', e.target.value)}
                        onKeyDown={(e) => {
                          const isB = e.key?.toLowerCase() === 'b' || e.code === 'KeyB';
                          const isI = e.key?.toLowerCase() === 'i' || e.code === 'KeyI';
                          const modifier = e.ctrlKey || e.metaKey || e.altKey;

                          if (modifier && isB) {
                            e.preventDefault(); e.stopPropagation();
                            applyFormatting(e.currentTarget, 'bold', (val) => updatePost(post.id, 'excerpt', val));
                          }
                          if (modifier && isI) {
                            e.preventDefault(); e.stopPropagation();
                            applyFormatting(e.currentTarget, 'italic', (val) => updatePost(post.id, 'excerpt', val));
                          }
                        }}
                      />
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
                      <div style={{ flex: 1 }}>
                        <textarea
                          className="admin-textarea"
                          rows={3}
                          value={para}
                          onChange={e => updateContent(post.id, pIdx, e.target.value)}
                          onKeyDown={(e) => {
                            const isB = e.key?.toLowerCase() === 'b' || e.code === 'KeyB';
                            const isI = e.key?.toLowerCase() === 'i' || e.code === 'KeyI';
                            const modifier = e.ctrlKey || e.metaKey || e.altKey;

                            if (modifier && isB) {
                              e.preventDefault(); e.stopPropagation();
                              applyFormatting(e.currentTarget, 'bold', (val) => updateContent(post.id, pIdx, val));
                            }
                            if (modifier && isI) {
                              e.preventDefault(); e.stopPropagation();
                              applyFormatting(e.currentTarget, 'italic', (val) => updateContent(post.id, pIdx, val));
                            }
                          }}
                          style={{ marginBottom: '0.2rem' }}
                        />
                        <div style={{ fontSize: '0.65rem', color: '#64748b', textAlign: 'right' }}>
                          Highlight text + <b>Ctrl+B</b> or <b>Alt+B</b> to bold
                        </div>
                      </div>
                      <button className="admin-btn-danger" style={{ marginLeft: '0.5rem', alignSelf: 'flex-start', marginTop: '0.5rem' }} onClick={() => removeContentParagraph(post.id, pIdx)}>
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="admin-field" style={{ marginTop: '2rem' }}>
                  <label className="admin-label">Blog Photo Gallery</label>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>Reorder images by clicking arrows. Images are shown in order at the bottom of the blog post.</p>
                  
                  <div className={styles.galleryGrid}>
                    {post.images.map((url, idx) => (
                      <div key={idx} className={styles.galleryItem}>
                        <div className={styles.galleryLabel}>{idx + 1}</div>
                        <img src={url} alt={`Gallery ${idx}`} className={styles.galleryImage} />
                        <div className={styles.galleryActions}>
                          <button className="admin-btn-ghost" onClick={() => moveGalleryImage(post.id, idx, -1)} disabled={idx === 0} title="Move Backward">
                            <FiArrowLeft />
                          </button>
                          <button className="admin-btn-ghost" onClick={() => moveGalleryImage(post.id, idx, 1)} disabled={idx === post.images.length - 1} title="Move Forward">
                            <FiArrowRight />
                          </button>
                          <button className="admin-btn-danger" onClick={() => removeGalleryImage(post.id, idx)} title="Delete Photo">
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                    ))}

                    
                    <div className={styles.addGalleryItem} onClick={() => setAddingImageTo(post.id)}>
                      {addingImageTo === post.id ? (
                        <ImageUpload currentUrl="" folder="blog" onUploaded={(url) => addGalleryImage(post.id, url)} />
                      ) : (
                        <div className={styles.addPlaceholder}>
                          <FiPlus />
                          <span>Add Photo</span>
                        </div>
                      )}
                    </div>
                  </div>
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
