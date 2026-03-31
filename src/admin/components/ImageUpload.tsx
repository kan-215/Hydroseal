import React, { useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import styles from './ImageUpload.module.scss';
import { FiUpload, FiTrash2 } from 'react-icons/fi';

interface ImageUploadProps {
  currentUrl: string;
  bucket?: string;
  folder?: string;
  onUploaded: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  currentUrl,
  bucket = 'media',
  folder = 'uploads',
  onUploaded,
}) => {
  const handleFile = useCallback(async (file: File) => {
    const ext = file.name.split('.').pop();
    const path = `${folder}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true });
    if (error) { alert('Upload failed: ' + error.message); return; }
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    onUploaded(data.publicUrl);
  }, [bucket, folder, onUploaded]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className={styles.wrapper}>
      {currentUrl && (
        <div className={styles.preview}>
          <img src={currentUrl} alt="Preview" />
          <button className={styles.removeBtn} onClick={() => onUploaded('')} title="Remove image">
            <FiTrash2 />
          </button>
        </div>
      )}
      <label
        className={styles.dropzone}
        onDragOver={e => e.preventDefault()}
        onDrop={handleDrop}
      >
        <FiUpload className={styles.uploadIcon} />
        <span>Drag & drop or <strong>click to upload</strong></span>
        <span className={styles.hint}>PNG, JPG, JPEG, WebP</span>
        <input type="file" accept="image/*" onChange={handleChange} hidden />
      </label>
      <div className={styles.urlRow}>
        <span className="admin-label" style={{ margin: 0 }}>or paste URL</span>
        <input
          className="admin-input"
          style={{ marginTop: 6 }}
          placeholder="https://..."
          value={currentUrl}
          onChange={e => onUploaded(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
