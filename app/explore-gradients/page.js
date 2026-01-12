"use client";
import { useState } from "react";
import { GRADIENTS } from "@/lib/data";
import { Copy, Check, Layout, Sparkles, ArrowLeft, Eye } from "lucide-react";
import Link from "next/link";

export default function ExploreGradients() {
  const [copied, setCopied] = useState(null);

  const copyCss = (g) => {
    const css = `background: linear-gradient(${g.angle}deg, ${g.colors[0]} 0%, ${g.colors[1]} 100%);`;
    navigator.clipboard.writeText(css);
    setCopied(g.id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      <div className="max-w-7xl mx-auto px-4 pt-20">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-gray-900 uppercase italic">
            Библиотека градиентов
          </h1>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto">
            Популярные цветовые переходы 2026 года. Копируйте готовый CSS код
            для ваших фонов и кнопок.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {GRADIENTS.map((g) => {
            const gSlug = g.name.toLowerCase().replace(/ /g, "-");
            const gColors = g.colors.map((c) => c.replace("#", "")).join(",");
            return (
              <div
                key={g.id}
                className="group bg-white p-4 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all"
              >
                {/* Превью градиента */}
                <div
                  className="h-64 w-full rounded-[2rem] mb-6 shadow-inner relative flex items-center justify-center overflow-hidden"
                  style={{
                    background: `linear-gradient(${g.angle}deg, ${g.colors[0]}, ${g.colors[1]})`,
                  }}
                >
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  <button
                    onClick={() => copyCss(g)}
                    className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-6 py-3 rounded-2xl font-bold opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-black scale-90 group-hover:scale-100"
                  >
                    Копировать CSS
                  </button>
                </div>

                <div className="px-2 flex justify-between items-center">
                  <div>
                    <h3 className="font-black text-xl text-gray-800 tracking-tight">
                      {g.name}
                    </h3>
                    <div className="flex gap-2 mt-1">
                      <span className="font-mono text-[10px] font-bold text-gray-400 uppercase">
                        {g.colors[0]}
                      </span>
                      <span className="font-mono text-[10px] font-bold text-gray-400 uppercase">
                        →
                      </span>
                      <span className="font-mono text-[10px] font-bold text-gray-400 uppercase">
                        {g.colors[1]}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/gradient/${gSlug}?colors=${gColors}&angle=${g.angle}`}
                      className="p-3 bg-gray-50 hover:bg-black hover:text-white rounded-xl transition-all"
                      title="Детали градиента"
                    >
                      <Eye size={18} />
                    </Link>
                    <Link
                      href={`/visualizer?colors=${g.colors[0].replace(
                        "#",
                        ""
                      )}-${g.colors[1].replace("#", "")}`}
                      className="p-3 bg-gray-50 hover:bg-black hover:text-white rounded-xl transition-all"
                      title="Визуализировать"
                    >
                      <Layout size={18} />
                    </Link>
                    <button
                      onClick={() => copyCss(g)}
                      className={`p-3 rounded-xl transition-all ${
                        copied === g.id
                          ? "bg-green-500 text-white"
                          : "bg-gray-50 text-gray-400 hover:text-black"
                      }`}
                    >
                      {copied === g.id ? (
                        <Check size={18} />
                      ) : (
                        <Copy size={18} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* SEO ТЕКСТ */}
        <section className="mt-32 max-w-4xl mx-auto border-t border-gray-200 pt-20">
          <h2 className="text-3xl font-black mb-8 italic uppercase tracking-tighter">
            Как использовать градиенты в 2026 году?
          </h2>
          <div className="prose prose-slate font-medium text-gray-500 leading-relaxed space-y-6">
            <p>
              Современные веб-интерфейсы уходят от простых заливок к сложным
              многослойным градиентам. В 2026 году особенно популярны
              «сумеречные» переходы с низким контрастом и использованием
              глубоких оттенков синего и фиолетового.
            </p>
            <p>
              Используйте градиенты для выделения главных кнопок (CTA) или
              создания глубины на фоновых изображениях. Все палитры в нашей
              библиотеке проверены на совместимость и готовы к копированию в
              один клик.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
