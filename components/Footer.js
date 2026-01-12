import { Palette, Github, Twitter, Instagram, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-white border-t border-gray-100 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          {/* БРЕНД И СОЦСЕТИ */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="bg-black p-1.5 rounded-lg">
                <Palette className="text-white" size={20} />
              </div>
              <span className="font-bold text-xl tracking-tighter italic uppercase">
                Paletto
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 font-medium">
              Лучшие инструменты для работы с цветом в одном месте. Создано для
              дизайнеров и разработчиков будущего.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all"
              >
                <Github size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* ИНСТРУМЕНТЫ */}
          <div>
            <h5 className="font-black text-xs uppercase tracking-[0.2em] mb-8 text-gray-900">
              Инструменты
            </h5>
            <ul className="space-y-4 text-sm text-gray-500 font-bold">
              <li>
                <Link
                  href="/palette-generator"
                  className="hover:text-black transition-colors"
                >
                  Генератор палитр
                </Link>
              </li>
              <li>
                <Link
                  href="/contrast-checker"
                  className="hover:text-black transition-colors"
                >
                  Contrast Radar
                </Link>
              </li>
              <li>
                <Link
                  href="/image-to-palette"
                  className="hover:text-black transition-colors"
                >
                  Цвета по фото
                </Link>
              </li>
              <li>
                <Link
                  href="/gradient-maker"
                  className="hover:text-black transition-colors"
                >
                  Градиент-ателье
                </Link>
              </li>
              <li>
                <Link
                  href="/wheel"
                  className="hover:text-black transition-colors"
                >
                  Цветовой круг
                </Link>
              </li>
              <li>
                <Link
                  href="/font-styler"
                  className="hover:text-black transition-colors"
                >
                  Font Styler
                </Link>
              </li>
            </ul>
          </div>

          {/* БИБЛИОТЕКА */}
          <div>
            <h5 className="font-black text-xs uppercase tracking-[0.2em] mb-8 text-gray-900">
              Библиотека
            </h5>
            <ul className="space-y-4 text-sm text-gray-500 font-bold">
              <li>
                <Link
                  href="/explore"
                  className="hover:text-black transition-colors"
                >
                  Все палитры
                </Link>
              </li>
              <li>
                <Link
                  href="/popular-colors"
                  className="hover:text-black transition-colors"
                >
                  Популярные цвета
                </Link>
              </li>
              <li>
                <Link
                  href="/color-names"
                  className="hover:text-black transition-colors"
                >
                  Имена цветов
                </Link>
              </li>
              <li>
                <Link
                  href="/popular-colors"
                  className="hover:text-black transition-colors"
                >
                  Тренды 2026
                </Link>
              </li>
            </ul>
          </div>

          {/* КОМПАНИЯ (Из твоего скриншота) */}
          <div>
            <h5 className="font-black text-xs uppercase tracking-[0.2em] mb-8 text-gray-900">
              Компания
            </h5>
            <ul className="space-y-4 text-sm text-gray-600 font-bold">
              <li>
                <Link
                  href="/about"
                  className="hover:text-black transition-colors"
                >
                  О проекте
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-black transition-colors"
                >
                  Блог
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="hover:text-black transition-colors"
                >
                  Контакты
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-black transition-colors"
                >
                  Приватность
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* НИЖНЯЯ ПАНЕЛЬ С ЮРИДИЧЕСКИМИ ССЫЛКАМИ */}
        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">
            © 2026 Paletto. Все права защищены.
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            <Link href="/terms" className="hover:text-black transition-colors">
              Условия
            </Link>
            <Link
              href="/privacy"
              className="hover:text-black transition-colors"
            >
              Конфиденциальность
            </Link>
            <Link
              href="/cookies"
              className="hover:text-black transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
