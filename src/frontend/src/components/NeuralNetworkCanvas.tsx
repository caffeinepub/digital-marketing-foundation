import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  pulseOffset: number;
}

export function NeuralNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const nodesRef = useRef<Node[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    const COUNT = 90;
    const colors = ["#0066FF", "#7B2FBE", "#00AAFF", "#00D4FF", "#4488FF"];
    nodesRef.current = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2.5 + 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      pulseOffset: Math.random() * Math.PI * 2,
    }));

    const CONNECTION_DIST = 180;
    const MOUSE_RADIUS = 200;
    const MOUSE_STRENGTH = 0.5;

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      for (const node of nodes) {
        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * MOUSE_STRENGTH;
          node.vx += (dx / dist) * force * 0.1;
          node.vy += (dy / dist) * force * 0.1;
        }

        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (speed > 1.5) {
          node.vx *= 0.95;
          node.vy *= 0.95;
        }
        node.vx *= 0.998;
        node.vy *= 0.998;
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < -10) node.x = canvas.width + 10;
        if (node.x > canvas.width + 10) node.x = -10;
        if (node.y < -10) node.y = canvas.height + 10;
        if (node.y > canvas.height + 10) node.y = -10;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.4;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 170, 255, ${alpha})`;
            ctx.lineWidth = (1 - dist / CONNECTION_DIST) * 1.2;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      for (const node of nodes) {
        const pulse = (Math.sin(time * 0.001 + node.pulseOffset) + 1) / 2;
        const glowRadius = node.radius * (3 + pulse * 2);

        const grad = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          glowRadius * 3,
        );
        grad.addColorStop(0, `${node.color}CC`);
        grad.addColorStop(0.3, `${node.color}44`);
        grad.addColorStop(1, `${node.color}00`);
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius * 3, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
