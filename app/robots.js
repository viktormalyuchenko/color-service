export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/", // если будут закрытые разделы
    },
    sitemap: "https://paletto.viktoor.ru/sitemap.xml",
  };
}
