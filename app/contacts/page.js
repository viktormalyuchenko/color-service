import { Mail, MessageCircle, Send } from "lucide-react";

export const metadata = { title: "Контакты | Paletto" };

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-4xl mx-auto px-4 pt-20">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-12 text-gray-900">
          Напишите <br />
          <span className="text-blue-600">нам.</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              У вас есть идеи по улучшению Paletto или вы нашли ошибку? Мы
              всегда открыты для предложений и сотрудничества.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Email
                  </div>
                  <div className="font-bold text-gray-900">
                    hello@viktoor.ru
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <Send size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Telegram
                  </div>
                  <div className="font-bold text-gray-900">@viktoor_design</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-[3rem] border border-gray-100">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Ваше имя"
                className="w-full p-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-black"
              />
              <textarea
                placeholder="Ваше сообщение"
                rows="4"
                className="w-full p-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-black"
              ></textarea>
              <button className="w-full bg-black text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all">
                Отправить
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
