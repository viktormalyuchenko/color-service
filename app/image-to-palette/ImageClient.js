"use client";
import { useState, useRef } from "react";
import ColorThief from "colorthief";
import {
  Upload,
  ImageIcon,
  Copy,
  Check,
  Layout,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function ImageClient() {
  const [image, setImage] = useState(null);
  const [palette, setPalette] = useState([]);
  const [copied, setCopied] = useState(null);
  const imgRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        setPalette([]); // Сбрасываем старую палитру
      };
      reader.readAsDataURL(file);
    }
  };

  const extractColors = () => {
    const colorThief = new ColorThief();
    const img = imgRef.current;

    if (img.complete) {
      const result = colorThief.getPalette(img, 5);
      const hexPalette = result.map(
        (rgb) =>
          "#" +
          rgb
            .map((x) => x.toString(16).padStart(2, "0"))
            .join("")
            .toUpperCase()
      );
      setPalette(hexPalette);
    } else {
      img.addEventListener("load", () => {
        const result = colorThief.getPalette(img, 5);
        const hexPalette = result.map(
          (rgb) =>
            "#" +
            rgb
              .map((x) => x.toString(16).padStart(2, "0"))
              .join("")
              .toUpperCase()
        );
        setPalette(hexPalette);
      });
    }
  };

  const copyToClipboard = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      <div className="max-w-6xl mx-auto px-4 pt-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 italic uppercase text-gray-900 leading-none">
            Цвета из фото
          </h1>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto">
            Превратите любое вдохновляющее изображение в профессиональную
            цветовую схему.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* ЛЕВАЯ КОЛОНКА: ЗАГРУЗКА */}
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-[40px] shadow-sm border border-gray-100 overflow-hidden relative group">
              {image ? (
                <div className="relative group">
                  <img
                    ref={imgRef}
                    src={image}
                    alt="Загруженное фото"
                    className="w-full h-auto rounded-[32px] object-cover max-h-[500px]"
                    onLoad={extractColors}
                  />
                  <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer rounded-[32px]">
                    <div className="bg-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2">
                      <RefreshCw size={18} /> Сменить фото
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleImageUpload}
                      accept="image/*"
                    />
                  </label>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-[400px] border-4 border-dashed border-gray-100 rounded-[32px] cursor-pointer hover:bg-gray-50 hover:border-gray-200 transition-all">
                  <div className="bg-gray-100 p-6 rounded-full mb-6 text-gray-400 group-hover:scale-110 transition-transform">
                    <Upload size={32} />
                  </div>
                  <span className="text-xl font-black tracking-tight mb-2">
                    Загрузите изображение
                  </span>
                  <span className="text-gray-400 text-sm font-medium">
                    PNG, JPG или WEBP
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                    accept="image/*"
                  />
                </label>
              )}
            </div>
          </div>

          {/* ПРАВАЯ КОЛОНКА: РЕЗУЛЬТАТ */}
          <div className="space-y-8">
            <div className="bg-white p-10 rounded-[50px] shadow-sm border border-gray-100 min-h-[400px]">
              <h2 className="font-bold text-gray-400 uppercase text-[10px] tracking-[0.3em] mb-10 text-center">
                Извлеченная палитра
              </h2>

              {!image ? (
                <div className="flex flex-col items-center justify-center h-48 text-gray-300">
                  <ImageIcon size={48} className="mb-4 opacity-20" />
                  <p className="font-bold uppercase text-[10px] tracking-widest">
                    Ожидание файла...
                  </p>
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="flex h-32 rounded-3xl overflow-hidden shadow-2xl mb-8">
                    {palette.length > 0 ? (
                      palette.map((c) => (
                        <div
                          key={c}
                          className="flex-1"
                          style={{ backgroundColor: c }}
                        ></div>
                      ))
                    ) : (
                      <div className="flex-1 bg-gray-100 animate-pulse"></div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {palette.map((c, i) => (
                      <div
                        key={i}
                        onClick={() => copyToClipboard(c)}
                        className="group flex items-center justify-between p-4 rounded-3xl border border-gray-50 hover:border-gray-200 transition-all cursor-pointer bg-gray-50/50 hover:bg-white"
                      >
                        <div className="flex items-center gap-5">
                          <div
                            className="w-16 h-12 rounded-xl shadow-sm"
                            style={{ backgroundColor: c }}
                          ></div>
                          <div className="font-black text-lg tracking-tighter">
                            {c}
                          </div>
                        </div>
                        <div className="pr-4 text-gray-300 group-hover:text-black transition-colors">
                          {copied === c ? (
                            <Check size={20} className="text-green-500" />
                          ) : (
                            <Copy size={20} />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {palette.length > 0 && (
                    <div className="pt-6 flex gap-3">
                      <Link
                        href={`/visualizer?colors=${palette
                          .map((c) => c.replace("#", ""))
                          .join("-")}`}
                        className="flex-1 flex justify-center items-center gap-2 bg-black text-white py-4 rounded-2xl font-bold transition-transform hover:scale-[1.02] active:scale-95"
                      >
                        <Layout size={18} /> Визуализировать
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Блок SEO / Теории */}
            <div className="bg-white p-10 rounded-[50px] shadow-sm border border-gray-100">
              <h3 className="text-xl font-black mb-4">Как это работает?</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                Наш алгоритм сканирует изображение и находит группы наиболее
                часто встречающихся цветов. Он автоматически отсеивает шум и
                выбирает 5 гармоничных оттенков, которые определяют атмосферу
                кадра.
              </p>
            </div>
          </div>
        </div>

        {/* SEO ТЕКСТ ВНИЗУ */}
        <section className="mt-32 border-t border-gray-100 pt-20 max-w-4xl mx-auto text-left">
          <h2 className="text-4xl font-black mb-10 tracking-tighter leading-tight">
            Зачем создавать палитру по фотографии?
          </h2>
          <div className="grid md:grid-cols-2 gap-12 text-gray-500 font-medium leading-relaxed">
            <p>
              Природа — лучший дизайнер. Часто самые гармоничные сочетания
              цветов находятся прямо перед нами: в утреннем небе, осеннем лесу
              или морской волне. Извлечение цветов из фото позволяет перенести
              эту естественную гармонию в веб-дизайн или брендинг.
            </p>
            <p>
              Используйте этот инструмент, чтобы создать уникальный стиль на
              основе ваших собственных референсов. Paletto мгновенно преобразует
              пиксели в HEX-коды, готовые для использования в CSS, Photoshop или
              Figma.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
