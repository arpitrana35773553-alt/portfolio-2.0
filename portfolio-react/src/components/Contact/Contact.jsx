import { useState, useRef, useEffect } from 'react';
import styles from './Contact.module.css';

const CONTACT_LINKS = [
  {
    icon: 'fab fa-linkedin',
    label: 'LinkedIn',
    value: 'fardeen-rizvi-362919379',
    href: 'https://www.linkedin.com/in/fardeen-rizvi-362919379/',
  },
  {
    icon: 'fab fa-github',
    label: 'GitHub',
    value: '/Fardeenrizvi92',
    href: 'https://github.com/Fardeenrizvi92',
  },
  {
    icon: 'fas fa-envelope',
    label: 'Email',
    value: 'fardeen.rizvi@example.com',
    href: null,
  },
];

export default function Contact() {
  const [status, setStatus] = useState('idle'); // idle | sent
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

  function handleSubmit(e) {
    e.preventDefault();
    setStatus('sent');
    setTimeout(() => {
      setStatus('idle');
      e.target.reset();
    }, 3000);
  }

  return (
    <section id="contact">
      <div className="container fade-up" ref={sectionRef}>
        <div className="section-header">
          <div className="section-label">06 / CONTACT</div>
          <h2 className="section-title">Let&apos;s <span>Connect</span></h2>
        </div>

        <div className={styles.wrapper}>
          {/* Left: Info */}
          <div className={styles.infoCol}>
            <p className={styles.intro}>
              Open to data science roles, full-stack opportunities, research
              collaborations, and freelance projects. Let&apos;s build something
              intelligent together.
            </p>

            {CONTACT_LINKS.map(link => {
              const Tag = link.href ? 'a' : 'div';
              const props = link.href
                ? { href: link.href, target: '_blank', rel: 'noopener noreferrer' }
                : {};
              return (
                <Tag key={link.label} className={styles.contactCard} {...props}>
                  <i className={`${link.icon} ${styles.cardIcon}`}></i>
                  <div>
                    <strong className={styles.cardLabel}>{link.label}</strong>
                    <span className={styles.cardValue}>{link.value}</span>
                  </div>
                </Tag>
              );
            })}
          </div>

          {/* Right: Form */}
          <form
            className={`glass ${styles.form}`}
            onSubmit={handleSubmit}
            noValidate
          >
            <div className={styles.formGroup}>
              <label htmlFor="contactName">NAME</label>
              <input
                id="contactName"
                type="text"
                placeholder="Your full name"
                required
                autoComplete="name"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="contactEmail">EMAIL</label>
              <input
                id="contactEmail"
                type="email"
                placeholder="your@email.com"
                required
                autoComplete="email"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="contactSubject">SUBJECT</label>
              <input
                id="contactSubject"
                type="text"
                placeholder="Collaboration / Opportunity / Project"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="contactMessage">MESSAGE</label>
              <textarea
                id="contactMessage"
                rows={4}
                placeholder="Tell me about your project or opportunity..."
              />
            </div>
            <button
              type="submit"
              className={`btn ${status === 'sent' ? styles.btnSent : 'btn-primary'}`}
              disabled={status === 'sent'}
            >
              {status === 'sent' ? (
                <><i className="fas fa-check"></i> Message Sent!</>
              ) : (
                <><i className="fas fa-paper-plane"></i> Send Message</>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
