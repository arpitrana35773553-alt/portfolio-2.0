import { useEffect, useRef, useState } from 'react';
import { certificatesData } from '../../data/portfolioData';
import CertModal from '../CertModal/CertModal';
import styles from './Certificates.module.css';

export default function Certificates() {
  const [modalSrc, setModalSrc] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="certificates">
      <div className="container fade-up" ref={sectionRef}>
        <div className="section-header">
          <div className="section-label">05 / CREDENTIALS</div>
          <h2 className="section-title">Certifi<span>cations</span></h2>
        </div>

        <div className={styles.grid}>
          {certificatesData.map(cert => (
            <div
              key={cert.id}
              className={styles.card}
              onClick={() => setModalSrc(cert.src)}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setModalSrc(cert.src)}
              role="button"
              tabIndex={0}
              aria-label={`View ${cert.title} certificate`}
            >
              <div className={styles.imgWrap}>
                <img src={cert.src} alt={cert.alt} loading="lazy" />
                <div className={styles.overlay}>
                  <i className="fas fa-expand"></i>
                </div>
              </div>
              <div className={styles.info}>
                <div className={styles.dot}></div>
                <div className={styles.title}>{cert.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalSrc && (
        <CertModal src={modalSrc} onClose={() => setModalSrc(null)} />
      )}
    </section>
  );
}
