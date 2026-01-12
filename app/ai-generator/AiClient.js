"use client";
import { useState } from "react";
import {
  Sparkles,
  Send,
  RefreshCw,
  Copy,
  Check,
  Layout,
  MessageSquare,
} from "lucide-react";
import { generateAiPalette } from "@/lib/ai-engine";
import Link from "next/link";

export default function AiClient() {
  const [prompt, setPrompt] = useState("");
  const [palette, setPalette] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setPalette([]);

    try {
      const response = await fetch("/api/ai-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.colors && data.colors.length === 5) {
        setPalette(data.colors);
      } else {
        // Фолбэк (запасной вариант) на наш старый умный алгоритм, если ИИ подвел
        const fallback = generateAiPalette(prompt);
        setPalette(fallback);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      // Тоже фолбэк при ошибке сети
      setPalette(generateAiPalette(prompt));
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24">
      <div className="max-w-4xl mx-auto px-4 pt-20">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Sparkles size={12} /> AI Powered
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            Интеллектуальный <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              подбор палитр
            </span>
          </h1>
          <p className="text-slate-400 font-medium text-lg max-w-xl mx-auto">
            Опишите настроение, стиль или объект, и наш алгоритм создаст
            гармоничную схему.
          </p>
        </header>

        {/* ПОЛЕ ВВОДА В СТИЛЕ ЧАТА */}
        <div className="bg-slate-900/50 border border-white/5 p-2 rounded-[2.5rem] mb-12 shadow-2xl focus-within:border-blue-500/50 transition-all">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="flex-1 flex items-center px-6">
              <MessageSquare className="text-slate-500 mr-4" size={20} />
              <input
                type="text"
                placeholder="Например: 'минималистичный кофе в дождливый день'..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="bg-transparent w-full py-4 outline-none font-medium text-lg placeholder:text-slate-600"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-black p-4 rounded-[2rem] font-black hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? (
                <RefreshCw size={24} className="animate-spin" />
              ) : (
                <Send size={24} />
              )}
            </button>
          </form>
        </div>

        {/* РЕЗУЛЬТАТ */}
        {palette.length > 0 && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <div className="flex h-64 rounded-[3rem] overflow-hidden shadow-2xl mb-8 border border-white/10">
              {palette.map((c, i) => (
                <div
                  key={i}
                  className="flex-1 flex items-end p-6 group cursor-pointer relative"
                  style={{ backgroundColor: c }}
                  onClick={() => copyToClipboard(c)}
                >
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  <span className="font-mono font-bold text-xs bg-black/20 backdrop-blur-md p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    {copied === c ? "СКОПИРОВАНО" : c}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 text-slate-400 hover:text-white font-bold text-sm uppercase tracking-widest transition-colors"
              >
                <RefreshCw size={16} /> Попробовать еще раз
              </button>
              <div className="h-4 w-[1px] bg-white/10 hidden md:block"></div>
              <Link
                href={`/visualizer?colors=${palette
                  .map((c) => c.replace("#", ""))
                  .join("-")}`}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-2xl font-bold transition-all"
              >
                <Layout size={18} /> Посмотреть в интерфейсе
              </Link>
            </div>
          </div>
        )}

        {/* SEO ПОДСКАЗКИ */}
        <div className="mt-32 grid md:grid-cols-3 gap-8 text-left">
          {[
            {
              t: "Текст в цвет",
              d: "NLP алгоритм анализирует прилагательные и сопоставляет их с психологией восприятия цвета.",
            },
            {
              t: "Бесплатно",
              d: "Никаких платных API. Все вычисления происходят на вашем устройстве мгновенно.",
            },
            {
              t: "Экспорт",
              d: "Передавайте созданные палитры в Визуализатор или копируйте готовый CSS код.",
            },
          ].map((item) => (
            <div
              key={item.t}
              className="p-8 rounded-[2rem] bg-white/5 border border-white/5"
            >
              <h4 className="font-bold mb-3 text-blue-400">{item.t}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
