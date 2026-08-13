import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.logo}>
          <span className={styles.accent}>FR</span> / PORTFOLIO &nbsp;·&nbsp; DATA SCIENCE × FULL STACK
        </div>
        <div className={styles.links}>
          <a href="https://github.com/Fardeenrizvi92" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/fardeen-rizvi-362919379/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
        <div className={styles.copy}>
          © 2025 FARDEEN RIZVI — Built with React &amp; passion.
        </div>
      </div>
    </footer>
  );
}
