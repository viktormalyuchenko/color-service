"use client";
import { useState, useEffect } from "react";
import chroma from "chroma-js";
import ColorWheel from "@uiw/react-color-wheel";
import ShadeSlider from "@uiw/react-color-shade-slider";
import { Info, Copy, Check, Palette } from "lucide-react";

export default function ColorWheelPage() {
  const [hsva, setHsva] = useState({ h: 210, s: 100, v: 100, a: 1 });
  const [mode, setMode] = useState("complementary");
  const [harmony, setHarmony] = useState([]);
  const [copied, setCopied] = useState(null);

  const modeDescriptions = {
    complementary: {
      title: "Комплиментарная схема",
      desc: "Цвета на противоположных сторонах круга. Максимальный контраст и энергия.",
    },
    analogous: {
      title: "Аналоговая схема",
      desc: "Соседние цвета на круге. Создают мягкие, приятные глазу и природные сочетания.",
    },
    triadic: {
      title: "Триада",
      desc: "Три цвета, равноудаленные друг от друга. Живая и сбалансированная палитра.",
    },
    tetradic: {
      title: "Тетрадическая (Квадрат)",
      desc: "Четыре цвета, образующие квадрат. Богатая схема с двумя парами контрастов.",
    },
    split: {
      title: "Раздельно-комплиментарная",
      desc: "Основной цвет и два соседних к его противоположности. Сильный акцент без резкости.",
    },
    monochromatic: {
      title: "Монохромная",
      desc: "Разные оттенки одного и того же тона. Минималистичный и профессиональный вид.",
    },
  };

  const hexColor = chroma.hsv(hsva.h, hsva.s / 100, hsva.v / 100).hex();

  useEffect(() => {
    const { h, s, v } = { h: hsva.h, s: hsva.s / 100, v: hsva.v / 100 };
    let colors = [];

    switch (mode) {
      case "complementary":
        colors = [
          chroma.hsv(h, s, v).hex(),
          chroma.hsv((h + 180) % 360, s, v).hex(),
        ];
        break;
      case "analogous":
        colors = [
          chroma.hsv((h - 30 + 360) % 360, s, v).hex(),
          chroma.hsv(h, s, v).hex(),
          chroma.hsv((h + 30) % 360, s, v).hex(),
        ];
        break;
      case "triadic":
        colors = [
          chroma.hsv(h, s, v).hex(),
          chroma.hsv((h + 120) % 360, s, v).hex(),
          chroma.hsv((h + 240) % 360, s, v).hex(),
        ];
        break;
      case "tetradic":
        colors = [
          chroma.hsv(h, s, v).hex(),
          chroma.hsv((h + 90) % 360, s, v).hex(),
          chroma.hsv((h + 180) % 360, s, v).hex(),
          chroma.hsv((h + 270) % 360, s, v).hex(),
        ];
        break;
      case "split":
        colors = [
          chroma.hsv(h, s, v).hex(),
          chroma.hsv((h + 150) % 360, s, v).hex(),
          chroma.hsv((h + 210) % 360, s, v).hex(),
        ];
        break;
      case "monochromatic":
        colors = [
          chroma.hsv(h, s, v).hex(),
          chroma.hsv(h, s * 0.7, v * 0.8).hex(),
          chroma.hsv(h, s * 0.4, v).hex(),
          chroma.hsv(h, s * 0.2, v * 0.5).hex(),
        ];
        break;
    }
    setHarmony(colors);
  }, [hsva, mode]);

  const copyToClipboard = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      <div className="max-w-6xl mx-auto px-4 pt-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 text-gray-900 italic uppercase">
            Цветовой круг
          </h1>
          <p className="text-gray-500 font-medium">
            Профессиональный подбор гармоний на основе теории цвета.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* КРУГ И КНОПКИ */}
          <section className="bg-white p-10 rounded-[50px] shadow-sm border border-gray-100 flex flex-col items-center">
            <div className="relative mb-10 p-4 bg-gray-50 rounded-full shadow-inner">
              <ColorWheel
                color={hsva}
                onChange={(color) => setHsva({ ...hsva, ...color.hsva })}
                width={300}
                height={300}
              />
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-4 border-white shadow-xl pointer-events-none"
                style={{ backgroundColor: hexColor }}
              ></div>
            </div>

            <div className="w-full max-w-[300px] mb-12">
              <ShadeSlider
                hsva={hsva}
                onChange={(newColor) => setHsva({ ...hsva, ...newColor })}
              />
            </div>

            {/* СЕТКА ВСЕХ РЕЖИМОВ */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: "complementary", label: "Контраст" },
                { id: "analogous", label: "Аналоги" },
                { id: "triadic", label: "Триада" },
                { id: "tetradic", label: "Квадрат" },
                { id: "split", label: "Сплит" },
                { id: "monochromatic", label: "Моно" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    mode === m.id
                      ? "bg-black text-white"
                      : "bg-gray-50 text-gray-400 border border-transparent hover:border-gray-200"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </section>

          {/* РЕЗУЛЬТАТЫ */}
          <section className="space-y-6 text-left">
            <div className="bg-white p-10 rounded-[50px] shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-400 uppercase text-[10px] tracking-[0.3em] mb-8">
                Результат подбора
              </h2>
              <div className="space-y-3">
                {harmony.map((c, i) => (
                  <div
                    key={i}
                    onClick={() => copyToClipboard(c)}
                    className="group flex items-center justify-between p-4 rounded-3xl border border-gray-50 hover:border-gray-200 cursor-pointer bg-gray-50/50 hover:bg-white transition-all"
                  >
                    <div className="flex items-center gap-5">
                      <div
                        className="w-20 h-14 rounded-2xl shadow-sm group-hover:scale-105 transition-transform"
                        style={{ backgroundColor: c }}
                      ></div>
                      <div className="font-black text-xl tracking-tighter uppercase">
                        {c}
                      </div>
                    </div>
                    <div className="text-gray-300 group-hover:text-black">
                      {copied === c ? (
                        <Check size={20} className="text-green-500" />
                      ) : (
                        <Copy size={20} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-indigo-600 p-8 rounded-[40px] text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-bold text-xl mb-2">
                  {modeDescriptions[mode].title}
                </h3>
                <p className="text-indigo-100/80 text-sm leading-relaxed">
                  {modeDescriptions[mode].desc}
                </p>
              </div>
              <Palette className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10 rotate-12" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
