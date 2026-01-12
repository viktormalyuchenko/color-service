import chroma from "chroma-js";

// Расширенная база знаний
const KNOWLEDGE_BASE = {
  // Цвета
  красный: "#ef4444",
  синий: "#3b82f6",
  зеленый: "#22c55e",
  желтый: "#eab308",
  розовый: "#ec4899",
  фиолетовый: "#8b5cf6",
  оранжевый: "#f97316",
  голубой: "#06b6d4",

  // Темы и Отрасли
  технологии: { color: "#00f5d4", harmony: "split" },
  бизнес: { color: "#1e293b", harmony: "monochromatic" },
  финансы: { color: "#059669", harmony: "analogous" },
  экология: { color: "#15803d", harmony: "analogous" },
  космос: { color: "#43435c", harmony: "triadic" },
  медицина: { color: "#0ea5e9", harmony: "analogous" },
  еда: { color: "#f97316", harmony: "triadic" },

  // Настроения/Эмоции
  уют: { color: "#9c6644", harmony: "analogous" },
  роскошь: { color: "#d4af37", harmony: "monochromatic" },
  неон: { color: "#ff00ff", harmony: "triadic" },
  минимализм: { color: "#f1f5f9", harmony: "monochromatic" },
  радость: { color: "#facc15", harmony: "analogous" },
  спокойствие: { color: "#94a3b8", harmony: "analogous" },

  // Природа
  океан: { color: "#0077b6", harmony: "analogous" },
  лес: { color: "#2d6a4f", harmony: "analogous" },
  пустыня: { color: "#d4a373", harmony: "complementary" },
  закат: { color: "#ff9e00", harmony: "complementary" },
};

// Модификаторы стиля
const MODIFIERS = {
  темный: (c) => chroma(c).darken(1.5).hex(),
  светлый: (c) => chroma(c).brighten(1.5).hex(),
  яркий: (c) => chroma(c).saturate(2).hex(),
  пастельный: (c) => chroma(c).desaturate(1).brighten(1).hex(),
  приглушенный: (c) => chroma(c).desaturate(1.5).hex(),
  насыщенный: (c) => chroma(c).saturate(3).hex(),
};

export const generateAiPalette = (prompt) => {
  const words = prompt.toLowerCase().split(/\s+/);

  let baseColor = null;
  let selectedHarmony = "analogous";
  let activeModifier = null;

  // 1. Поиск модификатора (темный, светлый и т.д.)
  for (let mod in MODIFIERS) {
    if (words.some((w) => w.includes(mod))) {
      activeModifier = MODIFIERS[mod];
    }
  }

  // 2. Поиск базового цвета или темы
  for (let key in KNOWLEDGE_BASE) {
    if (words.some((w) => w.includes(key))) {
      const data = KNOWLEDGE_BASE[key];
      baseColor = typeof data === "string" ? data : data.color;
      if (data.harmony) selectedHarmony = data.harmony;
    }
  }

  // Если ничего не найдено - берем случайный
  if (!baseColor) baseColor = chroma.random().hex();

  // 3. Применяем модификатор, если он есть
  if (activeModifier) baseColor = activeModifier(baseColor);

  const color = chroma(baseColor);
  const h = color.get("hsl.h");
  const s = color.get("hsl.s");
  const l = color.get("hsl.l");

  // 4. Генерация палитры на основе выбранной гармонии
  let palette = [];

  switch (selectedHarmony) {
    case "complementary":
      palette = [
        color.darken(1).hex(),
        baseColor,
        color.brighten(1).hex(),
        chroma.hsl((h + 180) % 360, s, l).hex(),
        chroma.hsl((h + 180) % 360, s, l * 0.8).hex(),
      ];
      break;
    case "triadic":
      palette = [
        baseColor,
        chroma.hsl((h + 120) % 360, s, l).hex(),
        chroma.hsl((h + 240) % 360, s, l).hex(),
        color.brighten(1).hex(),
        color.darken(2).hex(),
      ];
      break;
    case "split":
      palette = [
        baseColor,
        chroma.hsl((h + 150) % 360, s, l).hex(),
        chroma.hsl((h + 210) % 360, s, l).hex(),
        color.darken(1.5).hex(),
        "#ffffff",
      ];
      break;
    case "monochromatic":
      palette = [
        color.darken(2).hex(),
        color.darken(1).hex(),
        baseColor,
        color.brighten(1).hex(),
        color.brighten(2).hex(),
      ];
      break;
    default: // analogous
      palette = [
        chroma.hsl((h - 30 + 360) % 360, s, l).hex(),
        chroma.hsl((h - 15 + 360) % 360, s, l).hex(),
        baseColor,
        chroma.hsl((h + 15) % 360, s, l).hex(),
        chroma.hsl((h + 30) % 360, s, l).hex(),
      ];
  }

  return palette.map((c) => c.toUpperCase());
};
