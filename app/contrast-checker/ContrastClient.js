"use client";
import { useState, useEffect } from "react";
import chroma from "chroma-js";
import { HexColorPicker } from "react-colorful";
import {
  Check,
  X,
  RotateCcw,
  AlertCircle,
  Palette,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function ContrastClient() {
  const [textColor, setTextColor] = useState("#1e293b");
  const [bgColor, setBgColor] = useState("#f8fafc");
  const [contrast, setContrast] = useState(0);

  // Состояния для открытия/закрытия пикеров на мобилках
  const [showTextPicker, setShowTextPicker] = useState(false);
  const [showBgPicker, setShowBgPicker] = useState(false);

  useEffect(() => {
    const ratio = chroma.contrast(textColor, bgColor);
    setContrast(ratio.toFixed(2));
  }, [textColor, bgColor]);

  const passes = {
    normalAA: contrast >= 4.5,
    normalAAA: contrast >= 7,
    largeAA: contrast >= 3,
    largeAAA: contrast >= 4.5,
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      <div className="max-w-6xl mx-auto px-4 pt-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 italic uppercase text-gray-900">
            Contrast Radar
          </h1>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto">
            Оптимизируйте доступность вашего интерфейса. Проверка соответствия
            стандартам WCAG 2.1 в реальном времени.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-24">
          {/* НАСТРОЙКИ С ПИКЕРАМИ */}
          <div className="space-y-6">
            <div className="bg-white p-8 md:p-10 rounded-[50px] shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-400 uppercase text-[10px] tracking-[0.3em] mb-10 text-center">
                Цветовой инспектор
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {/* ПИКЕР ТЕКСТА */}
                <div className="space-y-4 text-center">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400">
                    Цвет текста
                  </label>
                  <div className="custom-picker mx-auto">
                    <HexColorPicker color={textColor} onChange={setTextColor} />
                  </div>
                  <div className="bg-gray-50 p-3 rounded-2xl font-mono font-bold text-center border border-gray-100">
                    {textColor.toUpperCase()}
                  </div>
                </div>

                {/* ПИКЕР ФОНА */}
                <div className="space-y-4 text-center">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400">
                    Цвет фона
                  </label>
                  <div className="custom-picker mx-auto">
                    <HexColorPicker color={bgColor} onChange={setBgColor} />
                  </div>
                  <div className="bg-gray-50 p-3 rounded-2xl font-mono font-bold text-center border border-gray-100">
                    {bgColor.toUpperCase()}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setTextColor("#1e293b");
                  setBgColor("#f8fafc");
                }}
                className="w-full flex justify-center items-center gap-2 text-gray-300 hover:text-black font-bold text-[10px] uppercase tracking-[0.2em] transition-colors"
              >
                <RotateCcw size={14} /> Сбросить настройки
              </button>
            </div>

            {/* ПРЕВЬЮ */}
            <div
              className="rounded-[50px] p-10 md:p-14 shadow-2xl border border-black/5 flex flex-col justify-center min-h-[350px] transition-all duration-300"
              style={{ backgroundColor: bgColor, color: textColor }}
            >
              <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
                Заголовок макета
              </h3>
              <p className="text-lg md:text-xl leading-relaxed opacity-90 font-medium">
                Этот текст помогает понять, насколько легко пользователям будет
                считывать информацию. Хороший контраст — залог удобства вашего
                сайта.
              </p>
              <div className="mt-10 flex gap-4">
                <div
                  className="px-8 py-3 rounded-2xl font-bold border-2 transition-colors"
                  style={{ borderColor: textColor }}
                >
                  Вторичная
                </div>
                <div
                  className="px-8 py-3 rounded-2xl font-bold shadow-lg transition-colors"
                  style={{ backgroundColor: textColor, color: bgColor }}
                >
                  Главная кнопка
                </div>
              </div>
            </div>
          </div>

          {/* РЕЗУЛЬТАТЫ */}
          <div className="space-y-6">
            <div className="bg-white p-10 rounded-[50px] shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-10">
                <h2 className="font-bold text-gray-400 uppercase text-[10px] tracking-[0.3em]">
                  Вердикт радара
                </h2>
                <div
                  className={`text-5xl font-black ${
                    contrast >= 4.5 ? "text-green-500" : "text-rose-500"
                  }`}
                >
                  {contrast}
                </div>
              </div>

              <div className="space-y-4">
                <ResultRow
                  label="Обычный текст (AA)"
                  status={passes.normalAA}
                  score="4.5:1"
                />
                <ResultRow
                  label="Обычный текст (AAA)"
                  status={passes.normalAAA}
                  score="7.0:1"
                />
                <ResultRow
                  label="Крупный текст (AA)"
                  status={passes.largeAA}
                  score="3.0:1"
                />
                <ResultRow
                  label="Крупный текст (AAA)"
                  status={passes.largeAAA}
                  score="4.5:1"
                />
              </div>
            </div>

            <div className="bg-indigo-600 p-10 rounded-[50px] text-white relative overflow-hidden group shadow-2xl shadow-indigo-200">
              <div className="relative z-10 flex flex-col items-center text-center">
                <AlertCircle size={32} className="mb-6 opacity-50" />
                <h4 className="font-black text-xl tracking-tight uppercase mb-4">
                  Почему это важно?
                </h4>
                <p className="text-indigo-100/70 text-sm leading-relaxed mb-6 font-medium">
                  Коэффициент {contrast}:1 определяет, смогут ли люди с
                  нарушениями зрения (например, дальтонизмом) полноценно
                  пользоваться вашим продуктом.
                </p>
                <div className="text-[10px] bg-white/10 px-4 py-2 rounded-full font-black tracking-widest uppercase">
                  Стандарт WCAG 2.1
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ШАГ 3: SEO ТЕКСТ (БОЛЬШОЙ БЛОК) */}
        <section className="mt-32 border-t border-gray-100 pt-20 max-w-4xl mx-auto text-left">
          <h2 className="text-4xl font-black mb-10 tracking-tighter">
            Руководство по контрастности цветов
          </h2>

          <div className="space-y-12">
            <article>
              <h3 className="text-xl font-bold mb-4 text-indigo-600 italic">
                Что такое Contrast Radar?
              </h3>
              <p className="text-gray-500 leading-relaxed font-medium">
                Это специализированный инструмент в составе Paletto, который
                вычисляет разницу в яркости между текстом и фоном. Мы используем
                математическую формулу стандарта WCAG 2.1, чтобы гарантировать
                точность ваших расчетов.
              </p>
            </article>

            <div className="grid md:grid-cols-2 gap-12">
              <article>
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  Уровень AA (Минимальный)
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Требует коэффициент контрастности не менее 4,5:1 для обычного
                  текста и 3:1 для крупного текста (от 18pt или 14pt жирным).
                  Это стандартный уровень для большинства веб-сайтов.
                </p>
              </article>
              <article>
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  Уровень AAA (Максимальный)
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Более строгий стандарт. Требует коэффициент 7:1 для обычного
                  текста и 4,5:1 для крупного. Необходим для сайтов
                  государственных структур и специализированных сервисов.
                </p>
              </article>
            </div>

            <article className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100">
              <h3 className="text-xl font-bold mb-4">Совет от Paletto</h3>
              <p className="text-gray-500 leading-relaxed font-medium">
                Если ваш контраст находится на грани (например, 4.48),
                попробуйте сделать текст чуть темнее или фон чуть светлее. Даже
                небольшое изменение на 1-2% может сделать интерфейс гораздо
                доступнее для тысяч пользователей.
              </p>
            </article>
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
        .custom-picker .react-colorful__pointer {
          width: 24px;
          height: 24px;
        }
      `}</style>
    </div>
  );
}

function ResultRow({ label, status, score }) {
  return (
    <div
      className={`flex items-center justify-between p-5 rounded-[2.2rem] border transition-all ${
        status
          ? "bg-green-50 border-green-100"
          : "bg-rose-50 border-rose-100 shadow-inner"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`p-2 rounded-full ${
            status ? "bg-green-500 text-white" : "bg-rose-500 text-white"
          }`}
        >
          {status ? <Check size={16} /> : <X size={16} />}
        </div>
        <span
          className={`font-black text-xs uppercase tracking-widest ${
            status ? "text-green-700" : "text-rose-700"
          }`}
        >
          {label}
        </span>
      </div>
      <div
        className={`text-[9px] font-black px-3 py-1 rounded-full ${
          status
            ? "bg-green-200/50 text-green-700"
            : "bg-rose-200/50 text-rose-700"
        }`}
      >
        {score}
      </div>
    </div>
  );
}
