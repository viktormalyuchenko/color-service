import chroma from "chroma-js";

export const generateColor = () => ({
  hex: chroma.random().hex().toUpperCase(),
  locked: false,
});

export const getContrastColor = (hex) =>
  chroma(hex).luminance() > 0.5 ? "#1a1a1a" : "#ffffff";

export const generatePaletteByMode = (currentColors, mode) => {
  const anchorIndex = currentColors.findIndex((c) => c.locked);
  const baseHex =
    anchorIndex !== -1 ? currentColors[anchorIndex].hex : chroma.random().hex();
  const baseColor = chroma(baseHex);
  const h = baseColor.get("hsl.h");
  const s = baseColor.get("hsl.s");
  const l = baseColor.get("hsl.l");

  let newHexes = [];

  switch (mode) {
    // --- БАЗОВЫЕ ---
    case "monochromatic":
      newHexes = [0.2, 0.4, 0.6, 0.8, 0.95].map((lum) =>
        baseColor.luminance(lum).hex()
      );
      break;
    case "analogous":
      newHexes = [-30, -15, 0, 15, 30].map((off) =>
        chroma.hsl((h + off + 360) % 360, s, l).hex()
      );
      break;
    case "complementary":
      newHexes = [
        baseHex,
        baseColor.brighten(1).hex(),
        baseColor.desaturate(0.5).hex(),
        chroma.hsl((h + 180) % 360, s, l).hex(),
        chroma.hsl((h + 180) % 360, s, l * 0.8).hex(),
      ];
      break;
    case "triadic":
      newHexes = [
        baseHex,
        chroma.hsl((h + 120) % 360, s, l).hex(),
        chroma.hsl((h + 240) % 360, s, l).hex(),
        baseColor.brighten(1.5).hex(),
        baseColor.darken(1.5).hex(),
      ];
      break;

    // --- ПРОДВИНУТЫЕ ---
    case "pastel":
      newHexes = Array(5)
        .fill(0)
        .map(() =>
          chroma
            .hsl(
              Math.random() * 360,
              0.2 + Math.random() * 0.1,
              0.85 + Math.random() * 0.1
            )
            .hex()
        );
      break;
    case "neon":
      newHexes = Array(5)
        .fill(0)
        .map(() =>
          chroma.hsl(Math.random() * 360, 0.9, 0.5 + Math.random() * 0.1).hex()
        );
      break;
    case "warm":
      newHexes = Array(5)
        .fill(0)
        .map(() =>
          chroma.hsl((Math.random() * 60 - 30 + 360) % 360, 0.7, 0.5).hex()
        );
      break;
    case "cool":
      newHexes = Array(5)
        .fill(0)
        .map(() => chroma.hsl(180 + Math.random() * 60, 0.5, 0.6).hex());
      break;

    // --- СЕЗОННЫЕ ---
    case "autumn":
      newHexes = Array(5)
        .fill(0)
        .map(() =>
          chroma
            .hsl(20 + Math.random() * 40, 0.6, 0.3 + Math.random() * 0.3)
            .hex()
        );
      break;
    case "winter":
      newHexes = Array(5)
        .fill(0)
        .map(() =>
          chroma
            .hsl(190 + Math.random() * 40, 0.2, 0.7 + Math.random() * 0.2)
            .hex()
        );
      break;
    case "spring":
      newHexes = Array(5)
        .fill(0)
        .map(() => {
          const h =
            Math.random() > 0.5
              ? 80 + Math.random() * 60
              : 300 + Math.random() * 50;
          return chroma
            .hsl(h, 0.4 + Math.random() * 0.3, 0.7 + Math.random() * 0.2)
            .hex();
        });
      break;

    case "summer":
      newHexes = Array(5)
        .fill(0)
        .map(() => {
          const h =
            Math.random() > 0.5
              ? 190 + Math.random() * 40
              : 10 + Math.random() * 50;
          return chroma
            .hsl(h, 0.6 + Math.random() * 0.4, 0.5 + Math.random() * 0.2)
            .hex();
        });
      break;

    // --- ЭМОЦИИ ---
    case "luxury":
      // Генерируем случайный оттенок золота (от 40 до 50 градусов по цветовому кругу)
      const goldHue = 40 + Math.random() * 15;
      const gold = chroma.hsl(goldHue, 0.6, 0.5).hex();
      // Генерируем глубокие темные тона, близкие к черному или темно-синему
      const darkBase = chroma.hsl(goldHue, 0.1, 0.1).hex();

      newHexes = [
        gold,
        chroma(darkBase).brighten(0.5).hex(), // Темно-серый/коричневый
        chroma(darkBase).darken(0.5).hex(), // Почти черный
        chroma(gold).desaturate(0.5).hex(), // Приглушенное золото
        chroma(gold).brighten(1.5).hex(), // Очень светлое золото/кремовый
      ];
      break;

    default: // random
      return currentColors.map((c) => (c.locked ? c : generateColor()));
  }

  return currentColors.map((c, i) => {
    if (c.locked) return c;
    return {
      hex: (newHexes[i] || chroma.random().hex()).toUpperCase(),
      locked: false,
    };
  });
};
