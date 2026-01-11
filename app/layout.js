import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

const SITE_URL = "https://paletto.viktoor.ru";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Paletto — Умный генератор цветовых палитр",
    template: "%s | Paletto",
  },
  description:
    "Профессиональный инструмент для дизайнеров: генерация палитр ИИ, цветовой круг, визуализация интерфейсов и библиотека трендовых цветов.",
  keywords: [
    "генератор палитр",
    "цветовой круг онлайн",
    "подбор цвета",
    "сочетание цветов",
    "дизайн интерфейсов",
    "палитры для сайтов",
  ],
  authors: [{ name: "Viktoor" }],
  creator: "Viktoor",

  // Open Graph (Facebook, VK, Telegram)
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    title: "Paletto — Гармония цвета в один клик",
    description:
      "Создавайте, исследуйте и визуализируйте идеальные цветовые схемы.",
    siteName: "Paletto",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Paletto Preview",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Paletto — Умный генератор палитр",
    description: "Лучший инструмент для работы с цветом.",
    images: ["/og-image.png"],
  },

  // Каноническая ссылка (защита от дублей)
  alternates: {
    canonical: SITE_URL,
  },

  // Иконки
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "Ihz5Cd5vkNkVuh36pZjbyhECtbKBY5oZu7pMs4t5kXU",
    yandex: "9c2f57198440537e",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />

        {/* Яндекс.Метрика */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=106213894", "ym");

            ym(106213894, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true,
              ecommerce:"dataLayer"
            });
          `}
        </Script>
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/106213894"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </body>
    </html>
  );
}
