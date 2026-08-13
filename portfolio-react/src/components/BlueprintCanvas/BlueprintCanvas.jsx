import { useEffect, useRef } from 'react';
import styles from './BlueprintCanvas.module.css';

const CODE_SNIPPETS = [
  'import pandas as pd',
  'model.fit(X_train, y_train)',
  'const data = await fetch(API)',
  'function analyze(dataset) {}',
  'SELECT * FROM projects WHERE status = "active"',
  'npm run build',
  'git commit -m "feature: add ml pipeline"',
  'df.dropna(inplace=True)',
  'accuracy = model.score(X_test, y_test)',
  'const [state, setState] = useState(null)',
  'app.get("/api/data", async (req, res) => {})',
  'X_train, X_test = train_test_split(X, 0.2)',
  'return res.json({ success: true, data })',
  'pip install scikit-learn pandas numpy',
  'DATASET_LOADED → PREPROCESSING → MODEL',
  'FEATURE_ENGINEERING → TRAINING',
  'STATISTICAL_ANALYSIS',
  'export default function Component() {}',
  'useEffect(() => { fetchData(); }, [])',
  'mongoose.connect(process.env.MONGO_URI)',
];

class CodeFragment {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset(true);
  }
  reset(init = false) {
    this.text = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
    this.x = Math.random() * this.canvas.width;
    this.y = init ? Math.random() * this.canvas.height : this.canvas.height + 30;
    this.speed = 0.18 + Math.random() * 0.28;
    this.opacity = 0.025 + Math.random() * 0.055;
    this.size = 9 + Math.random() * 4;
    this.drift = (Math.random() - 0.5) * 0.08;
  }
  update() {
    this.y -= this.speed;
    this.x += this.drift;
    if (this.y < -30) this.reset();
  }
  draw(ctx, isLight) {
    ctx.fillStyle = isLight
      ? `rgba(2, 132, 199, ${this.opacity * 0.5})`
      : `rgba(14, 165, 233, ${this.opacity})`;
    ctx.font = `${this.size}px 'JetBrains Mono', monospace`;
    ctx.fillText(this.text, this.x, this.y);
  }
}

class DataPoint {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset(true);
  }
  reset(init = false) {
    this.x = Math.random() * this.canvas.width;
    this.y = init ? Math.random() * this.canvas.height : Math.random() * this.canvas.height;
    this.r = 1 + Math.random() * 2;
    this.speed = 0.08 + Math.random() * 0.18;
    this.angle = Math.random() * Math.PI * 2;
    this.opacity = 0.04 + Math.random() * 0.09;
    this.pulse = Math.random() * Math.PI * 2;
  }
  update() {
    this.angle += 0.0025;
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed * 0.5;
    this.pulse += 0.04;
    if (this.x < 0 || this.x > this.canvas.width || this.y < 0 || this.y > this.canvas.height) {
      this.reset();
    }
  }
  draw(ctx, isLight) {
    const op = this.opacity * (0.6 + 0.4 * Math.sin(this.pulse));
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = isLight
      ? `rgba(2, 132, 199, ${op * 0.4})`
      : `rgba(0, 212, 255, ${op})`;
    ctx.fill();
  }
}

class LiquidBlob {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
  }
  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.radius = 180 + Math.random() * 220;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.phase = Math.random() * Math.PI * 2;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.phase += 0.008;
    if (this.x < -100 || this.x > this.canvas.width + 100) this.vx *= -1;
    if (this.y < -100 || this.y > this.canvas.height + 100) this.vy *= -1;
  }
  draw(ctx, isLight) {
    const currentR = this.radius + Math.sin(this.phase) * 35;
    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, currentR);
    if (isLight) {
      grad.addColorStop(0, 'rgba(91, 155, 213, 0.07)');
      grad.addColorStop(0.5, 'rgba(125, 184, 240, 0.03)');
      grad.addColorStop(1, 'transparent');
    } else {
      grad.addColorStop(0, 'rgba(91, 155, 213, 0.08)');
      grad.addColorStop(0.5, 'rgba(40, 75, 130, 0.04)');
      grad.addColorStop(1, 'transparent');
    }
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(this.x, this.y, currentR, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default function BlueprintCanvas({ mousePos }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({ fragments: [], points: [], blobs: [], rafId: null, time: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const state = stateRef.current;

    function init() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const fragCount = Math.min(18, Math.floor(canvas.width / 75));
      const ptCount = Math.min(35, Math.floor(canvas.width / 28));
      state.fragments = Array.from({ length: fragCount }, () => new CodeFragment(canvas));
      state.points = Array.from({ length: ptCount }, () => new DataPoint(canvas));
      state.blobs = Array.from({ length: 4 }, () => new LiquidBlob(canvas));
    }

    function drawGrid(isLight, mx, my) {
      const lineColor = isLight ? 'rgba(2,132,199,0.055)' : 'rgba(14,165,233,0.05)';
      const dotColor = isLight ? 'rgba(2,132,199,0.13)' : 'rgba(14,165,233,0.14)';
      const gridSize = 60;
      const shiftX = ((mx / canvas.width - 0.5) * 8);
      const shiftY = ((my / canvas.height - 0.5) * 8);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.5;
      for (let x = (shiftX % gridSize + gridSize) % gridSize; x < canvas.width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = (shiftY % gridSize + gridSize) % gridSize; y < canvas.height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }
      ctx.fillStyle = dotColor;
      for (let x = (shiftX % gridSize + gridSize) % gridSize; x < canvas.width; x += gridSize) {
        for (let y = (shiftY % gridSize + gridSize) % gridSize; y < canvas.height; y += gridSize) {
          ctx.beginPath(); ctx.arc(x, y, 1, 0, Math.PI * 2); ctx.fill();
        }
      }
    }

    function drawScan(isLight) {
      const scanY = (state.time * 0.28) % canvas.height;
      const grad = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
      grad.addColorStop(0, 'transparent');
      grad.addColorStop(0.5, isLight ? 'rgba(2,132,199,0.013)' : 'rgba(14,165,233,0.022)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, scanY - 40, canvas.width, 80);
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isLight = document.body.classList.contains('light');
      const mx = mousePos?.current?.x ?? canvas.width / 2;
      const my = mousePos?.current?.y ?? canvas.height / 2;
      state.time++;
      state.blobs.forEach(b => { b.update(); b.draw(ctx, isLight); });
      drawGrid(isLight, mx, my);
      drawScan(isLight);
      state.fragments.forEach(f => { f.update(); f.draw(ctx, isLight); });
      state.points.forEach(p => { p.update(); p.draw(ctx, isLight); });
      state.rafId = requestAnimationFrame(animate);
    }

    function onResize() {
      cancelAnimationFrame(state.rafId);
      init();
      animate();
    }

    init();
    animate();
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(state.rafId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
