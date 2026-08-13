import { useEffect, useRef } from 'react';
import styles from './GitHub.module.css';

function generateGrid() {
  return Array.from({ length: 60 }, () => {
    const r = Math.random();
    return r > 0.72 ? 'active' : r > 0.5 ? 'dim' : '';
  });
}

export default function GitHub() {
  const sectionRef = useRef(null);
  const cells = generateGrid();

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
    <section id="github">
      <div className="container fade-up" ref={sectionRef}>
        <div className={styles.panel}>
          <i className={`fab fa-github ${styles.ghIcon}`}></i>
          <h3 className={styles.title}>GitHub Activity</h3>
          <p className={styles.subtitle}>// CONTRIBUTION_FLOW / FARDEENRIZVI92</p>

          <div className={styles.grid} aria-label="GitHub contribution visualization" aria-hidden="true">
            {cells.map((cls, i) => (
              <div
                key={i}
                className={`${styles.cell} ${cls === 'active' ? styles.cellActive : cls === 'dim' ? styles.cellDim : ''}`}
              />
            ))}
          </div>

          <a
            href="https://github.com/Fardeenrizvi92"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <i className="fab fa-github"></i> View GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
}
