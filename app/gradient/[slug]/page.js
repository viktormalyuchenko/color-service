import { Suspense } from "react";
import GradientDetailsClient from "./GradientDetailsClient";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const name = decodedSlug.replace(/-/g, " ");
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

  return {
    title: `Градиент ${capitalizedName} — CSS коды и палитра | Paletto`,
    description: `Готовый CSS код для градиента ${capitalizedName}. Технические параметры цветов HEX, RGB, HSL и визуализация в интерфейсе.`,
  };
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center font-bold">
          Загрузка градиента...
        </div>
      }
    >
      <GradientDetailsClient />
    </Suspense>
  );
}
