import { Palette, Github, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-white border-t border-gray-100 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="bg-black p-1.5 rounded-lg">
                <Palette className="text-white" size={20} />
              </div>
              <span className="font-bold text-xl tracking-tighter italic uppercase">
                Paletto
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">
              Создавайте потрясающие цветовые палитры для ваших проектов.
              Профессиональные инструменты для дизайнеров и разработчиков.
            </p>
            <div className="flex gap-4">
              <Github
                className="text-gray-400 hover:text-black cursor-pointer"
                size={20}
              />
              <Twitter
                className="text-gray-400 hover:text-black cursor-pointer"
                size={20}
              />
              <Instagram
                className="text-gray-400 hover:text-black cursor-pointer"
                size={20}
              />
            </div>
          </div>

          <div>
            <h5 className="font-black text-xs uppercase tracking-widest mb-6">
              Инструменты
            </h5>
            <ul className="space-y-4 text-sm text-gray-500 font-bold">
              <li>
                <Link href="/palette-generator" className="hover:text-black">
                  Генератор палитр
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-black">
                  Исследовать палитры
                </Link>
              </li>
              <li>
                <Link href="/wheel" className="hover:text-black">
                  Цветовой круг
                </Link>
              </li>
              <li>
                <Link href="/visualizer" className="hover:text-black">
                  Визуализатор
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-black text-xs uppercase tracking-widest mb-6">
              Библиотека
            </h5>
            <ul className="space-y-4 text-sm text-gray-500 font-bold">
              <li>
                <Link href="/explore" className="hover:text-black">
                  Популярные цвета
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-black">
                  Пастельные тона
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-black">
                  Темные темы
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-black">
                  Тренды 2025
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-black text-xs uppercase tracking-widest mb-6">
              Компания
            </h5>
            <ul className="space-y-4 text-sm text-gray-500 font-bold">
              <li className="hover:text-black cursor-pointer">О проекте</li>
              <li className="hover:text-black cursor-pointer">Блог</li>
              <li className="hover:text-black cursor-pointer">Контакты</li>
              <li className="hover:text-black cursor-pointer">Приватность</li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            © 2026 Paletto. Все права защищены.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-gray-400">
            <span className="hover:text-black cursor-pointer">Условия</span>
            <span className="hover:text-black cursor-pointer">
              Конфиденциальность
            </span>
            <span className="hover:text-black cursor-pointer">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
