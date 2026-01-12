import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { BLOG_POSTS } from "@/lib/posts"; // Проверь путь импорта

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      <div className="max-w-6xl mx-auto px-4 pt-20">
        <header className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 uppercase italic text-gray-900">
            Блог
          </h1>
          <p className="text-gray-500 text-xl font-medium">
            Вдохновение и обучение из мира цвета.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            /* Key должен быть уникальным и стабильным (slug идеально подходит) */
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              className="block group"
            >
              <article className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all cursor-pointer h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                      {post.tag}
                    </span>
                    <span className="text-gray-300 text-sm font-bold flex items-center gap-1">
                      <Calendar size={14} /> {post.date}
                    </span>
                  </div>
                  <h2 className="text-3xl font-black mb-4 tracking-tight group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 font-medium leading-relaxed mb-8">
                    {post.desc}
                  </p>
                </div>
                <div className="flex items-center gap-2 font-black text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                  Читать полностью <ArrowRight size={18} />
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
