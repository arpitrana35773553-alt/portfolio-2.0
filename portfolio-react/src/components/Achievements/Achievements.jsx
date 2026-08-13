import { useEffect, useRef } from 'react';
import { achievementsData } from '../../data/portfolioData';
import styles from './Achievements.module.css';

export default function Achievements() {
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
    <section id="achievements">
      <div className="container fade-up" ref={sectionRef}>
        <div className="section-header">
          <div className="section-label">04 / MILESTONES</div>
          <h2 className="section-title">Milestones &amp; <span>Consistency</span></h2>
        </div>
        <div className={styles.grid}>
          {achievementsData.map((item, i) => (
            <div key={i} className={`glass ${styles.card}`}>
              <i className={`${item.icon} ${styles.icon}`}></i>
              <div>
                <strong className={styles.cardTitle}>{item.title}</strong>
                <span className={styles.cardSub}>{item.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
