export const metadata = { title: "Условия использования | Paletto" };

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white pb-24 px-4 pt-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black tracking-tighter mb-10 text-gray-900">
          Условия использования
        </h1>
        <div className="text-gray-600 space-y-6 font-medium leading-relaxed">
          <p>
            Добро пожаловать в Paletto. Используя этот сайт, вы соглашаетесь со
            следующими условиями:
          </p>

          <h2 className="text-2xl font-black text-gray-900 pt-6">
            Интеллектуальная собственность
          </h2>
          <p>
            Вы можете свободно использовать сгенерированные палитры, HEX-коды и
            градиенты в своих коммерческих и личных проектах без указания
            авторства Paletto.
          </p>

          <h2 className="text-2xl font-black text-gray-900 pt-6">
            Ограничение ответственности
          </h2>
          <p>
            Инструменты Paletto предоставляются по принципу «как есть». Мы не
            несем ответственности за возможные различия в цветопередаче на
            разных мониторах или устройствах.
          </p>

          <p className="pt-10 text-sm text-gray-400">
            © 2026 Paletto. Все права защищены.
          </p>
        </div>
      </div>
    </div>
  );
}
