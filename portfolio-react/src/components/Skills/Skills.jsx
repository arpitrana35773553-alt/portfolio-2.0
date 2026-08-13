import { useState, useEffect, useRef } from 'react';
import { skillsData } from '../../data/portfolioData';
import styles from './Skills.module.css';

export default function Skills() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef(null);
  const activeSkill = skillsData[activeTab];

  // Fade-up observer
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Animate progress bars when tab changes
  useEffect(() => {
    const bars = document.querySelectorAll(`.${styles.progressFill}`);
    bars.forEach(bar => {
      bar.style.width = '0%';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          bar.style.width = bar.getAttribute('data-width') + '%';
        });
      });
    });
  }, [activeTab]);

  return (
    <section id="skills">
      <div className="container fade-up" ref={sectionRef}>
        <div className="section-header">
          <div className="section-label">02 / TECHNICAL DOMAINS</div>
          <h2 className="section-title">Technical <span>Arsenal</span></h2>
        </div>

        {/* ── CATEGORY TAB BAR ── */}
        <div className={styles.tabBar} role="tablist" aria-label="Skill categories">
          {skillsData.map((skill, i) => (
            <button
              key={skill.id}
              role="tab"
              aria-selected={activeTab === i}
              aria-controls={`skill-panel-${i}`}
              id={`skill-tab-${i}`}
              className={`${styles.tab} ${activeTab === i ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(i)}
            >
              <i className={`${skill.icon} ${styles.tabIcon}`}></i>
              <span className={styles.tabLabel}>{skill.title}</span>
              <span className={`${styles.tabNum} ${activeTab === i ? styles.tabNumActive : ''}`}>
                {skill.badges.length}
              </span>
            </button>
          ))}
        </div>

        {/* ── SKILL PANEL ── */}
        <div
          key={activeTab}
          className={styles.panel}
          role="tabpanel"
          id={`skill-panel-${activeTab}`}
          aria-labelledby={`skill-tab-${activeTab}`}
        >
          {/* Left: badges + progress */}
          <div className={styles.panelLeft}>
            <div className={styles.panelHeader}>
              <div className={styles.panelIcon}>
                <i className={activeSkill.icon}></i>
              </div>
              <div>
                <div className={styles.panelId}>{activeSkill.id}</div>
                <h3 className={styles.panelTitle}>{activeSkill.title}</h3>
              </div>
            </div>

            <div className={styles.badges}>
              {activeSkill.badges.map(b => (
                <span key={b} className={styles.badge}>{b}</span>
              ))}
            </div>

            <div className={styles.progressSection}>
              <div className={styles.progressLabelRow}>
                <span className={styles.progressLabelText}>Overall Proficiency</span>
                <span className={styles.progressPct}>{activeSkill.proficiency}%</span>
              </div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  data-width={activeSkill.proficiency}
                  style={{ width: 0 }}
                />
              </div>
            </div>
          </div>

          {/* Right: per-badge breakdown bars */}
          <div className={styles.panelRight}>
            <div className={styles.breakdownTitle}>SKILL BREAKDOWN</div>
            {activeSkill.badges.map((b, i) => {
              // Generate a slightly varied percentage for visual interest
              const pct = Math.max(55, Math.min(98, activeSkill.proficiency + (i % 3 === 0 ? 8 : i % 2 === 0 ? -6 : 2)));
              return (
                <div key={b} className={styles.breakdownRow}>
                  <span className={styles.breakdownLabel}>{b}</span>
                  <div className={styles.breakdownBarWrap}>
                    <div
                      className={styles.breakdownBar}
                      data-width={pct}
                      style={{ width: 0 }}
                    />
                  </div>
                  <span className={styles.breakdownPct}>{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── MINI SUMMARY CARDS (all categories at a glance) ── */}
        <div className={styles.summaryRow}>
          {skillsData.map((skill, i) => (
            <button
              key={skill.id}
              className={`${styles.summaryCard} ${activeTab === i ? styles.summaryActive : ''}`}
              onClick={() => setActiveTab(i)}
              aria-label={`Switch to ${skill.title}`}
            >
              <i className={`${skill.icon} ${styles.summaryIcon}`}></i>
              <span className={styles.summaryLabel}>{skill.title}</span>
              <div className={styles.summaryBar}>
                <div
                  className={styles.summaryFill}
                  style={{ width: `${skill.proficiency}%` }}
                />
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
