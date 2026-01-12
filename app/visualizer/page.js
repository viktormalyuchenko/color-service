"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { generateColor } from "@/lib/colors";
import chroma from "chroma-js";
import {
  Sparkles,
  RefreshCw,
  Download,
  Check,
  Copy,
  ArrowLeft,
  X,
  Code,
  FileText,
  Printer,
} from "lucide-react";
import Link from "next/link";

function VisualizerContent() {
  const searchParams = useSearchParams();
  const [colors, setColors] = useState([
    "#f8fafc",
    "#f1f5f9",
    "#3b82f6",
    "#1e293b",
    "#ffffff",
  ]);
  const [copied, setCopied] = useState(null);
  const [isExportOpen, setIsExportOpen] = useState(false);

  useEffect(() => {
    const colorsFromUrl = searchParams.get("colors");
    if (colorsFromUrl) {
      let parsedColors = colorsFromUrl
        .split(/[- ,]/)
        .map((c) => (c.startsWith("#") ? c : "#" + c));

      if (parsedColors.length < 5) {
        const extraNeeded = 5 - parsedColors.length;
        const extraColors = Array.from({ length: extraNeeded }).map(
          () => generateColor().hex
        );
        parsedColors = [...parsedColors, ...extraColors];
      }

      setColors(parsedColors.slice(0, 5)); // Берем ровно 5
    }
  }, [searchParams]);

  const randomize = () => {
    const newColors = Array.from({ length: 5 }).map(() => generateColor().hex);
    setColors(newColors);
  };

  const copyToClipboard = (text, type = "default") => {
    navigator.clipboard.writeText(text);
    setCopied(type === "default" ? text : type);
    setTimeout(() => setCopied(null), 2000);
  };

  const getContrast = (backColor) => {
    if (!backColor) return "#1a1a1a";
    try {
      return chroma(backColor).luminance() > 0.5 ? "#1a1a1a" : "#ffffff";
    } catch (e) {
      return "#1a1a1a";
    }
  };

  // Форматы экспорта
  const cssExport = `:root {\n${colors
    .map((c, i) => `  --color-${i + 1}: ${c};`)
    .join("\n")}\n}`;
  const hexList = colors.join(", ").toUpperCase();
  const tailwindExport = `colors: {\n${colors
    .map((c, i) => `  'brand-${i + 1}': '${c}',`)
    .join("\n")}\n}`;

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-32">
      <header className="max-w-7xl mx-auto pt-12 pb-12 px-4">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="text-left">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 mb-4 uppercase italic">
              Визуализатор
            </h1>
            <p className="text-gray-500 font-medium max-w-xl leading-relaxed">
              Примерьте выбранные цвета на реальных интерфейсах. Мы подготовили
              макеты сайтов и приложений для оценки вашей палитры.
            </p>
          </div>
        </div>
      </header>

      {/* СЕТКА МАКЕТОВ */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* МАКЕТ 1: Landing Page Hero */}
        <section className="bg-white rounded-[3rem] p-2 shadow-sm border border-gray-100 overflow-hidden min-h-[500px] flex flex-col group relative">
          <div
            className="flex-1 rounded-[2.5rem] flex flex-col justify-center p-10 transition-colors duration-500"
            style={{ backgroundColor: colors[0] }}
          >
            <nav
              className="absolute top-8 left-10 right-10 flex justify-between items-center opacity-50 font-bold text-sm"
              style={{ color: getContrast(colors[0]) }}
            >
              <div className="flex gap-4">
                <span>Продукт</span>
                <span>Цены</span>
              </div>
              <div
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: colors[2] }}
              ></div>
            </nav>
            <h2
              className="text-5xl font-black leading-[0.9] mb-8 text-center tracking-tighter"
              style={{ color: getContrast(colors[0]) }}
            >
              Будущее <br />
              <span style={{ color: colors[2] }}>дизайна</span> <br />
              уже здесь.
            </h2>
            <div className="flex justify-center gap-4">
              <div
                className="px-8 py-4 rounded-2xl font-bold shadow-xl transition-transform hover:scale-105"
                style={{
                  backgroundColor: colors[2],
                  color: getContrast(colors[2]),
                }}
              >
                Начать бесплатно
              </div>
              <div
                className="px-8 py-4 rounded-2xl font-bold border-2 transition-all hover:bg-white/10"
                style={{ borderColor: colors[2], color: colors[2] }}
              >
                Демо-версия
              </div>
            </div>
          </div>
        </section>

        {/* МАКЕТ 2: Абстрактное искусство */}
        <section className="bg-white rounded-[3rem] p-2 shadow-sm border border-gray-100 overflow-hidden h-[500px] relative">
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 p-2 gap-2">
            <div
              className="rounded-2xl"
              style={{ backgroundColor: colors[1] }}
            ></div>
            <div
              className="rounded-full"
              style={{ backgroundColor: colors[2] }}
            ></div>
            <div
              className="rounded-[4rem]"
              style={{ backgroundColor: colors[3] }}
            ></div>
            <div
              className="rounded-2xl relative overflow-hidden"
              style={{ backgroundColor: colors[4] }}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: "12px 12px",
                }}
              ></div>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-40 h-40 rounded-[3rem] shadow-2xl backdrop-blur-md border border-white/20 flex items-center justify-center"
              style={{ backgroundColor: colors[0] + "88" }}
            >
              <Sparkles size={48} style={{ color: colors[2] }} />
            </div>
          </div>
        </section>

        {/* МАКЕТ 3: Дашборд управления */}
        <section className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100 min-h-[500px]">
          <div className="flex gap-4 mb-10 items-center">
            <div
              className="w-12 h-12 rounded-2xl shadow-lg"
              style={{ backgroundColor: colors[2] }}
            ></div>
            <div className="flex-1 h-4 rounded-full bg-gray-100 relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 w-2/3 transition-all duration-1000"
                style={{ backgroundColor: colors[2] }}
              ></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div
              className="h-40 rounded-[2rem] p-6 flex flex-col justify-between"
              style={{ backgroundColor: colors[1] }}
            >
              <div className="w-10 h-10 rounded-xl bg-white/20"></div>
              <div className="h-4 w-1/2 rounded-full bg-white/30"></div>
            </div>
            <div
              className="h-40 rounded-[2rem] p-6 flex flex-col justify-between"
              style={{ backgroundColor: colors[3] }}
            >
              <div className="w-10 h-10 rounded-xl bg-black/10"></div>
              <div className="h-4 w-3/4 rounded-full bg-black/10"></div>
            </div>
            <div className="h-32 col-span-2 rounded-[2rem] border-4 border-dashed border-gray-100 flex items-center justify-center text-gray-300 font-bold">
              Область данных
            </div>
          </div>
        </section>

        {/* МАКЕТ 4: Мобильный интерфейс */}
        <section className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100 flex justify-center items-center h-[500px]">
          <div className="w-72 h-full rounded-[3.5rem] border-[12px] border-gray-900 overflow-hidden relative shadow-2xl bg-white">
            <div
              className="h-32 w-full p-6 flex items-end"
              style={{ backgroundColor: colors[2] }}
            >
              <div className="h-6 w-24 rounded-full bg-white/30"></div>
            </div>
            <div className="p-6">
              <div
                className="w-16 h-16 rounded-3xl -mt-14 border-4 border-white mb-6 shadow-lg rotate-12"
                style={{ backgroundColor: colors[4] }}
              ></div>
              <div className="space-y-3 mb-8">
                <div className="h-4 w-full bg-gray-100 rounded-full"></div>
                <div className="h-4 w-2/3 bg-gray-100 rounded-full"></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div
                  className="h-20 rounded-2xl transition-transform hover:scale-95 cursor-pointer"
                  style={{ backgroundColor: colors[0] }}
                ></div>
                <div
                  className="h-20 rounded-2xl transition-transform hover:scale-95 cursor-pointer"
                  style={{ backgroundColor: colors[1] }}
                ></div>
              </div>
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-gray-200 rounded-full"></div>
          </div>
        </section>
      </div>

      {/* ПАНЕЛЬ УПРАВЛЕНИЯ (Mobile Friendly) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] md:w-auto bg-black/95 backdrop-blur-xl p-2 md:p-3 rounded-[2rem] shadow-2xl flex items-center justify-between md:justify-start gap-2 md:gap-4 z-50 border border-white/10">
        <button
          onClick={randomize}
          className="flex items-center gap-2 bg-white text-black px-5 md:px-8 py-3 md:py-4 rounded-2xl font-black text-sm uppercase tracking-tighter hover:bg-blue-500 hover:text-white transition-all active:scale-95"
        >
          <RefreshCw size={18} />
          <span className="hidden sm:inline">Случайно</span>
        </button>

        <div className="h-10 w-[1px] bg-white/10 mx-1"></div>

        <div className="flex gap-1.5 px-2">
          {colors.map((c, i) => (
            <div
              key={i}
              onClick={() => copyToClipboard(c)}
              className="w-10 h-10 rounded-xl cursor-pointer hover:scale-110 active:scale-90 transition-all border border-white/10 shadow-inner flex items-center justify-center group relative"
              style={{ backgroundColor: c }}
            >
              {copied === c ? (
                <Check
                  size={16}
                  className="text-white bg-black/20 rounded-full p-0.5"
                />
              ) : null}
            </div>
          ))}
        </div>

        <div className="h-10 w-[1px] bg-white/10 mx-1"></div>

        <button
          onClick={() => setIsExportOpen(true)}
          className="flex items-center gap-2 text-white/50 hover:text-white px-5 py-4 font-bold transition-colors"
        >
          <Download size={18} />
          <span className="hidden sm:inline">Экспорт</span>
        </button>
      </div>

      {/* МОДАЛЬНОЕ ОКНО ЭКСПОРТА (Полностью на русском) */}
      {isExportOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setIsExportOpen(false)}
          ></div>
          <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black flex items-center gap-3">
                  <Code className="text-blue-600" /> Экспорт палитры
                </h2>
                <button
                  onClick={() => setIsExportOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-8">
                {/* CSS Переменные */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                      CSS-переменные
                    </span>
                    <button
                      onClick={() => copyToClipboard(cssExport, "css")}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {copied === "css" ? "Скопировано!" : "Копировать код"}
                    </button>
                  </div>
                  <pre className="bg-gray-50 p-6 rounded-2xl font-mono text-sm text-gray-600 overflow-x-auto border border-gray-100">
                    {cssExport}
                  </pre>
                </div>

                {/* Сетка быстрых действий */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => copyToClipboard(hexList, "hex-list")}
                    className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 transition-all hover:border-gray-300 text-left group"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <FileText
                        size={20}
                        className="text-gray-400 group-hover:text-black transition-colors"
                      />
                      {copied === "hex-list" && (
                        <Check size={16} className="text-green-500" />
                      )}
                    </div>
                    <div className="font-black text-sm mb-1 uppercase tracking-tight">
                      Список HEX
                    </div>
                    <div className="text-xs text-gray-400 font-medium">
                      Простой текстовый формат
                    </div>
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="p-6 bg-blue-50 rounded-[2rem] border border-blue-100 transition-all hover:bg-blue-100 text-left group"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <Printer
                        size={20}
                        className="text-blue-400 group-hover:text-blue-600 transition-colors"
                      />
                    </div>
                    <div className="font-black text-sm mb-1 uppercase tracking-tight text-blue-900">
                      Печать / PDF
                    </div>
                    <div className="text-xs text-blue-400 font-medium">
                      Сохранить для презентации
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function VisualizerPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center font-black animate-pulse text-4xl italic">
          Paletto...
        </div>
      }
    >
      <VisualizerContent />
    </Suspense>
  );
}
