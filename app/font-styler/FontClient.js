"use client";
import { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import {
  Type,
  Type as TypeIcon,
  Copy,
  Check,
  RefreshCw,
  Layout,
  ArrowRight,
  Info,
} from "lucide-react";
import Link from "next/link";

const FONT_OPTIONS = [
  "Inter",
  "Roboto",
  "Playfair Display",
  "Montserrat",
  "Lora",
  "Oswald",
  "Raleway",
  "Merriweather",
  "Unbounded",
  "Manrope",
];

export default function FontClient() {
  const [headingFont, setHeadingFont] = useState("Unbounded");
  const [bodyFont, setBodyFont] = useState("Inter");
  const [textColor, setTextColor] = useState("#1e293b");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [copied, setCopied] = useState(false);

  // Динамическая загрузка шрифтов
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${headingFont.replace(
      " ",
      "+"
    )}&family=${bodyFont.replace(" ", "+")}:wght@400;700&display=swap`;
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, [headingFont, bodyFont]);

  const copyCSS = () => {
    const code = `/* Typography by Paletto */\nh1 { font-family: '${headingFont}'; color: ${textColor}; }\np { font-family: '${bodyFont}'; color: ${textColor}; opacity: 0.8; }`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 font-sans">
      <div className="max-w-6xl mx-auto px-4 pt-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 italic uppercase text-gray-900">
            Font Styler
          </h1>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto">
            Создавайте идеальный баланс между цветом и типографикой для вашего
            следующего проекта.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* НАСТРОЙКИ (1 колонка) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-400 uppercase text-[10px] tracking-[0.3em] mb-8 text-center text-gray-400">
                Настройки
              </h2>

              <div className="space-y-6">
                {/* Выбор шрифтов */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <TypeIcon size={14} /> Заголовок
                  </label>
                  <select
                    value={headingFont}
                    onChange={(e) => setHeadingFont(e.target.value)}
                    className="w-full bg-gray-50 p-4 rounded-2xl font-bold border-none focus:ring-2 focus:ring-black outline-none"
                  >
                    {FONT_OPTIONS.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <TypeIcon size={14} /> Текст
                  </label>
                  <select
                    value={bodyFont}
                    onChange={(e) => setBodyFont(e.target.value)}
                    className="w-full bg-gray-50 p-4 rounded-2xl font-bold border-none focus:ring-2 focus:ring-black outline-none"
                  >
                    {FONT_OPTIONS.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="h-[1px] bg-gray-100 my-4"></div>

                {/* Выбор цвета */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Цвет текста
                  </label>
                  <div className="custom-picker small mx-auto">
                    <HexColorPicker color={textColor} onChange={setTextColor} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ПРЕВЬЮ (2 колонки) */}
          <div className="lg:col-span-2 space-y-6">
            <div
              className="bg-white p-12 md:p-20 rounded-[50px] shadow-2xl transition-all duration-500 min-h-[600px] border border-black/5"
              style={{ backgroundColor: bgColor }}
            >
              <h3
                className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-[1.1]"
                style={{ fontFamily: headingFont, color: textColor }}
              >
                Искусство чистого <br />
                дизайна.
              </h3>
              <p
                className="text-xl md:text-2xl leading-relaxed opacity-80 max-w-xl"
                style={{ fontFamily: bodyFont, color: textColor }}
              >
                Типографика — это не просто выбор шрифта. Это способ передать
                настроение, создать иерархию и направить взгляд пользователя.
                Посмотрите, как мягко {bodyFont} сочетается с массивным{" "}
                {headingFont}.
              </p>

              <div className="mt-16 flex flex-wrap gap-4">
                <button
                  className="px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-transform hover:scale-105"
                  style={{ backgroundColor: textColor, color: bgColor }}
                >
                  Начать проект
                </button>
                <button
                  className="px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest border-2 transition-all hover:bg-black/5"
                  style={{ borderColor: textColor, color: textColor }}
                >
                  Подробнее
                </button>
              </div>
            </div>

            {/* Панель экспорта кода */}
            <div className="bg-slate-900 p-8 rounded-[40px] text-white flex justify-between items-center shadow-xl">
              <div className="flex items-center gap-4 text-white/50">
                <div className="p-3 bg-white/5 rounded-2xl">
                  <Info size={20} />
                </div>
                <div className="text-sm font-medium">
                  CSS готова к использованию
                </div>
              </div>
              <button
                onClick={copyCSS}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold transition-all"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? "Скопировано" : "Копировать стили"}
              </button>
            </div>
          </div>
        </div>

        {/* SEO БЛОК */}
        <section className="mt-32 border-t border-gray-100 pt-20 max-w-4xl mx-auto text-left">
          <h2 className="text-4xl font-black mb-10 tracking-tighter">
            Магия типографики и цвета
          </h2>
          <div className="grid md:grid-cols-2 gap-12 text-gray-500 font-medium leading-relaxed">
            <p>
              Правильный выбор шрифтовой пары может изменить восприятие бренда
              на 180 градусов. В Paletto мы объединили библиотеку Google Fonts с
              нашим движком цветовых палитр, чтобы вы могли тестировать макеты в
              условиях, максимально приближенных к реальности.
            </p>
            <p>
              Помните о правиле контраста: заголовок должен быть акцентным и
              характерным, в то время как основной текст обязан оставаться
              максимально читаемым. Используйте этот инструмент для создания
              визуальной иерархии, которая работает.
            </p>
          </div>
        </section>
      </div>

      <style jsx global>{`
        .custom-picker.small .react-colorful {
          width: 100% !important;
          height: 140px !important;
          border-radius: 16px;
        }
        .custom-picker.small .react-colorful__saturation {
          border-bottom: 6px solid #fff;
          border-radius: 12px 12px 0 0;
        }
        .custom-picker.small .react-colorful__hue {
          height: 10px;
          border-radius: 0 0 12px 12px;
        }
      `}</style>
    </div>
  );
}
