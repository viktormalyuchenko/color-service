import Link from "next/link";
import {
  Palette,
  ShieldCheck,
  Layout,
  Zap,
  Sparkles,
  Image as ImageIcon,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Бесплатные инструменты для дизайнеров | Paletto",
  description:
    "Полный набор инструментов для работы с цветом: генераторы, чекеры контраста, градиенты и визуализаторы.",
};

const ALL_TOOLS = [
  {
    title: "Лаборатория палитр",
    desc: "Генератор цветовых схем на базе ИИ с возможностью фиксации оттенков.",
    icon: <Palette size={24} />,
    href: "/palette-generator",
    tag: "Генерация",
  },
  {
    title: "Contrast Radar",
    desc: "Проверка доступности текста и фона по международным стандартам WCAG 2.1.",
    icon: <ShieldCheck size={24} />,
    href: "/contrast-checker",
    tag: "Аудит",
  },
  {
    title: "Визуализатор",
    desc: "Примерка палитры на реальные интерфейсы сайтов и мобильных приложений.",
    icon: <Layout size={24} />,
    href: "/visualizer",
    tag: "Превью",
  },
  {
    title: "Градиент-ателье",
    desc: "Создание плавных CSS градиентов с настройкой углов и экспортом кода.",
    icon: <Sparkles size={24} />,
    href: "/gradient-maker",
    tag: "Дизайн",
  },
  {
    title: "Цвета по фото",
    desc: "Мгновенное извлечение 5 доминирующих оттенков из любого изображения.",
    icon: <ImageIcon size={24} />,
    href: "/image-to-palette",
    tag: "Экстракт",
  },
  {
    title: "Font Styler",
    desc: "Инструмент для подбора идеальных шрифтовых пар под ваши цвета.",
    icon: <Zap size={24} />,
    href: "/font-styler",
    tag: "Типографика",
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-32">
      <div className="max-w-7xl mx-auto px-4 pt-20">
        {/* Хедер страницы */}
        <header className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-gray-900">
            Инструменты <br />
            <span className="text-blue-600 italic">дизайнера</span>
          </h1>
          <p className="text-gray-500 text-xl font-medium leading-relaxed">
            Полный стек профессиональных инструментов для работы с цветом,
            доступный прямо в вашем браузере.
          </p>
        </header>

        {/* Сетка инструментов */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ALL_TOOLS.map((tool) => (
            <Link
              href={tool.href}
              key={tool.title}
              className="group bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-black transition-all text-left flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-10">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform group-hover:bg-black group-hover:text-white">
                    {tool.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 group-hover:text-blue-600 transition-colors border border-gray-100 group-hover:border-blue-100 px-3 py-1 rounded-full">
                    {tool.tag}
                  </span>
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tight text-gray-900">
                  {tool.title}
                </h3>
                <p className="text-gray-400 font-medium leading-relaxed mb-10 group-hover:text-gray-600 transition-colors">
                  {tool.desc}
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                Открыть <ArrowRight size={16} className="text-blue-600" />
              </div>
            </Link>
          ))}
        </div>

        {/* Дополнительный блок (как на скрине) */}
        <section className="mt-32 bg-slate-900 rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl text-left">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 leading-tight text-white">
              Готовы создать <br />
              свою следующую палитру?
            </h2>
            <p className="text-white/50 text-lg mb-10 font-medium">
              Начните с генератора, затем проверьте доступность через радар и
              примерьте результат в визуализаторе. Всё в одном месте.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/palette-generator"
                className="bg-white text-black px-10 py-4 rounded-2xl font-black uppercase text-sm tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl"
              >
                Начать работу
              </Link>
              <Link
                href="/contrast-checker"
                className="bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-2xl font-black uppercase text-sm tracking-widest transition-all"
              >
                Проверить контраст
              </Link>
            </div>
          </div>

          {/* Декоративный круг */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500/20 rounded-full blur-[120px]"></div>
        </section>
      </div>
    </div>
  );
}
