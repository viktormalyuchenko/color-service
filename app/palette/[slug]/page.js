import { Suspense } from "react";
import PaletteClient from "./PaletteClient";

// Серверная функция для генерации SEO-метаданных
export async function generateMetadata({ params }) {
  // В Next.js 15/16 params — это Promise
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const name = decodedSlug.replace(/-/g, " ");
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

  return {
    title: `Палитра ${capitalizedName} | Paletto`,
    description: `HEX, RGB и HSL коды для цветовой схемы ${capitalizedName}. Посмотрите, как эти цвета сочетаются, и скачайте готовую палитру.`,
  };
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center font-bold">
          Загрузка палитры...
        </div>
      }
    >
      <PaletteClient />
    </Suspense>
  );
}
