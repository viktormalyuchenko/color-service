"use client";
import { useState, useMemo, useEffect } from "react";
import COLOR_NAMES from "@/lib/colors.json"; // Импортируем твой JSON
import {
  Search,
  Copy,
  Check,
  Hash,
  ChevronLeft,
  ChevronRight,
  Info,
} from "lucide-react";

const ITEMS_PER_PAGE = 100;

export default function ColorNamesPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [copied, setCopied] = useState(null);

  // 1. Умная фильтрация
  const filteredColors = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return COLOR_NAMES;

    return COLOR_NAMES.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.hex.toLowerCase().includes(query)
    );
  }, [search]);

  // 2. Расчет пагинации
  const totalPages = Math.ceil(filteredColors.length / ITEMS_PER_PAGE);
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredColors.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredColors, currentPage]);

  // Сброс страницы при поиске
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      <div className="max-w-6xl mx-auto px-4 pt-16">
        {/* Хедер для SEO */}
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-gray-900 italic uppercase leading-none">
            Имена цветов
          </h1>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 font-medium max-w-xl text-lg">
              Исследуйте нашу гигантскую библиотеку из{" "}
              <span className="text-black font-bold">{COLOR_NAMES.length}</span>{" "}
              именованных оттенков.
            </p>
            <div className="bg-white px-6 py-2 rounded-2xl border border-gray-100 shadow-sm text-[10px] font-black uppercase tracking-widest text-gray-400">
              Найдено: {filteredColors.length}
            </div>
          </div>
        </header>

        {/* Поле поиска */}
        <div className="relative mb-12 group">
          <Search
            className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors"
            size={24}
          />
          <input
            type="text"
            placeholder="Найдите название или HEX код..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-16 pr-6 py-7 rounded-[2.5rem] bg-white border-none focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-xl shadow-xl shadow-black/[0.03] outline-none"
          />
        </div>

        {/* Таблица цветов */}
        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 border-b border-gray-100">
                  <th className="px-10 py-6">Название оттенка</th>
                  <th className="px-10 py-6 text-center">Цвет</th>
                  <th className="px-10 py-6 text-right">HEX Код</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {currentItems.map((color, index) => (
                  <tr
                    key={`${color.hex}-${index}`}
                    className="group hover:bg-gray-50/30 transition-colors"
                  >
                    <td className="px-10 py-6">
                      <span className="font-black text-gray-800 tracking-tight text-xl">
                        {color.name}
                      </span>
                    </td>
                    <td className="px-10 py-6">
                      <div
                        className="w-32 h-14 rounded-2xl shadow-2xl mx-auto border border-black/5 transition-transform group-hover:scale-110"
                        style={{ backgroundColor: color.hex }}
                      ></div>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <button
                        onClick={() => copyToClipboard(color.hex.toUpperCase())}
                        className="inline-flex items-center gap-3 text-blue-600 font-mono font-bold text-xl hover:text-blue-800 transition-colors"
                      >
                        {color.hex.toUpperCase()}
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50">
                          {copied === color.hex.toUpperCase() ? (
                            <Check size={16} className="text-green-500" />
                          ) : (
                            <Copy size={14} className="opacity-40" />
                          )}
                        </div>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Блок пагинации */}
        {totalPages > 1 && (
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-5 rounded-3xl bg-white border border-gray-100 hover:border-black disabled:opacity-30 disabled:hover:border-gray-100 transition-all shadow-sm"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="px-8 py-5 bg-black text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl">
                Страница {currentPage} из {totalPages}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-5 rounded-3xl bg-white border border-gray-100 hover:border-black disabled:opacity-30 disabled:hover:border-gray-100 transition-all shadow-sm"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">
              Используйте поиск для быстрой навигации
            </p>
          </div>
        )}

        {/* Пустое состояние */}
        {filteredColors.length === 0 && (
          <div className="py-40 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
              <Hash size={40} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">
              Такой цвет не найден
            </h3>
            <p className="text-gray-500 font-medium">
              Попробуйте ввести другой HEX или название
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
