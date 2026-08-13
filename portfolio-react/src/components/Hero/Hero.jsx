import { useEffect, useRef } from 'react';
import { taglines } from '../../data/portfolioData';
import styles from './Hero.module.css';

const NAME = 'FARDEEN RIZVI';

export default function Hero() {
  const nameRef = useRef(null);
  const typedRef = useRef(null);
  const typingState = useRef({ idx: 0, charIdx: 0, deleting: false, timer: null });

  // Character reveal animation
  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;
    let html = '';
    let delay = 300;
    for (const ch of NAME) {
      if (ch === ' ') {
        html += `<span class="${styles.nameSpace}" aria-hidden="true"> </span>`;
      } else {
        html += `<span class="${styles.nameChar}" style="animation-delay:${delay}ms" aria-hidden="true">${ch}</span>`;
        delay += 52;
      }
    }
    el.innerHTML = html;
    // Start typing after name finishes
    const typingDelay = delay + 150;
    const t = setTimeout(startTyping, typingDelay);
    return () => clearTimeout(t);
  }, []);

  function startTyping() {
    typeStep();
  }

  function typeStep() {
    const s = typingState.current;
    const el = typedRef.current;
    if (!el) return;
    const current = taglines[s.idx];
    if (s.deleting) {
      el.textContent = current.substring(0, s.charIdx--);
      if (s.charIdx < 0) {
        s.deleting = false;
        s.idx = (s.idx + 1) % taglines.length;
        s.timer = setTimeout(typeStep, 350);
        return;
      }
      s.timer = setTimeout(typeStep, 38);
    } else {
      el.textContent = current.substring(0, s.charIdx++);
      if (s.charIdx > current.length) {
        s.deleting = true;
        s.timer = setTimeout(typeStep, 2200);
        return;
      }
      s.timer = setTimeout(typeStep, 70);
    }
  }

  useEffect(() => {
    return () => clearTimeout(typingState.current.timer);
  }, []);

  function scrollTo(id) {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section id="home" className={styles.hero}>
      <div className="container">
        <div className={styles.heroInner}>
          {/* Left: Content */}
          <div className={styles.heroContent}>
            <div className={styles.eyebrow}>DATA SCIENCE × FULL STACK</div>
            <div className={styles.tagId}>IDENTITY / 001</div>

            <h1
              className={styles.heroName}
              ref={nameRef}
              aria-label="Fardeen Rizvi"
            />

            <p className={styles.heroRole}>Data Scientist &amp; Full-Stack Developer</p>

            <div className={styles.typingWrap}>
              <span ref={typedRef} id="typed-text"></span>
              <span className={styles.cursor} aria-hidden="true">|</span>
            </div>

            <div className={styles.ctaGroup}>
              <button className="btn btn-primary" onClick={() => scrollTo('#projects')}>
                <i className="fas fa-code-branch"></i> View Projects
              </button>
              <button className="btn btn-outline" onClick={() => scrollTo('#contact')}>
                <i className="fas fa-paper-plane"></i> Let&apos;s Connect
              </button>
            </div>

            <div className={styles.socialIcons}>
              <a href="https://github.com/Fardeenrizvi92" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/fardeen-rizvi-362919379/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Right: Blueprint Identity Card */}
          <div className={styles.blueprintCard} aria-hidden="true">
            <div className={styles.scanLine}></div>
            <div className={styles.bpLabel}>// IDENTITY / 001</div>
            <div className={styles.bpRow}><span className={styles.bpKey}>NAME</span><span className={styles.bpVal}>Fardeen Rizvi</span></div>
            <div className={styles.bpRow}><span className={styles.bpKey}>ROLE</span><span className={styles.bpVal}>DS + Full Stack</span></div>
            <div className={styles.bpRow}><span className={styles.bpKey}>STACK</span><span className={styles.bpVal}>Python · React · Node</span></div>
            <div className={styles.bpRow}><span className={styles.bpKey}>STATUS</span><span className={styles.bpValAccent}>● AVAILABLE</span></div>
            <hr className={styles.bpDivider} />
            <div className={styles.bpLabel}>// DATA PIPELINE</div>
            {['DATASET_LOADED','FEATURE_ENGINEERING','MODEL_TRAINING','PREDICTION → INSIGHT'].map((item, i, arr) => (
              <div key={item}>
                <div className={styles.pipeItem}>{item}</div>
                {i < arr.length - 1 && <div className={styles.pipeArrow}>↓</div>}
              </div>
            ))}
            <hr className={styles.bpDivider} />
            <div className={styles.bpLabel}>// APP STACK</div>
            {['CLIENT / REACT','REST API / EXPRESS','DATABASE / MONGODB'].map((item, i, arr) => (
              <div key={item}>
                <div className={styles.pipeItem}>{item}</div>
                {i < arr.length - 1 && <div className={styles.pipeArrow}>↓</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
