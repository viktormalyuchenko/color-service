export const metadata = { title: "Файлы Cookie | Paletto" };

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white pb-24 px-4 pt-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black tracking-tighter mb-10 text-gray-900 italic uppercase">
          Использование Cookie
        </h1>
        <div className="text-gray-600 space-y-6 font-medium leading-relaxed">
          <p>
            На сайте Paletto мы используем файлы cookie и аналогичные технологии
            (например, LocalStorage), чтобы сделать ваш опыт работы с цветом
            максимально удобным.
          </p>

          <h2 className="text-2xl font-black text-gray-900 pt-6 uppercase tracking-tight">
            Для чего это нужно?
          </h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Функциональность:</strong> Мы сохраняем ваши последние
              сгенерированные палитры, чтобы вы не потеряли их при обновлении
              страницы.
            </li>
            <li>
              <strong>Аналитика:</strong> Яндекс.Метрика помогает нам понять,
              какие инструменты (Визуализатор или Цветовой круг) популярны
              больше всего.
            </li>
            <li>
              <strong>Персонализация:</strong> Выбранный вами режим генерации
              (например, «Неон» или «Пастель») сохраняется для ваших следующих
              сессий.
            </li>
          </ul>
          <p className="pt-10">
            Продолжая использовать наш сайт, вы соглашаетесь с нашей политикой
            использования данных технологий.
          </p>
        </div>
      </div>
    </div>
  );
}
