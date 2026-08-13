import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'ABOUT', num: '01', href: '#about' },
  { label: 'SKILLS', num: '02', href: '#skills' },
  { label: 'PROJECTS', num: '03', href: '#projects' },
  { label: 'CERTS', num: '04', href: '#certificates' },
  { label: 'CONTACT', num: '05', href: '#contact' },
];

export default function Navbar() {
  const { isLight, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Active section detection
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.35 }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  function handleNavClick(e, href) {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  }

  return (
    <>
      <nav className={styles.navbar} role="navigation" aria-label="Main navigation">
        <div className={`container ${styles.navContainer}`}>
          <a href="#home" className={styles.logo} onClick={e => handleNavClick(e, '#home')} aria-label="Fardeen Rizvi Home">
            <span className={styles.logoAccent}>FR</span> / PORTFOLIO
          </a>

          <ul className={styles.navLinks} role="list">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`${styles.navLink} ${activeSection === link.href.slice(1) ? styles.active : ''}`}
                  onClick={e => handleNavClick(e, link.href)}
                >
                  <span className={styles.navNum}>{link.num}</span> {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.navRight}>
            <button
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label="Toggle light/dark mode"
            >
              <i className={`fas ${isLight ? 'fa-moon' : 'fa-sun'}`}></i>
            </button>
            <button
              className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle mobile menu"
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`} aria-hidden={!menuOpen}>
        <ul role="list">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className={styles.mobileLink}
                onClick={e => handleNavClick(e, link.href)}
              >
                <span className={styles.logoAccent}>{link.num} </span>{link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
