import { useEffect } from 'react';
import styles from './CertModal.module.css';

export default function CertModal({ src, onClose }) {
  // Close on ESC key
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Certificate viewer"
    >
      <button
        className={styles.closeBtn}
        onClick={onClose}
        aria-label="Close certificate viewer"
      >
        &times;
      </button>
      <img
        className={styles.img}
        src={src}
        alt="Certificate full view"
        onClick={e => e.stopPropagation()}
      />
    </div>
  );
}
