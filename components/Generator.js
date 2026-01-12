"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Lock,
  Unlock,
  Copy,
  Check,
  ChevronUp,
  Sparkles,
  Zap,
  Droplets,
  Palette,
  Sun,
  Moon,
  Wind,
  Snowflake,
  Flame,
  Crown,
  Smile,
  Eye,
  Anchor,
  Gem,
  Flower,
  Waves,
} from "lucide-react";
import {
  generateColor,
  getContrastColor,
  generatePaletteByMode,
} from "@/lib/colors";

const MODE_GROUPS = [
  {
    name: "Базовые схемы",
    modes: [
      { id: "random", name: "Случайная", icon: <Sparkles size={14} /> },
      {
        id: "monochromatic",
        name: "Монохромная",
        icon: <Droplets size={14} />,
      },
      { id: "analogous", name: "Аналоговая", icon: <Palette size={14} /> },
      { id: "complementary", name: "Контрастная", icon: <Zap size={14} /> },
      { id: "triadic", name: "Триада", icon: <Sun size={14} /> },
    ],
  },
  {
    name: "Продвинутые",
    modes: [
      { id: "pastel", name: "Пастель", icon: <Wind size={14} /> },
      { id: "neon", name: "Неон", icon: <Flame size={14} /> },
      {
        id: "warm",
        name: "Теплые",
        icon: <Sun className="text-orange-400" size={14} />,
      },
      {
        id: "cool",
        name: "Холодные",
        icon: <Snowflake className="text-blue-400" size={14} />,
      },
    ],
  },
  {
    name: "Настроение",
    modes: [
      {
        id: "luxury",
        name: "Роскошь",
        icon: <Crown className="text-yellow-500" size={14} />,
      },
      { id: "calm", name: "Спокойствие", icon: <Anchor size={14} /> },
      { id: "playful", name: "Игривая", icon: <Smile size={14} /> },
    ],
  },
  {
    name: "Сезоны",
    modes: [
      {
        id: "spring",
        name: "Весна",
        icon: <Flower className="text-pink-400" size={14} />,
      },
      {
        id: "summer",
        name: "Лето",
        icon: <Waves className="text-cyan-500" size={14} />,
      },
      {
        id: "autumn",
        name: "Осень",
        icon: <Gem className="text-orange-600" size={14} />,
      },
      {
        id: "winter",
        name: "Зима",
        icon: <Snowflake className="text-blue-300" size={14} />,
      },
    ],
  },
];

export default function Generator() {
  const [colors, setColors] = useState([]);
  const [mode, setMode] = useState("random");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copied, setCopied] = useState(null);

  const generate = useCallback(() => {
    setColors((prev) => {
      if (prev.length === 0)
        return Array.from({ length: 5 }).map(() => generateColor());
      return generatePaletteByMode(prev, mode);
    });
  }, [mode]);

  useEffect(() => {
    generate();
    const handleKey = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        generate();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [generate]);

  const toggleLock = (i) => {
    const next = [...colors];
    next[i].locked = !next[i].locked;
    setColors(next);
  };

  const currentMode = MODE_GROUPS.flatMap((g) => g.modes).find(
    (m) => m.id === mode
  );

  return (
    <div className="relative h-full w-full bg-white overflow-hidden flex flex-col">
      {/* ЦВЕТОВЫЕ ПОЛОСЫ */}
      <div className="flex flex-1 w-full h-full">
        {colors.map((color, i) => (
          <div
            key={i}
            style={{ backgroundColor: color.hex }}
            className="group relative flex flex-1 flex-col items-center justify-center transition-colors duration-300"
          >
            <button
              onClick={() => {
                navigator.clipboard.writeText(color.hex);
                setCopied(color.hex);
                setTimeout(() => setCopied(null), 2000);
              }}
              className="text-2xl font-black uppercase tracking-widest hover:scale-110 transition-transform"
              style={{ color: getContrastColor(color.hex) }}
            >
              {color.hex}
            </button>
            <button
              onClick={() => toggleLock(i)}
              className={`mt-10 p-4 rounded-2xl transition-all hover:bg-white/20 ${
                color.locked
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              }`}
              style={{ color: getContrastColor(color.hex) }}
            >
              {color.locked ? (
                <Lock size={24} fill="currentColor" />
              ) : (
                <Unlock size={24} />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* НИЖНЯЯ ПАНЕЛЬ */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 w-full justify-center px-4">
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-black/90 backdrop-blur-xl text-white px-5 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-2xl border border-white/10"
          >
            {currentMode?.icon}
            <span className="text-xs uppercase tracking-widest whitespace-nowrap">
              {currentMode?.name}
            </span>
            <ChevronUp
              size={16}
              className={`transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isMenuOpen && (
            <div className="absolute bottom-full mb-4 left-0 md:left-auto md:right-0 w-72 bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-[2rem] overflow-hidden animate-in slide-in-from-bottom-4">
              <div className="max-h-[60vh] overflow-y-auto p-2 no-scrollbar">
                {MODE_GROUPS.map((group) => (
                  <div key={group.name} className="mb-2">
                    <div className="px-4 py-2 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">
                      {group.name}
                    </div>
                    {group.modes.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => {
                          setMode(m.id);
                          setIsMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                          mode === m.id
                            ? "bg-blue-50 text-blue-600"
                            : "hover:bg-gray-50 text-gray-600"
                        }`}
                      >
                        <span
                          className={
                            mode === m.id ? "text-blue-500" : "text-gray-400"
                          }
                        >
                          {m.icon}
                        </span>
                        {m.name}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={generate}
          className="bg-white text-black px-6 py-4 rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all border border-gray-100 flex items-center gap-3 font-black text-xs uppercase tracking-widest"
        >
          <Zap size={18} fill="currentColor" />
          Сгенерировать
        </button>
      </div>

      {copied && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl z-[100] font-bold flex items-center gap-2 animate-in fade-in zoom-in">
          <Check size={18} className="text-green-500" /> {copied} скопирован
        </div>
      )}
    </div>
  );
}
