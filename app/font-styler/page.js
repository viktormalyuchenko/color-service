import FontClient from "./FontClient";

export const metadata = {
  title: "Подбор шрифтовых пар и цветов онлайн — Инструмент Paletto",
  description:
    "Экспериментируйте с типографикой и цветом. Подбирайте идеальные Google Fonts для ваших заголовков и основного текста в реальном интерфейсе.",
  keywords: [
    "подбор шрифтов",
    "шрифтовые пары",
    "google fonts онлайн",
    "типографика и цвет",
    "Font Styler",
  ],
};

export default function Page() {
  return <FontClient />;
}
