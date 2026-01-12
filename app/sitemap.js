import { CURATED_PALETTES, GRADIENTS } from "@/lib/data";
import { BLOG_POSTS } from "@/lib/posts";

export default function sitemap() {
  const baseUrl = "https://paletto.viktoor.ru";

  const staticRoutes = [
    "",
    "/palette-generator",
    "/explore",
    "/explore-gradients",
    "/wheel",
    "/visualizer",
    "/contrast-checker",
    "/image-to-palette",
    "/font-styler",
    "/ai-generator",
    "/popular-colors",
    "/color-names",
    "/about",
    "/blog",
    "/contacts",
    "/privacy",
    "/terms",
    "/cookies",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  const paletteRoutes = CURATED_PALETTES.map((p) => ({
    url: `${baseUrl}/palette/${p.name
      .toLowerCase()
      .replace(/ /g, "-")}?colors=${p.colors
      .map((c) => c.replace("#", ""))
      .join(",")}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // 3. Динамические страницы ГРАДИЕНТОВ (Исправлено: & заменен на &amp;)
  const gradientRoutes = GRADIENTS.map((g) => ({
    url: `${baseUrl}/gradient/${g.name
      .toLowerCase()
      .replace(/ /g, "-")}?colors=${g.colors
      .map((c) => c.replace("#", ""))
      .join(",")}&amp;angle=${g.angle}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // 4. Страницы блога
  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...paletteRoutes, ...gradientRoutes, ...blogRoutes];
}
