import AiClient from "./AiClient";

export const metadata = {
  title: "ИИ Генератор палитр по тексту онлайн — Paletto",
  description:
    "Опишите настроение вашего бренда текстом, и наш искусственный интеллект создаст идеальную цветовую схему бесплатно.",
  keywords: [
    "ии генератор цветов",
    "палитра по описанию",
    "нейросеть для подбора цветов",
    "AI palette generator free",
  ],
};

export default function Page() {
  return <AiClient />;
}
