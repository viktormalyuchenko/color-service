"use client";

import { useState, useEffect, useCallback } from "react";
import { Lock, Unlock, Copy, Check } from "lucide-react";
import { generateColor, getContrastColor } from "@/lib/colors";

export default function Generator() {
  const [colors, setColors] = useState([]);
  const [copiedColor, setCopiedColor] = useState(null);

  const generatePalette = useCallback(() => {
    setColors((prev) => {
      if (prev.length === 0) {
        return Array.from({ length: 5 }).map(() => generateColor());
      }
      return prev.map((color) => (color.locked ? color : generateColor()));
    });
  }, []);

  useEffect(() => {
    generatePalette();
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        generatePalette();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [generatePalette]);

  const toggleLock = (index) => {
    const newColors = [...colors];
    newColors[index].locked = !newColors[index].locked;
    setColors(newColors);
  };

  const copyToClipboard = async (hex) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedColor(hex);
      // Скрыть уведомление через 2 секунды
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (err) {
      // Запасной вариант если буфер заблокирован
      const textArea = document.createElement("textarea");
      textArea.value = hex;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopiedColor(hex);
      setTimeout(() => setCopiedColor(null), 2000);
    }
  };

  return (
    <div className="flex h-full w-full">
      {colors.map((color, index) => (
        <div
          key={index}
          style={{ backgroundColor: color.hex }}
          className="group relative flex flex-1 flex-col items-center justify-center transition-all duration-300"
        >
          {/* HEX код */}
          <button
            onClick={() => copyToClipboard(color.hex)}
            className="cursor-pointer text-2xl font-black uppercase tracking-wider transition-all hover:scale-110 active:scale-90"
            style={{ color: getContrastColor(color.hex) }}
          >
            {color.hex}
          </button>

          {/* Инструменты */}
          <div className="mt-8 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => toggleLock(index)}
              className="rounded-xl p-4 transition-all hover:bg-white/20"
              style={{ color: getContrastColor(color.hex) }}
            >
              {color.locked ? (
                <Lock size={28} fill="currentColor" />
              ) : (
                <Unlock size={28} />
              )}
            </button>

            <button
              onClick={() => copyToClipboard(color.hex)}
              className="rounded-xl p-4 transition-all hover:bg-white/20"
              style={{ color: getContrastColor(color.hex) }}
            >
              {copiedColor === color.hex ? (
                <Check size={28} className="text-green-400" />
              ) : (
                <Copy size={28} />
              )}
            </button>
          </div>

          {/* Подсказка */}
          <div
            className="absolute bottom-10 text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 pointer-events-none"
            style={{ color: getContrastColor(color.hex) }}
          >
            {color.locked ? "Цвет закреплен" : "Нажми для копирования"}
          </div>
        </div>
      ))}

      {/* Всплывающее уведомление (Toast) */}
      {copiedColor && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full shadow-2xl z-50 animate-bounce font-bold flex items-center gap-2">
          <Check size={18} /> Цвет {copiedColor} скопирован!
        </div>
      )}
    </div>
  );
}
