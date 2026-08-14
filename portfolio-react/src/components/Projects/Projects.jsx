import { useState, useEffect, useRef } from 'react';
import { projectsData } from '../../data/portfolioData';
import styles from './Projects.module.css';

const FILTERS = ['all', 'Data Science', 'Full Stack', 'Java', 'DSA'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const sectionRef = useRef(null);

  const filtered = activeFilter === 'all'
    ? projectsData
    : projectsData.filter(p => p.category === activeFilter);

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
    <section id="projects">
      <div className="container fade-up" ref={sectionRef}>
        <div className="section-header">
          <div className="section-label">03 / FEATURED WORK</div>
          <h2 className="section-title">Featured <span>Projects</span></h2>
        </div>

        <div className={styles.filters} role="group" aria-label="Project category filters">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`${styles.filterBtn} ${activeFilter === f ? styles.active : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f === 'all' ? 'ALL' : f.toUpperCase()}
            </button>
          ))}
        </div>

        <div className={styles.grid} aria-live="polite">
          {filtered.map((proj, i) => (
            <article
              key={proj.num}
              className={styles.card}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className={styles.cardNum}>{proj.num}</div>
              <div className={styles.cardIcon}>{proj.icon}</div>
              <h3 className={styles.cardTitle}>{proj.title}</h3>
              <p className={styles.cardDesc}>{proj.desc}</p>

              <div className={styles.cardMeta}>
                <span className={styles.metaItem}>
                  <span className={styles.metaKey}>ARCH</span>
                  <span className={styles.metaVal}>{proj.arch}</span>
                </span>
              </div>

              <div className={`${styles.status} ${proj.status === 'ACTIVE' ? styles.active : styles.completed}`}>
                {proj.status === 'ACTIVE' ? '● ACTIVE' : '✓ COMPLETED'}
              </div>

              <div className={styles.tags}>
                {proj.tech.map(t => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>

              <hr className={styles.divider} />

              <a
                href={proj.repo}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.repoBtn}
              >
                <i className="fab fa-github"></i> GitHub Repo
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
