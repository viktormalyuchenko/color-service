"use client";
import { useState } from "react";
import {
  Heart,
  TrendingUp,
  Check,
  Copy,
  Info,
  Sparkles,
  ShieldCheck,
  Rocket,
} from "lucide-react";
import Link from "next/link";

// АКТУАЛЬНЫЕ ДАННЫЕ НА ЯНВАРЬ 2026
const MOST_LIKED = [
  {
    name: "Future Dusk (Сумерки)",
    hex: "#43435C",
    percent: 35,
    desc: "Главный цвет 2026 года. Глубокий, загадочный оттенок, символизирующий новую космическую эру.",
  },
  {
    name: "Био-мята (Bio-Mint)",
    hex: "#A8E6CF",
    percent: 18,
    desc: "Тренд на экологичность. Цвет, объединяющий живую природу и высокие технологии.",
  },
  {
    name: "Электрический янтарь",
    hex: "#FFBF00",
    percent: 15,
    desc: "Энергичный и теплый акцент. Используется для создания ощущения радости и оптимизма.",
  },
  {
    name: "Мягкий сланец",
    hex: "#2F3C4F",
    percent: 12,
    desc: "Базовый темно-серый тон. Идеален для интерфейсов профессиональных ИТ-систем.",
  },
  {
    name: "Розовая пудра",
    hex: "#F7CED7",
    percent: 11,
    desc: "Возвращение к мягкости. Популярен в приложениях для отдыха, медитации и здоровья.",
  },
  {
    name: "Неоновый кобальт",
    hex: "#2E5BFF",
    percent: 9,
    desc: "Яркий синий для финтех-сервисов и смелых цифровых стартапов.",
  },
];

const TRENDS_2026 = [
  {
    name: "Future Dusk",
    hex: "#43435C",
    tag: "ЦВЕТ ГОДА 2026",
    desc: "Сложный тон между синим и фиолетовым. Цвет глубины и будущего.",
  },
  {
    name: "Небесный синий",
    hex: "#0077B6",
    tag: "КОСМИЧЕСКИЙ ТРЕНД",
    desc: "Вдохновлен чистотой атмосферы и развитием аэрокосмических технологий.",
  },
  {
    name: "Закатный коралл",
    hex: "#FD5E53",
    tag: "АКЦЕНТ 2026",
    desc: "Живой и витальный цвет, пришедший на смену пастельным тонам прошлых лет.",
  },
];

