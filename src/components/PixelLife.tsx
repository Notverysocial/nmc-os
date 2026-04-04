'use client';
import { useEffect, useRef, useCallback } from 'react';

interface PixelLifeProps {
  cellSize?: number;
  fillRate?: number;
  color?: string;
  fps?: number;
}

export default function PixelLife({
  cellSize = 10,
  fillRate = 0.15,
  color = 'rgba(26,43,80,0.35)',
  fps = 4,
}: PixelLifeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{
    grid: Uint8Array;
    next: Uint8Array;
    cols: number;
    rows: number;
    lastFrame: number;
    lastInject: number;
    animId: number;
  } | null>(null);

  const interval = 1000 / fps;
  const stride = cellSize + 1; // cell + gap

  const initGrid = useCallback(
    (cols: number, rows: number): Uint8Array => {
      const g = new Uint8Array(cols * rows);
      for (let i = 0; i < g.length; i++) {
        g[i] = Math.random() < fillRate ? 1 : 0;
      }
      return g;
    },
    [fillRate]
  );

  const injectCluster = useCallback(
    (grid: Uint8Array, cols: number, rows: number) => {
      const cx = Math.floor(Math.random() * cols);
      const cy = Math.floor(Math.random() * rows);
      const radius = 4 + Math.floor(Math.random() * 6);
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          if (Math.random() < 0.4) {
            const x = ((cx + dx) % cols + cols) % cols;
            const y = ((cy + dy) % rows + rows) % rows;
            grid[y * cols + x] = 1;
          }
        }
      }
    },
    []
  );

  const step = useCallback(
    (grid: Uint8Array, next: Uint8Array, cols: number, rows: number) => {
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const n =
            grid[((y - 1 + rows) % rows) * cols + ((x - 1 + cols) % cols)] +
            grid[((y - 1 + rows) % rows) * cols + x] +
            grid[((y - 1 + rows) % rows) * cols + ((x + 1) % cols)] +
            grid[y * cols + ((x - 1 + cols) % cols)] +
            grid[y * cols + ((x + 1) % cols)] +
            grid[((y + 1) % rows) * cols + ((x - 1 + cols) % cols)] +
            grid[((y + 1) % rows) * cols + x] +
            grid[((y + 1) % rows) * cols + ((x + 1) % cols)];
          const alive = grid[y * cols + x];
          next[y * cols + x] = alive
            ? n === 2 || n === 3
              ? 1
              : 0
            : n === 3
            ? 1
            : 0;
        }
      }
    },
    []
  );

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, grid: Uint8Array, cols: number, rows: number) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.fillStyle = color;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (grid[y * cols + x]) {
            ctx.fillRect(x * stride, y * stride, cellSize, cellSize);
          }
        }
      }
    },
    [color, stride, cellSize]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      const cols = Math.floor(w / stride);
      const rows = Math.floor(h / stride);
      const grid = initGrid(cols, rows);
      const next = new Uint8Array(cols * rows);
      stateRef.current = {
        grid,
        next,
        cols,
        rows,
        lastFrame: performance.now(),
        lastInject: performance.now(),
        animId: 0,
      };
    };

    resize();
    window.addEventListener('resize', resize);

    const loop = (now: number) => {
      const s = stateRef.current;
      if (!s) return;
      s.animId = requestAnimationFrame(loop);

      if (now - s.lastFrame < interval) return;
      s.lastFrame = now;

      if (now - s.lastInject > 30000) {
        injectCluster(s.grid, s.cols, s.rows);
        s.lastInject = now;
      }

      step(s.grid, s.next, s.cols, s.rows);
      // swap buffers
      const tmp = s.grid;
      s.grid = s.next;
      s.next = tmp;

      draw(ctx, s.grid, s.cols, s.rows);
    };

    const id = requestAnimationFrame(loop);
    stateRef.current!.animId = id;

    return () => {
      window.removeEventListener('resize', resize);
      if (stateRef.current) cancelAnimationFrame(stateRef.current.animId);
    };
  }, [interval, initGrid, injectCluster, step, draw, stride]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
