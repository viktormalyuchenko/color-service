"use client";
import Link from "next/link";
import { useState } from "react";
import {
  Palette,
  ChevronDown,
  Zap,
  ShieldCheck,
  Layout,
  Sparkles,
  Image as ImageIcon,
  Type,
  Grid,
  Heart,
  Hash,
  MousePointer2,
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-[100] w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* ЛОГОТИП */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="bg-black p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            <Palette className="text-white" size={20} />
          </div>
          <span className="font-bold text-xl tracking-tighter italic uppercase text-gray-900">
            Paletto
          </span>
        </Link>

        {/* НАВИГАЦИЯ (DESKTOP) */}
        <nav className="hidden lg:flex items-center gap-1 text-[13px] font-bold text-gray-400 uppercase tracking-wider">
          {/* 1. ИССЛЕДОВАТЬ (Dropdown) */}
          <div className="relative group px-3 py-5">
            <button className="flex items-center gap-1 group-hover:text-black transition-colors">
              Исследовать{" "}
              <ChevronDown
                size={14}
                className="group-hover:rotate-180 transition-transform"
              />
            </button>
            <div className="absolute top-full left-0 w-64 pt-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
              <div className="bg-white border border-gray-100 shadow-2xl rounded-3xl p-3 flex flex-col gap-1">
                <MenuLink
                  href="/explore"
                  title="Библиотека палитр"
                  desc="72+ готовых набора"
                  icon={<Grid size={16} />}
                />
                <MenuLink
                  href="/popular-colors"
                  title="Популярные цвета"
                  desc="Тренды 2025 года"
                  icon={<Heart size={16} />}
                />
                <MenuLink
                  href="/color-names"
                  title="Имена цветов"
                  desc="База на 5000+ имен"
                  icon={<Hash size={16} />}
                />
              </div>
            </div>
          </div>

          {/* 2. ИНСТРУМЕНТЫ (Dropdown) */}
          <div className="relative group px-3 py-5">
            <button className="flex items-center gap-1 group-hover:text-black transition-colors">
              Инструменты{" "}
              <ChevronDown
                size={14}
                className="group-hover:rotate-180 transition-transform"
              />
            </button>
            <div className="absolute top-full left-[-50%] w-72 pt-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
              <div className="bg-white border border-gray-100 shadow-2xl rounded-3xl p-3 grid grid-cols-1 gap-1">
                <MenuLink
                  href="/palette-generator"
                  title="Генератор"
                  desc="Создание по пробелу"
                  icon={<Zap size={16} />}
                />
                <MenuLink
                  href="/wheel"
                  title="Цветовой круг"
                  desc="Математика гармонии"
                  icon={<Palette size={16} />}
                />
                <MenuLink
                  href="/contrast-checker"
                  title="Контраст-радар"
                  desc="Проверка доступности"
                  icon={<ShieldCheck size={16} />}
                />
                <MenuLink
                  href="/image-to-palette"
                  title="Цвета из фото"
                  desc="Анализ изображений"
                  icon={<ImageIcon size={16} />}
                />
                <MenuLink
                  href="/gradient-maker"
                  title="Градиенты"
                  desc="Создание CSS переходов"
                  icon={<Sparkles size={16} />}
                />
                <MenuLink
                  href="/font-styler"
                  title="Шрифты"
                  desc="Типографика и цвет"
                  icon={<Type size={16} />}
                />
              </div>
            </div>
          </div>

          <Link
            href="/visualizer"
            className="px-3 py-5 hover:text-black transition-colors flex items-center gap-1"
          >
            <Layout size={14} /> Визуализатор
          </Link>

          <Link
            href="/tools"
            className="px-3 py-5 hover:text-black transition-colors flex items-center gap-1"
          >
            <MousePointer2 size={14} /> Все сервисы
          </Link>
        </nav>

        {/* КНОПКА ДЕЙСТВИЯ */}
        <div className="flex items-center gap-3">
          <Link
            href="/palette-generator"
            className="hidden sm:block bg-black text-white px-6 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-black/10"
          >
            Начать
          </Link>
          {/* Иконка меню для мобилок (упрощенно) */}
          <button className="lg:hidden p-2 text-gray-500">
            <Grid size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}

// Компонент ссылки внутри выпадающего меню
function MenuLink({ href, title, desc, icon }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-2xl transition-all group/link"
    >
      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover/link:bg-black group-hover/link:text-white transition-all">
        {icon}
      </div>
      <div>
        <div className="text-gray-900 font-black text-sm leading-none mb-1">
          {title}
        </div>
        <div className="text-[11px] text-gray-400 font-bold uppercase tracking-tighter">
          {desc}
        </div>
      </div>
    </Link>
  );
}
