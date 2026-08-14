import { useRef, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';

// Components
import BlueprintCanvas from './components/BlueprintCanvas/BlueprintCanvas';
import Navbar         from './components/Navbar/Navbar';
import Hero           from './components/Hero/Hero';
import About          from './components/About/About';
import Skills         from './components/Skills/Skills';
import Projects       from './components/Projects/Projects';
import Achievements   from './components/Achievements/Achievements';
import Certificates   from './components/Certificates/Certificates';
import GitHub         from './components/GitHub/GitHub';
import Contact        from './components/Contact/Contact';
import Footer         from './components/Footer/Footer';

function PortfolioApp() {
  const mousePos = useRef({ x: 0, y: 0 });

  // Track mouse globally for canvas parallax
  useEffect(() => {
    function onMove(e) {
      mousePos.current = { x: e.clientX, y: e.clientY };
    }
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Global fade-up observer for all .fade-up elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Trigger progress bars if present
            entry.target.querySelectorAll('[data-width]').forEach(bar => {
              bar.style.width = bar.getAttribute('data-width') + '%';
            });
          }
        });
      },
      { threshold: 0.08 }
    );
    // Observe after a tick so all elements are rendered
    const tid = setTimeout(() => {
      document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    }, 100);
    return () => { clearTimeout(tid); observer.disconnect(); };
  }, []);

  return (
    <>
      {/* Blueprint animated background */}
      <BlueprintCanvas mousePos={mousePos} />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Certificates />
        <GitHub />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
