"use client";
import { useSearchParams, useParams } from "next/navigation";
import { useState, useMemo } from "react";
import chroma from "chroma-js";
import {
  Copy,
  Share2,
  Check,
  ArrowLeft,
  Layout,
  Palette as PaletteIcon,
} from "lucide-react";
import Link from "next/link";
import { CURATED_PALETTES } from "@/lib/data";

export default function PaletteClient() {
  const searchParams = useSearchParams();
  const params = useParams();
  const [copied, setCopied] = useState(null);

  const decodedSlug = decodeURIComponent(params.slug);
  const originalPalette = useMemo(() => {
    return CURATED_PALETTES.find(
      (p) => p.name.toLowerCase().replace(/ /g, "-") === decodedSlug
    );
  }, [decodedSlug]);

  const colorsParam = searchParams.get("colors");
  const colors = colorsParam ? colorsParam.split(",").map((c) => "#" + c) : [];
  const displayName = originalPalette
    ? originalPalette.name
    : decodedSlug.replace(/-/g, " ");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-white pb-24 px-4 pt-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <Link
              href="/explore"
              className="text-gray-400 hover:text-black flex items-center gap-2 mb-4 text-sm font-bold transition-colors"
            >
              <ArrowLeft size={16} /> Назад к библиотеке
            </Link>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900">
              {displayName}
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/visualizer?colors=${colorsParam?.replace(/,/g, "-")}`}
              className="flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 px-6 py-3 rounded-2xl font-bold transition-all"
            >
              <Layout size={18} /> Визуализировать
            </Link>
            <button
              onClick={() => copyToClipboard(colors.join(", "))}
              className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl font-bold transition-all active:scale-95"
            >
              <Copy size={18} /> {copied ? "Скопировано!" : "Копировать HEX"}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          <div className="flex flex-col h-[520px] rounded-[3.5rem] overflow-hidden shadow-2xl border border-gray-100">
            {colors.map((color) => (
              <div
                key={color}
                className="flex-1 flex items-center px-10 group cursor-pointer relative"
                style={{ backgroundColor: color }}
                onClick={() => copyToClipboard(color)}
              >
                <div className="flex justify-between w-full items-center">
                  <span className="text-white font-black opacity-0 group-hover:opacity-100 transition-all bg-black/20 backdrop-blur-md px-4 py-2 rounded-xl uppercase tracking-widest text-sm">
                    {color}
                  </span>
                  <Copy
                    size={20}
                    className="text-white opacity-0 group-hover:opacity-40"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-[3.5rem] p-10 md:p-12 border border-gray-100">
            <h2 className="font-bold text-gray-400 uppercase text-[10px] tracking-[0.3em] mb-10 text-center">
              Спецификация цветов
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-200">
                    <th className="pb-6">Hex</th>
                    <th className="pb-6">R</th>
                    <th className="pb-6">G</th>
                    <th className="pb-6">B</th>
                    <th className="pb-6">H</th>
                    <th className="pb-6">S</th>
                    <th className="pb-6">L</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-bold">
                  {colors.map((color) => {
                    const rgb = chroma(color).rgb();
                    const hsl = chroma(color).hsl();
                    return (
                      <tr
                        key={color}
                        className="border-b border-gray-200/50 last:border-none group hover:bg-white transition-colors"
                      >
                        <td className="py-5 text-gray-900 uppercase font-black">
                          {color.replace("#", "")}
                        </td>
                        <td className="py-5 text-gray-500">{rgb[0]}</td>
                        <td className="py-5 text-gray-500">{rgb[1]}</td>
                        <td className="py-5 text-gray-500">{rgb[2]}</td>
                        <td className="py-5 text-gray-500">
                          {Math.round(hsl[0] || 0)}°
                        </td>
                        <td className="py-5 text-gray-500">
                          {Math.round(hsl[1] * 100)}%
                        </td>
                        <td className="py-5 text-gray-500">
                          {Math.round(hsl[2] * 100)}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <section>
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-4xl font-black tracking-tighter italic text-gray-900">
              Похожие палитры
            </h2>
            <Link
              href="/explore"
              className="text-sm font-bold text-gray-400 hover:text-black transition-colors underline decoration-2 underline-offset-4"
            >
              Смотреть все →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CURATED_PALETTES.slice(4, 7).map((p) => {
              const pSlug = p.name.toLowerCase().replace(/ /g, "-");
              const pColors = p.colors.map((c) => c.replace("#", "")).join(",");
              return (
                <Link
                  href={`/palette/${pSlug}?colors=${pColors}`}
                  key={p.id}
                  className="bg-gray-50 p-5 rounded-[2.5rem] border border-gray-100 transition-all hover:bg-white hover:shadow-2xl hover:-translate-y-1 group"
                >
                  <div className="flex h-36 rounded-2xl overflow-hidden mb-5 shadow-sm">
                    {p.colors.map((c) => (
                      <div
                        key={c}
                        className="flex-1"
                        style={{ backgroundColor: c }}
                      ></div>
                    ))}
                  </div>
                  <div className="font-black text-lg px-2 group-hover:text-blue-600 transition-colors">
                    {p.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
