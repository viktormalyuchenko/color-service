"use client";
import { useSearchParams, useParams } from "next/navigation";
import { useState, useMemo } from "react";
import chroma from "chroma-js";
import { Copy, Check, ArrowLeft, Layout, Code, Share2 } from "lucide-react";
import Link from "next/link";
import { GRADIENTS } from "@/lib/data";

export default function GradientDetailsClient() {
  const searchParams = useSearchParams();
  const params = useParams();
  const [copied, setCopied] = useState(null);

  const decodedSlug = decodeURIComponent(params.slug);
  const colors = searchParams
    .get("colors")
    ?.split(",")
    .map((c) => "#" + c) || ["#000", "#fff"];
  const angle = searchParams.get("angle") || "135";

  const gradientString = `linear-gradient(${angle}deg, ${colors[0]} 0%, ${colors[1]} 100%)`;
  const cssCode = `background: ${colors[0]};\nbackground: ${gradientString};`;

  const name = decodedSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-white pb-24 px-4 pt-12 text-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Хедер */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <Link
              href="/explore-gradients"
              className="text-gray-400 hover:text-black flex items-center gap-2 mb-4 text-sm font-bold transition-colors"
            >
              <ArrowLeft size={16} /> Назад к градиентам
            </Link>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900">
              {name}
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/visualizer?colors=${colors
                .map((c) => c.replace("#", ""))
                .join("-")}`}
              className="flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 px-6 py-3 rounded-2xl font-bold transition-all"
            >
              <Layout size={18} /> Визуализировать
            </Link>
            <button
              onClick={() => copyToClipboard(cssCode, "css")}
              className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl font-bold transition-all active:scale-95"
            >
              {copied === "css" ? <Check size={18} /> : <Copy size={18} />}
              {copied === "css" ? "Код скопирован!" : "Копировать CSS"}
            </button>
          </div>
        </div>

        {/* ОСНОВНОЙ БЛОК: ПРЕВЬЮ */}
        <div
          className="w-full h-[400px] md:h-[500px] rounded-[3.5rem] shadow-2xl border-8 border-white mb-16 overflow-hidden relative group"
          style={{ background: gradientString }}
        >
          <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs border border-white/30">
              Угол наклона: {angle}°
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          {/* ТАБЛИЦА ЦВЕТОВ */}
          <div className="bg-gray-50 rounded-[3rem] p-10 border border-gray-100 shadow-inner">
            <h2 className="font-bold text-gray-400 uppercase text-[10px] tracking-[0.3em] mb-10 text-center">
              Цвета градиента
            </h2>
            <div className="space-y-4">
              {colors.map((color, i) => {
                const rgb = chroma(color).rgb();
                const hsl = chroma(color).hsl();
                return (
                  <div
                    key={color}
                    className="bg-white p-6 rounded-3xl flex flex-col md:flex-row items-center gap-6 border border-gray-100 group"
                  >
                    <div
                      className="w-20 h-20 rounded-2xl shadow-lg shrink-0"
                      style={{ backgroundColor: color }}
                    ></div>
                    <div className="flex-1 grid grid-cols-3 gap-4 w-full">
                      <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase">
                          Hex
                        </div>
                        <div className="font-black text-gray-900">
                          {color.toUpperCase()}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase">
                          RGB
                        </div>
                        <div className="font-medium text-gray-600">
                          {rgb.join(", ")}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase">
                          HSL
                        </div>
                        <div className="font-medium text-gray-600">
                          {Math.round(hsl[0] || 0)}°, {Math.round(hsl[1] * 100)}
                          %
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(color, color)}
                      className="text-gray-300 hover:text-black transition-colors"
                    >
                      {copied === color ? (
                        <Check size={20} className="text-green-500" />
                      ) : (
                        <Copy size={20} />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* КОД CSS */}
          <div className="space-y-6">
            <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl h-full flex flex-col justify-between relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/30 italic flex items-center gap-2">
                    <Code size={14} /> CSS Code Block
                  </h2>
                </div>
                <pre className="font-mono text-sm md:text-base text-blue-100/90 leading-relaxed whitespace-pre-wrap">
                  {cssCode}
                </pre>
              </div>
              <button
                onClick={() => copyToClipboard(cssCode, "css")}
                className="relative z-10 w-full mt-12 bg-white/10 hover:bg-white/20 border border-white/10 py-4 rounded-2xl font-bold transition-all text-sm uppercase tracking-widest"
              >
                {copied === "css" ? "Скопировано в буфер" : "Копировать стиль"}
              </button>
              {/* Декор */}
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]"></div>
            </div>
          </div>
        </div>

        {/* ПОХОЖИЕ ГРАДИЕНТЫ */}
        <section>
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-4xl font-black tracking-tighter italic">
              Другие переходы
            </h2>
            <Link
              href="/explore-gradients"
              className="text-sm font-bold text-gray-400 hover:text-black transition-colors underline decoration-2 underline-offset-4"
            >
              Все градиенты →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {GRADIENTS.slice(0, 3).map((g) => {
              const gSlug = g.name.toLowerCase().replace(/ /g, "-");
              const gColors = g.colors.map((c) => c.replace("#", "")).join(",");
              return (
                <Link
                  href={`/gradient/${gSlug}?colors=${gColors}&angle=${g.angle}`}
                  key={g.id}
                  className="bg-gray-50 p-5 rounded-[2.5rem] border border-gray-100 transition-all hover:bg-white hover:shadow-2xl hover:-translate-y-1 group"
                >
                  <div
                    className="flex h-36 rounded-2xl overflow-hidden mb-5 shadow-sm"
                    style={{
                      background: `linear-gradient(${g.angle}deg, ${g.colors[0]}, ${g.colors[1]})`,
                    }}
                  ></div>
                  <div className="font-black text-lg px-2 group-hover:text-blue-600 transition-colors">
                    {g.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
