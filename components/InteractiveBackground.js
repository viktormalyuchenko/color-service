"use client";
import { useState, useRef, useEffect } from "react";

export default function InteractiveBackground() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="absolute inset-0 z-0 overflow-hidden"
    >
      {/* Слой 1: Статическая сетка точек */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Слой 2: Интерактивный прожектор с цветными точками */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: opacity,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.06), transparent 40%)`,
        }}
      />

      {/* Слой 3: Сами анимированные точки (через маску прожектора) */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: opacity,
          backgroundImage: `radial-gradient(circle at 1px 1px, #3b82f6 1.5px, transparent 0)`,
          backgroundSize: "32px 32px",
          maskImage: `radial-gradient(150px circle at ${mousePos.x}px ${mousePos.y}px, black 20%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(150px circle at ${mousePos.x}px ${mousePos.y}px, black 20%, transparent 100%)`,
        }}
      />
    </div>
  );
}
