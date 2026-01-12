import { Palette, Heart, Zap, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "О проекте Paletto — Лучший генератор цветовых схем",
  description:
    "Узнайте историю создания Paletto. Мы создаем лучшие инструменты дизайнера для подбора цветов для сайта и мобильных приложений.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-4xl mx-auto px-4 pt-20">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-12 text-gray-900">
          Сделано для <br />
          <span className="text-blue-600">творчества.</span>
        </h1>

        <div className="prose prose-lg max-w-none text-gray-600 font-medium leading-relaxed space-y-8">
          <p className="text-2xl text-gray-900 font-bold">
            Paletto — это не просто сайт, это полноценная экосистема, созданная
            для того, чтобы сделать работу с цветом доступной и приятной.
          </p>

          <p>
            Я создал Paletto, потому что верил: **лучший генератор** палитр
            должен быть быстрым, умным и интуитивно понятным. В мире, где
            визуальный контент играет решающую роль, качественный подбор **цвета
            для сайта** становится фундаментом успеха любого цифрового продукта.
          </p>

          <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6 tracking-tight">
            Наша миссия
          </h2>
          <p>
            Мы объединили классическую теорию колористики и современные
            технологии, чтобы создать ультимативные **инструменты дизайнера**.
            Наша задача — помочь вам найти ту самую «гармонию», которая выделит
            ваш проект среди миллионов других.
          </p>

          <div className="grid md:grid-cols-2 gap-8 my-16">
            <div className="p-8 rounded-[3rem] bg-gray-50 border border-gray-100">
              <Zap className="text-blue-600 mb-4" />
              <h3 className="font-black text-xl text-gray-900 mb-2">
                Скорость
              </h3>
              <p className="text-sm">
                Генерация профессиональных схем за доли секунды нажатием одной
                клавиши.
              </p>
            </div>
            <div className="p-8 rounded-[3rem] bg-gray-50 border border-gray-100">
              <ShieldCheck className="text-green-600 mb-4" />
              <h3 className="font-black text-xl text-gray-900 mb-2">
                Доступность
              </h3>
              <p className="text-sm">
                Инструменты проверки контраста по стандартам WCAG для
                инклюзивного дизайна.
              </p>
            </div>
          </div>

          <p>
            Paletto постоянно развивается. В 2026 году мы сфокусированы на
            внедрении нейросетевых алгоритмов, которые помогут подбирать цвета
            на основе эмоционального отклика пользователей. Присоединяйтесь к
            нам в этом путешествии к идеальному цвету!
          </p>
        </div>
      </div>
    </div>
  );
}
