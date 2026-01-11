import Link from "next/link";
import { Palette } from "lucide-react";

export default function Navbar() {
  return (
    <header className="border-b border-gray-100 bg-white py-4 px-6 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="bg-black p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
          <Palette className="text-white" size={20} />
        </div>
        <span className="font-bold text-xl tracking-tighter">Paletto</span>
      </Link>

      <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
        <Link href="/explore" className="hover:text-black transition-colors">
          Исследовать
        </Link>

        <Link href="/visualizer" className="hover:text-black transition-colors">
          Визуализатор
        </Link>
        <Link href="/wheel" className="hover:text-black transition-colors">
          Цветовой круг
        </Link>
      </nav>

      <div className="flex gap-4 items-center">
        <button className="text-sm font-medium">Войти</button>
        <Link
          href="/palette-generator"
          className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Создать палитру
        </Link>
      </div>
    </header>
  );
}
