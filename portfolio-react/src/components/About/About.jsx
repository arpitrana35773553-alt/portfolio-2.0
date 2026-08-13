import { useEffect, useRef } from 'react';
import styles from './About.module.css';

const ARCH_LAYERS = [
  { icon: 'fas fa-desktop', label: 'CLIENT LAYER — React / HTML / CSS / JS' },
  { icon: 'fas fa-exchange-alt', label: 'API LAYER — REST / Express / Node.js' },
  { icon: 'fas fa-server', label: 'SERVER LAYER — Python / Java / Node' },
  { icon: 'fas fa-database', label: 'DATA LAYER — MongoDB / SQL / Pandas' },
  { icon: 'fas fa-brain', label: 'MODEL LAYER — Scikit-learn / NumPy / ML' },
];

const STATS = [
  { num: '150+', label: 'DSA PROBLEMS' },
  { num: '5+', label: 'CERTIFICATIONS' },
  { num: '5+', label: 'PROJECTS BUILT' },
  { num: '6mo', label: 'CODE STREAK' },
];

export default function About() {
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
    <section id="about">
      <div className="container fade-up" ref={sectionRef}>
        <div className="section-header">
          <div className="section-label">01 / ABOUT</div>
          <h2 className="section-title">About <span>Me</span></h2>
        </div>

        <div className={styles.grid}>
          {/* Bio */}
          <div className={`glass ${styles.bio}`}>
            <p>
              I&apos;m a Computer Science student passionate about building{' '}
              <strong>intelligent, data-driven applications</strong> that merge modern web
              engineering with machine learning. I approach problems analytically, transforming
              raw data into actionable insights and scalable software systems.
            </p>
            <p>
              My foundation spans <strong>Data Science</strong> — working with Python, Pandas,
              NumPy, and Scikit-learn — and <strong>Full-Stack Development</strong> with React,
              Node.js, Express, and MongoDB. I believe in engineering precision, clean
              architecture, and iterative improvement.
            </p>
            <p>
              Currently deepening expertise in <strong>machine learning pipelines</strong>,
              RESTful API design, and database optimization, while consistently solving
              algorithmic problems to sharpen computational thinking.
            </p>
          </div>

          {/* Stats + Architecture */}
          <div className={styles.rightCol}>
            <div className={styles.statsGrid}>
              {STATS.map(s => (
                <div key={s.label} className={`glass ${styles.statCard}`}>
                  <div className={styles.statNum}>{s.num}</div>
                  <div className={styles.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>

            <div className={`glass ${styles.archCard}`}>
              <div className={styles.archTitle}>// SYSTEM ARCHITECTURE</div>
              {ARCH_LAYERS.map((layer, i) => (
                <div key={layer.label}>
                  <div className={styles.archLayer}>
                    <i className={layer.icon}></i>
                    {layer.label}
                  </div>
                  {i < ARCH_LAYERS.length - 1 && (
                    <div className={styles.archArrow}>↓</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
