export const metadata = { title: "Политика конфиденциальности | Paletto" };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white pb-24 px-4 pt-20">
      <div className="max-w-3xl mx-auto prose prose-slate">
        <h1 className="text-4xl font-black tracking-tighter mb-10 text-gray-900">
          Политика конфиденциальности
        </h1>
        <div className="text-gray-600 space-y-6 font-medium">
          <p className="font-bold text-gray-900 text-lg">
            Последнее обновление: 12 января 2026 г.
          </p>
          <p>
            Ваша конфиденциальность важна для нас. Paletto не собирает ваши
            персональные данные, за исключением случаев, когда вы добровольно
            предоставляете их нам (например, подписываясь на рассылку).
          </p>

          <h2 className="text-2xl font-black text-gray-900 pt-6">
            1. Сбор данных
          </h2>
          <p>
            Мы используем Яндекс.Метрику для анализа общего трафика и улучшения
            работы наших инструментов. Вся информация анонимна.
          </p>

          <h2 className="text-2xl font-black text-gray-900 pt-6">
            2. Использование файлов Cookie
          </h2>
          <p>
            Cookie используются для сохранения ваших настроек в генераторе и
            визуализаторе, чтобы вам было удобнее пользоваться сервисом при
            повторном посещении.
          </p>

          <h2 className="text-2xl font-black text-gray-900 pt-6">
            3. Контакты
          </h2>
          <p>
            По всем вопросам вы можете писать на наш адрес электронной почты,
            указанный в разделе «Контакты».
          </p>
        </div>
      </div>
    </div>
  );
}
