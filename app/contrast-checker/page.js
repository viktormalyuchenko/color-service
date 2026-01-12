import ContrastClient from "./ContrastClient";

export const metadata = {
  title: "Проверка контрастности цветов (Contrast Radar) — Инструмент Paletto",
  description:
    "Проверьте коэффициент контрастности текста и фона на соответствие стандартам WCAG 2.1. Contrast Radar — профессиональный инструмент для обеспечения доступности веб-дизайна.",
  keywords: [
    "проверка контрастности",
    "wcag 2.1",
    "доступность дизайна",
    "контраст текста и фона",
    "Contrast Radar",
  ],
};

export default function Page() {
  return <ContrastClient />;
}
