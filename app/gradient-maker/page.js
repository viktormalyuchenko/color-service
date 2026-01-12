import GradientClient from "./GradientClient";

export const metadata = {
  title: "Генератор CSS градиентов онлайн — Инструмент Paletto",
  description:
    "Создавайте потрясающие линейные градиенты для ваших веб-проектов. Настраивайте углы, выбирайте цвета и копируйте готовый CSS код мгновенно.",
  keywords: [
    "генератор градиентов",
    "css gradient maker",
    "красивые градиенты",
    "линейный градиент онлайн",
  ],
};

export default function Page() {
  return <GradientClient />;
}
