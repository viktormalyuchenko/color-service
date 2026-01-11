"use client";
import { useState } from "react";
import { CURATED_PALETTES, CATEGORIES } from "@/lib/data";
import {
  Heart,
  Eye,
  Copy,
  Check,
  Layout,
  Palette as PaletteIcon,
} from "lucide-react";
import Link from "next/link";

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [toast, setToast] = useState(null);
  const [likedPalettes, setLikedPalettes] = useState(new Set());

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  const filteredPalettes =
    activeCategory === "Все"
      ? CURATED_PALETTES
      : CURATED_PALETTES.filter((p) => p.tags.includes(activeCategory));

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      <div className="max-w-7xl mx-auto px-4 pt-16">
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-gray-900">
            Библиотека палитр
          </h1>

          {/* Расширенный блок категорий без поиска */}
          <div className="flex flex-wrap justify-center gap-3 mt-10 max-w-4xl mx-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all border ${
                  activeCategory === cat
                    ? "bg-black text-white border-black shadow-xl shadow-black/10"
                    : "bg-white text-gray-500 border-gray-100 hover:border-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        {/* СЕТКА ПО 3 В РЯД */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {filteredPalettes.map((palette) => {
            const colorsParam = palette.colors
              .map((c) => c.replace("#", ""))
              .join(",");
            const slug = palette.name.toLowerCase().replace(/ /g, "-");

            return (
              <article
                key={palette.id}
                className="group bg-white p-4 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all"
              >
                {/* Цвета */}
                <div className="flex h-48 w-full rounded-[2rem] overflow-hidden mb-6 shadow-inner">
                  {palette.colors.map((color) => (
                    <div
                      key={color}
                      className="flex-1 transition-all hover:flex-[1.5] cursor-pointer"
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        navigator.clipboard.writeText(color);
                        showToast(`Цвет ${color} скопирован`);
                      }}
                    />
                  ))}
                </div>

                <div className="px-2 flex justify-between items-center">
                  <h3 className="font-black text-xl text-gray-800 tracking-tight">
                    {palette.name}
                  </h3>

                  <div className="flex gap-2">
                    {/* Кнопка ДЕТАЛИ (Глаз) */}
                    <Link
                      href={`/palette/${slug}?colors=${colorsParam}`}
                      className="p-2.5 bg-gray-50 hover:bg-black hover:text-white rounded-xl transition-all"
                      title="Детали палитры"
                    >
                      <Eye size={18} />
                    </Link>

                    {/* Кнопка ВИЗУАЛИЗАТОР (Макет) */}
                    <Link
                      href={`/visualizer?colors=${colorsParam.replace(
                        /,/g,
                        "-"
                      )}`}
                      className="p-2.5 bg-gray-50 hover:bg-blue-600 hover:text-white rounded-xl transition-all text-blue-600"
                      title="Визуализировать"
                    >
                      <Layout size={18} />
                    </Link>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          palette.colors.join(", ")
                        );
                        showToast("Палитра скопирована");
                      }}
                      className="p-2.5 bg-gray-50 hover:bg-gray-200 rounded-xl transition-all"
                    >
                      <Copy size={18} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </div>

      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-2xl shadow-2xl z-50 font-bold flex items-center gap-2">
          <Check size={18} className="text-green-500" /> {toast}
        </div>
      )}
    </div>
  );
}
