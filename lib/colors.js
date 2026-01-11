import chroma from "chroma-js";

export const generateColor = () => {
  return {
    hex: chroma.random().hex().toUpperCase(),
    locked: false,
  };
};

export const getContrastColor = (hex) => {
  // Если цвет слишком светлый, возвращаем черный, если темный — белый
  return chroma(hex).luminance() > 0.5 ? "#000000" : "#FFFFFF";
};