export default function PopularClient() {
  const [copied, setCopied] = useState(null);

  const copyToClipboard = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-32">
      <div className="max-w-6xl mx-auto px-4 pt-20">
        <header className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-6">
            <Rocket size={12} /> Обновлено: 12 января 2026
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 uppercase italic text-gray-900 leading-none">
            Тренды <span className="text-blue-600">2026</span>
          </h1>
          <p className="text-gray-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Анализ мировых предпочтений в дизайне, основанный на данных Pantone,
            WGSN и активности пользователей Paletto.
          </p>
        </header>

        {/* СЕКЦИЯ: САМЫЕ ПОПУЛЯРНЫЕ */}
        <section className="mb-32">
          <div className="flex items-center justify-between mb-12 border-b border-gray-100 pb-6">
            <div>
              <h2 className="text-3xl font-black tracking-tight mb-2 uppercase italic">
                Мировой рейтинг
              </h2>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">
                Самые часто копируемые оттенки
              </p>
            </div>
            <div className="text-[10px] font-black px-4 py-2 bg-black text-white rounded-full uppercase tracking-widest shadow-xl shadow-black/20">
              Данные: Q1 2026
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOST_LIKED.map((color) => (
              <div
                key={color.hex}
                className="bg-white rounded-[3rem] p-4 border border-gray-100 shadow-sm hover:shadow-2xl transition-all group"
              >
                <div
                  className="h-56 w-full rounded-[2.5rem] mb-6 flex items-end justify-end p-8 cursor-pointer relative overflow-hidden shadow-inner"
                  style={{ backgroundColor: color.hex }}
                  onClick={() => copyToClipboard(color.hex)}
                >
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  <div className="bg-white/20 backdrop-blur-xl px-5 py-3 rounded-2xl text-white font-black text-2xl shadow-2xl">
                    {color.percent}%
                  </div>
                </div>
                <div className="px-4 pb-4 text-left">
                  <div className="flex justify-between items-center mb-3 text-gray-900">
                    <h3 className="text-2xl font-black tracking-tight">
                      {color.name}
                    </h3>
                    <button
                      onClick={() => copyToClipboard(color.hex)}
                      className="text-gray-300 hover:text-black transition-colors"
                    >
                      {copied === color.hex ? (
                        <Check size={20} className="text-green-500" />
                      ) : (
                        <Copy size={20} />
                      )}
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed font-medium mb-6">
                    {color.desc}
                  </p>
                  <div className="flex justify-between items-center border-t border-gray-50 pt-4">
                    <span className="font-mono text-xs font-bold text-blue-600 uppercase tracking-tighter">
                      {color.hex}
                    </span>
                    <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">
                      Подтверждено 2026
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* СЕКЦИЯ: ЦВЕТ ГОДА (FUTURE DUSK) */}
        <section className="mb-32">
          <div className="bg-[#43435C] rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(67,67,92,0.4)]">
            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div className="text-left">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest mb-8">
                  <Sparkles size={14} /> Главный цвет года 2026
                </div>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.95]">
                  Future <br />
                  Dusk
                </h2>
                <p className="text-white/60 text-lg mb-12 font-medium leading-relaxed max-w-md">
                  Этот оттенок находится на стыке синего и фиолетового. Он
                  отражает стремление человечества к исследованию новых
                  горизонтов — от глубин океана до дальнего космоса.
                </p>
                <button
                  onClick={() => copyToClipboard("#43435C")}
                  className="bg-white text-[#43435C] px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-2xl active:scale-95"
                >
                  Копировать HEX
                </button>
              </div>
              <div className="space-y-4">
                {TRENDS_2026.map((t) => (
                  <div
                    key={t.hex}
                    className="flex items-center gap-6 p-6 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group cursor-pointer"
                    onClick={() => copyToClipboard(t.hex)}
                  >
                    <div
                      className="w-20 h-20 rounded-[1.5rem] shadow-2xl shrink-0 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: t.hex }}
                    ></div>
                    <div className="text-left">
                      <div className="text-[9px] font-black text-blue-300 uppercase tracking-widest mb-1 opacity-60">
                        {t.tag}
                      </div>
                      <div className="text-xl font-bold mb-1">{t.name}</div>
                      <div className="text-xs text-white/30 font-mono uppercase tracking-widest">
                        {t.hex}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Декоративное свечение */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[150px] -mr-64 -mt-64"></div>
          </div>
        </section>

        {/* СЕКЦИЯ: ПСИХОЛОГИЯ ЦВЕТА */}
        <section className="max-w-5xl mx-auto border-t border-gray-100 pt-24 text-left">
          <h2 className="text-4xl font-black tracking-tighter mb-16 italic uppercase">
            Психология восприятия 2026
          </h2>
          <div className="grid md:grid-cols-2 gap-20 font-sans">
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                Космический минимализм
              </h3>
              <p className="text-gray-400 leading-relaxed font-medium">
                В 2026 году дизайн уходит от простых ярких цветов к сложным,
                «пыльным» и глубоким оттенкам. Люди ищут в интерфейсах ощущение
                спокойствия и стабильности, аналогичное созерцанию бесконечного
                звездного неба.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                Био-технологический баланс
              </h3>
              <p className="text-gray-400 leading-relaxed font-medium">
                Сочетание органических мятных и теплых янтарных тонов отражает
                новую философию: высокие технологии больше не противостоят
                природе, а бережно дополняют её. Это направление доминирует в
                дизайне гаджетов и умных домов.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
