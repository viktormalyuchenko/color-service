"use client";
import Link from "next/link";
import { Palette, ChevronDown } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-[100] w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Логотип */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="bg-black p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            <Palette className="text-white" size={20} />
          </div>
          <span className="font-bold text-xl tracking-tighter italic uppercase">
            Paletto
          </span>
        </Link>

        {/* Навигация */}
        <nav className="hidden md:flex items-center gap-1 text-[14px] font-semibold text-gray-500">
          {/* Исследовать (Dropdown) */}
          <div className="relative group px-3 py-2">
            <button className="flex items-center gap-1 group-hover:text-black transition-colors">
              Исследовать{" "}
              <ChevronDown
                size={14}
                className="group-hover:rotate-180 transition-transform"
              />
            </button>
            <div className="absolute top-full left-0 w-56 pt-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
              <div className="bg-white border border-gray-100 shadow-2xl rounded-2xl p-2 flex flex-col">
                <MenuLink
                  href="/explore"
                  title="Библиотека палитр"
                  desc="72+ готовых решения"
                />
                <MenuLink
                  href="/explore"
                  title="Популярные цвета"
                  desc="Тренды 2025 года"
                />
                <MenuLink
                  href="/wheel"
                  title="Палитры по схемам"
                  desc="Триады и контрасты"
                />
              </div>
            </div>
          </div>

          {/* Цвета (Dropdown) */}
          <div className="relative group px-3 py-2">
            <button className="flex items-center gap-1 group-hover:text-black transition-colors">
              Цвета{" "}
              <ChevronDown
                size={14}
                className="group-hover:rotate-180 transition-transform"
              />
            </button>
            <div className="absolute top-full left-0 w-56 pt-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
              <div className="bg-white border border-gray-100 shadow-2xl rounded-2xl p-2 flex flex-col">
                <MenuLink
                  href="/wheel"
                  title="Цветовой круг"
                  desc="Теория гармонии"
                />
                <MenuLink
                  href="/palette-generator"
                  title="Случайные цвета"
                  desc="Генератор по пробелу"
                />
                <MenuLink
                  href="/image-to-palette"
                  title="Имена цветов"
                  desc="Извлечение из фото"
                />
              </div>
            </div>
          </div>

          <Link
            href="/visualizer"
            className="px-3 py-2 hover:text-black transition-colors"
          >
            Визуализатор
          </Link>
          <Link
            href="/tools"
            className="px-3 py-2 hover:text-black transition-colors"
          >
            Инструменты
          </Link>
        </nav>

        {/* Кнопки справа */}
        <div className="flex items-center gap-3">
          <Link
            href="/palette-generator"
            className="bg-black text-white px-5 py-2.5 rounded-full text-[14px] font-bold hover:bg-gray-800 transition-all active:scale-95"
          >
            Создать палитру
          </Link>
        </div>
      </div>
    </header>
  );
}

// Вспомогательный компонент для ссылок в меню
function MenuLink({ href, title, desc }) {
  return (
    <Link
      href={href}
      className="p-3 hover:bg-gray-50 rounded-xl transition-colors group/link"
    >
      <div className="text-gray-900 font-bold text-sm group-hover/link:text-blue-600 transition-colors">
        {title}
      </div>
      <div className="text-[11px] text-gray-400 font-medium">{desc}</div>
    </Link>
  );
}
