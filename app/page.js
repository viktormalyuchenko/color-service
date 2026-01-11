import Link from "next/link";
import {
  Palette,
  Sparkles,
  ChevronRight,
  Zap,
  ShieldCheck,
  Globe,
  Layout,
  Search,
} from "lucide-react";
import InteractiveBackground from "@/components/InteractiveBackground";

export default function LandingPage() {
  return (
    <div className="relative min-h-[calc(100vh-64px)] bg-white overflow-x-hidden">
      <InteractiveBackground />

      {/* ГЛАВНЫЙ ЭКРАН (HERO) */}
      <section className="relative z-10 flex flex-col items-center justify-center pt-24 pb-32 px-4 text-center">
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.9] mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 text-gray-900">
          Создавайте <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-rose-500 to-blue-500">
            гармонию цвета
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mb-12 leading-relaxed font-medium">
          Умный генератор палитр для дизайнеров и разработчиков. <br />
          Создавайте, исследуйте и сохраняйте идеальные цветовые схемы.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-24">
          <Link
            href="/palette-generator"
            className="group relative bg-black text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-black/20"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-blue-500 blur-lg opacity-0 group-hover:opacity-40 transition-opacity" />
            <span className="relative">Создать палитру</span>
          </Link>

          <Link
            href="/explore"
            className="bg-white border border-gray-200 text-gray-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
          >
            Исследовать <ChevronRight size={20} />
          </Link>
        </div>

        {/* ПРЕИМУЩЕСТВА */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
          <div className="flex items-center gap-2 font-black italic text-xl">
            <Zap size={20} /> БЫСТРО
          </div>
          <div className="flex items-center gap-2 font-black italic text-xl">
            <ShieldCheck size={20} /> НАДЕЖНО
          </div>
          <div className="flex items-center gap-2 font-black italic text-xl text-blue-600 uppercase tracking-tighter">
            Paletto
          </div>
          <div className="flex items-center gap-2 font-black italic text-xl">
            <Globe size={20} /> ДЛЯ ВСЕХ
          </div>
        </div>
      </section>

      {/* СЕКЦИЯ 1: ГЕНЕРАЦИЯ ИИ */}
      <section className="relative z-10 w-full max-w-7xl mx-auto py-24 px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="text-left">
          <div className="text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <div className="w-8 h-[1px] bg-blue-600"></div> ГЕНЕРАЦИЯ ЧЕРЕЗ ИИ
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-tight">
            Идеальные палитры <br /> за считанные секунды
          </h2>
          <p className="text-gray-500 text-lg mb-8 leading-relaxed">
            Опишите настроение текстом или загрузите изображение. Наш интеллект
            мгновенно извлечет ключевые оттенки, создавая готовые к
            использованию схемы для вашего бренда.
          </p>
          <ul className="space-y-4">
            {[
              "Обработка естественных запросов",
              "Извлечение цветов из фотографий",
              "Алгоритмы умной гармонизации",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 font-semibold text-gray-700"
              >
                <div className="text-blue-500">
                  <Zap size={18} />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Визуальное превью интерфейса AI */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full"></div>
          <div className="flex gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500/40"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/40"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/40"></div>
          </div>
          <div className="font-mono text-sm text-blue-300/60 mb-4 italic text-left">
            запрос.txt
          </div>
          <div className="text-left font-mono text-white mb-8 text-lg">
            <span className="text-pink-400 font-bold">Пользователь:</span>{" "}
            "Океанский закат, спокойный, но яркий"
          </div>
          <div className="flex gap-2 h-20">
            {["#0F172A", "#1E293B", "#F43F5E", "#FB923C", "#FDE68A"].map(
              (c) => (
                <div
                  key={c}
                  className="flex-1 rounded-2xl border border-white/5 transition-transform hover:scale-105"
                  style={{ backgroundColor: c }}
                ></div>
              )
            )}
          </div>
        </div>
      </section>

      {/* СЕКЦИЯ 2: ДОСТУПНОСТЬ */}
      <section className="relative z-10 w-full max-w-7xl mx-auto py-24 px-4 grid md:grid-cols-2 gap-12 items-center border-t border-gray-50">
        <div className="order-2 md:order-1 bg-gray-50 rounded-[2.5rem] p-8 md:p-12 border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <div className="font-bold text-gray-400 uppercase text-[10px] tracking-widest">
              УРОВЕНЬ КОНТРАСТА
            </div>
            <div className="text-4xl font-black text-green-500">21.05</div>
          </div>
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl flex justify-between items-center border border-gray-100 shadow-sm">
              <span className="font-bold text-gray-700">Обычный текст</span>
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-md text-[10px] font-black uppercase">
                AA Пройдено
              </span>
            </div>
            <div className="bg-white p-5 rounded-2xl flex justify-between items-center border border-gray-100 shadow-sm">
              <span className="font-bold text-lg text-gray-700">
                Крупный текст
              </span>
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-md text-[10px] font-black uppercase">
                AAA Пройдено
              </span>
            </div>
          </div>
        </div>

        <div className="text-left order-1 md:order-2">
          <div className="text-green-600 font-bold text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <div className="w-8 h-[1px] bg-green-600"></div> ДОСТУПНОСТЬ ПРЕЖДЕ
            ВСЕГО
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-tight">
            Проверка контраста в реальном времени
          </h2>
          <p className="text-gray-500 text-lg mb-8 leading-relaxed">
            Забудьте о нечитаемых интерфейсах. Наш сканер автоматически
            проверяет палитру на соответствие международным стандартам WCAG
            прямо в процессе создания дизайна.
          </p>
        </div>
      </section>

      {/* СЕКЦИЯ 3: ИНСТРУМЕНТЫ */}
      <section className="relative z-10 w-full max-w-7xl mx-auto py-32 px-4 text-center">
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
            Один сервис, шесть <br />
            мощных инструментов
          </h2>
          <p className="text-gray-500 text-xl font-medium leading-relaxed">
            Всё, что необходимо для профессиональной работы с цветом,{" "}
            <br className="hidden md:block" /> собрано в едином интерфейсе
            Paletto.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Лаборатория палитр",
              desc: "Создавайте, редактируйте и фиксируйте цвета с помощью мощного генератора и ИИ.",
              icon: <Palette size={24} />,
            },
            {
              title: "Радар контраста",
              desc: "Мгновенная проверка доступности текста по стандартам WCAG 2.1 в реальном времени.",
              icon: <ShieldCheck size={24} />,
            },
            {
              title: "Визуализатор",
              desc: "Смотрите, как ваша палитра выглядит на реальных макетах сайтов и мобильных приложений.",
              icon: <Layout size={24} />,
            },
            {
              title: "Стиль шрифтов",
              desc: "Автоматический подбор идеальной типографики под вашу цветовую схему.",
              icon: <Zap size={24} />,
            },
            {
              title: "Градиент-ателье",
              desc: "Создание плавных многоступенчатых градиентов с поддержкой CSS кода.",
              icon: <Sparkles size={24} />,
            },
            {
              title: "Библиотека схем",
              desc: "Тысячи трендовых палитр, отсортированных по категориям, стилям и настроению.",
              icon: <Search size={24} />,
            },
          ].map((tool) => (
            <div
              key={tool.title}
              className="group p-10 rounded-[2.5rem] bg-white border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all text-left"
            >
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform group-hover:bg-black group-hover:text-white">
                {tool.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">
                {tool.title}
              </h3>
              <p className="text-gray-400 leading-relaxed font-medium">
                {tool.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
