import ImageClient from "./ImageClient";

export const metadata = {
  title: "Извлечь палитру из фото онлайн — Инструмент Paletto",
  description:
    "Бесплатный инструмент для создания цветовой палитры из любого изображения или фотографии. Загрузите фото и получите 5 доминирующих цветов мгновенно.",
  keywords: [
    "палитра по фото",
    "извлечь цвета из картинки",
    "цвета из изображения",
    "генератор палитры по фото",
  ],
};

export default function Page() {
  return <ImageClient />;
}
