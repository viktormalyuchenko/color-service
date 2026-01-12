"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HexColorPicker } from "react-colorful";
import {
  Copy,
  Check,
  RefreshCw,
  Layout,
  ArrowRight,
  Share2,
} from "lucide-react";
import Link from "next/link";

export default function GradientClient() {
  const [color1, setColor1] = useState("#4f46e5");
  const [color2, setColor2] = useState("#ec4899");
  const [angle, setAngle] = useState(135);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false); // Для кнопки поделиться

  const gradientString = `linear-gradient(${angle}deg, ${color1} 0%, ${color2} 100%)`;
  const cssCode = `background: ${color1};\nbackground: ${gradientString};`;

  // Функция копирования ссылки
  const shareGradient = () => {
    // Создаем ссылку с параметрами
    const url = new URL(window.location.href);
    url.searchParams.set("c1", color1.replace("#", ""));
    url.searchParams.set("c2", color2.replace("#", ""));
    url.searchParams.set("a", angle);

    navigator.clipboard.writeText(url.toString());
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const randomize = () => {
    const randomHex = () =>
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
        .toUpperCase();
    setColor1(randomHex());
    setColor2(randomHex());
    setAngle(Math.floor(Math.random() * 360));
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      <div className="max-w-6xl mx-auto px-4 pt-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 italic uppercase text-gray-900 leading-none">
            Градиент-ателье
          </h1>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto">
            Создавайте современные и плавные переходы цветов для ваших
            интерфейсов.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* ЛЕВАЯ КОЛОНКА: РЕДАКТОР */}
          <div className="space-y-6">
            <div className="bg-white p-8 md:p-10 rounded-[50px] shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-400 uppercase text-[10px] tracking-[0.3em] mb-10 text-center">
                Настройка перехода
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                <div className="space-y-4 text-center">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 italic">
                    Начало
                  </label>
                  <div className="custom-picker mx-auto">
                    <HexColorPicker color={color1} onChange={setColor1} />
                  </div>
                  <div className="bg-gray-50 p-3 rounded-2xl font-mono font-bold border border-gray-100">
                    {color1.toUpperCase()}
                  </div>
                </div>
                <div className="space-y-4 text-center">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 italic">
                    Конец
                  </label>
                  <div className="custom-picker mx-auto">
                    <HexColorPicker color={color2} onChange={setColor2} />
                  </div>
                  <div className="bg-gray-50 p-3 rounded-2xl font-mono font-bold border border-gray-100">
                    {color2.toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Ползунок угла */}
              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <span>Угол наклона</span>
                  <span className="text-black bg-gray-100 px-3 py-1 rounded-full">
                    {angle}°
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(e.target.value)}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>

              <button
                onClick={randomize}
                className="w-full flex justify-center items-center gap-2 text-gray-300 hover:text-black font-bold text-[10px] uppercase tracking-[0.2em] transition-colors"
              >
                <RefreshCw size={14} /> Случайный градиент
              </button>
            </div>
          </div>

          {/* ПРАВАЯ КОЛОНКА: ПРЕВЬЮ И КОД */}
          <div className="space-y-6">
            {/* Живое превью */}
            <div
              className="h-[300px] md:h-[400px] rounded-[50px] shadow-2xl transition-all duration-500 border-8 border-white relative group"
              style={{ background: gradientString }}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={copyToClipboard}
                  className="bg-white text-black px-8 py-4 rounded-2xl font-black uppercase text-sm tracking-widest shadow-2xl transform hover:scale-105 transition-all"
                >
                  Копировать CSS
                </button>
              </div>
            </div>

            {/* Код */}
            <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-xl relative overflow-hidden group">
              <div className="flex justify-between items-center mb-6 relative z-10">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/30 italic">
                  CSS Style
                </span>
                <button
                  onClick={copyToClipboard}
                  className="text-blue-400 hover:text-white transition-colors"
                >
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                </button>
              </div>
              <pre className="font-mono text-xs md:text-sm text-blue-100/80 leading-relaxed relative z-10 overflow-x-auto whitespace-pre-wrap">
                {cssCode}
              </pre>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
            </div>

            {/* Быстрые действия */}
            <div className="grid grid-cols-2 gap-4">
              <Link
                href={`/visualizer?colors=${color1.replace(
                  "#",
                  ""
                )}-${color2.replace("#", "")}`}
                className="bg-white p-6 rounded-[30px] border border-gray-100 flex flex-col items-center gap-3 hover:shadow-xl transition-all group"
              >
                <Layout className="text-gray-300 group-hover:text-black" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Визуализировать
                </span>
              </Link>
              <button
                onClick={shareGradient}
                className="bg-white p-6 rounded-[30px] border border-gray-100 flex flex-col items-center gap-3 hover:shadow-xl transition-all group relative overflow-hidden"
              >
                <Share2
                  className={
                    shareCopied
                      ? "text-green-500"
                      : "text-gray-300 group-hover:text-blue-500"
                  }
                />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {shareCopied ? "Ссылка скопирована!" : "Поделиться"}
                </span>
                {shareCopied && (
                  <div className="absolute inset-0 bg-green-500/10 animate-pulse pointer-events-none"></div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* SEO ТЕКСТ ВНИЗУ */}
        <section className="mt-32 border-t border-gray-200 pt-20 max-w-4xl mx-auto text-left">
          <h2 className="text-4xl font-black mb-10 tracking-tighter leading-tight">
            Почему градиенты важны в дизайне?
          </h2>
          <div className="grid md:grid-cols-2 gap-12 text-gray-500 font-medium leading-relaxed">
            <p>
              Градиенты добавляют глубину и объем плоским интерфейсам.
              Использование линейных переходов в Paletto позволяет создавать
              мягкие тени, имитировать освещение и делать акценты на кнопках
              более выразительными.
            </p>
            <p>
              Наш инструмент генерирует чистый кроссбраузерный код. Вы можете
              использовать полученные стили в CSS, SCSS или просто передать их в
              визуализатор для проверки того, как градиент будет смотреться на
              реальном сайте.
            </p>
          </div>
        </section>
      </div>

      <style jsx global>{`
        .custom-picker .react-colorful {
          width: 100% !important;
          height: 180px !important;
          border-radius: 24px;
        }
        .custom-picker .react-colorful__saturation {
          border-bottom: 8px solid #fff;
          border-radius: 20px 20px 0 0;
        }
        .custom-picker .react-colorful__hue {
          height: 14px;
          border-radius: 0 0 20px 20px;
        }
      `}</style>
    </div>
  );
}
