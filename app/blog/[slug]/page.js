import { BLOG_POSTS } from "@/lib/posts";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";

// 1. Генерация метаданных (SEO)
export async function generateMetadata({ params }) {
  // В Next.js 15/16 params — это Promise
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) return { title: "Статья не найдена" };

  return {
    title: `${post.title} | Блог Paletto`,
    description: post.desc,
  };
}

// 2. Сама страница статьи
export default async function PostPage({ params }) {
  // ОБЯЗАТЕЛЬНО: ждем получения slug
  const { slug } = await params;

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  // Если статья не найдена в массиве — показываем 404
  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Контейнер статьи */}
      <article className="max-w-3xl mx-auto px-4 pt-20">
        {/* Навигация назад */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-black font-bold mb-12 transition-colors group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Назад в блог
        </Link>

        {/* Мета-информация статьи */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
            {post.tag}
          </span>
          <div className="flex items-center gap-4 text-gray-400 text-sm font-bold">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} /> {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> 5 мин чтения
            </span>
          </div>
        </div>

        {/* Заголовок */}
        <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-12 text-gray-900 leading-[0.95]">
          {post.title}
        </h1>

        {/* Основной текст статьи (с поддержкой HTML) */}
        <div className="prose-custom mt-12">
          <div
            className="max-w-none font-medium"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Футер статьи */}
        <div className="mt-20 pt-10 border-t border-gray-100 flex justify-between items-center text-gray-400">
          <div className="text-sm font-bold uppercase tracking-widest">
            © Paletto Blog 2026
          </div>
          <div className="flex gap-4">
            {/* Тут можно добавить иконки соцсетей для шеринга */}
          </div>
        </div>
      </article>
    </div>
  );
}
